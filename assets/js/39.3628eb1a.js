(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{468:function(e,n,t){"use strict";t.r(n);var a=t(30),c=Object(a.a)({},(function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"mybatis-源码分析-缓存原理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mybatis-源码分析-缓存原理"}},[e._v("#")]),e._v(" MyBatis 源码分析 - 缓存原理")]),e._v(" "),t("h2",{attrs:{id:"_1-简介"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-简介"}},[e._v("#")]),e._v(" 1.简介")]),e._v(" "),t("p",[e._v("在 Web 应用中，缓存是必不可少的组件。通常我们都会用 Redis 或 memcached 等缓存中间件，拦截大量奔向数据库的请求，减轻数据库压力。作为一个重要的组件，MyBatis 自然也在内部提供了相应的支持。通过在框架层面增加缓存功能，可减轻数据库的压力，同时又可以提升查询速度，可谓一举两得。MyBatis 缓存结构由一级缓存和二级缓存构成，这两级缓存均是使用 Cache 接口的实现类。因此，在接下里的章节中，我将首先会向大家介绍 Cache 几种实现类的源码，然后再分析一级和二级缓存的实现。下面先来分析 Cache 及其实现类。")]),e._v(" "),t("h2",{attrs:{id:"_2-缓存类介绍"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-缓存类介绍"}},[e._v("#")]),e._v(" 2.缓存类介绍")]),e._v(" "),t("p",[e._v("在 MyBatis 中，Cache 是缓存接口，定义了一些基本的缓存操作，所有缓存类都应该实现该接口。MyBatis 内部提供了丰富的缓存实现类，比如具有基本缓存功能的 PerpetualCache，具有 LRU 策略的缓存 LruCache，以及可保证线程安全的缓存 SynchronizedCache 和具备阻塞功能的缓存 BlockingCache 等。除此之外，还有很多缓存实现类，这里就不一一列举了。需要特别说明的是，MyBatis 在实现缓存模块的过程中，使用了装饰模式。在以上几种缓存实现类中，PerpetualCache 相当于装饰模式中的 ConcreteComponent。LruCache、SynchronizedCache 和 BlockingCache 等相当于装饰模式中的 ConcreteDecorator。它们的关系如下：")]),e._v(" "),t("p",[t("img",{attrs:{src:"https://blog-pictures.oss-cn-shanghai.aliyuncs.com/15348250188091.jpg",alt:"img"}})]),e._v(" "),t("p",[e._v("以上对 Cache 接口的实现类进行了简单的介绍，接下来，我们一起深入到源码中，看看这些缓存类的实现。")]),e._v(" "),t("h3",{attrs:{id:"_2-1-perpetualcache"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-perpetualcache"}},[e._v("#")]),e._v(" 2.1 PerpetualCache")]),e._v(" "),t("p",[e._v("PerpetualCache 是一个具有基本功能的缓存类，内部使用了 HashMap 实现缓存功能。它的源码如下：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("public class PerpetualCache implements Cache {\n\n    private final String id;\n\n    private Map<Object, Object> cache = new HashMap<Object, Object>();\n\n    public PerpetualCache(String id) {\n        this.id = id;\n    }\n\n    @Override\n    public String getId() {\n        return id;\n    }\n\n    @Override\n    public int getSize() {\n        return cache.size();\n    }\n\n    @Override\n    public void putObject(Object key, Object value) {\n        // 存储键值对到 HashMap\n        cache.put(key, value);\n    }\n\n    @Override\n    public Object getObject(Object key) {\n        // 查找缓存项\n        return cache.get(key);\n    }\n\n    @Override\n    public Object removeObject(Object key) {\n        // 移除缓存项\n        return cache.remove(key);\n    }\n\n    @Override\n    public void clear() {\n        cache.clear();\n    }\n    \n    // 省略部分代码\n}\n")])])]),t("p",[e._v("上面是 PerpetualCache 的全部代码，很简单。接下来，我们通过装饰类对该类进行装饰，使其功能变的丰富起来。")]),e._v(" "),t("h3",{attrs:{id:"_2-2-lrucache"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-lrucache"}},[e._v("#")]),e._v(" 2.2 LruCache")]),e._v(" "),t("p",[e._v("LruCache，顾名思义，是一种具有 LRU 策略的缓存实现类。除此之外，MyBatis 还提供了具有 FIFO 策略的缓存 FifoCache。不过并未提供 LFU 缓存，如果大家有兴趣，可以自行拓展。接下来，我们来看一下 LruCache 的实现。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("public class LruCache implements Cache {\n\n    private final Cache delegate;\n    private Map<Object, Object> keyMap;\n    private Object eldestKey;\n\n    public LruCache(Cache delegate) {\n        this.delegate = delegate;\n        setSize(1024);\n    }\n    \n    public int getSize() {\n        return delegate.getSize();\n    }\n\n    public void setSize(final int size) {\n        /*\n         * 初始化 keyMap，注意，keyMap 的类型继承自 LinkedHashMap，\n         * 并覆盖了 removeEldestEntry 方法\n         */\n        keyMap = new LinkedHashMap<Object, Object>(size, .75F, true) {\n            private static final long serialVersionUID = 4267176411845948333L;\n\n            // 覆盖 LinkedHashMap 的 removeEldestEntry 方法\n            @Override\n            protected boolean removeEldestEntry(Map.Entry<Object, Object> eldest) {\n                boolean tooBig = size() > size;\n                if (tooBig) {\n                    // 获取将要被移除缓存项的键值\n                    eldestKey = eldest.getKey();\n                }\n                return tooBig;\n            }\n        };\n    }\n\n    @Override\n    public void putObject(Object key, Object value) {\n        // 存储缓存项\n        delegate.putObject(key, value);\n        cycleKeyList(key);\n    }\n\n    @Override\n    public Object getObject(Object key) {\n        // 刷新 key 在 keyMap 中的位置\n        keyMap.get(key);\n        // 从被装饰类中获取相应缓存项\n        return delegate.getObject(key);\n    }\n\n    @Override\n    public Object removeObject(Object key) {\n        // 从被装饰类中移除相应的缓存项\n        return delegate.removeObject(key);\n    }\n\n    @Override\n    public void clear() {\n        delegate.clear();\n        keyMap.clear();\n    }\n\n    private void cycleKeyList(Object key) {\n        // 存储 key 到 keyMap 中\n        keyMap.put(key, key);\n        if (eldestKey != null) {\n            // 从被装饰类中移除相应的缓存项\n            delegate.removeObject(eldestKey);\n            eldestKey = null;\n        }\n    }\n    \n    // 省略部分代码\n}\n")])])]),t("p",[e._v("如上，LruCache 的 keyMap 属性是实现 LRU 策略的关键，该属性类型继承自 LinkedHashMap，并覆盖了 removeEldestEntry 方法。LinkedHashMap 可保持键值对的插入顺序，当插入一个新的键值对时，LinkedHashMap 内部的 tail 节点会指向最新插入的节点。head 节点则指向第一个被插入的键值对，也就是最久未被访问的那个键值对。默认情况下，LinkedHashMap 仅维护键值对的插入顺序。若要基于 LinkedHashMap 实现 LRU 缓存，还需通过构造方法将 LinkedHashMap 的 accessOrder 属性设为 true，此时 LinkedHashMap 会维护键值对的访问顺序。比如，上面代码中 getObject 方法中执行了这样一句代码 keyMap.get(key)，目的是刷新 key 对应的键值对在 LinkedHashMap 的位置。LinkedHashMap 会将 key 对应的键值对移动到链表的尾部，尾部节点表示最久刚被访问过或者插入的节点。除了需将 accessOrder 设为 true，还需覆盖 removeEldestEntry 方法。LinkedHashMap 在插入新的键值对时会调用该方法，以决定是否在插入新的键值对后，移除老的键值对。在上面的代码中，当被装饰类的容量超出了 keyMap 的所规定的容量（由构造方法传入）后，keyMap 会移除最长时间未被访问的键，并保存到 eldestKey 中，然后由 cycleKeyList 方法将 eldestKey 传给被装饰类的 removeObject 方法，移除相应的缓存项目。")]),e._v(" "),t("p",[e._v("上面讲了 LinkedHashMap 是如何实现 LRU 特性的，这个是理解 LruCache 的源码的关键所在，所以大家务必搞懂。如果大家想深入了解 LinkedHashMap 的源码，也可参考我之前写的文章 "),t("a",{attrs:{href:"https://www.tianxiaobo.com/2018/01/24/LinkedHashMap-%E6%BA%90%E7%A0%81%E8%AF%A6%E7%BB%86%E5%88%86%E6%9E%90%EF%BC%88JDK1-8%EF%BC%89/",target:"_blank",rel:"noopener noreferrer"}},[e._v("LinkedHashMap 源码详细分析"),t("OutboundLink")],1),e._v("。好了，关于 LruCache 就先分析这么多了。")]),e._v(" "),t("h3",{attrs:{id:"_2-3-blockingcache"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-blockingcache"}},[e._v("#")]),e._v(" 2.3 BlockingCache")]),e._v(" "),t("p",[e._v("BlockingCache 实现了阻塞特性，该特性是基于 Java 重入锁实现的。同一时刻下，BlockingCache 仅允许一个线程访问指定 key 的缓存项，其他线程将会被阻塞住。下面我们来看一下 BlockingCache 的源码。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('public class BlockingCache implements Cache {\n\n    private long timeout;\n    private final Cache delegate;\n    private final ConcurrentHashMap<Object, ReentrantLock> locks;\n\n    public BlockingCache(Cache delegate) {\n        this.delegate = delegate;\n        this.locks = new ConcurrentHashMap<Object, ReentrantLock>();\n    }\n\n    @Override\n    public void putObject(Object key, Object value) {\n        try {\n            // 存储缓存项\n            delegate.putObject(key, value);\n        } finally {\n            // 释放锁\n            releaseLock(key);\n        }\n    }\n\n    @Override\n    public Object getObject(Object key) {\n        // 请        // 请求锁\n        acquireLock(key);\n        Object value = delegate.getObject(key);\n        // 若缓存命中，则释放锁。需要注意的是，未命中则不释放锁\n        if (value != null) {\n            // 释放锁\n            releaseLock(key);\n        }\n        return value;\n    }\n\n    @Override\n    public Object removeObject(Object key) {\n        // 释放锁\n        releaseLock(key);\n        return null;\n    }\n\n    private ReentrantLock getLockForKey(Object key) {\n        ReentrantLock lock = new ReentrantLock();\n        // 存储 <key, Lock> 键值对到 locks 中\n        ReentrantLock previous = locks.putIfAbsent(key, lock);\n        return previous == null ? lock : previous;\n    }\n\n    private void acquireLock(Object key) {\n        Lock lock = getLockForKey(key);\n        if (timeout > 0) {\n            try {\n                // 尝试加锁\n                boolean acquired = lock.tryLock(timeout, TimeUnit.MILLISECONDS);\n                if (!acquired) {\n                    throw new CacheException("...");\n                }\n            } catch (InterruptedException e) {\n                throw new CacheException("...");\n            }\n        } else {\n            // 加锁\n            lock.lock();\n        }\n    }\n\n    private void releaseLock(Object key) {\n        // 获取与当前 key 对应的锁\n        ReentrantLock lock = locks.get(key);\n        if (lock.isHeldByCurrentThread()) {\n            // 释放锁\n            lock.unlock();\n        }\n    }\n    \n    // 省略部分代码\n}\n')])])]),t("p",[e._v("如上，查询缓存时，getObject 方法会先获取与 key 对应的锁，并加锁。若缓存命中，getObject 方法会释放锁，否则将一直锁定。getObject 方法若返回 null，表示缓存未命中。此时 MyBatis 会进行数据库查询，并调用 putObject 方法存储查询结果。同时，putObject 方法会将指定 key 对应的锁进行解锁，这样被阻塞的线程即可恢复运行。")]),e._v(" "),t("p",[e._v("上面的描述有点啰嗦，倒是 BlockingCache 类的注释说到比较简单明了。这里引用一下：")]),e._v(" "),t("blockquote",[t("p",[e._v("It sets a lock over a cache key when the element is not found in cache.\nThis way, other threads will wait until this element is filled instead of hitting the database.")])]),e._v(" "),t("p",[e._v("这段话的意思是，当指定 key 对应元素不存在于缓存中时，BlockingCache 会根据 lock 进行加锁。此时，其他线程将会进入等待状态，直到与 key 对应的元素被填充到缓存中。而不是让所有线程都去访问数据库。")]),e._v(" "),t("p",[e._v("在上面代码中，removeObject 方法的逻辑很奇怪，仅调用了 releaseLock 方法释放锁，却没有调用被装饰类的 removeObject 方法移除指定缓存项。这样做是为什么呢？大家可以先思考，答案将在分析二级缓存的相关逻辑时分析。")]),e._v(" "),t("h2",{attrs:{id:"_3-cachekey"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-cachekey"}},[e._v("#")]),e._v(" 3. CacheKey")]),e._v(" "),t("p",[e._v("在 MyBatis 中，引入缓存的目的是为提高查询效率，降低数据库压力。既然 MyBatis 引入了缓存，那么大家思考过缓存中的 key 和 value 的值分别是什么吗？大家可能很容易能回答出 value 的内容，不就是 SQL 的查询结果吗。那 key 是什么呢？是字符串，还是其他什么对象？如果是字符串的话，那么大家首先能想到的是用 SQL 语句作为 key。但这是不对的，比如：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("SELECT * FROM author where id > ?\n")])])]),t("p",[e._v("id > 1 和 id > 10 查出来的结果可能是不同的，所以我们不能简单的使用 SQL 语句作为 key。从这里可以看出来，运行时参数将会影响查询结果，因此我们的 key 应该涵盖运行时参数。除此之外呢，如果进行分页查询也会导致查询结果不同，因此 key 也应该涵盖分页参数。综上，我们不能使用简单的 SQL 语句作为 key。应该考虑使用一种复合对象，能涵盖可影响查询结果的因子。在 MyBatis 中，这种复合对象就是 CacheKey。下面来看一下它的定义。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("public class CacheKey implements Cloneable, Serializable {\n\n    private static final int DEFAULT_MULTIPLYER = 37;\n    private static final int DEFAULT_HASHCODE = 17;\n\n    // 乘子，默认为37\n    private final int multiplier;\n    // CacheKey 的 hashCode，综合了各种影响因子\n    private int hashcode;\n    // 校验和\n    private long checksum;\n    // 影响因子个数\n    private int count;\n    // 影响因子集合\n    private List<Object> updateList;\n    \n    public CacheKey() {\n        this.hashcode = DEFAULT_HASHCODE;\n        this.multiplier = DEFAULT_MULTIPLYER;\n        this.count = 0;\n        this.updateList = new ArrayList<Object>();\n    }\n    \n    // 省略其他方法\n}\n")])])]),t("p",[e._v("如上，除了 multiplier 是恒定不变的 ，其他变量将在更新操作中被修改。下面看一下更新操作的代码。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("/** 每当执行更新操作时，表示有新的影响因子参与计算 */\npublic void update(Object object) {\n        int baseHashCode = object == null ? 1 : ArrayUtil.hashCode(object);\n    // 自增 count\n    count++;\n    // 计算校验和\n    checksum += baseHashCode;\n    // 更新 baseHashCode\n    baseHashCode *= count;\n\n    // 计算 hashCode\n    hashcode = multiplier * hashcode + baseHashCode;\n\n    // 保存影响因子\n    updateList.add(object);\n}\n")])])]),t("p",[e._v("当不断有新的影响因子参与计算时，hashcode 和 checksum 将会变得愈发复杂和随机。这样可降低冲突率，使 CacheKey 可在缓存中更均匀的分布。CacheKey 最终要作为键存入 HashMap，因此它需要覆盖 equals 和 hashCode 方法。下面我们来看一下这两个方法的实现。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("public boolean equals(Object object) {\n    // 检测是否为同一个对象\n    if (this == object) {\n        return true;\n    }\n    // 检测 object 是否为 CacheKey\n    if (!(object instanceof CacheKey)) {\n        return false;\n    }\n    final CacheKey cacheKey = (CacheKey) object;\n\n    // 检测 hashCode 是否相等\n    if (hashcode != cacheKey.hashcode) {\n        return false;\n    }\n    // 检测校验和是否相同\n    if (checksum != cacheKey.checksum) {\n        return false;\n    }\n    // 检测 coutn 是否相同\n    if (count != cacheKey.count) {\n        return false;\n    }\n\n    // 如果上面的检测都通过了，下面分别对每个影响因子进行比较\n    for (int i = 0; i < updateList.size(); i++) {\n        Object thisObject = updateList.get(i);\n        Object thatObject = cacheKey.updateList.get(i);\n        if (!ArrayUtil.equals(thisObject, thatObject)) {\n            return false;\n        }\n    }\n    return true;\n}\n\npublic int hashCode() {\n    // 返回 hashcode 变量\n    return hashcode;\n}\n")])])]),t("p",[e._v("equals 方法的检测逻辑比较严格，对 CacheKey 中多个成员变量进行了检测，已保证两者相等。hashCode 方法比较简单，返回 hashcode 变量即可。")]),e._v(" "),t("p",[e._v("关于 CacheKey 就先分析到这，CacheKey 在一二级缓存中会被用到，接下来还会看到它的身影。")]),e._v(" "),t("h2",{attrs:{id:"_4-一级缓存"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-一级缓存"}},[e._v("#")]),e._v(" 4.一级缓存")]),e._v(" "),t("p",[e._v("在进行数据库查询之前，MyBatis 首先会检查以及缓存中是否有相应的记录，若有的话直接返回即可。一级缓存是数据库的最后一道防护，若一级缓存未命中，查询请求将落到数据库上。一级缓存是在 BaseExecutor 被初始化的，下面我们来看一下相关的初始化逻辑：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('public abstract class BaseExecutor implements Executor {\n\tprotected PerpetualCache localCache;\n    // 省略其他字段\n    \n    protected BaseExecutor(Configuration configuration, Transaction transaction) {\n        this.localCache = new PerpetualCache("LocalCache");\n        // 省略其他字段初始化方法\n    }\n}\n')])])]),t("p",[e._v("如上，一级缓存的类型为 PerpetualCache，没有被其他缓存类装饰过。一级缓存所存储从查询结果会在 MyBatis 执行更新操作（INSERT/UPDATE/DELETE），以及提交和回滚事务时被清空。下面我们来看一下查询一级缓存的逻辑。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("public <E> List<E> query(MappedStatement ms, Object parameter, RowBounds rowBounds, ResultHandler resultHandler) throws SQLException {\n    BoundSql boundSql = ms.getBoundSql(parameter);\n    // 创建 CacheKey\n    CacheKey key = createCacheKey(ms, parameter, rowBounds, boundSql);\n    return query(ms, parameter, rowBounds, resultHandler, key, boundSql);\n}\n\npublic <E> List<E> query(MappedStatement ms, Object parameter, RowBounds rowBounds, ResultHandler resultHandler, CacheKey key, BoundSql boundSql) throws SQLException {\n    // 省略部分代码\n    \n    List<E> list;\n    try {\n        queryStack++;\n        // 查询一级缓存\n        list = resultHandler == null ? (List<E>) localCache.getObject(key) : null;\n        if (list != null) {\n            // 存储过程相关逻辑，忽略\n            handleLocallyCachedOutputParameters(ms, key, parameter, boundSql);\n        } else {\n            // 缓存未命中，则从数据库中查询\n            list = queryFromDatabase(ms, parameter, rowBounds, resultHandler, key, boundSql);\n        }\n    } finally {\n        queryStack--;\n    }\n    \n    // 省略部分代码\n    \n    return list;\n}\n")])])]),t("p",[e._v("如上，在访问一级缓存之前，MyBatis 首先会调用 createCacheKey 方法创建 CacheKey。下面我们来看一下 createCacheKey 方法的逻辑：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('public CacheKey createCacheKey(MappedStatement ms, Object parameterObject, RowBounds rowBounds, BoundSql boundSql) {\n    if (closed) {\n        throw new ExecutorException("Executor was closed.");\n    }\n    // 创建 CacheKey 对象\n    CacheKey cacheKey = new CacheKey();\n    // 将 MappedStatement 的 id 作为影响因子进行计算\n    cacheKey.update(ms.getId());\n\t// RowBounds 用于分页查询，下面将它的两个字段作为影响因子进行计算\n    cacheKey.update(rowBounds.getOffset());\n    cacheKey.update(rowBounds.getLimit());\n    // 获取 sql 语句，并进行计算\n    cacheKey.update(boundSql.getSql());\n    List<ParameterMapping> parameterMappings = boundSql.getParameterMappings();\n    TypeHandlerRegistry typeHandlerRegistry = ms.getConfiguration().getTypeHandlerRegistry();\n    for (ParameterMapping parameterMapping : parameterMappings) {\n        if (parameterMapping.getMode() != ParameterMode.OUT) {\n            Object value;    // 运行时参数\n            // 当前大段代码用于获取 SQL 中的占位符 #{xxx} 对应的运行时参数，\n            // 前文有类似分析，这里忽略了\n            String propertyName = parameterMapping.getProperty();\n            if (boundSql.hasAdditionalParameter(propertyName)) {\n                value = boundSql.getAdditionalParameter(propertyName);\n            } else if (parameterObject == null) {\n                value = null;\n            } else if (typeHandlerRegistry.hasTypeHandler(parameterObject.getClass())) {\n                value = parameterObject;\n            } else {\n                MetaObject metaObject = configuration.newMetaObject(parameterObject);\n                value = metaObject.getValue(propertyName);\n            }\n            \n            // 让运行时参数参与计算\n            cacheKey.update(value);\n        }\n    }\n    if (configuration.getEnvironment() != null) {\n        // 获取 Environment id 遍历，并让其参与计算\n        cacheKey.update(configuration.getEnvironment().getId());\n    }\n    return cacheKey;\n}\n')])])]),t("p",[e._v("如上，在计算 CacheKey 的过程中，有很多影响因子参与了计算。比如 MappedStatement 的 id 字段，SQL 语句，分页参数，运行时变量，Environment 的 id 字段等。通过让这些影响因子参与计算，可以很好的区分不同查询请求。所以，我们可以简单的把 CacheKey 看做是一个查询请求的 id。有了 CacheKey，我们就可以使用它读写缓存了。在上面代码中，若一级缓存为命中，BaseExecutor 会调用 queryFromDatabase 查询数据库，并将查询结果写入缓存中。下面看一下 queryFromDatabase 的逻辑。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("private <E> List<E> queryFromDatabase(MappedStatement ms, Object parameter, RowBounds rowBounds,ResultHandler resultHandler, CacheKey key, BoundSql boundSql) throws SQLException {\n    List<E> list;\n    // 向缓存中存储一个占位符\n    localCache.putObject(key, EXECUTION_PLACEHOLDER);\n    try {\n        // 查询数据库\n        list = doQuery(ms, parameter, rowBounds, resultHandler, boundSql);\n    } finally {\n        // 移除占位符\n        localCache.removeObject(key);\n    }\n    // 存储查询结果\n    localCache.putObject(key, list);\n    \n    // 存储过程相关逻辑，忽略\n    if (ms.getStatementType() == StatementType.CALLABLE) {\n        localOutputParameterCache.putObject(key, parameter);\n    }\n    return list;\n}\n")])])]),t("p",[e._v("到此，关于一级缓存相关的逻辑就差不多分析完了。一级缓存的逻辑比较简单，大家可以简单过一遍。接下来分析二级缓存。")]),e._v(" "),t("h2",{attrs:{id:"_5-二级缓存"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_5-二级缓存"}},[e._v("#")]),e._v(" 5.二级缓存")]),e._v(" "),t("p",[e._v("二级缓存构建在一级缓存之上，在收到查询请求时，MyBatis 首先会查询二级缓存。若二级缓存未命中，再去查询一级缓存。与一级缓存不同，二级缓存和具体的命名空间绑定，一级缓存则是和 SqlSession 绑定。在按照 MyBatis 规范使用 SqlSession 的情况下，一级缓存不存在并发问题。二级缓存则不然，二级缓存可在多个命名空间间共享。这种情况下，会存在并发问题，因此需要针对性去处理。除了并发问题，二级缓存还存在事务问题，相关问题将在接下来进行分析。下面首先来看一下访问二级缓存的逻辑。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("// -☆- CachingExecutor\npublic <E> List<E> query(MappedStatement ms, Object parameterObject, RowBounds rowBounds, ResultHandler resultHandler) throws SQLException {\n    BoundSql boundSql = ms.getBoundSql(parameterObject);\n    // 创建 CacheKey\n    CacheKey key = createCacheKey(ms, parameterObject, rowBounds, boundSql);\n    return query(ms, parameterObject, rowBounds, resultHandler, key, boundSql);\n}\n\npublic <E> List<E> query(MappedStatement ms, Object parameterObject, RowBounds rowBounds, ResultHandler resultHandler, CacheKey key, BoundSql boundSql)\n    throws SQLException {\n    // 从 MappedStatement 中获取 Cache，注意这里的 Cache 并非是在 CachingExecutor 中创建的\n    Cache cache = ms.getCache();\n    // 如果配置文件中没有配置 <cache>，则 cache 为空\n    if (cache != null) {\n        flushCacheIfRequired(ms);\n        if (ms.isUseCache() && resultHandler == null) {\n            ensureNoOutParams(ms, boundSql);\n            // 访问二级缓存\n            List<E> list = (List<E>) tcm.getObject(cache, key);\n            // 缓存未命中\n            if (list == null) {\n                // 向一级缓存或者数据库进行查询\n                list = delegate.<E>query(ms, parameterObject, rowBounds, resultHandler, key, boundSql);\n                // 缓存查询结果\n                tcm.putObject(cache, key, list);\n            }\n            return list;\n        }\n    }\n    return delegate.<E>query(ms, parameterObject, rowBounds, resultHandler, key, boundSql);\n}\n")])])]),t("p",[e._v("如上，注意二级缓存是从 MappedStatement 中获取的，而非由 CachingExecutor 创建。由于 MappedStatement 存在于全局配置中，可以多个 CachingExecutor 获取到，这样就会出现线程安全问题。除此之外，若不加以控制，多个事务共用一个缓存实例，会导致脏读问题。线程安全问题可以通过 SynchronizedCache 装饰类解决，该装饰类会在 Cache 实例构造期间被添加上。相关过程可以参考我之前写的文章 "),t("a",{attrs:{href:"https://www.tianxiaobo.com/2018/07/30/MyBatis-%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90-%E6%98%A0%E5%B0%84%E6%96%87%E4%BB%B6%E8%A7%A3%E6%9E%90%E8%BF%87%E7%A8%8B/#211-%E8%A7%A3%E6%9E%90-cache-%E8%8A%82%E7%82%B9",target:"_blank",rel:"noopener noreferrer"}},[e._v("MyBatis-源码分析-映射文件解析过程"),t("OutboundLink")],1),e._v("，这里就不多说了。至于脏读问题，需要借助其他类来处理，也就是上面代码中 tcm 变量对应的类型。下面分析一下。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("/** 事务缓存管理器 */\npublic class TransactionalCacheManager {\n\n    // Cache 与 TransactionalCache 的映射关系表\n    private final Map<Cache, TransactionalCache> transactionalCaches = new HashMap<Cache, TransactionalCache>();\n\n    public void clear(Cache cache) {\n        // 获取 TransactionalCache 对象，并调用该对象的 clear 方法，下同\n        getTransactionalCache(cache).clear();\n    }\n\n    public Object getObject(Cache cache, CacheKey key) {\n        return getTransactionalCache(cache).getObject(key);\n    }\n\n    public void putObject(Cache cache, CacheKey key, Object value) {\n        getTransactionalCache(cache).putObject(key, value);\n    }\n\n    public void commit() {\n        for (TransactionalCache txCache : transactionalCaches.values()) {\n            txCache.commit();\n        }\n    }\n\n    public void rollback() {\n        for (TransactionalCache txCache : transactionalCaches.values()) {\n            txCache.rollback();\n        }\n    }\n\n    private TransactionalCache getTransactionalCache(Cache cache) {\n        // 从映射表中获取 TransactionalCache\n        TransactionalCache txCache = transactionalCaches.get(cache);\n        if (txCache == null) {\n            // TransactionalCache 也是一种装饰类，为 Cache 增加事务功能\n            txCache = new TransactionalCache(cache);\n            transactionalCaches.put(cache, txCache);\n        }\n        return txCache;\n    }\n}\n")])])]),t("p",[e._v("TransactionalCacheManager 内部维护了 Cache 实例与 TransactionalCache 实例间的映射关系，该类也仅负责维护两者的映射关系，真正做事的还是 TransactionalCache。TransactionalCache 是一种缓存装饰器，可以为 Cache 实例增加事务功能。我在之前提到的脏读问题正是由该类进行处理的。下面分析一下该类的逻辑。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('public class TransactionalCache implements Cache {\n\n    private final Cache delegate;\n    private boolean clearOnCommit;\n    // 在事务被提交前，所有从数据库中查询的结果将缓存在此集合中\n    private final Map<Object, Object> entriesToAddOnCommit;\n    // 在事务被提交前，当缓存未命中时，CacheKey 将会被存储在此集合中\n    private final Set<Object> entriesMissedInCache;\n\n    // 省略部分代码\n\n    @Override\n    public Object getObject(Object key) {\n        // 查询 delegate 所代表的缓存\n        Object object = delegate.getObject(key);\n        if (object == null) {\n            // 缓存未命中，则将 key 存入到 entriesMissedInCache 中\n            entriesMissedInCache.add(key);\n        }\n\n        if (clearOnCommit) {\n            return null;\n        } else {\n            return object;\n        }\n    }\n\n    @Override\n    public void putObject(Object key, Object object) {\n        // 将键值对存入到 entriesToAddOnCommit 中，而非 delegate 缓存中\n        entriesToAddOnCommit.put(key, object);\n    }\n\n    @Override\n    public Object removeObject(Object key) {\n        return null;\n    }\n\n    @Override\n    public void clear() {\n        clearOnCommit = true;\n        // 清空 entriesToAddOnCommit，但不清空 delegate 缓存\n        entriesToAddOnCommit.clear();\n    }\n\n    public void commit() {\n        // 根据 clearOnCommit 的值决定是否清空 delegate\n        if (clearOnCommit) {\n            delegate.clear();\n        }\n        \n        // 刷新未缓存的结果到 delegate 缓存中\n        flushPendingEntries();\n        // 重置 entriesToAddOnCommit 和 entriesMissedInCache\n        reset();\n    }\n\n    public void rollback() {\n        unlockMissedEntries();\n        reset();\n    }\n\n    private void reset() {\n        clearOnCommit = false;\n        // 清空集合\n        entriesToAddOnCommit.clear();\n        entriesMissedInCache.clear();\n    }\n\n    private void flushPendingEntries() {\n        for (Map.Entry<Object, Object> entry : entriesToAddOnCommit.entrySet()) {\n            // 将 entriesToAddOnCommit 中的内容转存到 delegate 中\n            delegate.putObject(entry.getKey(), entry.getValue());\n        }\n        for (Object entry : entriesMissedInCache) {\n            if (!entriesToAddOnCommit.containsKey(entry)) {\n                // 存入空值\n                delegate.putObject(entry, null);\n            }\n        }\n    }\n\n    private void unlockMissedEntries() {\n        for (Object entry : entriesMissedInCache) {\n            try {\n\t\t\t\t// 调用 removeObject 进行解锁\n                delegate.removeObject(entry);\n            } catch (Exception e) {\n                log.warn("...");\n            }\n        }\n    }\n\n}\n')])])]),t("p",[e._v("在 TransactionalCache 的代码中，我们要重点关注 entriesToAddOnCommit 集合，TransactionalCache 中的很多方法都会与这个集合打交道。该集合用于存储从查询的结果，那为什么要将结果保存在该集合中，而非 delegate 所表示的缓存中呢？主要是因为直接存到 delegate 会导致脏数据问题。下面通过一张图演示一下脏数据问题发生的过程，假设两个线程开启两个不同的事务，它们的执行过程如下：")]),e._v(" "),t("p",[t("img",{attrs:{src:"https://blog-pictures.oss-cn-shanghai.aliyuncs.com/15350410327117.jpg",alt:"img"}})]),e._v(" "),t("p",[e._v("如上图，时刻2，事务 A 对记录 A 进行了更新。时刻3，事务 A 从数据库查询记录 A，并将记录 A 写入缓存中。时刻4，事务 B 查询记录 A，由于缓存中存在记录 A，事务 B 直接从缓存中取数据。这个时候，脏数据问题就发生了。事务 B 在事务 A 未提交情况下，读取到了事务 A 所修改的记录。为了解决这个问题，我们可以为每个事务引入一个独立的缓存。查询数据时，仍从 delegate 缓存（以下统称为共享缓存）中查询。若缓存未命中，则查询数据库。存储查询结果时，并不直接存储查询结果到共享缓存中，而是先存储到事务缓存中，也就是 entriesToAddOnCommit 集合。当事务提交时，再将事务缓存中的缓存项转存到共享缓存中。这样，事务 B 只能在事务 A 提交后，才能读取到事务 A 所做的修改，解决了脏读问题。整个过程大致如下：")]),e._v(" "),t("p",[t("img",{attrs:{src:"https://blog-pictures.oss-cn-shanghai.aliyuncs.com/15351741016583.jpg",alt:"img"}})]),e._v(" "),t("p",[e._v("如上，时刻2，事务 A 和 B 同时查询记录 A。此时共享缓存中还没没有数据，所以两个事务均会向数据库发起查询请求，并将查询结果存储到各自的事务缓存中。时刻3，事务 A 更新记录 A，这里把更新后的记录 A 记为 A′。时刻4，两个事务再次进行查询。此时，事务 A 读取到的记录为修改后的值，而事务 B 读取到的记录仍为原值。时刻5，事务 A 被提交，并将事务缓存 A 中的内容转存到共享缓存中。时刻6，事务 B 再次查询记录 A，由于共享缓存中有相应的数据，所以直接取缓存数据即可。因此得到记录 A′，而非记录 A。但由于事务 A 已经提交，所以事务 B 读取到的记录 A′ 并非是脏数据。MyBatis 引入事务缓存解决了脏读问题，事务间只能读取到其他事务提交后的内容，这相当于事务隔离级别中的“读已提交（Read Committed）”。但需要注意的时，MyBatis 缓存事务机制只能解决脏读问题，并不能解决“不可重复读”问题。再回到上图，事务 B 在被提交前进行了三次查询。前两次查询得到的结果为记录 A，最后一次查询得到的结果为 A′。最有一次的查询结果与前两次不同，这就会导致“不可重复读”的问题。MyBatis 的缓存事务机制最高只支持“读已提交”，并不能解决“不可重复读”问题。即使数据库使用了更高的隔离级别解决了这个问题，但因 MyBatis 缓存事务机制级别较低。此时仍然会导致“不可重复读”问题的发生，这个在日常开发中需要注意一下。")]),e._v(" "),t("p",[e._v("下面写点测试代码验证 MyBatis 所导致的“不可重复读”问题，首先看一下实体类：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("public class Student {\n    private Integer id;\n    private String name;\n    private Integer age;\n    \n    // 省略 getter/setter\n}\n")])])]),t("p",[e._v("对应的数据表如下：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("       student\n+----+----------+------+\n| id | name     | age  |\n+----+----------+------+\n|  1 | coolblog |   20 |\n+----+----------+------+\n")])])]),t("p",[e._v("Dao 接口与映射文件定义如下：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('public interface StudentDao {\n    Student findOne(@Param("id") Integer id);\n    int update(@Param("id") Integer id, @Param("name") String name);\n}\n<mapper namespace="xyz.coolblog.dao.StudentDao">\n\n    \x3c!-- 注意要在映射文件中配置缓存 --\x3e\n    <cache/>\n\n    <select id="findOne" resultType="xyz.coolblog.model.Student">\n        SELECT\n            `id`, `name`, `age`\n        FROM\n            student\n        WHERE\n            id = #{id}\n    </select>\n\n    <update id="update">\n        UPDATE\n            student\n        SET\n            `name` = #{name}\n        WHERE\n            id = #{id}\n    </update>\n</mapper>\n')])])]),t("p",[e._v("测试代码如下：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('public class TransactionalCacheTest {\n\n    private SqlSessionFactory sqlSessionFactory;\n\n    private CountDownLatch countDownLatch = new CountDownLatch(1);\n    \n    @Before\n    public void prepare() throws IOException {\n        String resource = "mybatis-transactional-cache-config.xml";\n        InputStream inputStream = Resources.getResourceAsStream(resource);\n        sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);\n        inputStream.close();\n    }\n\n    @Test\n    public void testTransactional() throws IOException, InterruptedException, ExecutionException {\n        ExecutorService es = Executors.newFixedThreadPool(2);\n        // 开启两个线程\n        Future<String> fa = es.submit(this::transactionalA);\n        Future<String> fb = es.submit(this::transactionalB);\n\n        countDownLatch.countDown();\n        es.awaitTermination(6, TimeUnit.SECONDS);\n\n        System.out.println(fa.get());\n        System.out.println("\\n -------- 分割线 ------- \\n");\n        System.out.println(fb.get());\n    }\n\n    private String transactionalA() throws Exception {\n        SqlSession sqlSession = sqlSessionFactory.openSession();\n        StudentDao studentDao = sqlSession.getMapper(StudentDao.class);\n        countDownLatch.await();\n\n        StringBuilder sb = new StringBuilder();\n        sb.append("时刻1：开启事务 A\\n");\n        sb.append("时刻2：查询记录 A\\n");\n\n        Student s1 = studentDao.findOne(1);\n        sb.append(s1).append("\\n");\n\n        sb.append("时刻3：更新记录 A\\n");\n        studentDao.update(1, "tianxiaobo");\n        sb.append("时刻4：查询记录 A\'\\n");\n        Student s2 = studentDao.findOne(1);\n        sb.append(s2).append("\\n");\n\n        // 此处睡眠1秒，让事务 B 在事务 A 提交前，完成时刻4的查询请求\n        Thread.sleep(1000);\n\n        sb.append("时刻5：提交事务 A");\n        sqlSession.commit();\n\n        return sb.toString();\n    }\n\n    private String transactionalB() throws Exception {\n        SqlSession sqlSession = sqlSessionFactory.openSession();\n        StudentDao studentDao = sqlSession.getMapper(StudentDao.class);\n        countDownLatch.await();\n\n        StringBuilder sb = new StringBuilder();\n        sb.append("时刻1：开启事务 B\\n");\n        sb.append("时刻2：查询数据 A\\n");\n        Student s1 = studentDao.findOne(1);\n        sb.append(s1).append("\\n");\n\n        sb.append("时刻3：---------\\n");\n        sb.append("时刻4：查询数据 A\\n");\n        Student s2 = studentDao.findOne(1);\n        sb.append(s2).append("\\n");\n\n        // 此处睡眠3秒，等待事务 A 提交\n        Thread.sleep(3000);\n\n        sb.append("时刻5：---------\\n");\n        sb.append("时刻6：查询数据 A\'\\n");\n        Student s3 = studentDao.findOne(1);\n        sb.append(s3).append("\\n");\n\n        sb.append("时刻7：提交事务 B");\n        sqlSession.commit();\n        return sb.toString();\n    }\n}\n')])])]),t("p",[e._v("最后对输出结果进行简单的美化，如下：")]),e._v(" "),t("p",[t("img",{attrs:{src:"https://blog-pictures.oss-cn-shanghai.aliyuncs.com/15351259392691.jpg",alt:"img"}})]),e._v(" "),t("p",[e._v("如上，事务 B 在时刻2和时刻4读取到的记录与数据库中的记录一致，表示可重复读。但当事务 A 提交后，事务 B 在时刻6读取到的数据则是事务 A 修改的内容，这个时候就出现了“不可重复读”问题。以上测试是基于 MySql 数据可读，MySQL 默认事务级别为“可重复读”。")]),e._v(" "),t("p",[t("img",{attrs:{src:"https://blog-pictures.oss-cn-shanghai.aliyuncs.com/15351270530717.jpg",alt:"img"}})]),e._v(" "),t("p",[e._v("下面在本地开启两个 MySQL 客户端，模拟上面的执行流程。最终结果如下：")]),e._v(" "),t("p",[t("img",{attrs:{src:"https://blog-pictures.oss-cn-shanghai.aliyuncs.com/15351281217963.jpg",alt:"img"}})]),e._v(" "),t("p",[e._v("从测试结果可以看出，不可重复读问题并未发生，事务 B 三次查询结果均相同。好了，到此关于 MyBatis 二级缓存所引发的问题就分析完了。")]),e._v(" "),t("p",[e._v("接下来，我们再来看一下 entriesMissedInCache 集合，这个集合是用于存储未命中缓存的查询请求对应的 CacheKey。单独分析与 entriesMissedInCache 相关的逻辑没什么意义，要搞清 entriesMissedInCache 的实际用途，需要把它和 BlockingCache 的逻辑结合起来进行分析。在 BlockingCache，同一时刻仅允许一个线程通过 getObject 方法查询指定 key 对应的缓存项。如果缓存未命中，getObject 方法不会释放锁，导致其他线程被阻塞住。其他线程要想恢复运行，必须进行解锁，解锁逻辑由 BlockingCache 的 putObject 和 removeObject 方法执行。其中 putObject 会在 TransactionalCache 的 flushPendingEntries 方法中被调用，removeObject 方法则由 TransactionalCache 的 unlockMissedEntries 方法调用。flushPendingEntries 和 unlockMissedEntries 最终都会遍历 entriesMissedInCache 集合，并将集合元素传给 BlockingCache 的相关方法。这样可以解开指定 key 对应的锁，让阻塞线程恢复运行。")]),e._v(" "),t("p",[e._v("最后特别说明一下，本节的内容参考了"),t("a",{attrs:{href:"https://www.amazon.cn/dp/B073LWG7F7/ref=sr_1_1?ie=UTF8&qid=1535112987&sr=8-1&keywords=mybatis%E6%8A%80%E6%9C%AF%E5%86%85%E5%B9%95",target:"_blank",rel:"noopener noreferrer"}},[e._v("《MyBatis技术内幕》"),t("OutboundLink")],1),e._v(" 一书中关于缓存的一些分析，这里向这本书的作者表示感谢。如果大家不是很能看懂上面的内容，也可参考这本书的部分章节。")])])}),[],!1,null,null,null);n.default=c.exports}}]);