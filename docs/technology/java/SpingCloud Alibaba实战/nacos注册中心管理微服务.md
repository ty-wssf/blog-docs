# nacos注册中心管理微服务

在上一节我们已经完成了Nacos Server的本地部署，这一节我们学习如何将Nacos作为注册中心，管理微服务。

# 1、注册中心简介

## 1.1、什么是注册中心

在微服务的体系里，注册中心是最重要的组件之一，我们来简单了解一下什么是注册中心。

> 注册中心和DNS类似，大家想一想，我们平时访问百度，是访问 [www.baidu.com](https://link.juejin.cn?target=http%3A%2F%2Fwww.baidu.com) ，还是直接访问ip地址呢？

　注册中心就承担了这样一个“名单”的角色，它记录了服务和服务地址的映射关系。在分布式架构中，服务会注册到这里，当服务需要调用其它服务时，就到这里找到服务的地址，进行调用。

![注册中心](https://gitee.com/wuyilong/picture-bed/raw/master/img/4ba7f88b205c4ea3b5eca28dbd53d10e~tplv-k3u1fbpfcp-watermark.png)

注册中心的作用就是**服务的注册**和**服务的发现**。

## 1.2、常见的注册中心

- Netflix Eureka
- Alibaba Nacos
- HashiCorp Consul
- Apache ZooKeeper
- CoreOS Etcd
- CNCF CoreDNS

| 特性            | Eureka      | Nacos                      | Consul            | Zookeeper  |
| --------------- | ----------- | -------------------------- | ----------------- | ---------- |
| CAP             | AP          | CP + AP                    | CP                | CP         |
| 健康检查        | Client Beat | TCP/HTTP/MYSQL/Client Beat | TCP/HTTP/gRPC/Cmd | Keep Alive |
| 雪崩保护        | 有          | 有                         | 无                | 无         |
| 自动注销实例    | 支持        | 支持                       | 不支持            | 支持       |
| 访问协议        | HTTP        | HTTP/DNS                   | HTTP/DNS          | TCP        |
| 监听支持        | 支持        | 支持                       | 支持              | 支持       |
| 多数据中心      | 支持        | 支持                       | 支持              | 不支持     |
| 跨注册中心同步  | 不支持      | 支持                       | 支持              | 不支持     |
| SpringCloud集成 | 支持        | 支持                       | 支持              | 支持       |

## 1.3、CAP原则与BASE理论

### 1.3.1、CAP原则

![CAP原则 ](https://gitee.com/wuyilong/picture-bed/raw/master/img/4a47f518f162489a9d62b1070b1cdc91~tplv-k3u1fbpfcp-watermark.png)

CAP 原则又称 CAP 定理，指的是在一个分布式系统中， Consistency（一致性）、 Availability（可用性）、Partition tolerance（分区容错性），三者不可得兼。

CAP 由 Eric Brewer 在 2000 年 PODC 会议上提出。该猜想在提出两年后被证明成立，成为我们熟知的 CAP 定理。CAP 三者不可兼得。

| 特性                | 定理                                                         |
| ------------------- | ------------------------------------------------------------ |
| Consistency         | 也叫做数据原子性，系统在执行某项操作后仍然处于一致的状态。在分布式系统中，更新操作执行成功后所有的用户都应该读到最新的值，这样的系统被认为是具有强一致性的。等同于所有节点访问同一份最新的数据副本。 |
| Availability        | 每一个操作总是能够在一定的时间内返回结果，这里需要注意的是"一定时间内"和"返回结果"。一定时间内指的是，在可以容忍的范围内返回结果，结果可以是成功或者是失败。 |
| Partition tolerance | 在网络分区的情况下，被分隔的节点仍能正常对外提供服务(分布式集群，数据被分布存储在不同的服务器上，无论什么情况，服务器都能正常被访问)。 |

**取舍原则**

CAP 三个特性只能满足其中两个，那么取舍的策略就共有三种：

- **CA without P**：如果不要求P（不允许分区），则C（强一致性）和A（可用性）是可以保证的。但放弃 P 的同时也就意味着放弃了系统的扩展性，也就是分布式节点受限，没办法部署子节点，这是违背分布式系统设计的初衷的。
- **CP without A**：如果不要求A（可用），相当于每个请求都需要在服务器之间保持强一致，而P（分区）会导致同步时间无限延长（也就是等待数据同步完才能正常访问服务），一旦发生网络故障或者消息丢失等情况，就要牺牲用户的体验，等待所有数据全部一致了之后再让用户访问系统。设计成 CP 的系统其实不少，最典型的就是分布式数据库，如 Redis、HBase  等。对于这些分布式数据库来说，数据的一致性是最基本的要求，因为如果连这个标准都达不到，那么直接采用关系型数据库就好，没必要再浪费资源来部署分布式数据库。
- **AP without C**：要高可用并允许分区，则需放弃一致性。一旦分区发生，节点之间可能会失去联系，为了高可用，每个节点只能用本地数据提供服务，而这样会导致全局数据的不一致性。典型的应用就如某米的抢购手机场景，可能前几秒你浏览商品的时候页面提示是有库存的，当你选择完商品准备下单的时候，系统提示你下单失败，商品已售完。这其实就是先在 A（可用性）方面保证系统可以正常的服务，然后在数据的一致性方面做了些牺牲，虽然多少会影响一些用户体验，但也不至于造成用户购物流程的严重阻塞。

**总结**：

现如今，对于多数大型互联网应用的场景，主机众多、部署分散，而且现在的集群规模越来越大，节点只会越来越多，所以节点故障、网络故障是常态，因此分区容错性也就成为了一个分布式系统必然要面对的问题。那么就只能在 C 和 A 之间进行取舍。但对于传统的项目就可能有所不同，拿银行的转账系统来说，涉及到金钱的对于数据一致性不能做出一丝的让步，C  必须保证，出现网络故障的话，宁可停止服务，可以在 A 和 P 之间做取舍。

总而言之，没有最好的策略，好的系统应该是根据业务场景来进行架构设计的，只有适合的才是最好的。

### 1.3.2、BASE理论

CAP 理论已经提出好多年了，难道真的没有办法解决这个问题吗？也许可以做些改变。比如 C 不必使用那么强的一致性，可以先将数据存起来，稍后再更新，实现所谓的 “最终一致性”。

　　这个思路又是一个庞大的问题，同时也引出了第二个理论 BASE 理论。

![BASE理论](https://gitee.com/wuyilong/picture-bed/raw/master/img/2837e90800d34f75a6a48e3b427e2008~tplv-k3u1fbpfcp-watermark.png)

> BASE：全称 Basically Available（基本可用），Soft state（软状态），和 Eventually consistent（最终一致性）三个短语的缩写，来自 ebay 的架构师提出。

　　BASE 理论是对 CAP 中一致性和可用性权衡的结果，其来源于对大型互联网分布式实践的总结，是基于 CAP 定理逐步演化而来的。其核心思想是：

> 既然无法做到强一致性（Strong consistency），但每个应用都可以根据自身的业务特点，采用适当的方式来使系统达到最终一致性（Eventual consistency）。

　　

　**Basically Available（基本可用）**

　　基本可用是指分布式系统在出现故障的时候，允许损失部分可用性（例如响应时间、功能上的可用性）。需要注意的是，基本可用绝不等价于系统不可用。

- 响应时间上的损失：正常情况下搜索引擎需要在 0.5 秒之内返回给用户相应的查询结果，但由于出现故障（比如系统部分机房发生断电或断网故障），查询结果的响应时间增加到了 1~2 秒。
- 功能上的损失：购物网站在购物高峰（如双十一）时，为了保护系统的稳定性，部分消费者可能会被引导到一个降级页面。

　**Soft state（软状态）**　

　　什么是软状态呢？相对于原子性而言，要求多个节点的数据副本都是一致的，这是一种 “硬状态”。

　　软状态是指允许系统存在中间状态，而该中间状态不会影响系统整体可用性。分布式存储中一般一份数据会有多个副本，允许不同副本数据同步的延时就是软状态的体现。

**Eventually consistent（最终一致性）**

　　系统不可能一直是软状态，必须有个时间期限。在期限过后，应当保证所有副本保持数据一致性。从而达到数据的最终一致性。这个时间期限取决于网络延时，系统负载，数据复制方案设计等等因素。

　　实际上，不只是分布式系统使用最终一致性，关系型数据库在某个功能上，也是使用最终一致性的，比如备份，数据库的复制都是需要时间的，这个复制过程中，业务读取到的值就是旧值。当然，最终还是达成了数据一致性。这也算是一个最终一致性的经典案例。

**总结**

总的来说，BASE 理论面向的是大型高可用可扩展的分布式系统，和传统事务的 ACID 是相反的，它完全不同于 ACID 的强一致性模型，而是通过牺牲强一致性来获得可用性，并允许数据在一段时间是不一致的。

# 2、引入Nacos作为注册中心

启动Nacos Server，我们发现服务列表里空空如也，接下里我们会在项目里集成Nacos Client，把我们前面开发的服务注册到Nacos Server。

![Nacos服务列表](https://gitee.com/wuyilong/picture-bed/raw/master/img/e85c5ea5a9bc443a987717ae54369d1b~tplv-k3u1fbpfcp-watermark.png)

## 2.1、引入Nacos  Client

Nacos与SpringCloud\Dubbo生态都能很好的融合，我们基于spring-cloud-alibaba引入nacos基础jar。

首先将父项目引入spring-cloud\spring-cloud-alibaba依赖，首先看一下官方的版本说明：[版本说明](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Falibaba%2Fspring-cloud-alibaba%2Fwiki%2F%E7%89%88%E6%9C%AC%E8%AF%B4%E6%98%8E)

![SpringCloud Alibaba版本说明](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/006fb37575374a2392c6ff94a04d406c~tplv-k3u1fbpfcp-watermark.awebp)

SpringBoot我们引入的是`2.2.2.RELEASE`版本，所以SpringCloud版本选择`Hoxton.RELEASE`，SpringCloud Alibaba版本选择`2.2.0.RELEASE`。

- 父项目管理依赖版本

在父项目pom.xml中添加：

```java
        <properties>
            <spring-cloud.version>Hoxton.RELEASE</spring-cloud.version>
            <spring-cloud-alibaba.version>2.2.0.RELEASE</spring-cloud-alibaba.version>
        </properties>

        <dependencyManagement>
            <dependencies>
                <dependency>
                    <groupId>org.springframework.cloud</groupId>
                    <artifactId>spring-cloud-dependencies</artifactId>
                    <version>${spring-cloud.version}</version>
                    <type>pom</type>
                    <scope>import</scope>
                </dependency>
                <dependency>
                    <groupId>com.alibaba.cloud</groupId>
                    <artifactId>spring-cloud-alibaba-dependencies</artifactId>
                    <version>${spring-cloud-alibaba.version}</version>
                    <type>pom</type>
                    <scope>import</scope>
                </dependency>
            </dependencies>
        </dependencyManagement>

复制代码
```

- 子项目引入Nacos

还是以user子模块为例，在user子模块的pom.xml中添加：

```java
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
                <version>0.2.2.RELEASE</version>
            </dependency>
            <dependency>
                <groupId>com.alibaba.nacos</groupId>
                <artifactId>nacos-client</artifactId>
            </dependency>

复制代码
```

> 这里存在一个问题，spring-cloud-starter-alibaba-nacos-discovery需要指定版本，否则无法导入，没有查找为什么版本和SpringCloud Alibaba版本不一致。

## 2.2、服务注册

- 在模块启动类中添加注解` @EnableDiscoveryClient`开启服务注册发现功能

```java
@SpringBootApplication
@MapperScan("cn.fighter3.mapper")
@EnableDiscoveryClient
public class EshopUserApplication {

    public static void main(String[] args) {
        SpringApplication.run(EshopUserApplication.class, args);
    }
}
复制代码
```

- 在配置文件application.yml中添加服务名称和Nacos Server地址

```java
spring:
  application:
    name: user-service
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
复制代码
```

> 更多配置可以查看：[Nacos discovery](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Falibaba%2Fspring-cloud-alibaba%2Fwiki%2FNacos-discovery)

- 启动项目，通过Nacos控制台查看，发现用户服务已经注册到了Nacos Server。

![用户服务注册](https://gitee.com/wuyilong/picture-bed/raw/master/img/2c3445f50ccd4df99a5cbceac0bba04d~tplv-k3u1fbpfcp-watermark.png)

我们可以参考第五章，和上面的内容，完善其它几个业务子模块，将其它几个业务模块服务也注册到Nacos注册中心。这里略去这一部分的内容，给大家看最后的效果：

![所有子服务注册完成](https://gitee.com/wuyilong/picture-bed/raw/master/img/8908529901db41c4ba2396b547d476c6~tplv-k3u1fbpfcp-watermark.png)



作者：三分恶
链接：https://juejin.cn/post/6976845570006581256
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。