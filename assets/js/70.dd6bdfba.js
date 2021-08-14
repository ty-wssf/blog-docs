(window.webpackJsonp=window.webpackJsonp||[]).push([[70],{499:function(e,n,a){"use strict";a.r(n);var t=a(30),r=Object(t.a)({},(function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"spring-ioc-容器源码分析-创建单例-bean-的过程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#spring-ioc-容器源码分析-创建单例-bean-的过程"}},[e._v("#")]),e._v(" Spring IOC 容器源码分析 - 创建单例 bean 的过程")]),e._v(" "),a("h2",{attrs:{id:"_1-简介"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-简介"}},[e._v("#")]),e._v(" 1. 简介")]),e._v(" "),a("p",[e._v("在"),a("a",{attrs:{href:"http://www.coolblog.xyz/2018/06/01/Spring-IOC-%E5%AE%B9%E5%99%A8%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90-%E8%8E%B7%E5%8F%96%E5%8D%95%E4%BE%8B-bean/",target:"_blank",rel:"noopener noreferrer"}},[e._v("上一篇文章"),a("OutboundLink")],1),e._v("中，我比较详细的分析了获取 bean 的方法，也就是"),a("code",[e._v("getBean(String)")]),e._v("的实现逻辑。对于已实例化好的单例 bean，getBean(String) 方法并不会再一次去创建，而是从缓存中获取。如果某个 bean 还未实例化，这个时候就无法命中缓存。此时，就要根据 bean 的配置信息去创建这个 bean 了。相较于"),a("code",[e._v("getBean(String)")]),e._v("方法的实现逻辑，创建 bean 的方法"),a("code",[e._v("createBean(String, RootBeanDefinition, Object[])")]),e._v("及其所调用的方法逻辑上更为复杂一些。关于创建 bean 实例的过程，我将会分几篇文章进行分析。本篇文章会先从大体上分析 "),a("code",[e._v("createBean(String, RootBeanDefinition, Object[])")]),e._v("方法的代码逻辑，至于其所调用的方法将会在随后的文章中进行分析。")]),e._v(" "),a("p",[e._v("好了，其他的不多说，直接进入正题吧。")]),e._v(" "),a("h2",{attrs:{id:"_2-源码分析"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-源码分析"}},[e._v("#")]),e._v(" 2. 源码分析")]),e._v(" "),a("h3",{attrs:{id:"_2-1-创建-bean-实例的入口"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-创建-bean-实例的入口"}},[e._v("#")]),e._v(" 2.1 创建 bean 实例的入口")]),e._v(" "),a("p",[e._v("在正式分析"),a("code",[e._v("createBean(String, RootBeanDefinition, Object[])")]),e._v("方法前，我们先来看看 createBean 方法是在哪里被调用的。如下：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("public T doGetBean(...) {\n    // 省略不相关代码\n    if (mbd.isSingleton()) {\n        sharedInstance = getSingleton(beanName, new ObjectFactory<Object>() {\n            @Override\n            public Object getObject() throws BeansException {\n                try {\n                    return createBean(beanName, mbd, args);\n                }\n                catch (BeansException ex) {\n                    destroySingleton(beanName);\n                    throw ex;\n                }\n            }\n        });\n        bean = getObjectForBeanInstance(sharedInstance, name, beanName, mbd);\n    }\n    // 省略不相关代码\n}\n")])])]),a("p",[e._v("上面是 doGetBean 方法的代码片段，从中可以发现 createBean 方法。createBean 方法被匿名工厂类的 getObject 方法包裹，但这个匿名工厂类对象并未直接调用 getObject 方法。而是将自身作为参数传给了"),a("code",[e._v("getSingleton(String, ObjectFactory)")]),e._v("方法，那么我们接下来再去看看一下getSingleton(String, ObjectFactory) 方法的实现。如下：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('public Object getSingleton(String beanName, ObjectFactory<?> singletonFactory) {\n    Assert.notNull(beanName, "\'beanName\' must not be null");\n    synchronized (this.singletonObjects) {\n        // 从缓存中获取单例 bean，若不为空，则直接返回，不用再初始化\n        Object singletonObject = this.singletonObjects.get(beanName);\n        if (singletonObject == null) {\n            if (this.singletonsCurrentlyInDestruction) {\n                throw new BeanCreationNotAllowedException(beanName,\n                        "Singleton bean creation not allowed while singletons of this factory are in destruction " +\n                        "(Do not request a bean from a BeanFactory in a destroy method implementation!)");\n            }\n            if (logger.isDebugEnabled()) {\n                logger.debug("Creating shared instance of singleton bean \'" + beanName + "\'");\n            }\n            /* \n             * 将 beanName 添加到 singletonsCurrentlyInCreation 集合中，\n             * 用于表明 beanName 对应的 bean 正在创建中\n             */\n            beforeSingletonCreation(beanName);\n            boolean newSingleton = false;\n            boolean recordSuppressedExceptions = (this.suppressedExceptions == null);\n            if (recordSuppressedExceptions) {\n                this.suppressedExceptions = new LinkedHashSet<Exception>();\n            }\n            try {\n                // 通过 getObject 方法调用 createBean 方法创建 bean 实例\n                singletonObject = singletonFactory.getObject();\n                newSingleton = true;\n            }\n            catch (IllegalStateException ex) {\n                singletonObject = this.singletonObjects.get(beanName);\n                if (singletonObject == null) {\n                    throw ex;\n                }\n            }\n            catch (BeanCreationException ex) {\n                if (recordSuppressedExceptions) {\n                    for (Exception suppressedException : this.suppressedExceptions) {\n                        ex.addRelatedCause(suppressedException);\n                    }\n                }\n                throw ex;\n            }\n            finally {\n                if (recordSuppressedExceptions) {\n                    this.suppressedExceptions = null;\n                }\n                // 将 beanName 从 singletonsCurrentlyInCreation 移除\n                afterSingletonCreation(beanName);\n            }\n            if (newSingleton) {\n                /* \n                 * 将 <beanName, singletonObject> 键值对添加到 singletonObjects 集合中，\n                 * 并从其他集合（比如 earlySingletonObjects）中移除 singletonObject 记录\n                 */\n                addSingleton(beanName, singletonObject);\n            }\n        }\n        return (singletonObject != NULL_OBJECT ? singletonObject : null);\n    }\n}\n')])])]),a("p",[e._v("上面的方法逻辑不是很复杂，这里简单总结一下。如下：")]),e._v(" "),a("ol",[a("li",[e._v("先从 singletonObjects 集合获取 bean 实例，若不为空，则直接返回")]),e._v(" "),a("li",[e._v("若为空，进入创建 bean 实例阶段。先将 beanName 添加到 singletonsCurrentlyInCreation")]),e._v(" "),a("li",[e._v("通过 getObject 方法调用 createBean 方法创建 bean 实例")]),e._v(" "),a("li",[e._v("将 beanName 从 singletonsCurrentlyInCreation 集合中移除")]),e._v(" "),a("li",[e._v("将 <beanName, singletonObject> 映射缓存到 singletonObjects 集合中")])]),e._v(" "),a("p",[e._v("从上面的分析中，我们知道了 createBean 方法在何处被调用的。那么接下来我们一起深入 createBean 方法的源码中，来看看这个方法具体都做了什么事情。")]),e._v(" "),a("h3",{attrs:{id:"_2-2-createbean-方法全貌"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-createbean-方法全貌"}},[e._v("#")]),e._v(" 2.2 createBean 方法全貌")]),e._v(" "),a("p",[e._v("createBean 和 getBean 方法类似，基本上都是空壳方法，只不过 createBean 的逻辑稍微多点，多做了一些事情。下面我们一起看看这个方法的实现逻辑，如下：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('protected Object createBean(String beanName, RootBeanDefinition mbd, Object[] args) throws BeanCreationException {\n    if (logger.isDebugEnabled()) {\n        logger.debug("Creating instance of bean \'" + beanName + "\'");\n    }\n    RootBeanDefinition mbdToUse = mbd;\n\n    // 解析 bean 的类型\n    Class<?> resolvedClass = resolveBeanClass(mbd, beanName);\n    if (resolvedClass != null && !mbd.hasBeanClass() && mbd.getBeanClassName() != null) {\n        mbdToUse = new RootBeanDefinition(mbd);\n        mbdToUse.setBeanClass(resolvedClass);\n    }\n\n    try {\n        // 处理 lookup-method 和 replace-method 配置，Spring 将这两个配置统称为 override method\n        mbdToUse.prepareMethodOverrides();\n    }\n    catch (BeanDefinitionValidationException ex) {\n        throw new BeanDefinitionStoreException(mbdToUse.getResourceDescription(),\n                beanName, "Validation of method overrides failed", ex);\n    }\n\n    try {\n        // 在 bean 初始化前应用后置处理，如果后置处理返回的 bean 不为空，则直接返回\n        Object bean = resolveBeforeInstantiation(beanName, mbdToUse);\n        if (bean != null) {\n            return bean;\n        }\n    }\n    catch (Throwable ex) {\n        throw new BeanCreationException(mbdToUse.getResourceDescription(), beanName,\n                "BeanPostProcessor before instantiation of bean failed", ex);\n    }\n\n    // 调用 doCreateBean 创建 bean\n    Object beanInstance = doCreateBean(beanName, mbdToUse, args);\n    if (logger.isDebugEnabled()) {\n        logger.debug("Finished creating instance of bean \'" + beanName + "\'");\n    }\n    return beanInstance;\n}\n')])])]),a("p",[e._v("上面的代码不长，代码的执行流程比较容易看出，这里罗列一下：")]),e._v(" "),a("ol",[a("li",[e._v("解析 bean 类型")]),e._v(" "),a("li",[e._v("处理 lookup-method 和 replace-method 配置")]),e._v(" "),a("li",[e._v("在 bean 初始化前应用后置处理，若后置处理返回的 bean 不为空，则直接返回")]),e._v(" "),a("li",[e._v("若上一步后置处理返回的 bean 为空，则调用 doCreateBean 创建 bean 实例")])]),e._v(" "),a("p",[e._v("下面我会分节对第2、3和4步的流程进行分析，步骤1的详细实现大家有兴趣的话，就自己去看看吧。")]),e._v(" "),a("h4",{attrs:{id:"_2-2-1-验证和准备-override-方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-1-验证和准备-override-方法"}},[e._v("#")]),e._v(" 2.2.1 验证和准备 override 方法")]),e._v(" "),a("p",[e._v("当用户配置了 lookup-method 和 replace-method 时，Spring 需要对目标 bean 进行增强。在增强之前，需要做一些准备工作，也就是 prepareMethodOverrides 中的逻辑。下面来看看这个方法的源码：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('public void prepareMethodOverrides() throws BeanDefinitionValidationException {\n    MethodOverrides methodOverrides = getMethodOverrides();\n    if (!methodOverrides.isEmpty()) {\n        Set<MethodOverride> overrides = methodOverrides.getOverrides();\n        synchronized (overrides) {\n            // 循环处理每个 MethodOverride 对象\n            for (MethodOverride mo : overrides) {\n                prepareMethodOverride(mo);\n            }\n        }\n    }\n}\n\nprotected void prepareMethodOverride(MethodOverride mo) throws BeanDefinitionValidationException {\n    // 获取方法名为 mo.getMethodName() 的方法数量，当方法重载时，count 的值就会大于1\n    int count = ClassUtils.getMethodCountForName(getBeanClass(), mo.getMethodName());\n    // count = 0，表明根据方法名未找到相应的方法，此时抛出异常\n    if (count == 0) {\n        throw new BeanDefinitionValidationException(\n                "Invalid method override: no method with name \'" + mo.getMethodName() +\n                "\' on class [" + getBeanClassName() + "]");\n    }\n    // 若 count = 1，表明仅存在已方法名为 mo.getMethodName()，这意味着方法不存在重载\n    else if (count == 1) {\n        // 方法不存在重载，则将 overloaded 成员变量设为 false\n        mo.setOverloaded(false);\n    }\n}\n')])])]),a("p",[e._v("上面的源码中，"),a("code",[e._v("prepareMethodOverrides")]),e._v("方法循环调用了"),a("code",[e._v("prepareMethodOverride")]),e._v("方法，并没其他的太多逻辑。主要准备工作都是在 prepareMethodOverride 方法中进行的，所以我们重点关注一下这个方法。prepareMethodOverride 这个方法主要用于获取指定方法的方法数量 count，并根据 count 的值进行相应的处理。count = 0 时，表明方法不存在，此时抛出异常。count = 1 时，设置 MethodOverride 对象的"),a("code",[e._v("overloaded")]),e._v("成员变量为 false。这样做的目的在于，提前标注名称"),a("code",[e._v("mo.getMethodName()")]),e._v("的方法不存在重载，在使用 CGLIB 增强阶段就不需要进行校验，直接找到某个方法进行增强即可。")]),e._v(" "),a("p",[e._v("上面的方法没太多的逻辑，比较简单，就先分析到这里。")]),e._v(" "),a("h4",{attrs:{id:"_2-2-2-bean-实例化前的后置处理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-2-bean-实例化前的后置处理"}},[e._v("#")]),e._v(" 2.2.2 bean 实例化前的后置处理")]),e._v(" "),a("p",[e._v("后置处理是 Spring 的一个拓展点，用户通过实现 BeanPostProcessor 接口，并将实现类配置到 Spring 的配置文件中（或者使用注解），即可在 bean 初始化前后进行自定义操作。关于后置处理较为详细的说明，可以参考我的了一篇文章"),a("a",{attrs:{href:"http://www.coolblog.xyz/2018/05/30/Spring-IOC-%E5%AE%B9%E5%99%A8%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90%E7%B3%BB%E5%88%97%E6%96%87%E7%AB%A0%E5%AF%BC%E8%AF%BB/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Spring IOC 容器源码分析系列文章导读"),a("OutboundLink")],1),e._v("，这里就不赘述了。下面我们来看看 createBean 方法中的后置处理逻辑，如下：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("protected Object resolveBeforeInstantiation(String beanName, RootBeanDefinition mbd) {\n    Object bean = null;\n    // 检测是否解析过，mbd.beforeInstantiationResolved 的值在下面的代码中会被设置\n    if (!Boolean.FALSE.equals(mbd.beforeInstantiationResolved)) {\n        if (!mbd.isSynthetic() && hasInstantiationAwareBeanPostProcessors()) {\n            Class<?> targetType = determineTargetType(beanName, mbd);\n            if (targetType != null) {\n                // 应用前置处理\n                bean = applyBeanPostProcessorsBeforeInstantiation(targetType, beanName);\n                if (bean != null) {\n                    // 应用后置处理\n                    bean = applyBeanPostProcessorsAfterInitialization(bean, beanName);\n                }\n            }\n        }\n        // 设置 mbd.beforeInstantiationResolved\n        mbd.beforeInstantiationResolved = (bean != null);\n    }\n    return bean;\n}\n\nprotected Object applyBeanPostProcessorsBeforeInstantiation(Class<?> beanClass, String beanName) {\n    for (BeanPostProcessor bp : getBeanPostProcessors()) {\n        // InstantiationAwareBeanPostProcessor 一般在 Spring 框架内部使用，不建议用户直接使用\n        if (bp instanceof InstantiationAwareBeanPostProcessor) {\n            InstantiationAwareBeanPostProcessor ibp = (InstantiationAwareBeanPostProcessor) bp;\n            // bean 初始化前置处理\n            Object result = ibp.postProcessBeforeInstantiation(beanClass, beanName);\n            if (result != null) {\n                return result;\n            }\n        }\n    }\n    return null;\n}\n\npublic Object applyBeanPostProcessorsAfterInitialization(Object existingBean, String beanName)\n        throws BeansException {\n\n    Object result = existingBean;\n    for (BeanPostProcessor beanProcessor : getBeanPostProcessors()) {\n       // bean 初始化后置处理\n        result = beanProcessor.postProcessAfterInitialization(result, beanName);\n        if (result == null) {\n            return result;\n        }\n    }\n    return result;\n}\n")])])]),a("p",[e._v("在 resolveBeforeInstantiation 方法中，当前置处理方法返回的 bean 不为空时，后置处理才会被执行。前置处理器是 InstantiationAwareBeanPostProcessor 类型的，该种类型的处理器一般用在 Spring 框架内部，比如 AOP 模块中的"),a("code",[e._v("AbstractAutoProxyCreator")]),e._v("抽象类间接实现了这个接口中的 "),a("code",[e._v("postProcessBeforeInstantiation")]),e._v("方法，所以 AOP 可以在这个方法中生成为目标类的代理对象。不过我在调试的过程中，发现 AOP 在此处生成代理对象是有条件的。一般情况下条件都不成立，也就不会在此处生成代理对象。至于这个条件为什么不成立，因 AOP 这一块的源码我还没来得及看，所以暂时还无法解答。等我看过 AOP 模块的源码后，我再来尝试分析这个条件。")]),e._v(" "),a("h4",{attrs:{id:"_2-2-3-调用-docreatebean-方法创建-bean"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-3-调用-docreatebean-方法创建-bean"}},[e._v("#")]),e._v(" 2.2.3 调用 doCreateBean 方法创建 bean")]),e._v(" "),a("p",[e._v("这一节，我们来分析一下"),a("code",[e._v("doCreateBean")]),e._v("方法的源码。在 Spring 中，做事情的方法基本上都是以"),a("code",[e._v("do")]),e._v("开头的，doCreateBean 也不例外。那下面我们就来看看这个方法都做了哪些事情。")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('protected Object doCreateBean(final String beanName, final RootBeanDefinition mbd, final Object[] args)\n        throws BeanCreationException {\n\n    /* \n     * BeanWrapper 是一个基础接口，由接口名可看出这个接口的实现类用于包裹 bean 实例。\n     * 通过 BeanWrapper 的实现类可以方便的设置/获取 bean 实例的属性\n     */\n    BeanWrapper instanceWrapper = null;\n    if (mbd.isSingleton()) {\n        // 从缓存中获取 BeanWrapper，并清理相关记录\n        instanceWrapper = this.factoryBeanInstanceCache.remove(beanName);\n    }\n    if (instanceWrapper == null) {\n        /* \n         * 创建 bean 实例，并将实例包裹在 BeanWrapper 实现类对象中返回。createBeanInstance \n         * 中包含三种创建 bean 实例的方式：\n         *   1. 通过工厂方法创建 bean 实例\n         *   2. 通过构造方法自动注入（autowire by constructor）的方式创建 bean 实例\n         *   3. 通过无参构造方法方法创建 bean 实例\n         *\n         * 若 bean 的配置信息中配置了 lookup-method 和 replace-method，则会使用 CGLIB \n         * 增强 bean 实例。关于这个方法，后面会专门写一篇文章介绍，这里先说这么多。\n         */\n        instanceWrapper = createBeanInstance(beanName, mbd, args);\n    }\n    // 此处的 bean 可以认为是一个原始的 bean 实例，暂未填充属性\n    final Object bean = (instanceWrapper != null ? instanceWrapper.getWrappedInstance() : null);\n    Class<?> beanType = (instanceWrapper != null ? instanceWrapper.getWrappedClass() : null);\n    mbd.resolvedTargetType = beanType;\n\n    // 这里又遇到后置处理了，此处的后置处理是用于处理已“合并的 BeanDefinition”。关于这种后置处理器具体的实现细节就不深入理解了，大家有兴趣可以自己去看\n    synchronized (mbd.postProcessingLock) {\n        if (!mbd.postProcessed) {\n            try {\n                applyMergedBeanDefinitionPostProcessors(mbd, beanType, beanName);\n            }\n            catch (Throwable ex) {\n                throw new BeanCreationException(mbd.getResourceDescription(), beanName,\n                        "Post-processing of merged bean definition failed", ex);\n            }\n            mbd.postProcessed = true;\n        }\n    }\n\n    /*\n     * earlySingletonExposure 是一个重要的变量，这里要说明一下。该变量用于表示是否提前暴露\n     * 单例 bean，用于解决循环依赖。earlySingletonExposure 由三个条件综合而成，如下：\n     *   条件1：mbd.isSingleton() - 表示 bean 是否是单例类型\n     *   条件2：allowCircularReferences - 是否允许循环依赖\n     *   条件3：isSingletonCurrentlyInCreation(beanName) - 当前 bean 是否处于创建的状态中\n     * \n     * earlySingletonExposure = 条件1 && 条件2 && 条件3 \n     *                        = 单例 && 是否允许循环依赖 && 是否存于创建状态中。\n     */\n    boolean earlySingletonExposure = (mbd.isSingleton() && this.allowCircularReferences &&\n            isSingletonCurrentlyInCreation(beanName));\n    if (earlySingletonExposure) {\n        if (logger.isDebugEnabled()) {\n            logger.debug("Eagerly caching bean \'" + beanName +\n                    "\' to allow for resolving potential circular references");\n        }\n        // 添加工厂对象到 singletonFactories 缓存中\n        addSingletonFactory(beanName, new ObjectFactory<Object>() {\n            @Override\n            public Object getObject() throws BeansException {\n                // 获取早期 bean 的引用，如果 bean 中的方法被 AOP 切点所匹配到，此时 AOP 相关逻辑会介入\n                return getEarlyBeanReference(beanName, mbd, bean);\n            }\n        });\n    }\n\n    Object exposedObject = bean;\n    try {\n        // 向 bean 实例中填充属性，populateBean 方法也是一个很重要的方法，后面会专门写文章分析\n        populateBean(beanName, mbd, instanceWrapper);\n        if (exposedObject != null) {\n            /*\n             * 进行余下的初始化工作，详细如下：\n             * 1. 判断 bean 是否实现了 BeanNameAware、BeanFactoryAware、\n             *    BeanClassLoaderAware 等接口，并执行接口方法\n             * 2. 应用 bean 初始化前置操作\n             * 3. 如果 bean 实现了 InitializingBean 接口，则执行 afterPropertiesSet \n             *    方法。如果用户配置了 init-method，则调用相关方法执行自定义初始化逻辑\n             * 4. 应用 bean 初始化后置操作\n             * \n             * 另外，AOP 相关逻辑也会在该方法中织入切面逻辑，此时的 exposedObject 就变成了\n             * 一个代理对象了\n             */\n            exposedObject = initializeBean(beanName, exposedObject, mbd);\n        }\n    }\n    catch (Throwable ex) {\n        if (ex instanceof BeanCreationException && beanName.equals(((BeanCreationException) ex).getBeanName())) {\n            throw (BeanCreationException) ex;\n        }\n        else {\n            throw new BeanCreationException(\n                    mbd.getResourceDescription(), beanName, "Initialization of bean failed", ex);\n        }\n    }\n\n    if (earlySingletonExposure) {\n        Object earlySingletonReference = getSingleton(beanName, false);\n        if (earlySingletonReference != null) {\n            // 若 initializeBean 方法未改变 exposedObject 的引用，则此处的条件为 true。\n            if (exposedObject == bean) {\n                exposedObject = earlySingletonReference;\n            }\n            // 下面的逻辑我也没完全搞懂，就不分析了。见谅。\n            else if (!this.allowRawInjectionDespiteWrapping && hasDependentBean(beanName)) {\n                String[] dependentBeans = getDependentBeans(beanName);\n                Set<String> actualDependentBeans = new LinkedHashSet<String>(dependentBeans.length);\n                for (String dependentBean : dependentBeans) {\n                    if (!removeSingletonIfCreatedForTypeCheckOnly(dependentBean)) {\n                        actualDependentBeans.add(dependentBean);\n                    }\n                }\n                if (!actualDependentBeans.isEmpty()) {\n                    throw new BeanCurrentlyInCreationException(beanName,\n                            "Bean with name \'" + beanName + "\' has been injected into other beans [" +\n                            StringUtils.collectionToCommaDelimitedString(actualDependentBeans) +\n                            "] in its raw version as part of a circular reference, but has eventually been " +\n                            "wrapped. This means that said other beans do not use the final version of the " +\n                            "bean. This is often the result of over-eager type matching - consider using " +\n                            "\'getBeanNamesOfType\' with the \'allowEagerInit\' flag turned off, for example.");\n                }\n            }\n        }\n    }\n\n    try {\n        // 注册销毁逻辑\n        registerDisposableBeanIfNecessary(beanName, bean, mbd);\n    }\n    catch (BeanDefinitionValidationException ex) {\n        throw new BeanCreationException(\n                mbd.getResourceDescription(), beanName, "Invalid destruction signature", ex);\n    }\n\n    return exposedObject;\n}\n')])])]),a("p",[e._v("上面的注释比较多，分析的应该比较详细的。不过有一部分代码我暂时没看懂，就不分析了，见谅。下面我们来总结一下 doCreateBean 方法的执行流程吧，如下：")]),e._v(" "),a("ol",[a("li",[e._v("从缓存中获取 BeanWrapper 实现类对象，并清理相关记录")]),e._v(" "),a("li",[e._v("若未命中缓存，则创建 bean 实例，并将实例包裹在 BeanWrapper 实现类对象中返回")]),e._v(" "),a("li",[e._v("应用 MergedBeanDefinitionPostProcessor 后置处理器相关逻辑")]),e._v(" "),a("li",[e._v("根据条件决定是否提前暴露 bean 的早期引用（early reference），用于处理循环依赖问题")]),e._v(" "),a("li",[e._v("调用 populateBean 方法向 bean 实例中填充属性")]),e._v(" "),a("li",[e._v("调用 initializeBean 方法完成余下的初始化工作")]),e._v(" "),a("li",[e._v("注册销毁逻辑")])])])}),[],!1,null,null,null);n.default=r.exports}}]);