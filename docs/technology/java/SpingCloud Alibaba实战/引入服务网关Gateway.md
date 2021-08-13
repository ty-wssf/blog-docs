#  引入服务网关Gateway

在前面的章节中，我们已经完成了服务间的调用、统一配置等等，在这一章节里，我们会引入微服务体系的一个重要组件——网关。

# 网关概述

## 为什么要引入网关

大家都知道，我们服务端的各个服务调用是从服务注册中心拉取服务列表，再由负载均衡策略去调用对应的服务提供方。

那么，在什么都不做的情况下，看看我们的客户端，包括PC、移动端等等是怎么访问我们的服务端的呢？

![无网关客户端访问服务](https://gitee.com/wuyilong/picture-bed/raw/master/img/d7fd15ec56624a4a8c111bb0a1b245f2~tplv-k3u1fbpfcp-watermark.png)

这么办有什么问题呢？

- 客户端需要维护后端服务的地址，如果我们集群部署，一个服务有数十上百个节点呢？

- 日志、鉴权等等逻辑，我们每个服务都得搞一套。

- 服务端的服务都得能被客户端访问，所以需要外网ip，但是ip资源实在太宝贵了。

  ……

这时候就需要在客户端和服务端之间加一个统一的入口，而在微服务的体系中，承担这个角色的就是网关。

![引入网关](https://gitee.com/wuyilong/picture-bed/raw/master/img/01ca210f19f54c26a8210221a40ad2f5~tplv-k3u1fbpfcp-watermark.png)

我们加入一个网关，来作为请求的统一接入。我们只需要将网关的机器ip配置到DNS，或者接入层负载，那么客户端的服务最终通过我们的网关，再转发给对应的服务端服务。

## 常见微服务网关

目前市面上根据技术栈实现的不同大概有如下一些网关:

![常见网关](https://gitee.com/wuyilong/picture-bed/raw/master/img/6747ac7169294a2c98ec24524053215c~tplv-k3u1fbpfcp-watermark.png)

简单介绍一下这些网关：

- **Nginx：** Nginx由内核和模块组成，内核的设计非常微小和简洁，完成的工作也非常简单，仅仅通过查找配置文件与客户端请求进行 URL 匹配，用于启动不同的模块去完成相应的工作。
- **Kong:** Kong是一款基于OpenResty（Nginx + Lua模块）编写的高可用、易扩展的，由Mashape公司开源的API  Gateway项目。Kong是基于NGINX和Apache Cassandra或PostgreSQL构建的，能提供易于使用的RESTful  API来操作和配置API管理系统，所以它可以水平扩展多个Kong服务器，通过前置的负载均衡配置把请求均匀地分发到各个Server，来应对大批量的网络请求。
- **Netfilx Zuul：**Zuul 是 Netflix 开源的微服务网关组件，它可以和 Eureka、Ribbon、Hystrix 等组件配合使用。社区活跃，融合于 SpringCloud 完整生态，是构建微服务体系前置网关服务的最佳选型之一。
- **Spring Cloud GetWay：**Spring Cloud Gateway 是Spring Cloud的一个全新的API网关项目，目的是为了替换掉Zuul1。Gateway可以与Spring Cloud Discovery  Client（如Eureka）、Ribbon、Hystrix等组件配合使用，实现路由转发、负载均衡、熔断等功能，并且Gateway还内置了限流过滤器，实现了限流的功能。

# Spring Cloud GetWay实践

在上面我们已经简单介绍了各种常见的微服务网关，接下来引入我们今天的主角——SpringCloud Gateway。

## 创建网关服务

- 创建网关子module `esop-gateway`

![eshop-gateway](https://gitee.com/wuyilong/picture-bed/raw/master/img/7ef01476106541a884c29a4f08417e42~tplv-k3u1fbpfcp-watermark.png)

- 引入相关依赖，注意啊，因为网关服务作为一个服务，同样需要配置中心和注册中心，所以，我们也引入了相关依赖

```java
  <!--Spring Cloud Alibaba-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
            <version>0.2.2.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba.nacos</groupId>
            <artifactId>nacos-client</artifactId>
        </dependency>
        <!-- spring cloud alibaba nacos config 依赖 -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
        </dependency>
        <!--gateway网关-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-gateway</artifactId>
        </dependency>
复制代码
```

- bootstap.yml：在配置文件里除了应用名称，我们还配置了Nacos的相关配置，不太清楚的同学可以查看上一节。

```java
spring:
  application:
    name: gateway-service # 应用名称
  profiles:
    active: dev      # 当前环境对应的 profile
  cloud:
    nacos:
      config:
        enabled: true     # 如果不想使用 Nacos 进行配置管理，设置为 false 即可
        server-addr: 127.0.0.1:8848   # Nacos Server 地址
        group: DEFAULT_GROUP     # 组，默认为 DEFAULT_GROUP
        file-extension: yaml    # 配置内容的数据格式，默认为 properties
        namespace: dev_space    # 指定命名空间，默认为public
复制代码
```

## 路由配置

我们在nacos中来完成gateway的相关路由的配置。

![gateway服务配置](https://gitee.com/wuyilong/picture-bed/raw/master/img/ca583a4fa72940ffb2b45eb4189d3903~tplv-k3u1fbpfcp-watermark.png)

```java
server:
  port: 9000
spring:
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848
    gateway:
      discovery:
        locator:
          enabled: true
      routes:
      - id: user-service
        uri: lb://user-service
        predicates:
          - Path=/user/**
        filters:
          - StripPrefix=1  
复制代码
```

我们在里面进行了路由转发的配置，也就是`routes`,我们来看一看这些配置项都是什么意思：

- **id：** 路由的`唯一`标识，用以和其它Route区分
- **uri：** 请求要转发到的地址，**lb** 指的是从nacos中按照名称获取微服务，并遵循负载均衡策略
- **predicates：** 路由需要满足的条件，也是个数组（这里是`或`的关系）
- **filters：** 过滤器，请求在传递过程中可以通过过滤器对其进行一定的修改

在这个配置项里，我们定义了`user` 开头的请求，分发到`user-service`这个服务。

接下来我们看看效果吧！

## 路由转发效果

回忆一下，在用户服务里有一个get请求的根据 id 获取用户的接口，访问一下：

![获取用户信息接口](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/284b983f1af545cbadad5e217271eb14~tplv-k3u1fbpfcp-watermark.awebp)

OK，我们现在不直接访问用户服务的接口，而是改成访问网关服务，我们来看看效果：

![网关访问获取用户信息接口](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df3a608ccf49465a9fd56e8b3f0d1828~tplv-k3u1fbpfcp-watermark.awebp)

我们访问的地址是：[http://localhost:9000/user/shop-user/user/get-by-id?id=1](https://link.juejin.cn?target=http%3A%2F%2Flocalhost%3A9000%2Fuser%2Fshop-user%2Fuser%2Fget-by-id%3Fid%3D1) ，简单解析一下：

![网关请求路径解析](https://gitee.com/wuyilong/picture-bed/raw/master/img/6396957e5d784b238ec4de4e19fab725~tplv-k3u1fbpfcp-watermark.png)


作者：三分恶
链接：https://juejin.cn/post/6981278079909888037
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。