(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{474:function(a,t,e){"use strict";e.r(t);var r=e(30),s=Object(r.a)({},(function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("h1",{attrs:{id:"spring-boot-如何测试打包部署"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#spring-boot-如何测试打包部署"}},[a._v("#")]),a._v(" Spring Boot 如何测试打包部署")]),a._v(" "),e("h2",{attrs:{id:"开发阶段"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#开发阶段"}},[a._v("#")]),a._v(" 开发阶段")]),a._v(" "),e("h3",{attrs:{id:"单元测试"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#单元测试"}},[a._v("#")]),a._v(" 单元测试")]),a._v(" "),e("p",[a._v("在开发阶段的时候最重要的是单元测试了， Spring Boot 对单元测试的支持已经很完善了。")]),a._v(" "),e("p",[a._v("1、在 pom 包中添加 "),e("code",[a._v("spring-boot-starter-test")]),a._v(" 包引用")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("<dependency>\n\t<groupId>org.springframework.boot</groupId>\n\t<artifactId>spring-boot-starter-test</artifactId>\n\t<scope>test</scope>\n</dependency>\n")])])]),e("p",[a._v("2、开发测试类")]),a._v(" "),e("p",[a._v("以最简单的 helloworld 为例，在测试类的类头部需要添加："),e("code",[a._v("@RunWith(SpringRunner.class)")]),a._v("和"),e("code",[a._v("@SpringBootTest")]),a._v("注解，在测试方法的顶端添加"),e("code",[a._v("@Test")]),a._v("即可，最后在方法上点击右键run就可以运行。")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v('@RunWith(SpringRunner.class)\n@SpringBootTest\npublic class ApplicationTests {\n\n\t@Test\n\tpublic void hello() {\n\t\tSystem.out.println("hello world");\n\t}\n\n}\n')])])]),e("p",[a._v("实际使用中，可以按照项目的正常使用去注入数据层代码或者是 Service 层代码进行测试验证，"),e("code",[a._v("spring-boot-starter-test")]),a._v(" 提供很多基础用法，更难得的是增加了对 Controller 层测试的支持。")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v('//简单验证结果集是否正确\nAssert.assertEquals(3, userMapper.getAll().size());\n\n//验证结果集，提示\nAssert.assertTrue("错误，正确的返回值为200", status == 200); \nAssert.assertFalse("错误，正确的返回值为200", status != 200);  \n')])])]),e("p",[a._v("引入了"),e("code",[a._v("MockMvc")]),a._v("支持了对 Controller 层的测试，简单示例如下：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v('public class HelloControlerTests {\n\n    private MockMvc mvc;\n\n    //初始化执行\n    @Before\n    public void setUp() throws Exception {\n        mvc = MockMvcBuilders.standaloneSetup(new HelloController()).build();\n    }\n\n    //验证controller是否正常响应并打印返回结果\n    @Test\n    public void getHello() throws Exception {\n        mvc.perform(MockMvcRequestBuilders.get("/hello").accept(MediaType.APPLICATION_JSON))\n                .andExpect(MockMvcResultMatchers.status().isOk())\n                .andDo(MockMvcResultHandlers.print())\n                .andReturn();\n    }\n    \n    //验证controller是否正常响应并判断返回结果是否正确\n    @Test\n    public void testHello() throws Exception {\n        mvc.perform(MockMvcRequestBuilders.get("/hello").accept(MediaType.APPLICATION_JSON))\n                .andExpect(status().isOk())\n                .andExpect(content().string(equalTo("Hello World")));\n    }\n\n}\n')])])]),e("p",[a._v("单元测试是验证你代码第一道屏障，要养成每写一部分代码就进行单元测试的习惯，不要等到全部集成后再进行测试，集成后因为更关注整体运行效果，很容易遗漏掉代码底层的bug.")]),a._v(" "),e("h3",{attrs:{id:"集成测试"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#集成测试"}},[a._v("#")]),a._v(" 集成测试")]),a._v(" "),e("p",[a._v("整体开发完成之后进入集成测试， Spring Boot 项目的启动入口在 Application 类中，直接运行 run 方法就可以启动项目，但是在调试的过程中我们肯定需要不断的去调试代码，如果每修改一次代码就需要手动重启一次服务就很麻烦， Spring Boot 非常贴心的给出了热部署的支持，很方便在 Web 项目中调试使用。")]),a._v(" "),e("p",[a._v("pom 需要添加以下的配置：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v(" <dependencies>\n    <dependency>\n        <groupId>org.springframework.boot</groupId>\n        <artifactId>spring-boot-devtools</artifactId>\n        <optional>true</optional>\n    </dependency>\n</dependencies>\n\n<build>\n    <plugins>\n        <plugin>\n            <groupId>org.springframework.boot</groupId>\n            <artifactId>spring-boot-maven-plugin</artifactId>\n            <configuration>\n                <fork>true</fork>\n            </configuration>\n        </plugin>\n</plugins>\n</build>\n")])])]),e("p",[a._v("添加以上配置后，项目就支持了热部署，非常方便集成测试。")]),a._v(" "),e("h2",{attrs:{id:"投产上线"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#投产上线"}},[a._v("#")]),a._v(" 投产上线")]),a._v(" "),e("p",[a._v("其实我觉得这个阶段，应该还是比较简单一般分为两种；一种是打包成 jar 包直接执行，另一种是打包成 war 包放到 tomcat 服务器下。")]),a._v(" "),e("h3",{attrs:{id:"打成-jar-包"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#打成-jar-包"}},[a._v("#")]),a._v(" 打成 jar 包")]),a._v(" "),e("p",[a._v("如果你使用的是 maven 来管理项目，执行以下命令既可以")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("cd 项目跟目录（和pom.xml同级）\nmvn clean package\n## 或者执行下面的命令\n## 排除测试代码后进行打包\nmvn clean package  -Dmaven.test.skip=true\n")])])]),e("p",[a._v("打包完成后 jar 包会生成到 target 目录下，命名一般是 项目名+版本号.jar")]),a._v(" "),e("p",[a._v("启动 jar 包命令")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("java -jar  target/spring-boot-scheduler-1.0.0.jar\n")])])]),e("p",[a._v("这种方式，只要控制台关闭，服务就不能访问了。下面我们使用在后台运行的方式来启动:")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("nohup java -jar target/spring-boot-scheduler-1.0.0.jar &\n")])])]),e("p",[a._v("也可以在启动的时候选择读取不同的配置文件")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("java -jar app.jar --spring.profiles.active=dev\n")])])]),e("p",[a._v("也可以在启动的时候设置 jvm 参数")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("java -Xms10m -Xmx80m -jar app.jar &\n")])])]),e("p",[e("strong",[a._v("gradle")]),a._v("\n如果使用的是 gradle，使用下面命令打包")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("gradle build\njava -jar build/libs/mymodule-0.0.1-SNAPSHOT.jar\n")])])]),e("h3",{attrs:{id:"打成-war-包"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#打成-war-包"}},[a._v("#")]),a._v(" 打成 war 包")]),a._v(" "),e("p",[a._v("打成 war 包一般可以分两种方式来实现，第一种可以通过 eclipse 这种开发工具来导出 war 包，另外一种是使用命令来完成，这里主要介绍后一种")]),a._v(" "),e("p",[a._v("1、maven 项目，修改 pom 包")]),a._v(" "),e("p",[a._v("将")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("<packaging>jar</packaging>  \n")])])]),e("p",[a._v("改为")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("<packaging>war</packaging>\n")])])]),e("p",[a._v("2、打包时排除tomcat.")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("<dependency>\n\t<groupId>org.springframework.boot</groupId>\n\t<artifactId>spring-boot-starter-web</artifactId>\n</dependency>\n<dependency>\n\t<groupId>org.springframework.boot</groupId>\n\t<artifactId>spring-boot-starter-tomcat</artifactId>\n\t<scope>provided</scope>\n</dependency>\n")])])]),e("p",[a._v("在这里将 scope 属性设置为 provided，这样在最终形成的 WAR 中不会包含这个 JAR 包，因为 Tomcat 或 Jetty 等服务器在运行时将会提供相关的 API 类。")]),a._v(" "),e("p",[a._v("3、注册启动类")]),a._v(" "),e("p",[a._v("创建 ServletInitializer.java，继承 SpringBootServletInitializer ，覆盖 configure()，把启动类 Application 注册进去。外部 Web 应用服务器构建 Web Application Context 的时候，会把启动类添加进去。")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("public class ServletInitializer extends SpringBootServletInitializer {\n    @Override\n    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {\n        return application.sources(Application.class);\n    }\n}\n")])])]),e("p",[a._v("最后执行")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("mvn clean package  -Dmaven.test.skip=true\n")])])]),e("p",[a._v("会在 target 目录下生成：项目名+版本号.war文件，拷贝到 tomcat 服务器中启动即可。")]),a._v(" "),e("p",[e("strong",[a._v("gradle")])]),a._v(" "),e("p",[a._v("如果使用的是 Gradle,基本步奏一样，build.gradle中 添加 war 的支持，排除 spring-boot-starter-tomcat：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v('...\n\napply plugin: \'war\'\n\n...\n\ndependencies {\n    compile("org.springframework.boot:spring-boot-starter-web:1.4.2.RELEASE"){\n    \texclude mymodule:"spring-boot-starter-tomcat"\n    }\n}\n...\n')])])]),e("p",[a._v("再使用构建命令")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("gradle build\n")])])]),e("p",[a._v("war 会生成在 build\\libs 目录下。")]),a._v(" "),e("h2",{attrs:{id:"生产运维"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#生产运维"}},[a._v("#")]),a._v(" 生产运维")]),a._v(" "),e("h3",{attrs:{id:"查看-jvm-参数的值"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#查看-jvm-参数的值"}},[a._v("#")]),a._v(" 查看 JVM 参数的值")]),a._v(" "),e("p",[a._v("可以根据 Java 自带的 jinfo 命令：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("jinfo -flags pid\n")])])]),e("p",[a._v("来查看 jar 启动后使用的是什么 gc、新生代、老年代分批的内存都是多少，示例如下：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("-XX:CICompilerCount=3 -XX:InitialHeapSize=234881024 -XX:MaxHeapSize=3743416320 -XX:MaxNewSize=1247805440 -XX:MinHeapDeltaBytes=524288 -XX:NewSize=78118912 -XX:OldSize=156762112 -XX:+UseCompressedClassPointers -XX:+UseCompressedOops -XX:+UseFastUnorderedTimeStamps -XX:+UseParallelGC\n")])])]),e("ul",[e("li",[e("code",[a._v("-XX:CICompilerCount")]),a._v(" ：最大的并行编译数")]),a._v(" "),e("li",[e("code",[a._v("-XX:InitialHeapSize")]),a._v(" 和 "),e("code",[a._v("-XX:MaxHeapSize")]),a._v(" ：指定 JVM 的初始和最大堆内存大小")]),a._v(" "),e("li",[e("code",[a._v("-XX:MaxNewSize")]),a._v(" ： JVM 堆区域新生代内存的最大可分配大小")]),a._v(" "),e("li",[a._v("…")]),a._v(" "),e("li",[e("code",[a._v("-XX:+UseParallelGC")]),a._v(" ：垃圾回收使用 Parallel 收集器")])]),a._v(" "),e("h3",{attrs:{id:"如何重启"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#如何重启"}},[a._v("#")]),a._v(" 如何重启")]),a._v(" "),e("p",[e("strong",[a._v("简单粗暴")])]),a._v(" "),e("p",[a._v("直接 kill 掉进程再次启动 jar 包")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("ps -ef|grep java \n##拿到对于Java程序的pid\nkill -9 pid\n## 再次重启\nJava -jar  xxxx.jar\n")])])]),e("p",[a._v("当然这种方式比较传统和暴力，所以建议大家使用下面的方式来管理")]),a._v(" "),e("p",[e("strong",[a._v("脚本执行")])]),a._v(" "),e("p",[a._v("如果使用的是maven,需要包含以下的配置")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("<plugin>\n    <groupId>org.springframework.boot</groupId>\n    <artifactId>spring-boot-maven-plugin</artifactId>\n    <configuration>\n        <executable>true</executable>\n    </configuration>\n</plugin>\n")])])]),e("p",[a._v("如果使用是 gradle，需要包含下面配置")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("springBoot {\n    executable = true\n}\n")])])]),e("p",[a._v("启动方式：")]),a._v(" "),e("p",[a._v("1、 可以直接"),e("code",[a._v("./yourapp.jar")]),a._v(" 来启动")]),a._v(" "),e("p",[a._v("2、注册为服务")]),a._v(" "),e("p",[a._v("也可以做一个软链接指向你的jar包并加入到"),e("code",[a._v("init.d")]),a._v("中，然后用命令来启动。")]),a._v(" "),e("p",[a._v("init.d 例子:")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("ln -s /var/yourapp/yourapp.jar /etc/init.d/yourapp\nchmod +x /etc/init.d/yourapp\n")])])]),e("p",[a._v("这样就可以使用"),e("code",[a._v("stop")]),a._v("或者是"),e("code",[a._v("restart")]),a._v("命令去管理你的应用。")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("/etc/init.d/yourapp start|stop|restart\n")])])]),e("p",[a._v("或者")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("service yourapp start|stop|restart\n")])])]),e("p",[a._v("到此 Spring Boot 项目如何测试、联调和打包投产均已经介绍完，以后可以找时间研究一下 Spring Boot 的自动化运维，以及 Spring Boot 和 Docker 相结合的使用。")])])}),[],!1,null,null,null);t.default=s.exports}}]);