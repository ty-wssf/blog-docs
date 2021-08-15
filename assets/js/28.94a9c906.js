(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{457:function(t,a,s){"use strict";s.r(a);var n=s(30),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"hystrix容错保护"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#hystrix容错保护"}},[t._v("#")]),t._v(" Hystrix容错保护")]),t._v(" "),s("p",[t._v("在上一节我们已经使用OpenFeign完成了服务间的调用。想一下，假如我们一个服务链路上上下游有十几个服务，每个服务有若干个节点，其中一个节点故障，上游请求打到故障的节点，加入请求一直阻塞，大量堆积的请求可能会把服务打崩，可能导致级联式的失败，甚至整个链路失败，这就是所谓的"),s("code",[t._v("服务雪崩")]),t._v("，严重可能直接导致系统挂掉。为了避免这种可怕的情况，必要的容错保护机制是必需的。")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master/img/938ad770a2f24830a0eaa0b05ce008c1~tplv-k3u1fbpfcp-watermark.png",alt:"服务雪崩"}})]),t._v(" "),s("h2",{attrs:{id:"hystrix简介"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#hystrix简介"}},[t._v("#")]),t._v(" Hystrix简介")]),t._v(" "),s("p",[t._v("Hystrix是Netflix的一个重要组件，提供了断路器、资源隔离与自我修复功能。")]),t._v(" "),s("p",[t._v("如下是Hystrix作为断路器，阻止级联失败。")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master/img/9fe45632e0f545788c3185d96b646ac3~tplv-k3u1fbpfcp-watermark.png",alt:"hystrix阻止级联失败"}})]),t._v(" "),s("p",[t._v("但是Hystrix1.5.18版本之后进入了维护模式，我们采用的就是这个版本。在SpringCloud Alibaba的体系，有另外一个组件sentinel可以作为替代品，在后面我们会用到。")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master/img/36539dbf4e3b46f99df1d2207e3a3cd8~tplv-k3u1fbpfcp-watermark.png",alt:"Hystrix停止维护"}})]),t._v(" "),s("p",[t._v("尽管Hystrix已经停止更新，但是经过多年迭代，目前已经是一个比较成熟的产品，所以仍然有比较广泛的应用。")]),t._v(" "),s("p",[t._v("Hystrix在SpringCloud体系的使用也非常简单，下面，我们开始吧！")]),t._v(" "),s("h2",{attrs:{id:"引入hystrix"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#引入hystrix"}},[t._v("#")]),t._v(" 引入Hystrix")]),t._v(" "),s("p",[t._v("仍然是用我们上节的例子。")]),t._v(" "),s("ul",[s("li",[t._v("采用spring-cloud-starter的方式引入：")])]),t._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[t._v("    "),s("span",{pre:!0,attrs:{class:"token generics"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("dependency"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token generics"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("groupId"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("org"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("springframework"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("cloud"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("groupId"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token generics"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("artifactId"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("spring"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("cloud"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("starter"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("netflix"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("hystrix"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("artifactId"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("dependency"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\n\n")])])]),s("ul",[s("li",[t._v("在application.yml开启hystrix：")])]),t._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[t._v("feign"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n  hystrix"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n    enabled"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v("\n\n")])])]),s("ul",[s("li",[t._v("在服务启动类加入@EnableHystrix注解，以使系统支持hystrix的功能。")])]),t._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@SpringBootApplication")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@MapperScan")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"cn.fighter3.mapper"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@EnableDiscoveryClient")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@EnableFeignClients")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("basePackages "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"cn.fighter3.client"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@EnableHystrix")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("EshopGoodsApplication")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("main")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" args"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("SpringApplication")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("run")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("EshopGoodsApplication")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" args"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n")])])]),s("ul",[s("li",[t._v("编写一个StockClientFallback类，实现StockClientFeign接口，这个类是用来干什么的呢？是用于Feign客户端远程调用失败回调的。")])]),t._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n * @Author 三分恶\n * @Date 2021/5/29\n * @Description 库存服务回调异常回调类\n */")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Component")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Slf4j")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("StockClientFallback")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("implements")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("StockClientFeign")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Integer")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("addStock")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("StockAddDTO")]),t._v(" stockAddDTO"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        log"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("error")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"库存服务-添加库存不可用！"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Integer")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getAccountById")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Integer")]),t._v(" goodsId"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        log"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("error")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"库存服务-获取库存不可用！"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n")])])]),s("ul",[s("li",[t._v("在StockClientFeign中添加失败回调配置，原来是"),s("code",[t._v('@FeignClient(value = "stock-service"）')])])]),t._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@FeignClient")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"stock-service"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" fallback "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("StockClientFallback")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n")])])]),s("p",[t._v("还有另外一种方式，可以在方法上使用"),s("code",[t._v('@HystrixCommand(fallbackMethod = "getDefaultUser")')]),t._v("来定义服务降级方法。")]),t._v(" "),s("h2",{attrs:{id:"测试hystrix"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#测试hystrix"}},[t._v("#")]),t._v(" 测试Hystrix")]),t._v(" "),s("ul",[s("li",[t._v("依次启动Nacos-Server、商品服务，注意，我们没有启动库存服务")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master/img/21e786871935465ebe9deccc1b8b943d~tplv-k3u1fbpfcp-watermark.png",alt:"服务注册信息"}})]),t._v(" "),s("ul",[s("li",[t._v("打开 "),s("a",{attrs:{href:"https://link.juejin.cn?target=http%3A%2F%2Flocalhost%3A8020%2Fdoc.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("http://localhost:8020/doc.html"),s("OutboundLink")],1),t._v(" ，调用一下添加商品接口。想一下，正常情况下，会是什么结果呢？由于库存服务没起，那么连带着商品服务也一定会返回异常，但是加入了hystrix，发现，接口返回成功的结果。")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master/img/c90ac67daf4147e19e8965690412a543~tplv-k3u1fbpfcp-watermark.png",alt:"调用添加商品接口"}})]),t._v(" "),s("p",[t._v("看一下我们打的日志，发现回调的方法被调用了。")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master/img/25766e189f0843619b5bb0175ced46f0~tplv-k3u1fbpfcp-watermark.png",alt:"错误日志"}})]),t._v(" "),s("p",[t._v("好了，Hystrix实现断路器到这就结束了。")]),t._v(" "),s("p",[t._v("作者：三分恶\n链接：https://juejin.cn/post/6979069331715915789\n来源：掘金\n著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。")])])}),[],!1,null,null,null);a.default=e.exports}}]);