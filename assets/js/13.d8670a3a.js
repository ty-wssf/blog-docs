(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{441:function(e,n,t){"use strict";t.r(n);var r=t(30),a=Object(r.a)({},(function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"dubbo-源码分析-服务引用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#dubbo-源码分析-服务引用"}},[e._v("#")]),e._v(" Dubbo 源码分析 - 服务引用")]),e._v(" "),t("h2",{attrs:{id:"_1-简介"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-简介"}},[e._v("#")]),e._v(" 1. 简介")]),e._v(" "),t("p",[e._v("在"),t("a",{attrs:{href:"http://www.tianxiaobo.com/2018/10/31/Dubbo-%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90-%E6%9C%8D%E5%8A%A1%E5%AF%BC%E5%87%BA/",target:"_blank",rel:"noopener noreferrer"}},[e._v("上一篇"),t("OutboundLink")],1),e._v("文章中，我详细的分析了服务导出的原理。本篇文章我们趁热打铁，继续分析服务引用的原理。在 Dubbo 中，我们可以通过两种方式引用远程服务。第一种是使用服务直联的方式引用服务，第二种方式是基于注册中心进行引用。服务直联的方式仅适合在调试或测试服务的场景下使用，不适合在线上环境使用。因此，本文我将重点分析通过注册中心引用服务的过程。从注册中心中获取服务配置只是服务引用过程中的一环，除此之外，服务消费者还需要经历 Invoker 创建、代理类创建等步骤。这些步骤，我将在后续章节中一一进行分析。")]),e._v(" "),t("h2",{attrs:{id:"_2-服务引用原理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-服务引用原理"}},[e._v("#")]),e._v(" 2.服务引用原理")]),e._v(" "),t("p",[e._v("Dubbo 服务引用的时机有两个，第一个是在 Spring 容器调用 ReferenceBean 的 afterPropertiesSet 方法时引用服务，第二个是在 ReferenceBean 对应的服务被注入到其他类中时引用。这两个引用服务的时机区别在于，第一个是饿汉式的，第二个是懒汉式的。默认情况下，Dubbo 使用懒汉式引用服务。如果需要使用饿汉式，可通过配置 "),t("a",{attrs:{href:"dubbo:reference"}},[e._v("dubbo:reference")]),e._v(" 的 init 属性开启。下面我们按照 Dubbo 默认配置进行分析，整个分析过程从 ReferenceBean 的 getObject 方法开始。当我们的服务被注入到其他类中时，Spring 会第一时间调用 getObject 方法，并由该方法执行服务引用逻辑。按照惯例，在进行具体工作之前，需先进行配置检查与收集工作。接着根据收集到的信息决定服务用的方式，有三种，第一种是引用本地 (JVM) 服务，第二是通过直联方式引用远程服务，第三是通过注册中心引用远程服务。不管是哪种引用方式，最后都会得到一个 Invoker 实例。如果有多个注册中心，多个服务提供者，这个时候会得到一组 Invoker 实例，此时需要通过集群管理类 Cluster 将多个 Invoker 合并成一个实例。合并后的 Invoker 实例已经具备调用本地或远程服务的能力了，但并不能将此实例暴露给用户使用，这会对用户业务代码造成侵入。此时框架还需要通过代理工厂类 (ProxyFactory) 为服务接口生成代理类，并让代理类去调用 Invoker 逻辑。避免了 Dubbo 框架代码对业务代码的侵入，同时也让框架更容易使用。")]),e._v(" "),t("p",[e._v("以上就是 Dubbo 引用服务的大致原理，下面我们深入到代码中，详细分析服务引用细节。")]),e._v(" "),t("h2",{attrs:{id:"_3-源码分析"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-源码分析"}},[e._v("#")]),e._v(" 3.源码分析")]),e._v(" "),t("p",[e._v("服务引用的入口方法为 ReferenceBean 的 getObject 方法，该方法定义在 Spring 的 FactoryBean 接口中，ReferenceBean 实现了这个方法。实现代码如下：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('public Object getObject() throws Exception {\n    return get();\n}\n\npublic synchronized T get() {\n    if (destroyed) {\n        throw new IllegalStateException("Already destroyed!");\n    }\n    // 检测 ref 是否为空，为空则通过 init 方法创建\n    if (ref == null) {\n        // init 方法主要用于处理配置，以及调用 createProxy 生成代理类\n        init();\n    }\n    return ref;\n}\n')])])]),t("p",[e._v("这里两个方法代码都比较简短，并不难理解。不过这里需要特别说明一下，如果大家从 getObject 方法进行代码调试时，会碰到比较诧异的问题。这里假设你使用 IDEA，且保持了 IDEA 的默认配置。当你面调试到 get 方法的"),t("code",[e._v("if (ref == null)")]),e._v("时，你会惊奇的发现 ref 不为空，导致你无法进入到 init 方法中继续调试。导致这个现象的原因是 Dubbo 框架本身有点小问题，这个小问题会引发一些让人诧异的现象。关于这个问题，我进行了将近两个小时的排查。查明问题后，我给 Dubbo 提交了一个 pull request ("),t("a",{attrs:{href:"https://github.com/apache/incubator-dubbo/pull/2754",target:"_blank",rel:"noopener noreferrer"}},[e._v("#2754"),t("OutboundLink")],1),e._v(") 修复了此问题。另外，beiwei30 前辈开了一个 issue ("),t("a",{attrs:{href:"https://github.com/apache/incubator-dubbo/issues/2757",target:"_blank",rel:"noopener noreferrer"}},[e._v("#2757"),t("OutboundLink")],1),e._v(" ) 介绍这个问题，有兴趣的朋友可以去看看。大家如果想规避这个问题，可以修改一下 IDEA 的配置。在配置面板中搜索 toString，然后取消"),t("code",[e._v("Enable 'toString' object view")]),e._v("前的对号。具体如下：")]),e._v(" "),t("p",[t("img",{attrs:{src:"https://blog-pictures.oss-cn-shanghai.aliyuncs.com/15417503733794.jpg",alt:"img"}})]),e._v(" "),t("p",[e._v("讲完需要注意的点，我们继续向下分析，接下来将分析配置的处理过程。")]),e._v(" "),t("h3",{attrs:{id:"_3-1-处理配置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-处理配置"}},[e._v("#")]),e._v(" 3.1 处理配置")]),e._v(" "),t("p",[e._v("Dubbo 提供了丰富的配置，用于调整和优化框架行为，性能等。Dubbo 在引用或导出服务时，首先会对这些配置进行检查和处理，以保证配置到正确性。如果大家不是很熟悉 Dubbo 配置，建议先阅读以下官方文档。配置解析的方法为 ReferenceConfig 的 init 方法，下面来看一下方法逻辑。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('private void init() {\n    if (initialized) {\n        return;\n    }\n    initialized = true;\n    if (interfaceName == null || interfaceName.length() == 0) {\n        throw new IllegalStateException("interface not allow null!");\n    }\n\n    // 检测 consumer 变量是否为空，为空则创建\n    checkDefault();\n    appendProperties(this);\n    if (getGeneric() == null && getConsumer() != null) {\n        // 设置 generic\n        setGeneric(getConsumer().getGeneric());\n    }\n\n    // 检测是否为泛化接口\n    if (ProtocolUtils.isGeneric(getGeneric())) {\n        interfaceClass = GenericService.class;\n    } else {\n        try {\n            // 加载类\n            interfaceClass = Class.forName(interfaceName, true, Thread.currentThread()\n                    .getContextClassLoader());\n        } catch (ClassNotFoundException e) {\n            throw new IllegalStateException(e.getMessage(), e);\n        }\n        checkInterfaceAndMethods(interfaceClass, methods);\n    }\n    \n    // -------------------------------✨ 分割线1 ✨------------------------------\n\n    // 从系统变量中获取与接口名对应的属性值\n    String resolve = System.getProperty(interfaceName);\n    String resolveFile = null;\n    if (resolve == null || resolve.length() == 0) {\n        // 从系统属性中获取解析文件路径\n        resolveFile = System.getProperty("dubbo.resolve.file");\n        if (resolveFile == null || resolveFile.length() == 0) {\n            // 从指定位置加载配置文件\n            File userResolveFile = new File(new File(System.getProperty("user.home")), "dubbo-resolve.properties");\n            if (userResolveFile.exists()) {\n                // 获取文件绝对路径\n                resolveFile = userResolveFile.getAbsolutePath();\n            }\n        }\n        if (resolveFile != null && resolveFile.length() > 0) {\n            Properties properties = new Properties();\n            FileInputStream fis = null;\n            try {\n                fis = new FileInputStream(new File(resolveFile));\n                // 从文件中加载配置\n                properties.load(fis);\n            } catch (IOException e) {\n                throw new IllegalStateException("Unload ..., cause:...");\n            } finally {\n                try {\n                    if (null != fis) fis.close();\n                } catch (IOException e) {\n                    logger.warn(e.getMessage(), e);\n                }\n            }\n            // 获取与接口名对应的配置\n            resolve = properties.getProperty(interfaceName);\n        }\n    }\n    if (resolve != null && resolve.length() > 0) {\n        // 将 resolve 赋值给 url\n        url = resolve;\n    }\n    \n    // -------------------------------✨ 分割线2 ✨------------------------------\n    if (consumer != null) {\n        if (application == null) {\n            // 从 consumer 中获取 Application 实例，下同\n            application = consumer.getApplication();\n        }\n        if (module == null) {\n            module = consumer.getModule();\n        }\n        if (registries == null) {\n            registries = consumer.getRegistries();\n        }\n        if (monitor == null) {\n            monitor = consumer.getMonitor();\n        }\n    }\n    if (module != null) {\n        if (registries == null) {\n            registries = module.getRegistries();\n        }\n        if (monitor == null) {\n            monitor = module.getMonitor();\n        }\n    }\n    if (application != null) {\n        if (registries == null) {\n            registries = application.getRegistries();\n        }\n        if (monitor == null) {\n            monitor = application.getMonitor();\n        }\n    }\n    \n    // 检测本地 Application 和本地存根配置合法性\n    checkApplication();\n    checkStubAndMock(interfaceClass);\n    \n\t// -------------------------------✨ 分割线3 ✨------------------------------\n    \n    Map<String, String> map = new HashMap<String, String>();\n    Map<Object, Object> attributes = new HashMap<Object, Object>();\n\n    // 添加 side、协议版本信息、时间戳和进程号等信息到 map 中\n    map.put(Constants.SIDE_KEY, Constants.CONSUMER_SIDE);\n    map.put(Constants.DUBBO_VERSION_KEY, Version.getProtocolVersion());\n    map.put(Constants.TIMESTAMP_KEY, String.valueOf(System.currentTimeMillis()));\n    if (ConfigUtils.getPid() > 0) {\n        map.put(Constants.PID_KEY, String.valueOf(ConfigUtils.getPid()));\n    }\n\n    if (!isGeneric()) {    // 非泛化服务\n        // 获取版本\n        String revision = Version.getVersion(interfaceClass, version);\n        if (revision != null && revision.length() > 0) {\n            map.put("revision", revision);\n        }\n\n        // 获取接口方法列表，并添加到 map 中\n        String[] methods = Wrapper.getWrapper(interfaceClass).getMethodNames();\n        if (methods.length == 0) {\n            map.put("methods", Constants.ANY_VALUE);\n        } else {\n            map.put("methods", StringUtils.join(new HashSet<String>(Arrays.asList(methods)), ","));\n        }\n    }\n    map.put(Constants.INTERFACE_KEY, interfaceName);\n    // 将 ApplicationConfig、ConsumerConfig、ReferenceConfig 等对象的字段信息添加到 map 中\n    appendParameters(map, application);\n    appendParameters(map, module);\n    appendParameters(map, consumer, Constants.DEFAULT_KEY);\n    appendParameters(map, this);\n    \n\t// -------------------------------✨ 分割线4 ✨------------------------------\n    \n    String prefix = StringUtils.getServiceKey(map);\n    if (methods != null && !methods.isEmpty()) {\n        // 遍历 MethodConfig 列表\n        for (MethodConfig method : methods) {\n            appendParameters(map, method, method.getName());\n            String retryKey = method.getName() + ".retry";\n            // 检测 map 是否包含 methodName.retry\n            if (map.containsKey(retryKey)) {\n                String retryValue = map.remove(retryKey);\n                if ("false".equals(retryValue)) {\n                    // 添加重试次数配置 methodName.retries\n                    map.put(method.getName() + ".retries", "0");\n                }\n            }\n \n            // 添加 MethodConfig 中的“属性”字段到 attributes\n            // 比如 onreturn、onthrow、oninvoke 等\n            appendAttributes(attributes, method, prefix + "." + method.getName());\n            checkAndConvertImplicitConfig(method, map, attributes);\n        }\n    }\n    \n\t// -------------------------------✨ 分割线5 ✨------------------------------\n\n    // 获取服务消费者 ip 地址\n    String hostToRegistry = ConfigUtils.getSystemProperty(Constants.DUBBO_IP_TO_REGISTRY);\n    if (hostToRegistry == null || hostToRegistry.length() == 0) {\n        hostToRegistry = NetUtils.getLocalHost();\n    } else if (isInvalidLocalHost(hostToRegistry)) {\n        throw new IllegalArgumentException("Specified invalid registry ip from property..." );\n    }\n    map.put(Constants.REGISTER_IP_KEY, hostToRegistry);\n\n    // 存储 attributes 到系统上下文中\n    StaticContext.getSystemContext().putAll(attributes);\n\n    // 创建代理类\n    ref = createProxy(map);\n\n    // 根据服务名，ReferenceConfig，代理类构建 ConsumerModel，\n    // 并将 ConsumerModel 存入到 ApplicationModel 中\n    ConsumerModel consumerModel = new ConsumerModel(getUniqueServiceName(), this, ref, interfaceClass.getMethods());\n    ApplicationModel.initConsumerModel(getUniqueServiceName(), consumerModel);\n}\n')])])]),t("p",[e._v("上面的代码很长，做的事情比较多。这里我根据代码逻辑，对代码进行了分块，下面我们一起来看一下。")]),e._v(" "),t("p",[e._v("首先是方法开始到分割线1之间的代码。这段代码主要用于检测 ConsumerConfig 实例是否存在，如不存在则创建一个新的实例，然后通过系统变量或 dubbo.properties 配置文件填充 ConsumerConfig 的字段。接着是检测泛化配置，并根据配置设置 interfaceClass 的值。本段代码逻辑大致就是这些，接着来看分割线1到分割线2之间的逻辑。这段逻辑用于从系统属性或配置文件中加载与接口名相对应的配置，并将解析结果赋值给 url 字段。url 字段的作用一般是用于点对点调用。继续向下看，分割线2和分割线3之间的代码用于检测几个核心配置类是否为空，为空则尝试从其他配置类中获取。分割线3与分割线4之间的代码主要是用于收集各种配置，并将配置存储到 map 中。分割线4和分割线5之间的代码用于处理 MethodConfig 实例。该实例包含了事件通知配置，比如 onreturn、onthrow、oninvoke 等。分割线5到方法结尾的代码主要用于解析服务消费者 ip，以及调用 createProxy 创建代理对象。关于该方法的详细分析，将会在接下来的章节中展开。")]),e._v(" "),t("p",[e._v("到这里，关于配置的检查与处理过长就分析完了。这部分逻辑不是很难理解，但比较繁杂，大家需要耐心看一下。好了，本节先到这，接下来分析服务引用的过程。")]),e._v(" "),t("h3",{attrs:{id:"_3-2-引用服务"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-引用服务"}},[e._v("#")]),e._v(" 3.2 引用服务")]),e._v(" "),t("p",[e._v("本节我们要从 createProxy 开始看起。createProxy 这个方法表面上看起来只是用于创建代理对象，但实际上并非如此。该方法还会调用其他方法构建以及合并 Invoker 实例。具体细节如下。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('private T createProxy(Map<String, String> map) {\n    URL tmpUrl = new URL("temp", "localhost", 0, map);\n    final boolean isJvmRefer;\n    if (isInjvm() == null) {\n        // url 配置被指定，则不做本地引用\n        if (url != null && url.length() > 0) {\n            isJvmRefer = false;\n        // 根据 url 的协议、scope 以及 injvm 等参数检测是否需要本地引用\n        // 比如如果用户显式配置了 scope=local，此时 isInjvmRefer 返回 true\n        } else if (InjvmProtocol.getInjvmProtocol().isInjvmRefer(tmpUrl)) {\n            isJvmRefer = true;\n        } else {\n            isJvmRefer = false;\n        }\n    } else {\n        // 获取 injvm 配置值\n        isJvmRefer = isInjvm().booleanValue();\n    }\n\n    // 本地引用\n    if (isJvmRefer) {\n        // 生成本地引用 URL，协议为 injvm\n        URL url = new URL(Constants.LOCAL_PROTOCOL, NetUtils.LOCALHOST, 0, interfaceClass.getName()).addParameters(map);\n        // 调用 refer 方法构建 InjvmInvoker 实例\n        invoker = refprotocol.refer(interfaceClass, url);\n        \n    // 远程引用\n    } else {\n        // url 不为空，表明用户可能想进行点对点调用\n        if (url != null && url.length() > 0) {\n            // 当需要配置多个 url 时，可用分号进行分割，这里会进行切分\n            String[] us = Constants.SEMICOLON_SPLIT_PATTERN.split(url);\n            if (us != null && us.length > 0) {\n                for (String u : us) {\n                    URL url = URL.valueOf(u);\n                    if (url.getPath() == null || url.getPath().length() == 0) {\n                        // 设置接口全限定名为 url 路径\n                        url = url.setPath(interfaceName);\n                    }\n                    \n                    // 检测 url 协议是否为 registry，若是，表明用户想使用指定的注册中心\n                    if (Constants.REGISTRY_PROTOCOL.equals(url.getProtocol())) {\n                        // 将 map 转换为查询字符串，并作为 refer 参数的值添加到 url 中\n                        urls.add(url.addParameterAndEncoded(Constants.REFER_KEY, StringUtils.toQueryString(map)));\n                    } else {\n                        // 合并 url，移除服务提供者的一些配置（这些配置来源于用户配置的 url 属性），\n                        // 比如线程池相关配置。并保留服务提供者的部分配置，比如版本，group，时间戳等\n                        // 最后将合并后的配置设置为 url 查询字符串中。\n                        urls.add(ClusterUtils.mergeUrl(url, map));\n                    }\n                }\n            }\n        } else {\n            // 加载注册中心 url\n            List<URL> us = loadRegistries(false);\n            if (us != null && !us.isEmpty()) {\n                for (URL u : us) {\n                    URL monitorUrl = loadMonitor(u);\n                    if (monitorUrl != null) {\n                        map.put(Constants.MONITOR_KEY, URL.encode(monitorUrl.toFullString()));\n                    }\n                    // 添加 refer 参数到 url 中，并将 url 添加到 urls 中\n                    urls.add(u.addParameterAndEncoded(Constants.REFER_KEY, StringUtils.toQueryString(map)));\n                }\n            }\n\n            // 未配置注册中心，抛出异常\n            if (urls.isEmpty()) {\n                throw new IllegalStateException("No such any registry to reference...");\n            }\n        }\n\n        // 单个注册中心或服务提供者(服务直联，下同)\n        if (urls.size() == 1) {\n            // 调用 RegistryProtocol 的 refer 构建 Invoker 实例\n            invoker = refprotocol.refer(interfaceClass, urls.get(0));\n            \n        // 多个注册中心或多个服务提供者，或者两者混合\n        } else {\n            List<Invoker<?>> invokers = new ArrayList<Invoker<?>>();\n            URL registryURL = null;\n\n            // 获取所有的 Invoker\n            for (URL url : urls) {\n                // 通过 refprotocol 调用 refer 构建 Invoker，refprotocol 会在运行时\n                // 根据 url 协议头加载指定的 Protocol 实例，并调用实例的 refer 方法\n                invokers.add(refprotocol.refer(interfaceClass, url));\n                if (Constants.REGISTRY_PROTOCOL.equals(url.getProtocol())) {\n                    registryURL = url;\n                }\n            }\n            if (registryURL != null) {\n                // 如果注册中心链接不为空，则将使用 AvailableCluster\n                URL u = registryURL.addParameter(Constants.CLUSTER_KEY, AvailableCluster.NAME);\n                // 创建 StaticDirectory 实例，并由 Cluster 对多个 Invoker 进行合并\n                invoker = cluster.join(new StaticDirectory(u, invokers));\n            } else {\n                invoker = cluster.join(new StaticDirectory(invokers));\n            }\n        }\n    }\n\n    Boolean c = check;\n    if (c == null && consumer != null) {\n        c = consumer.isCheck();\n    }\n    if (c == null) {\n        c = true;\n    }\n    \n    // invoker 可用性检查\n    if (c && !invoker.isAvailable()) {\n        throw new IllegalStateException("No provider available for the service...");\n    }\n\n    // 生成代理类\n    return (T) proxyFactory.getProxy(invoker);\n}\n')])])]),t("p",[e._v("上面代码很多，不过逻辑比较清晰。首先根据配置检查是否为本地调用，若是，则调用 InjvmProtocol 的 refer 方法生成 InjvmInvoker 实例。若不是，则读取直联配置项，或注册中心 url，并将读取到的 url 存储到 urls 中。然后，根据 urls 元素数量进行后续操作。若 urls 元素数量为1，则直接通过 Protocol 自适应拓展构建 Invoker 实例接口。若 urls 元素数量大于1，即存在多个注册中心或服务直联 url，此时先根据 url 构建 Invoker。然后再通过 Cluster 合并多个 Invoker，最后调用 ProxyFactory 生成代理类。这里，Invoker 的构建过程以及代理类的过程比较重要，因此我将分两小节对这两个过程进行分析。")]),e._v(" "),t("h4",{attrs:{id:"_3-2-1-创建-invoker"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-1-创建-invoker"}},[e._v("#")]),e._v(" 3.2.1 创建 Invoker")]),e._v(" "),t("p",[e._v("Invoker 是 Dubbo 的核心模型，代表一个可执行体。在服务提供方，Invoker 用于调用服务提供类。在服务消费方，Invoker 用于执行远程调用。Invoker 在 Dubbo 中的位置十分重要，因此我们有必要去搞懂它。从前面的代码中可知，Invoker 是由 Protocol 实现类构建的。Protocol 实现类有很多，这里我会分析最常用的两个，分别是 RegistryProtocol 和 DubboProtocol，其他的大家自行分析。下面先来分析 DubboProtocol 的 refer 方法源码。如下：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("public <T> Invoker<T> refer(Class<T> serviceType, URL url) throws RpcException {\n    optimizeSerialization(url);\n    // 创建 DubboInvoker\n    DubboInvoker<T> invoker = new DubboInvoker<T>(serviceType, url, getClients(url), invokers);\n    invokers.add(invoker);\n    return invoker;\n}\n")])])]),t("p",[e._v("上面方法看起来比较简单，不过这里有一个调用需要我们注意一下，即 getClients。这个方法用于获取客户端实例，实例类型为 ExchangeClient。ExchangeClient 实际上并不具备通信能力，因此它需要更底层的客户端实例进行通信。比如 NettyClient、MinaClient 等，默认情况下，Dubbo 使用 NettyClient 进行通信。接下来，我们简单看一下 getClients 方法的逻辑。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("private ExchangeClient[] getClients(URL url) {\n    // 是否共享连接\n    boolean service_share_connect = false;\n  \t// 获取连接数，默认为0，表示未配置\n    int connections = url.getParameter(Constants.CONNECTIONS_KEY, 0);\n    // 如果未配置 connections，则共享连接\n    if (connections == 0) {\n        service_share_connect = true;\n        connections = 1;\n    }\n\n    ExchangeClient[] clients = new ExchangeClient[connections];\n    for (int i = 0; i < clients.length; i++) {\n        if (service_share_connect) {\n            // 获取共享客户端\n            clients[i] = getSharedClient(url);\n        } else {\n            // 初始化新的客户端\n            clients[i] = initClient(url);\n        }\n    }\n    return clients;\n}\n")])])]),t("p",[e._v("这里根据 connections 数量决定是获取共享客户端还是创建新的客户端实例，默认情况下，使用共享客户端实例。不过 getSharedClient 方法中也会调用 initClient 方法，因此下面我们一起看一下这两个方法。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("private ExchangeClient getSharedClient(URL url) {\n    String key = url.getAddress();\n    // 获取带有“引用计数”功能的 ExchangeClient\n    ReferenceCountExchangeClient client = referenceClientMap.get(key);\n    if (client != null) {\n        if (!client.isClosed()) {\n            // 增加引用计数\n            client.incrementAndGetCount();\n            return client;\n        } else {\n            referenceClientMap.remove(key);\n        }\n    }\n\n    locks.putIfAbsent(key, new Object());\n    synchronized (locks.get(key)) {\n        if (referenceClientMap.containsKey(key)) {\n            return referenceClientMap.get(key);\n        }\n\n        // 创建 ExchangeClient 客户端\n        ExchangeClient exchangeClient = initClient(url);\n        // 将 ExchangeClient 实例传给 ReferenceCountExchangeClient，这里明显用了装饰模式\n        client = new ReferenceCountExchangeClient(exchangeClient, ghostClientMap);\n        referenceClientMap.put(key, client);\n        ghostClientMap.remove(key);\n        locks.remove(key);\n        return client;\n    }\n}\n")])])]),t("p",[e._v("上面方法先访问缓存，若缓存未命中，则通过 initClient 方法创建新的 ExchangeClient 实例，并将该实例传给 ReferenceCountExchangeClient 构造方法创建一个带有引用技术功能的 ExchangeClient 实例。ReferenceCountExchangeClient 内部实现比较简单，就不分析了。下面我们再来看一下 initClient 方法的代码。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('private ExchangeClient initClient(URL url) {\n\n    // 获取客户端类型，默认为 netty\n    String str = url.getParameter(Constants.CLIENT_KEY, url.getParameter(Constants.SERVER_KEY, Constants.DEFAULT_REMOTING_CLIENT));\n\n    // 添加编解码和心跳包参数到 url 中\n    url = url.addParameter(Constants.CODEC_KEY, DubboCodec.NAME);\n    url = url.addParameterIfAbsent(Constants.HEARTBEAT_KEY, String.valueOf(Constants.DEFAULT_HEARTBEAT));\n\n    // 检测客户端类型是否存在，不存在则抛出异常\n    if (str != null && str.length() > 0 && !ExtensionLoader.getExtensionLoader(Transporter.class).hasExtension(str)) {\n        throw new RpcException("Unsupported client type: ...");\n    }\n\n    ExchangeClient client;\n    try {\n        // 获取 lazy 配置，并根据配置值决定创建的客户端类型\n        if (url.getParameter(Constants.LAZY_CONNECT_KEY, false)) {\n            // 创建懒加载 ExchangeClient 实例\n            client = new LazyConnectExchangeClient(url, requestHandler);\n        } else {\n            // 创建普通 ExchangeClient 实例\n            client = Exchangers.connect(url, requestHandler);\n        }\n    } catch (RemotingException e) {\n        throw new RpcException("Fail to create remoting client for service...");\n    }\n    return client;\n}\n')])])]),t("p",[e._v("initClient 方法首先获取用户配置的客户端类型，默认为 netty。然后检测用户配置的客户端类型是否存在，不存在则抛出异常。最后根据 lazy 配置决定创建什么类型的客户端。这里的 LazyConnectExchangeClient 代码并不是很复杂，该类会在 request 方法被调用时通过 Exchangers 的 connect 方法创建 ExchangeClient 客户端，这里就不分析 LazyConnectExchangeClient 的代码了。下面我们分析一下 Exchangers 的 connect 方法。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('public static ExchangeClient connect(URL url, ExchangeHandler handler) throws RemotingException {\n    if (url == null) {\n        throw new IllegalArgumentException("url == null");\n    }\n    if (handler == null) {\n        throw new IllegalArgumentException("handler == null");\n    }\n    url = url.addParameterIfAbsent(Constants.CODEC_KEY, "exchange");\n    // 获取 Exchanger 实例，默认为 HeaderExchangeClient\n    return getExchanger(url).connect(url, handler);\n}\n')])])]),t("p",[e._v("如上，getExchanger 会通过 SPI 加载 HeaderExchangeClient 实例，这个方法比较简单，大家自己看一下吧。接下来分析 HeaderExchangeClient 的实现。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("public ExchangeClient connect(URL url, ExchangeHandler handler) throws RemotingException {\n    // 这里包含了多个调用，分别如下：\n    // 1. 创建 HeaderExchangeHandler 对象\n    // 2. 创建 DecodeHandler 对象\n    // 3. 通过 Transporters 构建 Client 实例\n    // 4. 创建 HeaderExchangeClient 对象\n    return new HeaderExchangeClient(Transporters.connect(url, new DecodeHandler(new HeaderExchangeHandler(handler))), true);\n}\n")])])]),t("p",[e._v("这里的调用比较多，我们这里重点看一下 Transporters 的 connect 方法。如下：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('public static Client connect(URL url, ChannelHandler... handlers) throws RemotingException {\n    if (url == null) {\n        throw new IllegalArgumentException("url == null");\n    }\n    ChannelHandler handler;\n    if (handlers == null || handlers.length == 0) {\n        handler = new ChannelHandlerAdapter();\n    } else if (handlers.length == 1) {\n        handler = handlers[0];\n    } else {\n        // 如果 handler 数量大于1，则创建一个 ChannelHandler 分发器\n        handler = new ChannelHandlerDispatcher(handlers);\n    }\n    \n    // 获取 Transporter 自适应拓展类，并调用 connect 方法生成 Client 实例\n    return getTransporter().connect(url, handler);\n}\n')])])]),t("p",[e._v("这里，getTransporter 方法返回的是自适应拓展类，该类会在运行时根据客户端类型加载指定的 Transporter 实现类。若用户未显示配置客户端类型，则默认加载 NettyTransporter，并调用该类的 connect 方法。如下：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("public Client connect(URL url, ChannelHandler listener) throws RemotingException {\n    // 创建 NettyClient 对象\n    return new NettyClient(url, listener);\n}\n")])])]),t("p",[e._v("到这里就不继续跟下去了，在往下就是通过 Netty 提供的接口构建 Netty 客户端了，大家有兴趣自己看看。到这里，关于 DubboProtocol 的 refer 方法就分析完了。接下来，继续分析 RegistryProtocol 的 refer 方法逻辑。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('public <T> Invoker<T> refer(Class<T> type, URL url) throws RpcException {\n    // 取 registry 参数值，并将其设置为协议头\n    url = url.setProtocol(url.getParameter(Constants.REGISTRY_KEY, Constants.DEFAULT_REGISTRY)).removeParameter(Constants.REGISTRY_KEY);\n    // 获取注册中心实例\n    Registry registry = registryFactory.getRegistry(url);\n    // 这个判断暂时不知道有什么意图，为什么要给 RegistryService 类型生成 Invoker ？\n    if (RegistryService.class.equals(type)) {\n        return proxyFactory.getInvoker((T) registry, type, url);\n    }\n\n    // 将 url 查询字符串转为 Map\n    Map<String, String> qs = StringUtils.parseQueryString(url.getParameterAndDecoded(Constants.REFER_KEY));\n    // 获取 group 配置\n    String group = qs.get(Constants.GROUP_KEY);\n    if (group != null && group.length() > 0) {\n        if ((Constants.COMMA_SPLIT_PATTERN.split(group)).length > 1\n                || "*".equals(group)) {\n            // 通过 SPI 加载 MergeableCluster 实例，并调用 doRefer 继续执行引用服务逻辑\n            return doRefer(getMergeableCluster(), registry, type, url);\n        }\n    }\n    \n    // 调用 doRefer 继续执行引用服务逻辑\n    return doRefer(cluster, registry, type, url);\n}\n')])])]),t("p",[e._v("上面代码首先为 url 设置协议头，然后根据 url 参数加载注册中心实例。接下来对 RegistryService 继续针对性处理，这个处理逻辑我不是很明白，不知道为什么要为 RegistryService 类型生成 Invoker，有知道同学麻烦告知一下。然后就是获取 group 配置，根据 group 配置决定 doRefer 第一个参数的类型。这里的重点是 doRefer 方法，如下：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('private <T> Invoker<T> doRefer(Cluster cluster, Registry registry, Class<T> type, URL url) {\n    // 创建 RegistryDirectory 实例\n    RegistryDirectory<T> directory = new RegistryDirectory<T>(type, url);\n    // 设置注册中心和协议\n    directory.setRegistry(registry);\n    directory.setProtocol(protocol);\n    Map<String, String> parameters = new HashMap<String, String>(directory.getUrl().getParameters());\n    // 生成服务消费者链接\n    URL subscribeUrl = new URL(Constants.CONSUMER_PROTOCOL, parameters.remove(Constants.REGISTER_IP_KEY), 0, type.getName(), parameters);\n\n    // 注册服务消费者，在 consumers 目录下新节点\n    if (!Constants.ANY_VALUE.equals(url.getServiceInterface())\n            && url.getParameter(Constants.REGISTER_KEY, true)) {\n        registry.register(subscribeUrl.addParameters(Constants.CATEGORY_KEY, Constants.CONSUMERS_CATEGORY,\n                Constants.CHECK_KEY, String.valueOf(false)));\n    }\n\n    // 订阅 providers、configurators、routers 等节点数据\n    directory.subscribe(subscribeUrl.addParameter(Constants.CATEGORY_KEY,\n            Constants.PROVIDERS_CATEGORY\n                    + "," + Constants.CONFIGURATORS_CATEGORY\n                    + "," + Constants.ROUTERS_CATEGORY));\n\n    // 一个注册中心可能有多个服务提供者，因此这里需要将多个服务提供者合并为一个\n    Invoker invoker = cluster.join(directory);\n    ProviderConsumerRegTable.registerConsumer(invoker, url, subscribeUrl, directory);\n    return invoker;\n}\n')])])]),t("p",[e._v("如上，doRefer 方法创建一个 RegistryDirectory 实例，然后生成服务者消费者链接，并向注册中心进行注册。注册完毕后，紧接着订阅 providers、configurators、routers 等节点下的数据。完成订阅后，RegistryDirectory 会收到这几个节点下的子节点信息，比如可以获取到服务提供者的配置信息。由于一个服务可能部署在多台服务器上，这样就会在 providers 产生多个节点，这个时候就需要 Cluster 将多个服务节点合并为一个，并生成一个 Invoker。关于 RegistryDirectory 和 Cluster，本文不打算进行分析，相关分析将会在随后的文章中展开。")]),e._v(" "),t("p",[e._v("好了，关于 Invoker 的创建的逻辑就先分析到这。逻辑比较多，大家耐心看一下。")]),e._v(" "),t("h4",{attrs:{id:"_3-2-2-创建代理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-2-创建代理"}},[e._v("#")]),e._v(" 3.2.2 创建代理")]),e._v(" "),t("p",[e._v("Invoker 创建完毕后，接下来要做的事情是为服务接口生成代理对象。有了代理对象，我们就可以通过代理对象进行远程调用。代理对象生成的入口方法为在 ProxyFactory 的 getProxy，接下来进行分析。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('public <T> T getProxy(Invoker<T> invoker) throws RpcException {\n    // 调用重载方法\n    return getProxy(invoker, false);\n}\n\npublic <T> T getProxy(Invoker<T> invoker, boolean generic) throws RpcException {\n    Class<?>[] interfaces = null;\n    // 获取接口列表\n    String config = invoker.getUrl().getParameter("interfaces");\n    if (config != null && config.length() > 0) {\n        // 切分接口列表\n        String[] types = Constants.COMMA_SPLIT_PATTERN.split(config);\n        if (types != null && types.length > 0) {\n            interfaces = new Class<?>[types.length + 2];\n            // 设置服务接口类和 EchoService.class 到 interfaces 中\n            interfaces[0] = invoker.getInterface();\n            interfaces[1] = EchoService.class;\n            for (int i = 0; i < types.length; i++) {\n                // 加载接口类\n                interfaces[i + 1] = ReflectUtils.forName(types[i]);\n            }\n        }\n    }\n    if (interfaces == null) {\n        interfaces = new Class<?>[]{invoker.getInterface(), EchoService.class};\n    }\n\n    // 为 http 和 hessian 协议提供泛化调用支持，参考 pull request #1827\n    if (!invoker.getInterface().equals(GenericService.class) && generic) {\n        int len = interfaces.length;\n        Class<?>[] temp = interfaces;\n        // 创建新的 interfaces 数组\n        interfaces = new Class<?>[len + 1];\n        System.arraycopy(temp, 0, interfaces, 0, len);\n        // 设置 GenericService.class 到数组中\n        interfaces[len] = GenericService.class;\n    }\n\n    // 调用重载方法\n    return getProxy(invoker, interfaces);\n}\n\npublic abstract <T> T getProxy(Invoker<T> invoker, Class<?>[] types);\n')])])]),t("p",[e._v("如上，上面大段代码都是用来获取 interfaces 数组的，因此我们需要继续往下看。getProxy(Invoker, Class<?>[]) 这个方法是一个抽象方法，下面我们到 JavassistProxyFactory 类中看一下该方法的实现代码。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("public <T> T getProxy(Invoker<T> invoker, Class<?>[] interfaces) {\n    // 生成 Proxy 子类（Proxy 是抽象类）。并调用Proxy 子类的 newInstance 方法生成 Proxy 实例\n    return (T) Proxy.getProxy(interfaces).newInstance(new InvokerInvocationHandler(invoker));\n}\n")])])]),t("p",[e._v("上面代码并不多，首先是通过 Proxy 的 getProxy 方法获取 Proxy 子类，然后创建 InvokerInvocationHandler 对象，并将该对象传给 newInstance 生成 Proxy 实例。InvokerInvocationHandler 实现自 JDK 的 InvocationHandler 接口，具体的用途是拦截接口类调用。该类逻辑比较简单，这里就不分析了。下面我们重点关注一下 Proxy 的 getProxy 方法，如下。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('public static Proxy getProxy(Class<?>... ics) {\n    // 调用重载方法\n    return getProxy(ClassHelper.getClassLoader(Proxy.class), ics);\n}\n\npublic static Proxy getProxy(ClassLoader cl, Class<?>... ics) {\n    if (ics.length > 65535)\n        throw new IllegalArgumentException("interface limit exceeded");\n\n    StringBuilder sb = new StringBuilder();\n    // 遍历接口列表\n    for (int i = 0; i < ics.length; i++) {\n        String itf = ics[i].getName();\n        // 检测类型是否为接口\n        if (!ics[i].isInterface())\n            throw new RuntimeException(itf + " is not a interface.");\n\n        Class<?> tmp = null;\n        try {\n            // 重新加载接口类\n            tmp = Class.forName(itf, false, cl);\n        } catch (ClassNotFoundException e) {\n        }\n\n        // 检测接口是否相同，这里 tmp 有可能为空\n        if (tmp != ics[i])\n            throw new IllegalArgumentException(ics[i] + " is not visible from class loader");\n\n        // 拼接接口全限定名，分隔符为 ;\n        sb.append(itf).append(\';\');\n    }\n\n    // 使用拼接后接口名作为 key\n    String key = sb.toString();\n\n    Map<String, Object> cache;\n    synchronized (ProxyCacheMap) {\n        cache = ProxyCacheMap.get(cl);\n        if (cache == null) {\n            cache = new HashMap<String, Object>();\n            ProxyCacheMap.put(cl, cache);\n        }\n    }\n\n    Proxy proxy = null;\n    synchronized (cache) {\n        do {\n            // 从缓存中获取 Reference<Proxy> 实例\n            Object value = cache.get(key);\n            if (value instanceof Reference<?>) {\n                proxy = (Proxy) ((Reference<?>) value).get();\n                if (proxy != null) {\n                    return proxy;\n                }\n            }\n\n            // 多线程控制，保证只有一个线程可以进行后续操作\n            if (value == PendingGenerationMarker) {\n                try {\n                    // 其他线程在此处进行等待\n                    cache.wait();\n                } catch (InterruptedException e) {\n                }\n            } else {\n                // 放置标志位到缓存中，并跳出 while 循环进行后续操作\n                cache.put(key, PendingGenerationMarker);\n                break;\n            }\n        }\n        while (true);\n    }\n\n    long id = PROXY_CLASS_COUNTER.getAndIncrement();\n    String pkg = null;\n    ClassGenerator ccp = null, ccm = null;\n    try {\n        // 创建 ClassGenerator 对象\n        ccp = ClassGenerator.newInstance(cl);\n\n        Set<String> worked = new HashSet<String>();\n        List<Method> methods = new ArrayList<Method>();\n\n        for (int i = 0; i < ics.length; i++) {\n            // 检测接口访问级别是否为 protected 或 privete\n            if (!Modifier.isPublic(ics[i].getModifiers())) {\n                // 获取接口包名\n                String npkg = ics[i].getPackage().getName();\n                if (pkg == null) {\n                    pkg = npkg;\n                } else {\n                    if (!pkg.equals(npkg))\n                        // 非 public 级别的接口必须在同一个包下，否者抛出异常\n                        throw new IllegalArgumentException("non-public interfaces from different packages");\n                }\n            }\n            \n            // 添加接口到 ClassGenerator 中\n            ccp.addInterface(ics[i]);\n\n            // 遍历接口方法\n            for (Method method : ics[i].getMethods()) {\n                // 获取方法描述，可理解为方法签名\n                String desc = ReflectUtils.getDesc(method);\n                // 如果已包含在 worked 中，则忽略。考虑这种情况，\n                // A 接口和 B 接口中包含一个完全相同的方法\n                if (worked.contains(desc))\n                    continue;\n                worked.add(desc);\n\n                int ix = methods.size();\n                // 获取方法返回值类型\n                Class<?> rt = method.getReturnType();\n                // 获取参数列表\n                Class<?>[] pts = method.getParameterTypes();\n\n                // 生成 Object[] args = new Object[1...N]\n                StringBuilder code = new StringBuilder("Object[] args = new Object[").append(pts.length).append("];");\n                for (int j = 0; j < pts.length; j++)\n                    // 生成 args[1...N] = ($w)$1...N;\n                    code.append(" args[").append(j).append("] = ($w)$").append(j + 1).append(";");\n                // 生成 InvokerHandler 接口的 invoker 方法调用语句，如下：\n                // Object ret = handler.invoke(this, methods[1...N], args);\n                code.append(" Object ret = handler.invoke(this, methods[" + ix + "], args);");\n\n                // 返回值不为 void\n                if (!Void.TYPE.equals(rt))\n                    // 生成返回语句，形如 return (java.lang.String) ret;\n                    code.append(" return ").append(asArgument(rt, "ret")).append(";");\n\n                methods.add(method);\n                // 添加方法名、访问控制符、参数列表、方法代码等信息到 ClassGenerator 中 \n                ccp.addMethod(method.getName(), method.getModifiers(), rt, pts, method.getExceptionTypes(), code.toString());\n            }\n        }\n\n        if (pkg == null)\n            pkg = PACKAGE_NAME;\n\n        // 构建接口代理类名称：pkg + ".proxy" + id，比如 com.tianxiaobo.proxy0\n        String pcn = pkg + ".proxy" + id;\n        ccp.setClassName(pcn);\n        ccp.addField("public static java.lang.reflect.Method[] methods;");\n        // 生成 private java.lang.reflect.InvocationHandler handler;\n        ccp.addField("private " + InvocationHandler.class.getName() + " handler;");\n\n        // 为接口代理类添加带有 InvocationHandler 参数的构造方法，比如：\n        // porxy0(java.lang.reflect.InvocationHandler arg0) {\n        //     handler=$1;\n    \t// }\n        ccp.addConstructor(Modifier.PUBLIC, new Class<?>[]{InvocationHandler.class}, new Class<?>[0], "handler=$1;");\n        // 为接口代理类添加默认构造方法\n        ccp.addDefaultConstructor();\n        \n        // 生成接口代理类\n        Class<?> clazz = ccp.toClass();\n        clazz.getField("methods").set(null, methods.toArray(new Method[0]));\n\n        // 构建 Proxy 子类名称，比如 Proxy1，Proxy2 等\n        String fcn = Proxy.class.getName() + id;\n        ccm = ClassGenerator.newInstance(cl);\n        ccm.setClassName(fcn);\n        ccm.addDefaultConstructor();\n        ccm.setSuperClass(Proxy.class);\n        // 为 Proxy 的抽象方法 newInstance 生成实现代码，形如：\n        // public Object newInstance(java.lang.reflect.InvocationHandler h) { \n        //     return new com.tianxiaobo.proxy0($1);\n        // }\n        ccm.addMethod("public Object newInstance(" + InvocationHandler.class.getName() + " h){ return new " + pcn + "($1); }");\n        // 生成 Proxy 实现类\n        Class<?> pc = ccm.toClass();\n        // 通过反射创建 Proxy 实例\n        proxy = (Proxy) pc.newInstance();\n    } catch (RuntimeException e) {\n        throw e;\n    } catch (Exception e) {\n        throw new RuntimeException(e.getMessage(), e);\n    } finally {\n        if (ccp != null)\n            // 释放资源\n            ccp.release();\n        if (ccm != null)\n            ccm.release();\n        synchronized (cache) {\n            if (proxy == null)\n                cache.remove(key);\n            else\n                // 写缓存\n                cache.put(key, new WeakReference<Proxy>(proxy));\n            // 唤醒其他等待线程\n            cache.notifyAll();\n        }\n    }\n    return proxy;\n}\n')])])]),t("p",[e._v("上面代码比较复杂，我也写了很多注释。大家在阅读这段代码时，要搞清楚 ccp 和 ccm 的用途，不然会被搞晕。ccp 用于为服务接口生成代理类，比如我们有一个 DemoService 接口，这个接口代理类就是由 ccp 生成的。ccm 则是用于为 org.apache.dubbo.common.bytecode.Proxy 抽象类生成子类，主要是实现 Proxy 的抽象方法。下面以 org.apache.dubbo.demo.DemoService 这个接口为例，来看一下该接口代理类代码大致是怎样的（忽略 EchoService 接口）。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("package org.apache.dubbo.common.bytecode;\n\npublic class proxy0 implements org.apache.dubbo.demo.DemoService {\n\n    public static java.lang.reflect.Method[] methods;\n\n    private java.lang.reflect.InvocationHandler handler;\n\n    public proxy0() {\n    }\n\n    public proxy0(java.lang.reflect.InvocationHandler arg0) {\n        handler = $1;\n    }\n\n    public java.lang.String sayHello(java.lang.String arg0) {\n        Object[] args = new Object[1];\n        args[0] = ($w) $1;\n        Object ret = handler.invoke(this, methods[0], args);\n        return (java.lang.String) ret;\n    }\n}\n")])])]),t("p",[e._v("好了，到这里代理类生成逻辑就分析完了。整个过程比较复杂，大家需要耐心看一下，本节点到这里。")])])}),[],!1,null,null,null);n.default=a.exports}}]);