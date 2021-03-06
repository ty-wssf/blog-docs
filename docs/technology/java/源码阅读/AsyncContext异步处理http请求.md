# AsyncContext异步处理http请求

## AsyncContext
AsyncContext是Servlet 3.0提供的异步处理类，主要作用为释放Servlet 线程，让当前Servlet 线程去处理别的请求。

我们先对比下使用AsyncContext后的流程变化

Servlet 3.0 之前，一个普通 Servlet 的主要工作流程大致如下：
第一步，Servlet 接收到请求之后，可能需要对请求携带的数据进行一些预处理；
第二步，调用业务接口的某些方法，以完成业务处理；
第三步，根据处理的结果提交响应，Servlet 线程结束。
其中第二步的业务处理通常是最耗时的，这主要体现在数据库操作，以及其它的跨网络调用等，在此过程中，Servlet 线程一直处于阻塞状态，直到业务方法执行完毕。在处理业务的过程中，Servlet 资源一直被占用而得不到释放，对于并发较大的应用，这有可能造成性能的瓶颈。

Servlet 3.0 针对这个问题做了开创性的工作，现在通过使用 Servlet 3.0 的异步处理支持，之前的 Servlet 处理流程可以调整为如下的过程：
第一步，Servlet 接收到请求之后，可能首先需要对请求携带的数据进行一些预处理；
第二步，Servlet 线程将请求转交给一个异步线程来执行业务处理，线程本身返回至容器，
第三步，Servlet 还没有生成响应数据，异步线程处理完业务以后，可以直接生成响应数据（异步线程拥有 ServletRequest 和 ServletResponse 对象的引用），或者将请求继续转发给其它 Servlet。
Servlet 线程不再是一直处于阻塞状态以等待业务逻辑的处理，而是启动异步线程之后可以立即返回。

## 代码实现

首先我们设置当前tomcat的最大线程数

```properties
server.tomcat.min-spare-threads=1
# 设置tomcat最大处理线程数量
server.tomcat.max-threads=1
```

我们设置tomcat最大处理线程数量为1，即最多只有一个线程来处理http请求。
我们先看如下代码：

```java
@RequestMapping("/sleep")
public String sleep() {
    try {
        Thread.sleep(3000);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }

    return "sleep";
}
```

然后我们使用我们的jmeter测试工具来做下测试，我们在一秒内发起两个请求来调用，查看结果可以看到返回结果是在第一个结果返回之后过了一段时间才返回第二个结果，原因是我们只有一个线程来处理请求，当线程1没有释放当前线程时，线程2只能等待。第1个线程耗时3007毫秒，第2个线程耗时5511毫秒
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200909204549803.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMxMDg2Nzk3,size_16,color_FFFFFF,t_70#pic_center)

然后我们看使用AsyncContext的代码

```java
@RequestMapping("/async1")
public void async1(HttpServletRequest request, HttpServletResponse response) throws IOException {

    ScheduledExecutorService executorService = Executors.newScheduledThreadPool(10);

    // 释放http连接，转为异步
    AsyncContext context = request.startAsync();
    // 直接超时了
    context.setTimeout(0L);

    // 异步处理，等待3秒后执行
    executorService.schedule(()->{
        PrintWriter writer = null;
        try {
            writer = context.getResponse().getWriter();
        } catch (IOException e) {
            e.printStackTrace();
        }
        writer.print("111111111111");
        // TODO 异步完成，返回客户端信息
        context.complete();

    },3, TimeUnit.SECONDS);

}
```

继续使用jmeter来测试，1秒内发起50次请求，可以发现50次请求几乎在同一时间完成了响应，并且响应时间几乎都维持在3秒。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200909223757738.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMxMDg2Nzk3,size_16,color_FFFFFF,t_70#pic_center)

## 总结

通过上述案例我们发现，当我们服务端tomcat只有一个线程时通过使用AsyncContext居然可以处理非常多的请求，这在并发要求比较高时就非常有用了，即同一个线程在业务端代码还没返回时就可以接受其他请求来处理了。

在nacos源码中客户端拉取服务端更新配置文件时采用了长轮询的机制便是采用了AsyncContext来处理。

扩展：在长轮询机制中使用AsyncContext可以大大的减少服务端的压力