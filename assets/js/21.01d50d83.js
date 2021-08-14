(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{449:function(e,n,t){"use strict";t.r(n);var o=t(30),a=Object(o.a)({},(function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"mybatis-源码分析-内置数据源"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mybatis-源码分析-内置数据源"}},[e._v("#")]),e._v(" MyBatis 源码分析 - 内置数据源")]),e._v(" "),t("h2",{attrs:{id:"_1-简介"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-简介"}},[e._v("#")]),e._v(" 1.简介")]),e._v(" "),t("p",[e._v("本篇文章将向大家介绍 MyBatis 内置数据源的实现逻辑。搞懂这些数据源的实现，可使大家对数据源有更深入的认识。同时在配置这些数据源时，也会更清楚每种属性的意义和用途。因此，如果大家想知其然，也知其所以然。那么接下来就让我们一起去探索 MyBatis 内置数据源的源码吧。")]),e._v(" "),t("p",[e._v("MyBatis 支持三种数据源配置，分别为 UNPOOLED、POOLED 和 JNDI。并提供了两种数据源实现，分别是 UnpooledDataSource 和 PooledDataSource。在三种数据源配置中，UNPOOLED 和 POOLED 是我们最常用的两种配置。至于 JNDI，MyBatis 提供这种数据源的目的是为了让其能够运行在 EJB 或应用服务器等容器中，这一点官方文档中有所说明。由于 JNDI 数据源在日常开发中使用甚少，因此，本篇文章不打算分析 JNDI 数据源相关实现。大家若有兴趣，可自行分析。接下来，本文将重点分析 UNPOOLED 和 POOLED 两种数据源。其他的就不多说了，进入正题吧。")]),e._v(" "),t("h2",{attrs:{id:"_2-内置数据源初始化过程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-内置数据源初始化过程"}},[e._v("#")]),e._v(" 2.内置数据源初始化过程")]),e._v(" "),t("p",[e._v("在详细分析 UnpooledDataSource 和 PooledDataSource 两种数据源实现之前，我们先来了解一下数据源的配置与初始化过程。现在看数据源是如何配置的，如下：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('<dataSource type="UNPOOLED|POOLED">\n    <property name="driver" value="com.mysql.cj.jdbc.Driver"/>\n    <property name="url" value="jdbc:mysql..."/>\n    <property name="username" value="root"/>\n    <property name="password" value="1234"/>\n</dataSource>\n')])])]),t("p",[e._v("数据源的配置是内嵌在 "),t("environment",[e._v(" 节点中的，MyBatis 在解析 "),t("environment",[e._v(" 节点时，会一并解析数据源的配置。MyBatis 会根据具体的配置信息，为不同的数据源创建相应工厂类，通过工厂类即可创建数据源实例。关于数据源配置的解析以及数据源工厂类的创建过程，我在 "),t("a",{attrs:{href:"http://www.coolblog.xyz/2018/07/20/MyBatis-%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90-%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E8%A7%A3%E6%9E%90%E8%BF%87%E7%A8%8B/",target:"_blank",rel:"noopener noreferrer"}},[e._v("MyBatis 配置文件解析过程"),t("OutboundLink")],1),e._v("一文中分析过，这里就不赘述了。下面我们来看一下数据源工厂类的实现逻辑。")])],1)],1),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('public class UnpooledDataSourceFactory implements DataSourceFactory {\n    \n    private static final String DRIVER_PROPERTY_PREFIX = "driver.";\n    private static final int DRIVER_PROPERTY_PREFIX_LENGTH = DRIVER_PROPERTY_PREFIX.length();\n\n    protected DataSource dataSource;\n\n    public UnpooledDataSourceFactory() {\n        // 创建 UnpooledDataSource 对象\n        this.dataSource = new UnpooledDataSource();\n    }\n\n    @Override\n    public void setProperties(Properties properties) {\n        Properties driverProperties = new Properties();\n        // 为 dataSource 创建元信息对象\n        MetaObject metaDataSource = SystemMetaObject.forObject(dataSource);\n        // 遍历 properties 键列表，properties 由配置文件解析器传入\n        for (Object key : properties.keySet()) {\n            String propertyName = (String) key;\n            // 检测 propertyName 是否以 "driver." 开头\n            if (propertyName.startsWith(DRIVER_PROPERTY_PREFIX)) {\n                String value = properties.getProperty(propertyName);\n                // 存储配置信息到 driverProperties 中\n                driverProperties.setProperty(propertyName.substring(DRIVER_PROPERTY_PREFIX_LENGTH), value);\n            } else if (metaDataSource.hasSetter(propertyName)) {\n                String value = (String) properties.get(propertyName);\n                // 按需转换 value 类型\n                Object convertedValue = convertValue(metaDataSource, propertyName, value);\n                // 设置转换后的值到 UnpooledDataSourceFactory 指定属性中\n                metaDataSource.setValue(propertyName, convertedValue);\n            } else {\n                throw new DataSourceException("Unknown DataSource property: " + propertyName);\n            }\n        }\n        if (driverProperties.size() > 0) {\n            // 设置 driverProperties 到 UnpooledDataSourceFactory 的 driverProperties 属性中\n            metaDataSource.setValue("driverProperties", driverProperties);\n        }\n    }\n    \n    private Object convertValue(MetaObject metaDataSource, String propertyName, String value) {\n        Object convertedValue = value;\n        // 获取属性对应的 setter 方法的参数类型\n        Class<?> targetType = metaDataSource.getSetterType(propertyName);\n        // 按照 setter 方法的参数类型进行类型转换\n        if (targetType == Integer.class || targetType == int.class) {\n            convertedValue = Integer.valueOf(value);\n        } else if (targetType == Long.class || targetType == long.class) {\n            convertedValue = Long.valueOf(value);\n        } else if (targetType == Boolean.class || targetType == boolean.class) {\n            convertedValue = Boolean.valueOf(value);\n        }\n        return convertedValue;\n    }\n\n    @Override\n    public DataSource getDataSource() {\n        return dataSource;\n    }\n}\n')])])]),t("p",[e._v("以上是 UnpooledDataSourceFactory 的源码分析，除了 setProperties 方法稍复杂一点，其他的都比较简单，就不多说了。下面看看 PooledDataSourceFactory 的源码。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("public class PooledDataSourceFactory extends UnpooledDataSourceFactory {\n\n    public PooledDataSourceFactory() {\n        // 创建 PooledDataSource\n        this.dataSource = new PooledDataSource();\n    }\n}\n")])])]),t("p",[e._v("以上就是 PooledDataSource 类的所有源码，PooledDataSourceFactory 继承自 UnpooledDataSourceFactory，复用了父类的逻辑，因此它的实现很简单。")]),e._v(" "),t("p",[e._v("关于两种数据源的创建过程就先分析到这，接下来，我们去探究一下两种数据源是怎样实现的。")]),e._v(" "),t("h2",{attrs:{id:"_3-unpooleddatasource"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-unpooleddatasource"}},[e._v("#")]),e._v(" 3.UnpooledDataSource")]),e._v(" "),t("p",[e._v("UnpooledDataSource，从名称上即可知道，该种数据源不具有池化特性。该种数据源每次会返回一个新的数据库连接，而非复用旧的连接。由于 UnpooledDataSource 无需提供连接池功能，因此它的实现非常简单。核心的方法有三个，分别如下：")]),e._v(" "),t("ol",[t("li",[e._v("initializeDriver - 初始化数据库驱动")]),e._v(" "),t("li",[e._v("doGetConnection - 获取数据连接")]),e._v(" "),t("li",[e._v("configureConnection - 配置数据库连接")])]),e._v(" "),t("p",[e._v("下面我将按照顺序分节对相关方法进行分析，由于 configureConnection 方法比较简单，因此我把它和 doGetConnection 放在一节中进行分析。下面先来分析 initializeDriver 方法。")]),e._v(" "),t("h3",{attrs:{id:"_3-1-初始化数据库驱动"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-初始化数据库驱动"}},[e._v("#")]),e._v(" 3.1 初始化数据库驱动")]),e._v(" "),t("p",[e._v("回顾我们一开始学习使用 JDBC 访问数据库时的情景，在执行 SQL 之前，通常都是先获取数据库连接。一般步骤都是加载数据库驱动，然后通过 DriverManager 获取数据库连接。UnpooledDataSource 也是使用 JDBC 访问数据库的，因此它获取数据库连接的过程也大致如此，只不过会稍有不同。下面我们一起来看一下。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('// -☆- UnpooledDataSource\nprivate synchronized void initializeDriver() throws SQLException {\n    // 检测缓存中是否包含了与 driver 对应的驱动实例\n    if (!registeredDrivers.containsKey(driver)) {\n        Class<?> driverType;\n        try {\n            // 加载驱动类型\n            if (driverClassLoader != null) {\n                // 使用 driverClassLoader 加载驱动\n                driverType = Class.forName(driver, true, driverClassLoader);\n            } else {\n                // 通过其他 ClassLoader 加载驱动\n                driverType = Resources.classForName(driver);\n            }\n\n            // 通过反射创建驱动实例\n            Driver driverInstance = (Driver) driverType.newInstance();\n            /*\n             * 注册驱动，注意这里是将 Driver 代理类 DriverProxy 对象注册到 DriverManager 中的，\n             * 而非 Driver 对象本身。DriverProxy 中并没什么特别的逻辑，就不分析。\n             */\n            DriverManager.registerDriver(new DriverProxy(driverInstance));\n            // 缓存驱动类名和实例\n            registeredDrivers.put(driver, driverInstance);\n        } catch (Exception e) {\n            throw new SQLException("Error setting driver on UnpooledDataSource. Cause: " + e);\n        }\n    }\n}\n')])])]),t("p",[e._v("如上，initializeDriver 方法主要包含三步操作，分别如下：")]),e._v(" "),t("ol",[t("li",[e._v("加载驱动")]),e._v(" "),t("li",[e._v("通过反射创建驱动实例")]),e._v(" "),t("li",[e._v("注册驱动实例")])]),e._v(" "),t("p",[e._v("这三步都是都是常规操作，比较容易理解。上面代码中出现了缓存相关的逻辑，这个是用于避免重复注册驱动。因为 initializeDriver 放阿飞并不是在 UnpooledDataSource 初始化时被调用的，而是在获取数据库连接时被调用的。因此这里需要做个检测，避免每次获取数据库连接时都重新注册驱动。这个是一个比较小的点，大家看代码时注意一下即可。下面看一下获取数据库连接的逻辑。")]),e._v(" "),t("h3",{attrs:{id:"_3-2-获取数据库连接"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-获取数据库连接"}},[e._v("#")]),e._v(" 3.2 获取数据库连接")]),e._v(" "),t("p",[e._v("在使用 JDBC 时，我们都是通过 DriverManager 的接口方法获取数据库连接。本节所要分析的源码也不例外，一起看一下吧。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('// -☆- UnpooledDataSource\npublic Connection getConnection() throws SQLException {\n\treturn doGetConnection(username, password);\n}\n    \nprivate Connection doGetConnection(String username, String password) throws SQLException {\n    Properties props = new Properties();\n    if (driverProperties != null) {\n        props.putAll(driverProperties);\n    }\n    if (username != null) {\n        // 存储 user 配置\n        props.setProperty("user", username);\n    }\n    if (password != null) {\n        // 存储 password 配置\n        props.setProperty("password", password);\n    }\n    // 调用重载方法\n    return doGetConnection(props);\n}\n\nprivate Connection doGetConnection(Properties properties) throws SQLException {\n    // 初始化驱动\n    initializeDriver();\n    // 获取连接\n    Connection connection = DriverManager.getConnection(url, properties);\n    // 配置连接，包括自动提交以及事务等级\n    configureConnection(connection);\n    return connection;\n}\n\nprivate void configureConnection(Connection conn) throws SQLException {\n    if (autoCommit != null && autoCommit != conn.getAutoCommit()) {\n        // 设置自动提交\n        conn.setAutoCommit(autoCommit);\n    }\n    if (defaultTransactionIsolationLevel != null) {\n        // 设置事务隔离级别\n        conn.setTransactionIsolation(defaultTransactionIsolationLevel);\n    }\n}\n')])])]),t("p",[e._v("如上，上面方法将一些配置信息放入到 Properties 对象中，然后将数据库连接和 Properties 对象传给 DriverManager 的 getConnection 方法即可获取到数据库连接。")]),e._v(" "),t("p",[e._v("好了，关于 UnpooledDataSource 就先说到这。下面分析一下 PooledDataSource，它的实现要复杂一些。")]),e._v(" "),t("h2",{attrs:{id:"_4-pooleddatasource"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-pooleddatasource"}},[e._v("#")]),e._v(" 4.PooledDataSource")]),e._v(" "),t("p",[e._v("PooledDataSource 内部实现了连接池功能，用于复用数据库连接。因此，从效率上来说，PooledDataSource 要高于 UnpooledDataSource。PooledDataSource 需要借助一些辅助类帮助它完成连接池的功能，所以接下来，我们先来认识一下相关的辅助类。")]),e._v(" "),t("h3",{attrs:{id:"_4-1-辅助类介绍"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-辅助类介绍"}},[e._v("#")]),e._v(" 4.1 辅助类介绍")]),e._v(" "),t("p",[e._v("PooledDataSource 需要借助两个辅助类帮其完成功能，这两个辅助类分别是 PoolState 和 PooledConnection。PoolState 用于记录连接池运行时的状态，比如连接获取次数，无效连接数量等。同时 PoolState 内部定义了两个 PooledConnection 集合，用于存储空闲连接和活跃连接。PooledConnection 内部定义了一个 Connection 类型的变量，用于指向真实的数据库连接。以及一个 Connection 的代理类，用于对部分方法调用进行拦截。至于为什么要拦截，随后将进行分析。除此之外，PooledConnection 内部也定义了一些字段，用于记录数据库连接的一些运行时状态。接下来，我们来看一下 PooledConnection 的定义。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('class PooledConnection implements InvocationHandler {\n\n    private static final String CLOSE = "close";\n    private static final Class<?>[] IFACES = new Class<?>[]{Connection.class};\n\n    private final int hashCode;\n    private final PooledDataSource dataSource;\n    // 真实的数据库连接\n    private final Connection realConnection;\n    // 数据库连接代理\n    private final Connection proxyConnection;\n    \n    // 从连接池中取出连接时的时间戳\n    private long checkoutTimestamp;\n    // 数据库连接创建时间\n    private long createdTimestamp;\n    // 数据库连接最后使用时间\n    private long lastUsedTimestamp;\n    // connectionTypeCode = (url + username + password).hashCode()\n    private int connectionTypeCode;\n    // 表示连接是否有效\n    private boolean valid;\n\n    public PooledConnection(Connection connection, PooledDataSource dataSource) {\n        this.hashCode = connection.hashCode();\n        this.realConnection = connection;\n        this.dataSource = dataSource;\n        this.createdTimestamp = System.currentTimeMillis();\n        this.lastUsedTimestamp = System.currentTimeMillis();\n        this.valid = true;\n        // 创建 Connection 的代理类对象\n        this.proxyConnection = (Connection) Proxy.newProxyInstance(Connection.class.getClassLoader(), IFACES, this);\n    }\n    \n    @Override\n    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {...}\n    \n    // 省略部分代码\n}\n')])])]),t("p",[e._v("下面再来看看 PoolState 的定义。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("public class PoolState {\n\n    protected PooledDataSource dataSource;\n\n    // 空闲连接列表\n    protected final List<PooledConnection> idleConnections = new ArrayList<PooledConnection>();\n    // 活跃连接列表\n    protected final List<PooledConnection> activeConnections = new ArrayList<PooledConnection>();\n    // 从连接池中获取连接的次数\n    protected long requestCount = 0;\n    // 请求连接总耗时（单位：毫秒）\n    protected long accumulatedRequestTime = 0;\n    // 连接执行时间总耗时\n    protected long accumulatedCheckoutTime = 0;\n    // 执行时间超时的连接数\n    protected long claimedOverdueConnectionCount = 0;\n    // 超时时间累加值\n    protected long accumulatedCheckoutTimeOfOverdueConnections = 0;\n    // 等待时间累加值\n    protected long accumulatedWaitTime = 0;\n    // 等待次数\n    protected long hadToWaitCount = 0;\n    // 无效连接数\n    protected long badConnectionCount = 0;\n}\n")])])]),t("p",[e._v("上面对 PooledConnection 和 PoolState 的定义进行了一些注释，这两个类中有很多字段用来记录运行时状态。但在这些字段并非核心，因此大家知道每个字段的用途就行了。关于这两个辅助类的介绍就先到这")]),e._v(" "),t("h3",{attrs:{id:"_4-2-获取连接"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-2-获取连接"}},[e._v("#")]),e._v(" 4.2 获取连接")]),e._v(" "),t("p",[e._v("前面已经说过，PooledDataSource 会将用过的连接进行回收，以便可以复用连接。因此从 PooledDataSource 获取连接时，如果空闲链接列表里有连接时，可直接取用。那如果没有空闲连接怎么办呢？此时有两种解决办法，要么创建新连接，要么等待其他连接完成任务。具体怎么做，需视情况而定。下面我们深入到源码中一探究竟。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("public Connection getConnection() throws SQLException {\n    // 返回 Connection 的代理对象\n    return popConnection(dataSource.getUsername(), dataSource.getPassword()).getProxyConnection();\n}\n\nprivate PooledConnection popConnection(String username, String password) throws SQLException {\n    boolean countedWait = false;\n    PooledConnection conn = null;\n    long t = System.currentTimeMillis();\n    int localBadConnectionCount = 0;\n\n    while (conn == null) {\n        synchronized (state) {\n            // 检测空闲连接集合（idleConnections）是否为空\n            if (!state.idleConnections.isEmpty()) {\n                // idleConnections 不为空，表示有空闲连接可以使用\n                conn = state.idleConnections.remove(0);\n            } else {\n                /*\n                 * 暂无空闲连接可用，但如果活跃连接数还未超出限制\n                 *（poolMaximumActiveConnections），则可创建新的连接\n                 */\n                if (state.activeConnections.size() < poolMaximumActiveConnections) {\n                    // 创建新连接\n                    conn = new PooledConnection(dataSource.getConnection(), this);\n                    \n                } else {    // 连接池已满，不能创建新连接\n                    // 取出运行时间最长的连接\n                    PooledConnection oldestActiveConnection = state.activeConnections.get(0);\n                    // 获取运行时长\n                    long longestCheckoutTime = oldestActiveConnection.getCheckoutTime();\n                    // 检测运行时长是否超出限制，即超时\n                    if (longestCheckoutTime > poolMaximumCheckoutTime) {\n                        // 累加超时相关的统计字段\n                        state.claimedOverdueConnectionCount++;\n                        state.accumulatedCheckoutTimeOfOverdueConnections += longestCheckoutTime;\n                        state.accumulatedCheckoutTime += longestCheckoutTime;\n\n                        // 从活跃连接集合中移除超时连接\n                        state.activeConnections.remove(oldestActiveConnection);\n                        // 若连接未设置自动提交，此处进行回滚操作\n                        if (!oldestActiveConnection.getRealConnection().getAutoCommit()) {\n                            try {\n                                oldestActiveConnection.getRealConnection().rollback();\n                            } catch (SQLException e) {...}\n                        }\n                        /*\n                         * 创建一个新的 PooledConnection，注意，\n                         * 此处复用 oldestActiveConnection 的 realConnection 变量\n                         */\n                        conn = new PooledConnection(oldestActiveConnection.getRealConnection(), this);\n                        /*\n                         * 复用 oldestActiveConnection 的一些信息，注意 PooledConnection 中的 \n                         * createdTimestamp 用于记录 Connection 的创建时间，而非 PooledConnection \n                         * 的创建时间。所以这里要复用原连接的时间信息。\n                         */\n                        conn.setCreatedTimestamp(oldestActiveConnection.getCreatedTimestamp());\n                        conn.setLastUsedTimestamp(oldestActiveConnection.getLastUsedTimestamp());\n\n                        // 设置连接为无效状态\n                        oldestActiveConnection.invalidate();\n                        \n                    } else {    // 运行时间最长的连接并未超时\n                        try {\n                            if (!countedWait) {\n                                state.hadToWaitCount++;\n                                countedWait = true;\n                            }\n                            long wt = System.currentTimeMillis();\n                            // 当前线程进入等待状态\n                            state.wait(poolTimeToWait);\n                            state.accumulatedWaitTime += System.currentTimeMillis() - wt;\n                        } catch (InterruptedException e) {\n                            break;\n                        }\n                    }\n                }\n            }\n            if (conn != null) {\n                /*\n                 * 检测连接是否有效，isValid 方法除了会检测 valid 是否为 true，\n                 * 还会通过 PooledConnection 的 pingConnection 方法执行 SQL 语句，\n                 * 检测连接是否可用。pingConnection 方法的逻辑不复杂，大家可以自行分析。\n                 * 另外，官方文档在介绍 POOLED 类型数据源时，也介绍了连接有效性检测方面的\n                 * 属性，有三个：poolPingQuery，poolPingEnabled 和 \n                 * poolPingConnectionsNotUsedFor。关于这三个属性，大家可以查阅官方文档\n                 */\n                if (conn.isValid()) {\n                    if (!conn.getRealConnection().getAutoCommit()) {\n                        // 进行回滚操作\n                        conn.getRealConnection().rollback();\n                    }\n                    conn.setConnectionTypeCode(assembleConnectionTypeCode(dataSource.getUrl(), username, password));\n                    // 设置统计字段\n                    conn.setCheckoutTimestamp(System.currentTimeMillis());\n                    conn.setLastUsedTimestamp(System.currentTimeMillis());\n                    state.activeConnections.add(conn);\n                    state.requestCount++;\n                    state.accumulatedRequestTime += System.currentTimeMillis() - t;\n                } else {\n                    // 连接无效，此时累加无效连接相关的统计字段\n                    state.badConnectionCount++;\n                    localBadConnectionCount++;\n                    conn = null;\n                    if (localBadConnectionCount > (poolMaximumIdleConnections\n                        + poolMaximumLocalBadConnectionTolerance)) {\n                        throw new SQLException(...);\n                    }\n                }\n            }\n        }\n\n    }\n\n    if (conn == null) {\n        throw new SQLException(...);\n    }\n\n    return conn;\n}\n")])])]),t("p",[e._v("上面代码冗长，过程比较复杂，下面把代码逻辑梳理一下。从连接池中获取连接首先会遇到两种情况：")]),e._v(" "),t("ol",[t("li",[e._v("连接池中有空闲连接")]),e._v(" "),t("li",[e._v("连接池中无空闲连接")])]),e._v(" "),t("p",[e._v("对于第一种情况，处理措施就很简单了，把连接取出返回即可。对于第二种情况，则要进行细分，会有如下的情况。")]),e._v(" "),t("ol",[t("li",[e._v("活跃连接数没有超出最大活跃连接数")]),e._v(" "),t("li",[e._v("活跃连接数超出最大活跃连接数")])]),e._v(" "),t("p",[e._v("对于上面两种情况，第一种情况比较好处理，直接创建新的连接即可。至于第二种情况，需要再次进行细分。")]),e._v(" "),t("ol",[t("li",[e._v("活跃连接的运行时间超出限制，即超时了")]),e._v(" "),t("li",[e._v("活跃连接未超时")])]),e._v(" "),t("p",[e._v("对于第一种情况，我们直接将超时连接强行中断，并进行回滚，然后复用部分字段重新创建 PooledConnection 即可。对于第二种情况，目前没有更好的处理方式了，只能等待了。下面用一段伪代码演示各种情况及相应的处理措施，如下：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("if (连接池中有空闲连接) {\n    1. 将连接从空闲连接集合中移除\n} else {\n    if (活跃连接数未超出限制) {\n        1. 创建新连接\n    } else {\n        1. 从活跃连接集合中取出第一个元素\n        2. 获取连接运行时长\n        \n        if (连接超时) {\n            1. 将连接从活跃集合中移除\n            2. 复用原连接的成员变量，并创建新的 PooledConnection 对象\n        } else {\n            1. 线程进入等待状态\n            2. 线程被唤醒后，重新执行以上逻辑\n        }\n    }\n}\n\n1. 将连接添加到活跃连接集合中\n2. 返回连接\n")])])]),t("p",[e._v("最后用一个流程图大致描绘 popConnection 的逻辑，如下：")]),e._v(" "),t("p",[t("img",{attrs:{src:"https://blog-pictures.oss-cn-shanghai.aliyuncs.com/15346642047612.jpg",alt:"img"}})]),e._v(" "),t("h3",{attrs:{id:"_4-3-回收连接"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-3-回收连接"}},[e._v("#")]),e._v(" 4.3 回收连接")]),e._v(" "),t("p",[e._v("相比于获取连接，回收连接的逻辑要简单的多。回收连接成功与否只取决于空闲连接集合的状态，所需处理情况很少，因此比较简单。下面看一下相关的逻辑。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("protected void pushConnection(PooledConnection conn) throws SQLException {\n    synchronized (state) {\n        // 从活跃连接池中移除连接\n        state.activeConnections.remove(conn);\n        if (conn.isValid()) {\n            // 空闲连接集合未满\n            if (state.idleConnections.size() < poolMaximumIdleConnections\n                && conn.getConnectionTypeCode() == expectedConnectionTypeCode) {\n                state.accumulatedCheckoutTime += conn.getCheckoutTime();\n\n                // 回滚未提交的事务\n                if (!conn.getRealConnection().getAutoCommit()) {\n                    conn.getRealConnection().rollback();\n                }\n\n                // 创建新的 PooledConnection\n                PooledConnection newConn = new PooledConnection(conn.getRealConnection(), this);\n                state.idleConnections.add(newConn);\n                // 复用时间信息\n                newConn.setCreatedTimestamp(conn.getCreatedTimestamp());\n                newConn.setLastUsedTimestamp(conn.getLastUsedTimestamp());\n\n                // 将原连接置为无效状态\n                conn.invalidate();\n\n                // 通知等待的线程\n                state.notifyAll();\n                \n            } else {    // 空闲连接集合已满\n                state.accumulatedCheckoutTime += conn.getCheckoutTime();\n                // 回滚未提交的事务\n                if (!conn.getRealConnection().getAutoCommit()) {\n                    conn.getRealConnection().rollback();\n                }\n\n                // 关闭数据库连接\n                conn.getRealConnection().close();\n                conn.invalidate();\n            }\n        } else {\n            state.badConnectionCount++;\n        }\n    }\n}\n")])])]),t("p",[e._v("上面代码首先将连接从活跃连接集合中移除，然后再根据空闲集合是否有空闲空间进行后续处理。如果空闲集合未满，此时复用原连接的字段信息创建新的连接，并将其放入空闲集合中即可。若空闲集合已满，此时无需回收连接，直接关闭即可。pushConnection 方法的逻辑并不复杂，就不多说了。")]),e._v(" "),t("p",[e._v("我们知道获取连接的方法 popConnection 是由 getConnection 方法调用的，那回收连接的方法 pushConnection 是由谁调用的呢？答案是 PooledConnection 中的代理逻辑。相关代码如下：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("// -☆- PooledConnection\npublic Object invoke(Object proxy, Method method, Object[] args) throws Throwable {\n    String methodName = method.getName();\n    // 检测 close 方法是否被调用，若被调用则拦截之\n    if (CLOSE.hashCode() == methodName.hashCode() && CLOSE.equals(methodName)) {\n        // 将回收连接中，而不是直接将连接关闭\n        dataSource.pushConnection(this);\n        return null;\n    } else {\n        try {\n            if (!Object.class.equals(method.getDeclaringClass())) {\n                checkConnection();\n            }\n\n            // 调用真实连接的目标方法\n            return method.invoke(realConnection, args);\n        } catch (Throwable t) {\n            throw ExceptionUtil.unwrapThrowable(t);\n        }\n    }\n}\n")])])]),t("p",[e._v("在上一节中，getConnection 方法返回的是 Connection 代理对象，不知道大家有没有注意到。代理对象中的方法被调用时，会被上面的代理逻辑所拦截。如果代理对象的 close 方法被调用，MyBatis 并不会直接调用真实连接的 close 方法关闭连接，而是调用 pushConnection 方法回收连接。同时会唤醒处于睡眠中的线程，使其恢复运行。整个过程并不复杂，就不多说了。")]),e._v(" "),t("h3",{attrs:{id:"_4-4-小节"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-4-小节"}},[e._v("#")]),e._v(" 4.4 小节")]),e._v(" "),t("p",[e._v("本章分析了 PooledDataSource 的部分源码及一些辅助类的源码，除此之外，PooledDataSource 中还有部分源码没有分析，大家若有兴趣，可自行分析。好了，关于 PooledDataSource 的分析就先到这。")])])}),[],!1,null,null,null);n.default=a.exports}}]);