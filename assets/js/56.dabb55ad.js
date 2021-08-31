(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{473:function(t,e,n){"use strict";n.r(e);var o=n(30),r=Object(o.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"入门篇"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#入门篇"}},[t._v("#")]),t._v(" 入门篇")]),t._v(" "),n("h2",{attrs:{id:"什么是-spring-boot"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#什么是-spring-boot"}},[t._v("#")]),t._v(" 什么是 Spring Boot")]),t._v(" "),n("p",[t._v("Spring Boot 是由 Pivotal 团队提供的全新框架，其设计目的是用来简化新 Spring 应用的初始搭建以及开发过程。该框架使用了特定的方式来进行配置，从而使开发人员不再需要定义样板化的配置。用我的话来理解，就是 Spring Boot 其实不是什么新的框架，它默认配置了很多框架的使用方式，就像 Maven 整合了所有的 Jar 包，Spring Boot 整合了所有的框架。")]),t._v(" "),n("h2",{attrs:{id:"使用-spring-boot-有什么好处"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#使用-spring-boot-有什么好处"}},[t._v("#")]),t._v(" 使用 Spring Boot 有什么好处")]),t._v(" "),n("p",[t._v("其实就是简单、快速、方便！平时如果我们需要搭建一个 Spring Web 项目的时候需要怎么做呢？")]),t._v(" "),n("ul",[n("li",[t._v("1）配置 web.xml，加载 Spring 和 Spring mvc")]),t._v(" "),n("li",[t._v("2）配置数据库连接、配置 Spring 事务")]),t._v(" "),n("li",[t._v("3）配置加载配置文件的读取，开启注解")]),t._v(" "),n("li",[t._v("4）配置日志文件")]),t._v(" "),n("li",[t._v("…")]),t._v(" "),n("li",[t._v("配置完成之后部署 Tomcat 调试")]),t._v(" "),n("li",[t._v("…")])]),t._v(" "),n("p",[t._v("现在非常流行微服务，如果我这个项目仅仅只是需要发送一个邮件，如果我的项目仅仅是生产一个积分；我都需要这样折腾一遍!")]),t._v(" "),n("p",[t._v("但是如果使用 Spring Boot 呢？\n很简单，我仅仅只需要非常少的几个配置就可以迅速方便的搭建起来一套 Web 项目或者是构建一个微服务！")]),t._v(" "),n("h2",{attrs:{id:"快速入门"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#快速入门"}},[t._v("#")]),t._v(" 快速入门")]),t._v(" "),n("p",[t._v("说了那么多，手痒痒的很，马上来一发试试!")]),t._v(" "),n("p",[n("strong",[t._v("Maven 构建项目")])]),t._v(" "),n("ul",[n("li",[t._v("1、访问 http://start.spring.io/")]),t._v(" "),n("li",[t._v("2、选择构建工具 Maven Project、Java、Spring Boot 版本 2.1.3 以及一些工程基本信息，可参考下图所示：")])]),t._v(" "),n("p",[n("img",{attrs:{src:"http://favorites.ren/assets/images/2019/springboot/spring-boot-start.png",alt:"img"}})]),t._v(" "),n("ul",[n("li",[t._v("3、点击 Generate Project 下载项目压缩包")]),t._v(" "),n("li",[t._v("4、解压后，使用 Idea 导入项目，File -> New -> Model from Existing Source.. -> 选择解压后的文件夹 -> OK，选择 Maven 一路 Next，OK done!")]),t._v(" "),n("li",[t._v("5、如果使用的是 Eclipse，Import -> Existing Maven Projects -> Next -> 选择解压后的文件夹 -> Finsh，OK done!")])]),t._v(" "),n("p",[n("strong",[t._v("Idea 构建项目")])]),t._v(" "),n("ul",[n("li",[t._v("1、选择 File -> New —> Project… 弹出新建项目的框")]),t._v(" "),n("li",[t._v("2、选择 Spring Initializr，Next 也会出现上述类似的配置界面，Idea 帮我们做了集成")]),t._v(" "),n("li",[t._v("3、填写相关内容后，点击 Next 选择依赖的包再点击 Next，最后确定信息无误点击 Finish。")])]),t._v(" "),n("p",[n("strong",[t._v("项目结构介绍")])]),t._v(" "),n("p",[n("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master/img/springboot2_1.png",alt:"img"}})]),t._v(" "),n("p",[t._v("如上图所示，Spring Boot 的基础结构共三个文件:")]),t._v(" "),n("ul",[n("li",[n("code",[t._v("src/main/java")]),t._v(" 程序开发以及主程序入口")]),t._v(" "),n("li",[n("code",[t._v("src/main/resources")]),t._v(" 配置文件")]),t._v(" "),n("li",[n("code",[t._v("src/test/java")]),t._v(" 测试程序")])]),t._v(" "),n("p",[t._v("另外， Spring Boot 建议的目录结果如下：\nroot package 结构："),n("code",[t._v("com.example.myproject")])]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("com\n  +- example\n    +- myproject\n      +- Application.java\n      |\n      +- model\n      |  +- Customer.java\n      |  +- CustomerRepository.java\n      |\n      +- service\n      |  +- CustomerService.java\n      |\n      +- controller\n      |  +- CustomerController.java\n      |\n")])])]),n("ul",[n("li",[t._v("1、Application.java 建议放到根目录下面,主要用于做一些框架配置")]),t._v(" "),n("li",[t._v("2、model 目录主要用于实体与数据访问层（Repository）")]),t._v(" "),n("li",[t._v("3、service 层主要是业务类代码")]),t._v(" "),n("li",[t._v("4、controller 负责页面访问控制")])]),t._v(" "),n("p",[t._v("采用默认配置可以省去很多配置，当然也可以根据自己的喜欢来进行更改\n最后，启动 Application main 方法，至此一个 Java 项目搭建好了！")]),t._v(" "),n("p",[n("strong",[t._v("引入 web 模块")])]),t._v(" "),n("p",[t._v("1、pom.xml中添加支持web的模块：")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("<dependency>\n    <groupId>org.springframework.boot</groupId>\n    <artifactId>spring-boot-starter-web</artifactId>\n</dependency>\n")])])]),n("p",[t._v("pom.xml 文件中默认有两个模块：")]),t._v(" "),n("ul",[n("li",[n("code",[t._v("spring-boot-starter")]),t._v(" ：核心模块，包括自动配置支持、日志和 YAML，如果引入了 "),n("code",[t._v("spring-boot-starter-web")]),t._v(" web 模块可以去掉此配置，因为 "),n("code",[t._v("spring-boot-starter-web")]),t._v(" 自动依赖了 "),n("code",[t._v("spring-boot-starter")]),t._v("。")]),t._v(" "),n("li",[n("code",[t._v("spring-boot-starter-test")]),t._v(" ：测试模块，包括 JUnit、Hamcrest、Mockito。")])]),t._v(" "),n("p",[t._v("2、编写 Controller 内容：")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v('@RestController\npublic class HelloWorldController {\n    @RequestMapping("/hello")\n    public String index() {\n        return "Hello World";\n    }\n}\n')])])]),n("p",[n("code",[t._v("@RestController")]),t._v(" 的意思就是 Controller 里面的方法都以 json 格式输出，不用再写什么 jackjson 配置的了！")]),t._v(" "),n("p",[t._v("3、启动主程序，打开浏览器访问 "),n("code",[t._v("http://localhost:8080/hello")]),t._v("，就可以看到效果了，有木有很简单！")]),t._v(" "),n("p",[n("strong",[t._v("如何做单元测试")])]),t._v(" "),n("p",[t._v("打开的"),n("code",[t._v("src/test/")]),t._v("下的测试入口，编写简单的 http 请求来测试；使用 mockmvc 进行，利用"),n("code",[t._v("MockMvcResultHandlers.print()")]),t._v("打印出执行结果。")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v('@RunWith(SpringRunner.class)\n@SpringBootTest\npublic class HelloTests {\n\n  \n    private MockMvc mvc;\n\n    @Before\n    public void setUp() throws Exception {\n        mvc = MockMvcBuilders.standaloneSetup(new HelloWorldController()).build();\n    }\n\n    @Test\n    public void getHello() throws Exception {\n        mvc.perform(MockMvcRequestBuilders.get("/hello").accept(MediaType.APPLICATION_JSON))\n                .andExpect(status().isOk())\n                .andExpect(content().string(equalTo("Hello World")));\n    }\n\n}\n')])])]),n("p",[n("strong",[t._v("开发环境的调试")])]),t._v(" "),n("p",[t._v("热启动在正常开发项目中已经很常见了吧，虽然平时开发web项目过程中，改动项目启重启总是报错；但springBoot对调试支持很好，修改之后可以实时生效，需要添加以下的配置：")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v(" <dependencies>\n    <dependency>\n        <groupId>org.springframework.boot</groupId>\n        <artifactId>spring-boot-devtools</artifactId>\n        <optional>true</optional>\n    </dependency>\n</dependencies>\n\n<build>\n    <plugins>\n        <plugin>\n            <groupId>org.springframework.boot</groupId>\n            <artifactId>spring-boot-maven-plugin</artifactId>\n            <configuration>\n                <fork>true</fork>\n            </configuration>\n        </plugin>\n</plugins>\n</build>\n")])])]),n("p",[t._v("该模块在完整的打包环境下运行的时候会被禁用。如果你使用 "),n("code",[t._v("java -jar")]),t._v("启动应用或者用一个特定的 classloader 启动，它会认为这是一个“生产环境”。")]),t._v(" "),n("h2",{attrs:{id:"总结"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),n("p",[t._v("使用 Spring Boot 可以非常方便、快速搭建项目，使我们不用关心框架之间的兼容性，适用版本等各种问题，我们想使用任何东西，仅仅添加一个配置就可以，所以使用 Spring Boot 非常适合构建微服务。")])])}),[],!1,null,null,null);e.default=r.exports}}]);