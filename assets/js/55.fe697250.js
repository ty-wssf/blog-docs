(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{484:function(n,t,e){"use strict";e.r(t);var a=e(30),r=Object(a.a)({},(function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[e("h1",{attrs:{id:"使用-spring-boot-admin-对-spring-boot-服务进行监控"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#使用-spring-boot-admin-对-spring-boot-服务进行监控"}},[n._v("#")]),n._v(" 使用 spring-boot-admin 对 Spring Boot 服务进行监控")]),n._v(" "),e("p",[n._v("Spring Boot Actuator 提供了对单个 Spring Boot 的监控，信息包含：应用状态、内存、线程、堆栈等等，比较全面的监控了 Spring Boot 应用的整个生命周期。")]),n._v(" "),e("p",[n._v("但是这样监控也有一些问题：第一，所有的监控都需要调用固定的接口来查看，如果全面查看应用状态需要调用很多接口，并且接口返回的 Json 信息不方便运营人员理解；第二，如果 Spring Boot 应用集群非常大，每个应用都需要调用不同的接口来查看监控信息，操作非常繁琐低效。在这样的背景下，就诞生了另外一个开源软件："),e("strong",[n._v("Spring Boot Admin")]),n._v("。")]),n._v(" "),e("h2",{attrs:{id:"什么是-spring-boot-admin"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#什么是-spring-boot-admin"}},[n._v("#")]),n._v(" 什么是 Spring Boot Admin?")]),n._v(" "),e("p",[n._v("Spring Boot Admin 是一个管理和监控 Spring Boot 应用程序的开源软件。每个应用都认为是一个客户端，通过 HTTP 或者使用 Eureka 注册到 admin server 中进行展示，Spring Boot Admin UI 部分使用 VueJs 将数据展示在前端。")]),n._v(" "),e("p",[n._v("这篇文章给大家介绍如何使用 Spring Boot Admin 对 Spring Boot 应用进行监控。")]),n._v(" "),e("h2",{attrs:{id:"监控单体应用"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#监控单体应用"}},[n._v("#")]),n._v(" 监控单体应用")]),n._v(" "),e("p",[n._v("这节给大家展示如何使用 Spring Boot Admin 监控单个 Spring Boot 应用。")]),n._v(" "),e("h3",{attrs:{id:"admin-server-端"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#admin-server-端"}},[n._v("#")]),n._v(" Admin Server 端")]),n._v(" "),e("p",[e("strong",[n._v("项目依赖")])]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("<dependencies>\n  <dependency>\n    <groupId>de.codecentric</groupId>\n    <artifactId>spring-boot-admin-starter-server</artifactId>\n    <version>2.1.0</version>\n  </dependency>\n  <dependency>\n    <groupId>org.springframework.boot</groupId>\n    <artifactId>spring-boot-starter-web</artifactId>\n  </dependency>\n</dependencies>\n")])])]),e("p",[e("strong",[n._v("配置文件")])]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("server.port=8000\n")])])]),e("p",[n._v("服务端设置端口为：8000。")]),n._v(" "),e("p",[e("strong",[n._v("启动类")])]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("@Configuration\n@EnableAutoConfiguration\n@EnableAdminServer\npublic class AdminServerApplication {\n\n  public static void main(String[] args) {\n    SpringApplication.run(AdminServerApplication.class, args);\n  }\n}\n")])])]),e("p",[n._v("完成上面三步之后，启动服务端，浏览器访问"),e("code",[n._v("http://localhost:8000")]),n._v("可以看到以下界面：")]),n._v(" "),e("p",[e("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master/img/admin21.png",alt:"img"}})]),n._v(" "),e("h3",{attrs:{id:"admin-client-端"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#admin-client-端"}},[n._v("#")]),n._v(" Admin Client 端")]),n._v(" "),e("p",[e("strong",[n._v("项目依赖")])]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("<dependencies>\n    <dependency>\n      <groupId>de.codecentric</groupId>\n      <artifactId>spring-boot-admin-starter-client</artifactId>\n      <version>2.1.0</version>\n    </dependency>\n    <dependency>\n      <groupId>org.springframework.boot</groupId>\n      <artifactId>spring-boot-starter-web</artifactId>\n    </dependency>\n</dependencies>\n")])])]),e("p",[e("strong",[n._v("配置文件")])]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("server.port=8001\nspring.application.name=Admin Client\nspring.boot.admin.client.url=http://localhost:8000  \nmanagement.endpoints.web.exposure.include=*\n")])])]),e("ul",[e("li",[e("code",[n._v("spring.boot.admin.client.url")]),n._v(" 配置 Admin Server 的地址")]),n._v(" "),e("li",[e("code",[n._v("management.endpoints.web.exposure.include=*")]),n._v(" 打开客户端 Actuator 的监控。")])]),n._v(" "),e("p",[e("strong",[n._v("启动类")])]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("@SpringBootApplication\npublic class AdminClientApplication {\n  public static void main(String[] args) {\n    SpringApplication.run(AdminClientApplication.class, args);\n  }\n}\n")])])]),e("p",[n._v("配置完成之后，启动 Client 端，Admin 服务端会自动检查到客户端的变化，并展示其应用")]),n._v(" "),e("p",[e("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master/img/admin22.png",alt:"img"}})]),n._v(" "),e("p",[n._v("页面会展示被监控的服务列表，点击详项目名称会进入此应用的详细监控信息。")]),n._v(" "),e("p",[e("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master/img/admin23.png",alt:"img"}})]),n._v(" "),e("p",[n._v("通过上图可以看出，Spring Boot Admin 以图形化的形式展示了应用的各项信息，这些信息大多都来自于 Spring Boot Actuator 提供的接口。")]),n._v(" "),e("h2",{attrs:{id:"监控微服务"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#监控微服务"}},[n._v("#")]),n._v(" 监控微服务")]),n._v(" "),e("p",[n._v("如果我们使用的是单个 Spring Boot 应用，就需要在每一个被监控的应用中配置 Admin Server 的地址信息；如果应用都注册在 Eureka 中就不需要再对每个应用进行配置，Spring Boot Admin 会自动从注册中心抓取应用的相关信息。")]),n._v(" "),e("p",[n._v("如果我们使用了 Spring Cloud 的服务发现功能，就不需要在单独添加 Admin Client 客户端，仅仅需要 Spring Boot Server ,其它内容会自动进行配置。")]),n._v(" "),e("p",[n._v("接下来我们以 Eureka 作为服务发现的示例来进行演示，实际上也可以使用 Consul 或者 Zookeeper。")]),n._v(" "),e("p",[n._v("1、服务端和客户端添加 spring-cloud-starter-eureka 到包依赖中")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("<dependency>\n    <groupId>org.springframework.cloud</groupId>\n    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>\n</dependency>\n")])])]),e("p",[n._v("2、启动类添加注解")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v("@Configuration\n@EnableAutoConfiguration\n@EnableDiscoveryClient\n@EnableAdminServer\npublic class SpringBootAdminApplication {\n    public static void main(String[] args) {\n        SpringApplication.run(SpringBootAdminApplication.class, args);\n    }\n\n    @Configuration\n    public static class SecurityPermitAllConfig extends WebSecurityConfigurerAdapter {\n        @Override\n        protected void configure(HttpSecurity http) throws Exception {\n            http.authorizeRequests().anyRequest().permitAll()  \n                .and().csrf().disable();\n        }\n    }\n}\n")])])]),e("p",[n._v("使用类 SecurityPermitAllConfig 关闭了安全验证。")]),n._v(" "),e("p",[n._v("3、在客户端中配置服务发现的地址")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v('eureka:   \n  instance:\n    leaseRenewalIntervalInSeconds: 10\n    health-check-url-path: /actuator/health\n    metadata-map:\n      startup: ${random.int}    #needed to trigger info and endpoint update after restart\n  client:\n    registryFetchIntervalSeconds: 5\n    serviceUrl:\n      defaultZone: ${EUREKA_SERVICE_URL:http://localhost:8761}/eureka/\n\nmanagement:\n  endpoints:\n    web:\n      exposure:\n        include: "*"  \n  endpoint:\n    health:\n      show-details: ALWAYS\n')])])]),e("p",[n._v("重启启动服务端和客户端之后，访问服务端的相关地址就可以看到监控页面了。")])])}),[],!1,null,null,null);t.default=r.exports}}]);