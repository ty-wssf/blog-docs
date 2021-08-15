(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{471:function(e,n,t){"use strict";t.r(n);var a=t(30),s=Object(a.a)({},(function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"rabbitmq-详解"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#rabbitmq-详解"}},[e._v("#")]),e._v(" RabbitMQ 详解")]),e._v(" "),t("p",[e._v("RabbitMQ 即一个消息队列，主要是用来实现应用程序的异步和解耦，同时也能起到消息缓冲，消息分发的作用。")]),e._v(" "),t("p",[e._v("消息中间件在互联网公司的使用中越来越多，刚才还看到新闻阿里将 RocketMQ 捐献给了 Apache，当然了今天的主角还是讲 RabbitMQ。消息中间件最主要的作用是解耦，中间件最标准的用法是生产者生产消息传送到队列，消费者从队列中拿取消息并处理，生产者不用关心是谁来消费，消费者不用关心谁在生产消息，从而达到解耦的目的。在分布式的系统中，消息队列也会被用在很多其它的方面，比如：分布式事务的支持，RPC 的调用等等。")]),e._v(" "),t("p",[e._v("以前一直使用的是 ActiveMQ，在实际的生产使用中也出现了一些小问题，在网络查阅了很多的资料后，决定尝试使用 RabbitMQ 来替换 ActiveMQ，RabbitMQ 的高可用性、高性能、灵活性等一些特点吸引了我们，查阅了一些资料整理出此文。")]),e._v(" "),t("h2",{attrs:{id:"rabbitmq-介绍"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#rabbitmq-介绍"}},[e._v("#")]),e._v(" RabbitMQ 介绍")]),e._v(" "),t("p",[e._v("RabbitMQ 是实现 AMQP（高级消息队列协议）的消息中间件的一种，最初起源于金融系统，用于在分布式系统中存储转发消息，在易用性、扩展性、高可用性等方面表现不俗。 RabbitMQ 主要是为了实现系统之间的双向解耦而实现的。当生产者大量产生数据时，消费者无法快速消费，那么需要一个中间层。保存这个数据。")]),e._v(" "),t("p",[e._v("AMQP，即 Advanced Message Queuing Protocol，高级消息队列协议，是应用层协议的一个开放标准，为面向消息的中间件设计。消息中间件主要用于组件之间的解耦，消息的发送者无需知道消息使用者的存在，反之亦然。AMQP 的主要特征是面向消息、队列、路由（包括点对点和发布/订阅）、可靠性、安全。")]),e._v(" "),t("p",[e._v("RabbitMQ 是一个开源的 AMQP 实现，服务器端用Erlang语言编写，支持多种客户端，如：Python、Ruby、.NET、Java、JMS、C、PHP、ActionScript、XMPP、STOMP 等，支持 AJAX。用于在分布式系统中存储转发消息，在易用性、扩展性、高可用性等方面表现不俗。")]),e._v(" "),t("h3",{attrs:{id:"相关概念"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#相关概念"}},[e._v("#")]),e._v(" 相关概念")]),e._v(" "),t("p",[e._v("通常我们谈到队列服务, 会有三个概念： 发消息者、队列、收消息者，RabbitMQ 在这个基本概念之上, 多做了一层抽象, 在发消息者和 队列之间, 加入了交换器 (Exchange). 这样发消息者和队列就没有直接联系, 转而变成发消息者把消息给交换器, 交换器根据调度策略再把消息再给队列。")]),e._v(" "),t("p",[t("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master/img/RabbitMQ01.png",alt:"img"}})]),e._v(" "),t("ul",[t("li",[e._v("左侧 P 代表 生产者，也就是往 RabbitMQ 发消息的程序。")]),e._v(" "),t("li",[e._v("中间即是 RabbitMQ，"),t("em",[e._v("其中包括了 交换机 和 队列。")])]),e._v(" "),t("li",[e._v("右侧 C 代表 消费者，也就是往 RabbitMQ 拿消息的程序。")])]),e._v(" "),t("p",[e._v("那么，"),t("em",[e._v("其中比较重要的概念有 4 个，分别为：虚拟主机，交换机，队列，和绑定。")])]),e._v(" "),t("ul",[t("li",[e._v("虚拟主机：一个虚拟主机持有一组交换机、队列和绑定。为什么需要多个虚拟主机呢？很简单， RabbitMQ 当中，"),t("em",[e._v("用户只能在虚拟主机的粒度进行权限控制。")]),e._v(" 因此，如果需要禁止A组访问B组的交换机/队列/绑定，必须为A和B分别创建一个虚拟主机。每一个 RabbitMQ 服务器都有一个默认的虚拟主机“/”。")]),e._v(" "),t("li",[e._v("交换机："),t("em",[e._v("Exchange 用于转发消息，但是它不会做存储")]),e._v(" ，如果没有 Queue bind 到 Exchange 的话，它会直接丢弃掉 Producer 发送过来的消息。 这里有一个比较重要的概念："),t("strong",[e._v("路由键")]),e._v(" 。消息到交换机的时候，交互机会转发到对应的队列中，那么究竟转发到哪个队列，就要根据该路由键。")]),e._v(" "),t("li",[e._v("绑定：也就是交换机需要和队列相绑定，这其中如上图所示，是多对多的关系。")])]),e._v(" "),t("h3",{attrs:{id:"交换机-exchange"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#交换机-exchange"}},[e._v("#")]),e._v(" 交换机(Exchange)")]),e._v(" "),t("p",[e._v("交换机的功能主要是接收消息并且转发到绑定的队列，交换机不存储消息，在启用ack模式后，交换机找不到队列会返回错误。交换机有四种类型：Direct, topic, Headers and Fanout")]),e._v(" "),t("ul",[t("li",[e._v("Direct：direct 类型的行为是”先匹配, 再投送”. 即在绑定时设定一个 "),t("strong",[e._v("routing_key")]),e._v(", 消息的"),t("strong",[e._v("routing_key")]),e._v(" 匹配时, 才会被交换器投送到绑定的队列中去.")]),e._v(" "),t("li",[e._v("Topic：按规则转发消息（最灵活）")]),e._v(" "),t("li",[e._v("Headers：设置 header attribute 参数类型的交换机")]),e._v(" "),t("li",[e._v("Fanout：转发消息到所有绑定队列")])]),e._v(" "),t("p",[t("strong",[e._v("Direct Exchange")])]),e._v(" "),t("p",[e._v("Direct Exchange 是 RabbitMQ 默认的交换机模式，也是最简单的模式，根据key全文匹配去寻找队列。\n"),t("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master/img/rabbitMq_direct.png",alt:"img"}})]),e._v(" "),t("p",[e._v("第一个 X - Q1 就有一个 binding key，名字为 orange； X - Q2 就有 2 个 binding key，名字为 black 和 green。"),t("em",[e._v("当消息中的 路由键 和 这个 binding key 对应上的时候，那么就知道了该消息去到哪一个队列中。")])]),e._v(" "),t("p",[e._v("Ps：为什么 X 到 Q2 要有 black，green，2个 binding key呢，一个不就行了吗？ - 这个主要是因为可能又有 Q3，而Q3只接受 black 的信息，而Q2不仅接受black 的信息，还接受 green 的信息。")]),e._v(" "),t("p",[t("strong",[e._v("Topic Exchange")])]),e._v(" "),t("p",[t("em",[e._v("Topic Exchange 转发消息主要是根据通配符。")]),e._v(" 在这种交换机下，队列和交换机的绑定会定义一种路由模式，那么，通配符就要在这种路由模式和路由键之间匹配后交换机才能转发消息。")]),e._v(" "),t("p",[e._v("在这种交换机模式下：")]),e._v(" "),t("ul",[t("li",[e._v("路由键必须是一串字符，用句号（"),t("code",[e._v(".")]),e._v("） 隔开，比如说 agreements.us，或者 agreements.eu.stockholm 等。")]),e._v(" "),t("li",[e._v("路由模式必须包含一个 星号（"),t("code",[e._v("*")]),e._v("），主要用于匹配路由键指定位置的一个单词，比如说，一个路由模式是这样子：agreements..b.*，那么就只能匹配路由键是这样子的：第一个单词是 agreements，第四个单词是 b。 井号（#）就表示相当于一个或者多个单词，例如一个匹配模式是 agreements.eu.berlin.#，那么，以agreements.eu.berlin 开头的路由键都是可以的。")])]),e._v(" "),t("p",[e._v("具体代码发送的时候还是一样，第一个参数表示交换机，第二个参数表示 routing key，第三个参数即消息。如下：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('rabbitTemplate.convertAndSend("testTopicExchange","key1.a.c.key2", " this is  RabbitMQ!");\n')])])]),t("p",[e._v("topic 和 direct 类似, 只是匹配上支持了”模式”, 在”点分”的 routing_key 形式中, 可以使用两个通配符:")]),e._v(" "),t("ul",[t("li",[t("code",[e._v("*")]),e._v("表示一个词.")]),e._v(" "),t("li",[t("code",[e._v("#")]),e._v("表示零个或多个词.")])]),e._v(" "),t("p",[t("strong",[e._v("Headers Exchange")])]),e._v(" "),t("p",[e._v("headers 也是根据规则匹配, 相较于 direct 和 topic 固定地使用 routing_key , headers 则是一个自定义匹配规则的类型. 在队列与交换器绑定时, 会设定一组键值对规则, 消息中也包括一组键值对( headers 属性), 当这些键值对有一对, 或全部匹配时, 消息被投送到对应队列.")]),e._v(" "),t("p",[t("strong",[e._v("Fanout Exchange")])]),e._v(" "),t("p",[e._v("Fanout Exchange 消息广播的模式，不管路由键或者是路由模式，"),t("em",[e._v("会把消息发给绑定给它的全部队列")]),e._v("，如果配置了 routing_key 会被忽略。")]),e._v(" "),t("h2",{attrs:{id:"spring-boot-集成-rabbitmq"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#spring-boot-集成-rabbitmq"}},[e._v("#")]),e._v(" Spring Boot 集成 RabbitMQ")]),e._v(" "),t("p",[e._v("Spring Boot 集成 RabbitMQ 非常简单，如果只是简单的使用配置非常少，Spring Boot 提供了"),t("code",[e._v("spring-boot-starter-amqp")]),e._v(" 项目对消息各种支持。")]),e._v(" "),t("h3",{attrs:{id:"简单使用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#简单使用"}},[e._v("#")]),e._v(" 简单使用")]),e._v(" "),t("p",[e._v("1、配置 Pom 包，主要是添加 "),t("code",[e._v("spring-boot-starter-amqp")]),e._v(" 的支持")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("<dependency>\n\t<groupId>org.springframework.boot</groupId>\n\t<artifactId>spring-boot-starter-amqp</artifactId>\n</dependency>\n")])])]),t("p",[e._v("2、配置文件")]),e._v(" "),t("p",[e._v("配置 RabbitMQ 的安装地址、端口以及账户信息")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("spring.application.name=Spring-boot-rabbitmq\n\nspring.rabbitmq.host=192.168.0.86\nspring.rabbitmq.port=5672\nspring.rabbitmq.username=admin\nspring.rabbitmq.password=123456\n")])])]),t("p",[e._v("3、队列配置")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('@Configuration\npublic class RabbitConfig {\n\n    @Bean\n    public Queue Queue() {\n        return new Queue("hello");\n    }\n\n}\n')])])]),t("p",[e._v("3、发送者")]),e._v(" "),t("p",[e._v("rabbitTemplate 是 Spring Boot 提供的默认实现")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('@component\npublic class HelloSender {\n\n\t@Autowired\n\tprivate AmqpTemplate rabbitTemplate;\n\n\tpublic void send() {\n\t\tString context = "hello " + new Date();\n\t\tSystem.out.println("Sender : " + context);\n\t\tthis.rabbitTemplate.convertAndSend("hello", context);\n\t}\n\n}\n')])])]),t("p",[e._v("4、接收者")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('@Component\n@RabbitListener(queues = "hello")\npublic class HelloReceiver {\n\n    @RabbitHandler\n    public void process(String hello) {\n        System.out.println("Receiver  : " + hello);\n    }\n\n}\n')])])]),t("p",[e._v("5、测试")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("@RunWith(SpringRunner.class)\n@SpringBootTest\npublic class RabbitMqHelloTest {\n\n\t@Autowired\n\tprivate HelloSender helloSender;\n\n\t@Test\n\tpublic void hello() throws Exception {\n\t\thelloSender.send();\n\t}\n\n}\n")])])]),t("blockquote",[t("p",[e._v("注意，发送者和接收者的 queue name 必须一致，不然不能接收")])]),e._v(" "),t("h3",{attrs:{id:"多对多使用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#多对多使用"}},[e._v("#")]),e._v(" 多对多使用")]),e._v(" "),t("p",[e._v("一个发送者，N 个接收者或者 N 个发送者和 N 个接收者会出现什么情况呢？")]),e._v(" "),t("p",[t("strong",[e._v("一对多发送")])]),e._v(" "),t("p",[e._v("对上面的代码进行了小改造，接收端注册了两个 Receiver,Receiver1 和 Receiver2，发送端加入参数计数，接收端打印接收到的参数，下面是测试代码，发送一百条消息，来观察两个接收端的执行效果")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("@Test\npublic void oneToMany() throws Exception {\n\tfor (int i=0;i<100;i++){\n\t\tneoSender.send(i);\n\t}\n}\n")])])]),t("p",[e._v("结果如下：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("Receiver 1: Spring boot neo queue ****** 11\nReceiver 2: Spring boot neo queue ****** 12\nReceiver 2: Spring boot neo queue ****** 14\nReceiver 1: Spring boot neo queue ****** 13\nReceiver 2: Spring boot neo queue ****** 15\nReceiver 1: Spring boot neo queue ****** 16\nReceiver 1: Spring boot neo queue ****** 18\nReceiver 2: Spring boot neo queue ****** 17\nReceiver 2: Spring boot neo queue ****** 19\nReceiver 1: Spring boot neo queue ****** 20\n")])])]),t("p",[e._v("根据返回结果得到以下结论")]),e._v(" "),t("blockquote",[t("p",[e._v("一个发送者，N个接受者,经过测试会均匀的将消息发送到N个接收者中")])]),e._v(" "),t("p",[t("strong",[e._v("多对多发送")])]),e._v(" "),t("p",[e._v("复制了一份发送者，加入标记，在一百个循环中相互交替发送")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("@Test\n\tpublic void manyToMany() throws Exception {\n\t\tfor (int i=0;i<100;i++){\n\t\t\tneoSender.send(i);\n\t\t\tneoSender2.send(i);\n\t\t}\n}\n")])])]),t("p",[e._v("结果如下：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("Receiver 1: Spring boot neo queue ****** 20\nReceiver 2: Spring boot neo queue ****** 20\nReceiver 1: Spring boot neo queue ****** 21\nReceiver 2: Spring boot neo queue ****** 21\nReceiver 1: Spring boot neo queue ****** 22\nReceiver 2: Spring boot neo queue ****** 22\nReceiver 1: Spring boot neo queue ****** 23\nReceiver 2: Spring boot neo queue ****** 23\nReceiver 1: Spring boot neo queue ****** 24\nReceiver 2: Spring boot neo queue ****** 24\nReceiver 1: Spring boot neo queue ****** 25\nReceiver 2: Spring boot neo queue ****** 25\n")])])]),t("blockquote",[t("p",[e._v("结论：和一对多一样，接收端仍然会均匀接收到消息")])]),e._v(" "),t("h3",{attrs:{id:"高级使用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#高级使用"}},[e._v("#")]),e._v(" 高级使用")]),e._v(" "),t("p",[t("strong",[e._v("对象的支持")])]),e._v(" "),t("p",[e._v("Spring Boot 以及完美的支持对象的发送和接收，不需要格外的配置。")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('//发送者\npublic void send(User user) {\n\tSystem.out.println("Sender object: " + user.toString());\n\tthis.rabbitTemplate.convertAndSend("object", user);\n}\n\n...\n\n//接收者\n@RabbitHandler\npublic void process(User user) {\n    System.out.println("Receiver object : " + user);\n}\n')])])]),t("p",[e._v("结果如下：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("Sender object: User{name='neo', pass='123456'}\nReceiver object : User{name='neo', pass='123456'}\n")])])]),t("p",[t("strong",[e._v("Topic Exchange")])]),e._v(" "),t("p",[e._v("topic 是 RabbitMQ 中最灵活的一种方式，可以根据 routing_key 自由的绑定不同的队列")]),e._v(" "),t("p",[e._v("首先对 topic 规则配置，这里使用两个队列来测试")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('@Configuration\npublic class TopicRabbitConfig {\n\n    final static String message = "topic.message";\n    final static String messages = "topic.messages";\n\n    @Bean\n    public Queue queueMessage() {\n        return new Queue(TopicRabbitConfig.message);\n    }\n\n    @Bean\n    public Queue queueMessages() {\n        return new Queue(TopicRabbitConfig.messages);\n    }\n\n    @Bean\n    TopicExchange exchange() {\n        return new TopicExchange("exchange");\n    }\n\n    @Bean\n    Binding bindingExchangeMessage(Queue queueMessage, TopicExchange exchange) {\n        return BindingBuilder.bind(queueMessage).to(exchange).with("topic.message");\n    }\n\n    @Bean\n    Binding bindingExchangeMessages(Queue queueMessages, TopicExchange exchange) {\n        return BindingBuilder.bind(queueMessages).to(exchange).with("topic.#");\n    }\n}\n')])])]),t("p",[e._v("使用 queueMessages 同时匹配两个队列，queueMessage 只匹配 “topic.message” 队列")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('public void send1() {\n\tString context = "hi, i am message 1";\n\tSystem.out.println("Sender : " + context);\n\tthis.rabbitTemplate.convertAndSend("exchange", "topic.message", context);\n}\n\npublic void send2() {\n\tString context = "hi, i am messages 2";\n\tSystem.out.println("Sender : " + context);\n\tthis.rabbitTemplate.convertAndSend("exchange", "topic.messages", context);\n}\n')])])]),t("p",[e._v("发送send1会匹配到topic.#和topic.message 两个Receiver都可以收到消息，发送send2只有topic.#可以匹配所有只有Receiver2监听到消息")]),e._v(" "),t("p",[t("strong",[e._v("Fanout Exchange")])]),e._v(" "),t("p",[e._v("Fanout 就是我们熟悉的广播模式或者订阅模式，给 Fanout 交换机发送消息，绑定了这个交换机的所有队列都收到这个消息。")]),e._v(" "),t("p",[e._v("Fanout 相关配置")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('@Configuration\npublic class FanoutRabbitConfig {\n\n    @Bean\n    public Queue AMessage() {\n        return new Queue("fanout.A");\n    }\n\n    @Bean\n    public Queue BMessage() {\n        return new Queue("fanout.B");\n    }\n\n    @Bean\n    public Queue CMessage() {\n        return new Queue("fanout.C");\n    }\n\n    @Bean\n    FanoutExchange fanoutExchange() {\n        return new FanoutExchange("fanoutExchange");\n    }\n\n    @Bean\n    Binding bindingExchangeA(Queue AMessage,FanoutExchange fanoutExchange) {\n        return BindingBuilder.bind(AMessage).to(fanoutExchange);\n    }\n\n    @Bean\n    Binding bindingExchangeB(Queue BMessage, FanoutExchange fanoutExchange) {\n        return BindingBuilder.bind(BMessage).to(fanoutExchange);\n    }\n\n    @Bean\n    Binding bindingExchangeC(Queue CMessage, FanoutExchange fanoutExchange) {\n        return BindingBuilder.bind(CMessage).to(fanoutExchange);\n    }\n\n}\n')])])]),t("p",[e._v("这里使用了 A、B、C 三个队列绑定到 Fanout 交换机上面，发送端的 routing_key 写任何字符都会被忽略：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('public void send() {\n\tString context = "hi, fanout msg ";\n\tSystem.out.println("Sender : " + context);\n\tthis.rabbitTemplate.convertAndSend("fanoutExchange","", context);\n}\n')])])]),t("p",[e._v("结果如下：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("Sender : hi, fanout msg \n...\nfanout Receiver B: hi, fanout msg \nfanout Receiver A  : hi, fanout msg \nfanout Receiver C: hi, fanout msg \n")])])]),t("p",[e._v("结果说明，绑定到 fanout 交换机上面的队列都收到了消息")]),e._v(" "),t("h2",{attrs:{id:"rabbitmq级联组件-shovel"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#rabbitmq级联组件-shovel"}},[e._v("#")]),e._v(" Rabbitmq级联组件 Shovel")]),e._v(" "),t("h3",{attrs:{id:"用途"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#用途"}},[e._v("#")]),e._v(" 用途")]),e._v(" "),t("p",[e._v("当业务需要可靠且连续地将消息从一个 broker 的 queue 里搬运（转发）到另一个 broker 的 exchange 时（最终达到某个 queue 里 ）使用；作为 source 的 queue 和作为 destination 的 exchange 可以位于同一个 broker 上（通常要求处于不同的 vhost 下），也可以位于不同的 broker 上。")]),e._v(" "),t("h3",{attrs:{id:"好处"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#好处"}},[e._v("#")]),e._v(" 好处")]),e._v(" "),t("p",[e._v("shovel 基于 RabbitMQ 的 Erlang 客户端实现，且作为 built-in 插件被使用，故可以随 broker 的启动而自动启动；shovel 具有"),t("strong",[e._v("松耦合")]),e._v("特性：通过该插件可以在分属不同管理域下的 broker 或 cluster 之间进行消息的搬运；shovel 具有 "),t("strong",[e._v("WAN 友好")]),e._v("特性：基于 AMQP 0-9-1 协议实现，并设计成能够保证在不稳定网络场景下不丢失消息；shovel 具有"),t("strong",[e._v("高度可定制性")]),e._v("：允许在 shovel 建立连接后，立即执行指定的 AMQP 方法进行定制化操作（例如声明 queue 的动作）；")]),e._v(" "),t("h3",{attrs:{id:"安装步骤"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装步骤"}},[e._v("#")]),e._v(" 安装步骤")]),e._v(" "),t("ol",[t("li",[t("p",[t("strong",[e._v("执行脚本")])]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v(".\\rabbitmq-plugins.bat enable rabbitmq_shovel\n\n.\\rabbitmq-plugins.bat enable rabbitmq_shovel_management\n")])])])]),e._v(" "),t("li",[t("p",[t("strong",[e._v("添加级联关系")])]),e._v(" "),t("p",[t("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master/img/345b99b8652b87e795325c46e7af80e.png",alt:"1623135601969"}})])])])])}),[],!1,null,null,null);n.default=s.exports}}]);