(window.webpackJsonp=window.webpackJsonp||[]).push([[79],{496:function(e,t,r){"use strict";r.r(t);var n=r(30),s=Object(n.a)({},(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h1",{attrs:{id:"spring-拦截器和过滤器的区别"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#spring-拦截器和过滤器的区别"}},[e._v("#")]),e._v(" Spring 拦截器和过滤器的区别？")]),e._v(" "),r("p",[e._v("过滤器 和 拦截器 均体现了AOP的编程思想，都可以实现诸如日志记录、登录鉴权等功能，但二者的不同点也是比较多的，接下来一一说明。")]),e._v(" "),r("h2",{attrs:{id:"实现原理不同"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#实现原理不同"}},[e._v("#")]),e._v(" 实现原理不同")]),e._v(" "),r("p",[e._v("过滤器和拦截器 底层实现方式大不相同，过滤器 是基于函数回调的，拦截器 则是基于Java的反射机制（动态代理）实现的。")]),e._v(" "),r("p",[e._v("这里重点说下过滤器！")]),e._v(" "),r("p",[e._v("在我们自定义的过滤器中都会实现一个 doFilter()方法，这个方法有一个FilterChain 参数，而实际上它是一个回调接口。ApplicationFilterChain是它的实现类， 这个实现类内部也有一个 doFilter() 方法就是回调方法。")]),e._v(" "),r("div",{staticClass:"language-text extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("public interface FilterChain {\n    void doFilter(ServletRequest var1, ServletResponse var2) throws IOException, ServletException;\n}\n")])])]),r("p",[e._v("ApplicationFilterChain里面能拿到我们自定义的xxxFilter类，在其内部回调方法doFilter()里调用各个自定义xxxFilter过滤器，并执行 doFilter() 方法。")]),e._v(" "),r("div",{staticClass:"language-text extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("public final class ApplicationFilterChain implements FilterChain {\n    @Override\n    public void doFilter(ServletRequest request, ServletResponse response) {\n            ...//省略\n            internalDoFilter(request,response);\n    }\n \n    private void internalDoFilter(ServletRequest request, ServletResponse response){\n    if (pos &lt; n) {\n            //获取第pos个filter    \n            ApplicationFilterConfig filterConfig = filters[pos++];        \n            Filter filter = filterConfig.getFilter();\n            ...\n            filter.doFilter(request, response, this);\n        }\n    }\n \n}\n")])])]),r("p",[e._v("而每个xxxFilter 会先执行自身的 doFilter() 过滤逻辑，最后在执行结束前会执行filterChain.doFilter(servletRequest, servletResponse)，也就是回调ApplicationFilterChain的doFilter() 方法，以此循环执行实现函数回调。")]),e._v(" "),r("div",{staticClass:"language-text extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("  @Override\n    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {\n\n        filterChain.doFilter(servletRequest, servletResponse);\n    }\n")])])]),r("h2",{attrs:{id:"使用范围不同"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#使用范围不同"}},[e._v("#")]),e._v(" 使用范围不同")]),e._v(" "),r("p",[e._v("我们看到过滤器 实现的是 javax.servlet.Filter 接口，而这个接口是在Servlet规范中定义的，也就是说过滤器Filter 的使用要依赖于Tomcat等容器，导致它只能在web程序中使用。")]),e._v(" "),r("p",[r("img",{attrs:{src:"https://pic1.zhimg.com/50/v2-d3481121d481d851fdc8a67ec4580521_720w.jpg?source=1940ef5c",alt:"img"}}),r("img",{attrs:{src:"https://pic1.zhimg.com/80/v2-d3481121d481d851fdc8a67ec4580521_720w.jpg?source=1940ef5c",alt:"img"}})]),e._v(" "),r("p",[e._v("而拦截器(Interceptor) 它是一个Spring组件，并由Spring容器管理，并不依赖Tomcat等容器，是可以单独使用的。不仅能应用在web程序中，也可以用于Application、Swing等程序中。")]),e._v(" "),r("p",[r("img",{attrs:{src:"https://pic3.zhimg.com/50/v2-33a91948b31d469e15ba04f86c01e64d_720w.jpg?source=1940ef5c",alt:"img"}}),r("img",{attrs:{src:"https://pic3.zhimg.com/80/v2-33a91948b31d469e15ba04f86c01e64d_720w.jpg?source=1940ef5c",alt:"img"}})]),e._v(" "),r("h2",{attrs:{id:"触发时机不同"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#触发时机不同"}},[e._v("#")]),e._v(" 触发时机不同")]),e._v(" "),r("p",[e._v("过滤器 和 拦截器的触发时机也不同，我们看下边这张图。")]),e._v(" "),r("p",[r("img",{attrs:{src:"https://pica.zhimg.com/50/v2-66c2ba948283c44f9e07d6af8933caf9_720w.jpg?source=1940ef5c",alt:"img"}}),r("img",{attrs:{src:"https://pica.zhimg.com/80/v2-66c2ba948283c44f9e07d6af8933caf9_720w.jpg?source=1940ef5c",alt:"img"}})]),e._v(" "),r("p",[e._v("过滤器Filter是在请求进入容器后，但在进入servlet之前进行预处理，请求结束是在servlet处理完以后。")]),e._v(" "),r("p",[e._v("拦截器 Interceptor 是在请求进入servlet后，在进入Controller之前进行预处理的，Controller 中渲染了对应的视图之后请求结束。")]),e._v(" "),r("p",[e._v("作者：华为云开发者社区\n链接：https://www.zhihu.com/question/30212464/answer/1786967139\n来源：知乎\n著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。")]),e._v(" "),r("h2",{attrs:{id:"拦截的请求范围不同"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#拦截的请求范围不同"}},[e._v("#")]),e._v(" "),r("strong",[e._v("拦截的请求范围不同")])]),e._v(" "),r("p",[e._v("在上边我们已经同时配置了过滤器和拦截器，再建一个Controller接收请求测试一下。")]),e._v(" "),r("div",{staticClass:"language-text extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v('@Controller\n@RequestMapping()\npublic class Test {\n\n    @RequestMapping("/test1")\n    @ResponseBody\n    public String test1(String a) {\n        System.out.println("我是controller");\n        return null;\n    }\n}\n')])])]),r("p",[e._v("项目启动过程中发现，过滤器的init()方法，随着容器的启动进行了初始化。")]),e._v(" "),r("p",[r("img",{attrs:{src:"https://pica.zhimg.com/50/v2-b4b7ff40f48a1c4901610a87d8974cd9_720w.jpg?source=1940ef5c",alt:"img"}}),r("img",{attrs:{src:"https://pica.zhimg.com/80/v2-b4b7ff40f48a1c4901610a87d8974cd9_720w.jpg?source=1940ef5c",alt:"img"}})]),e._v(" "),r("p",[e._v("此时浏览器发送请求，F12 看到居然有两个请求，一个是我们自定义的 Controller 请求，另一个是访问静态图标资源的请求。")]),e._v(" "),r("p",[r("img",{attrs:{src:"https://pic3.zhimg.com/50/v2-dbba2f1605fee3489550cf8d6ed88547_720w.jpg?source=1940ef5c",alt:"img"}}),r("img",{attrs:{src:"https://pic3.zhimg.com/80/v2-dbba2f1605fee3489550cf8d6ed88547_720w.jpg?source=1940ef5c",alt:"img"}})]),e._v(" "),r("p",[e._v("看到控制台的打印日志如下：")]),e._v(" "),r("p",[e._v("执行顺序 ：Filter 处理中 -> Interceptor 前置 -> 我是controller -> Interceptor 处理中 -> Interceptor 处理后")]),e._v(" "),r("div",{staticClass:"language-text extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("Filter 处理中\nInterceptor 前置\nInterceptor 处理中\nInterceptor 后置\nFilter 处理中\n")])])]),r("p",[e._v("过滤器Filter执行了两次，拦截器Interceptor只执行了一次。这是因为过滤器几乎可以对所有进入容器的请求起作用，而拦截器只会对Controller中请求或访问static目录下的资源请求起作用。")]),e._v(" "),r("h2",{attrs:{id:"注入bean情况不同"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#注入bean情况不同"}},[e._v("#")]),e._v(" 注入Bean情况不同")]),e._v(" "),r("p",[e._v("在实际的业务场景中，应用到过滤器或拦截器，为处理业务逻辑难免会引入一些service服务。")]),e._v(" "),r("p",[e._v("下边我们分别在过滤器和拦截器中都注入service，看看有什么不同？")]),e._v(" "),r("div",{staticClass:"language-text extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v('@Component\npublic class TestServiceImpl implements TestService {\n\n    @Override\n    public void a() {\n        System.out.println("我是方法A");\n    }\n}\n')])])]),r("p",[e._v("过滤器中注入service，发起请求测试一下 ，日志正常打印出“我是方法A”。")]),e._v(" "),r("div",{staticClass:"language-text extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v('@Autowired\n    private TestService testService;\n\n    @Override\n    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {\n\n        System.out.println("Filter 处理中");\n        testService.a();\n        filterChain.doFilter(servletRequest, servletResponse);\n    }\nFilter 处理中\n我是方法A\nInterceptor 前置\n我是controller\nInterceptor 处理中\nInterceptor 后置\n')])])]),r("p",[e._v("在拦截器中注入service，发起请求测试一下 ，竟然TM的报错了，debug跟一下发现注入的service怎么是Null啊？")]),e._v(" "),r("p",[r("img",{attrs:{src:"https://pic1.zhimg.com/50/v2-a2c510a0ce979e35b90033599e900dab_720w.jpg?source=1940ef5c",alt:"img"}}),r("img",{attrs:{src:"https://pic1.zhimg.com/80/v2-a2c510a0ce979e35b90033599e900dab_720w.jpg?source=1940ef5c",alt:"img"}})]),e._v(" "),r("p",[e._v("这是因为加载顺序导致的问题，拦截器加载的时间点在springcontext之前，而Bean又是由spring进行管理。")]),e._v(" "),r("blockquote",[r("p",[e._v("拦截器：老子今天要进洞房；\nSpring：兄弟别闹，你媳妇我还没生出来呢！")])]),e._v(" "),r("p",[e._v("解决方案也很简单，我们在注册拦截器之前，先将Interceptor 手动进行注入。注意：在registry.addInterceptor()注册的是getMyInterceptor() 实例。")]),e._v(" "),r("div",{staticClass:"language-text extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v('@Configuration\npublic class MyMvcConfig implements WebMvcConfigurer {\n\n    @Bean\n    public MyInterceptor getMyInterceptor(){\n        System.out.println("注入了MyInterceptor");\n        return new MyInterceptor();\n    }\n \n    @Override\n    public void addInterceptors(InterceptorRegistry registry) {\n\n        registry.addInterceptor(getMyInterceptor()).addPathPatterns("/**");\n    }\n}\n')])])]),r("h2",{attrs:{id:"控制执行顺序不同"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#控制执行顺序不同"}},[e._v("#")]),e._v(" 控制执行顺序不同")]),e._v(" "),r("p",[e._v("实际开发过程中，会出现多个过滤器或拦截器同时存在的情况，不过，有时我们希望某个过滤器或拦截器能优先执行，就涉及到它们的执行顺序。")]),e._v(" "),r("p",[e._v("过滤器用@Order注解控制执行顺序，通过@Order控制过滤器的级别，值越小级别越高越先执行。")]),e._v(" "),r("div",{staticClass:"language-text extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("@Order(Ordered.HIGHEST_PRECEDENCE)\n@Component\npublic class MyFilter2 implements Filter {\n")])])]),r("p",[e._v("拦截器默认的执行顺序，就是它的注册顺序，也可以通过Order手动设置控制，值越小越先执行。")]),e._v(" "),r("div",{staticClass:"language-text extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v(' @Override\n    public void addInterceptors(InterceptorRegistry registry) {\n        registry.addInterceptor(new MyInterceptor2()).addPathPatterns("/**").order(2);\n        registry.addInterceptor(new MyInterceptor1()).addPathPatterns("/**").order(1);\n        registry.addInterceptor(new MyInterceptor()).addPathPatterns("/**").order(3);\n    }\n')])])]),r("p",[e._v("看到输出结果发现，先声明的拦截器 preHandle() 方法先执行，而postHandle()方法反而会后执行。")]),e._v(" "),r("p",[e._v("postHandle() 方法被调用的顺序跟 preHandle() 居然是相反的！如果实际开发中严格要求执行顺序，那就需要特别注意这一点。")]),e._v(" "),r("div",{staticClass:"language-text extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("Interceptor1 前置\nInterceptor2 前置\nInterceptor 前置\n我是controller\nInterceptor 处理中\nInterceptor2 处理中\nInterceptor1 处理中\nInterceptor 后置\nInterceptor2 处理后\nInterceptor1 处理后\n")])])]),r("p",[e._v("那为什么会这样呢？ 得到答案就只能看源码了，我们要知道controller 中所有的请求都要经过核心组件DispatcherServlet路由，都会执行它的 doDispatch() 方法，而拦截器postHandle()、preHandle()方法便是在其中调用的。")]),e._v(" "),r("div",{staticClass:"language-text extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v('protected void doDispatch(HttpServletRequest request, HttpServletResponse response) throws Exception {\n \n        try {\n         ...........\n            try {\n \n                // 获取可以执行当前Handler的适配器\n                HandlerAdapter ha = getHandlerAdapter(mappedHandler.getHandler());\n\n                // Process last-modified header, if supported by the handler.\n                String method = request.getMethod();\n                boolean isGet = "GET".equals(method);\n                if (isGet || "HEAD".equals(method)) {\n                    long lastModified = ha.getLastModified(request, mappedHandler.getHandler());\n                    if (logger.isDebugEnabled()) {\n                        logger.debug("Last-Modified value for [" + getRequestUri(request) + "] is: " + lastModified);\n                    }\n                    if (new ServletWebRequest(request, response).checkNotModified(lastModified) &amp;&amp; isGet) {\n                        return;\n                    }\n                }\n                // 注意： 执行Interceptor中PreHandle()方法\n                if (!mappedHandler.applyPreHandle(processedRequest, response)) {\n                    return;\n                }\n\n                // 注意：执行Handle【包括我们的业务逻辑，当抛出异常时会被Try、catch到】\n                mv = ha.handle(processedRequest, response, mappedHandler.getHandler());\n\n                if (asyncManager.isConcurrentHandlingStarted()) {\n                    return;\n                }\n                applyDefaultViewName(processedRequest, mv);\n\n                // 注意：执行Interceptor中PostHandle 方法【抛出异常时无法执行】\n                mappedHandler.applyPostHandle(processedRequest, response, mv);\n            }\n        }\n        ...........\n    }\n')])])]),r("p",[e._v("看看两个方法applyPreHandle(）、applyPostHandle(）具体是如何被调用的，就明白为什么postHandle()、preHandle() 执行顺序是相反的了。")]),e._v(" "),r("div",{staticClass:"language-text extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("boolean applyPreHandle(HttpServletRequest request, HttpServletResponse response) throws Exception {\n        HandlerInterceptor[] interceptors = this.getInterceptors();\n        if(!ObjectUtils.isEmpty(interceptors)) {\n            for(int i = 0; i &lt; interceptors.length; this.interceptorIndex = i++) {\n                HandlerInterceptor interceptor = interceptors[i];\n                if(!interceptor.preHandle(request, response, this.handler)) {\n                    this.triggerAfterCompletion(request, response, (Exception)null);\n                    return false;\n                }\n            }\n        }\n\n        return true;\n    }\nvoid applyPostHandle(HttpServletRequest request, HttpServletResponse response, @Nullable ModelAndView mv) throws Exception {\n        HandlerInterceptor[] interceptors = this.getInterceptors();\n        if(!ObjectUtils.isEmpty(interceptors)) {\n            for(int i = interceptors.length - 1; i >= 0; --i) {\n                HandlerInterceptor interceptor = interceptors[i];\n                interceptor.postHandle(request, response, this.handler, mv);\n            }\n        }\n    }\n")])])]),r("p",[e._v("发现两个方法中在调用拦截器数组 HandlerInterceptor[] 时，循环的顺序竟然是相反的。。。，导致postHandle()、preHandle() 方法执行的顺序相反。")]),e._v(" "),r("h2",{attrs:{id:"总结"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[e._v("#")]),e._v(" 总结")]),e._v(" "),r("p",[e._v("我相信大部分人都能熟练使用滤器和拦截器，但两者的差别还是需要多了解下，不然开发中使用不当，时不时就会出现奇奇怪怪的问题，以上内容比较简单，新手学习老鸟复习，有遗漏的地方还望大家积极补充，如有理解错误之处，还望不吝赐教。")]),e._v(" "),r("p",[e._v("以上内容源自SegmentFault 思否 作者｜程序员内点事，授权转发")]),e._v(" "),r("p",[e._v("作者：华为云开发者社区\n链接：https://www.zhihu.com/question/30212464/answer/1786967139\n来源：知乎\n著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。")])])}),[],!1,null,null,null);t.default=s.exports}}]);