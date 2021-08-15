# Hystrix容错保护

在上一节我们已经使用OpenFeign完成了服务间的调用。想一下，假如我们一个服务链路上上下游有十几个服务，每个服务有若干个节点，其中一个节点故障，上游请求打到故障的节点，加入请求一直阻塞，大量堆积的请求可能会把服务打崩，可能导致级联式的失败，甚至整个链路失败，这就是所谓的`服务雪崩`，严重可能直接导致系统挂掉。为了避免这种可怕的情况，必要的容错保护机制是必需的。

![服务雪崩](https://gitee.com/wuyilong/picture-bed/raw/master/img/938ad770a2f24830a0eaa0b05ce008c1~tplv-k3u1fbpfcp-watermark.png)

## Hystrix简介

Hystrix是Netflix的一个重要组件，提供了断路器、资源隔离与自我修复功能。

如下是Hystrix作为断路器，阻止级联失败。

![hystrix阻止级联失败](https://gitee.com/wuyilong/picture-bed/raw/master/img/9fe45632e0f545788c3185d96b646ac3~tplv-k3u1fbpfcp-watermark.png)

但是Hystrix1.5.18版本之后进入了维护模式，我们采用的就是这个版本。在SpringCloud Alibaba的体系，有另外一个组件sentinel可以作为替代品，在后面我们会用到。

![Hystrix停止维护](https://gitee.com/wuyilong/picture-bed/raw/master/img/36539dbf4e3b46f99df1d2207e3a3cd8~tplv-k3u1fbpfcp-watermark.png)

尽管Hystrix已经停止更新，但是经过多年迭代，目前已经是一个比较成熟的产品，所以仍然有比较广泛的应用。

Hystrix在SpringCloud体系的使用也非常简单，下面，我们开始吧！

## 引入Hystrix

仍然是用我们上节的例子。

- 采用spring-cloud-starter的方式引入：

```java
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
    </dependency>


```

- 在application.yml开启hystrix：

```java
feign:
  hystrix:
    enabled: true

```

- 在服务启动类加入@EnableHystrix注解，以使系统支持hystrix的功能。

```java
@SpringBootApplication
@MapperScan("cn.fighter3.mapper")
@EnableDiscoveryClient
@EnableFeignClients(basePackages = "cn.fighter3.client")
@EnableHystrix
public class EshopGoodsApplication {

    public static void main(String[] args) {
        SpringApplication.run(EshopGoodsApplication.class, args);
    }
}

```

- 编写一个StockClientFallback类，实现StockClientFeign接口，这个类是用来干什么的呢？是用于Feign客户端远程调用失败回调的。

```java
/**
 * @Author 三分恶
 * @Date 2021/5/29
 * @Description 库存服务回调异常回调类
 */
@Component
@Slf4j
public class StockClientFallback implements StockClientFeign {

    public Integer addStock(StockAddDTO stockAddDTO) {
        log.error("库存服务-添加库存不可用！");
        return 0;
    }

    public Integer getAccountById(Integer goodsId) {
        log.error("库存服务-获取库存不可用！");
        return 0;
    }
}

```

- 在StockClientFeign中添加失败回调配置，原来是`@FeignClient(value = "stock-service"）`

```java
@FeignClient(value = "stock-service", fallback = StockClientFallback.class)

```

还有另外一种方式，可以在方法上使用`@HystrixCommand(fallbackMethod = "getDefaultUser")`来定义服务降级方法。

## 测试Hystrix

- 依次启动Nacos-Server、商品服务，注意，我们没有启动库存服务

![服务注册信息](https://gitee.com/wuyilong/picture-bed/raw/master/img/21e786871935465ebe9deccc1b8b943d~tplv-k3u1fbpfcp-watermark.png)

- 打开 [http://localhost:8020/doc.html](https://link.juejin.cn?target=http%3A%2F%2Flocalhost%3A8020%2Fdoc.html) ，调用一下添加商品接口。想一下，正常情况下，会是什么结果呢？由于库存服务没起，那么连带着商品服务也一定会返回异常，但是加入了hystrix，发现，接口返回成功的结果。

![调用添加商品接口](https://gitee.com/wuyilong/picture-bed/raw/master/img/c90ac67daf4147e19e8965690412a543~tplv-k3u1fbpfcp-watermark.png)

看一下我们打的日志，发现回调的方法被调用了。

![错误日志](https://gitee.com/wuyilong/picture-bed/raw/master/img/25766e189f0843619b5bb0175ced46f0~tplv-k3u1fbpfcp-watermark.png)

好了，Hystrix实现断路器到这就结束了。


作者：三分恶
链接：https://juejin.cn/post/6979069331715915789
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。