# FutureTask基本操作总结

## 1.FutureTask 简介

在 Executors 框架体系中，FutureTask 用来表示可获取结果的异步任务。FutureTask 实现了 Future 接口，FutureTask 提供了启动和取消异步任务，查询异步任务是否计算结束以及获取最终的异步任务的结果的一些常用的方法。通过`get()`方法来获取异步任务的结果，但是会阻塞当前线程直至异步任务执行结束。一旦任务执行结束，任务不能重新启动或取消，除非调用`runAndReset()`方法。在 FutureTask 的源码中为其定义了这些状态：

```
private static final int NEW          = 0;
private static final int COMPLETING   = 1;
private static final int NORMAL       = 2;
private static final int EXCEPTIONAL  = 3;
private static final int CANCELLED    = 4;
private static final int INTERRUPTING = 5;
private static final int INTERRUPTED  = 6;
复制代码
```

另外，在《java 并发编程的艺术》一书，作者根据 FutureTask.run()方法的执行的时机，FutureTask 分为了 3 种状态：

1. **未启动**。FutureTask.run()方法还没有被执行之前，FutureTask 处于未启动状态。当创建一个 FutureTask，还没有执行 FutureTask.run()方法之前，FutureTask 处于未启动状态。
2. **已启动**。FutureTask.run()方法被执行的过程中，FutureTask 处于已启动状态。
3. **已完成**。FutureTask.run()方法执行结束，或者调用 FutureTask.cancel(...)方法取消任务，或者在执行任务期间抛出异常，这些情况都称之为 FutureTask 的已完成状态。

下图总结了 FutureTask 的状态变化的过程：

![FutureTask状态迁移图.jpg](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1240" height="541"></svg>)FutureTask状态迁移图.jpg

由于 FutureTask 具有这三种状态，因此执行 FutureTask 的 get 方法和 cancel 方法，当前处于不同的状态对应的结果也是大不相同。这里对 get 方法和 cancel 方法做个总结：

> get 方法

当 FutureTask 处于未启动或已启动状态时，执行 FutureTask.get()方法将导致调用线程阻塞。如果 FutureTask 处于已完成状态，调用 FutureTask.get()方法将导致调用线程立即返回结果或者抛出异常

> cancel 方法

当 FutureTask 处于**未启动状态**时，执行 FutureTask.cancel()方法将此任务永远不会执行；

当 FutureTask 处于**已启动状态**时，执行 FutureTask.cancel(true)方法将以中断线程的方式来阻止任务继续进行，如果执行 FutureTask.cancel(false)将不会对正在执行任务的线程有任何影响；

当**FutureTask**处于已完成状态时，执行 FutureTask.cancel(...)方法将返回 false。

对 Future 的 get()方法和 cancel()方法用下图进行总结

![FutureTask的get和cancel的执行示意图.jpg](https://user-gold-cdn.xitu.io/2018/5/6/16334a72fd899d43?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)FutureTask的get和cancel的执行示意图.jpg

## 2. FutureTask 的基本使用

FutureTask 除了实现 Future 接口外，还实现了 Runnable 接口。因此，FutureTask 可以交给 Executor 执行，也可以由调用的线程直接执行（FutureTask.run()）。另外，FutureTask 的获取也可以通过 ExecutorService.submit()方法返回一个 FutureTask 对象，然后在通过 FutureTask.get()或者 FutureTask.cancel 方法。

**应用场景：**当一个线程需要等待另一个线程把某个任务执行完后它才能继续执行，此时可以使用 FutureTask。假设有多个线程执行若干任务，每个任务最多只能被执行一次。当多个线程试图执行同一个任务时，只允许一个线程执行任务，其他线程需要等待这个任务执行完后才能继续执行。


来源于 https://juejin.cn/post/6844903602457149453