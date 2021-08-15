# 漫谈Java线程状态
## 1. 前言
Java语言定义了 6 种线程状态，在任意一个时间点中，一个线程只能只且只有其中的一种状态，并且可以通过特定的方法在不同状态之间进行转换。

今天，我们就详细聊聊这几种状态，以及在什么情况下会发生转换。

## 2. 线程状态
要想知道Java线程都有哪些状态，我们可以直接来看 Thread，它有一个枚举类 State。
```java
public class Thread {

    public enum State {

        /**
         * 新建状态
         * 创建后尚未启动的线程
         */
        NEW,

        /**
         * 运行状态
         * 包括正在执行，也可能正在等待操作系统为它分配执行时间
         */
        RUNNABLE,

        /**
         * 阻塞状态
         * 一个线程因为等待临界区的锁被阻塞产生的状态
         */
        BLOCKED,

        /**
         * 无限期等待状态
         * 线程不会被分配处理器执行时间，需要等待其他线程显式唤醒
         */
        WAITING,

        /**
         * 限期等待状态
         * 线程不会被分配处理器执行时间，但也无需等待被其他线程显式唤醒
         * 在一定时间之后，它们会由操作系统自动唤醒
         */
        TIMED_WAITING,

        /**
         * 结束状态
         * 线程退出或已经执行完成
         */
        TERMINATED;
    }
}
```

## 3. 状态转换
我们说，线程状态并非是一成不变的，可以通过特定的方法在不同状态之间进行转换。那么接下来，我们通过代码，具体来看看这些个状态是怎么形成的。

### 3.1 新建
新建状态最为简单，创建一个线程后，尚未启动的时候就处于此种状态。
```
public static void main(String[] args) {
    Thread thread = new Thread("新建线程");
    System.out.println("线程状态："+thread.getState());
}
-- 输出：线程状态：NEW
```

### 3.2 运行
可运行线程的状态，当我们调用了start()方法，线程正在Java虚拟机中执行，但它可能正在等待来自操作系统（如处理器）的其他资源。

所以，这里实际上包含了两种状态：Running 和 Ready，统称为 Runnable。这是为什么呢？

这里涉及到一个Java线程调度的问题：

> 线程调度，是指系统为线程分配处理器使用权的过程。调度主要方式有两种，协同式线程调度和抢占式线程调度。

- 协同式线程调度

线程的执行时间由线程本身来控制，线程把自己的工作执行完毕之后，要主动通知系统切换到另外一个线程上去。

- 抢占式线程调度

每个线程将由系统来自动分配执行时间，线程的切换不由线程本身来决定，是基于CPU时间分片的方式。

它们孰优孰劣，不在本文讨论范围之内。我们只需要知道，Java使用的线程调度方式就是抢占式调度。

通常，这个时间分片是很小的，可能只有几毫秒或几十毫秒。所以，线程的实际状态可能会在Running 和 Ready状态之间不断变化。所以，再去区分它们意义不大。

那么，我们再多想一下，如果Java线程调度方式是协同式调度，也许再去区分这两个状态就很有必要了。

```
public static void main(String[] args) {
	
    Thread thread = new Thread(() -> {
        for (;;){}
    });
    thread.start();
    System.out.println("线程状态："+thread.getState());
}
-- 输出：线程状态：RUNNABLE
```

简单来看，上面的代码就使线程处于Runnable状态。但值得我们注意的是，如果一个线程在等待阻塞I/O的操作时，它的状态也是Runnable的。

我们来看两个经典阻塞IO的例子：
```
public static void main(String[] args) throws Exception {

    Thread t1 = new Thread(() -> {
        try {
            ServerSocket serverSocket = new ServerSocket(9999);
            while (true){
                Socket socket = serverSocket.accept();
                OutputStream outputStream = socket.getOutputStream();
                outputStream.write("Hello".getBytes());
                outputStream.flush();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    },"accept");
    t1.start();

    Thread t2 = new Thread(() -> {
        try {
            Socket socket = new Socket("127.0.0.1",9999);
            for (;;){
                InputStream inputStream = socket.getInputStream();
                byte[] bytes = new byte[5];
                inputStream.read(bytes);
                System.out.println(new String(bytes));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    },"read");
    t2.start();
}
```

上面的代码中，我们知道，serverSocket.accept()和inputStream.read(bytes);都是阻塞式方法。

它们一个在等待客户端的连接；一个在等待数据的到来。但是，这两个线程的状态却是 RUNNABLE的。
```
"read" #13 prio=5 os_prio=0 tid=0x0000000023f6c800 nid=0x1cd0 runnable [0x0000000024b3e000]
   java.lang.Thread.State: RUNNABLE
	at java.net.SocketInputStream.socketRead0(Native Method)
	at java.net.SocketInputStream.socketRead(SocketInputStream.java:116)
	at java.net.SocketInputStream.read(SocketInputStream.java:171)
	at java.net.SocketInputStream.read(SocketInputStream.java:141)
"accept" #12 prio=5 os_prio=0 tid=0x0000000023f68000 nid=0x4cec runnable [0x0000000024a3e000]
   java.lang.Thread.State: RUNNABLE
	at java.net.DualStackPlainSocketImpl.accept0(Native Method)
	at java.net.DualStackPlainSocketImpl.socketAccept(DualStackPlainSocketImpl.java:131)
	at java.net.AbstractPlainSocketImpl.accept(AbstractPlainSocketImpl.java:409)
	at java.net.PlainSocketImpl.accept(PlainSocketImpl.java:199)
```

这又是为什么呢 ？

我们前面说过，处于 Runnable 状态下的线程，正在 Java 虚拟机中执行，但它可能正在等待来自操作系统（如处理器）的其他资源。

不管是CPU、网卡还是硬盘，这些都是操作系统的资源而已。当进行阻塞式的IO操作时，或许底层的操作系统线程确实处在阻塞状态，但在这里我们的 Java 虚拟机线程的状态还是 Runnable。

不要小看这个问题，很具有迷惑性。有些面试官如果问到，如果一个线程正在进行阻塞式 I/O 操作时，它处于什么状态？是Blocked还是Waiting？

那这时候，我们就要义正言辞的告诉他：亲，都不是哦~

### 3.3 无限期等待
处于无限期等待状态下的线程，不会被分配处理器执行时间，除非其他线程显式的唤醒它。

最简单的场景就是调用了 Object.wait() 方法。
```
public static void main(String[] args) throws Exception {

    Object object = new Object();
    new Thread(() -> {
        synchronized (object){
        try {
            object.wait();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }}).start();
}
-- 输出：线程状态：WAITING
```

此时这个线程就处于无限期等待状态，除非有别的线程显式的调用object.notifyAll();来唤醒它。

然后，就是Thread.join()方法，当主线程调用了此方法，就必须等待子线程结束之后才能继续进行。
```
public static void main(String[] args) throws Exception {

    Thread mainThread = new Thread(() -> {
        Thread subThread = new Thread(() -> {
            for (;;){}
        });
        subThread.start();
        try {
            subThread.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    });
    mainThread.start();
    System.out.println("线程状态："+mainThread.getState());
}
//输出：线程状态：WAITING
```

如上代码，在主线程 mainThread 中调用了子线程的join()方法，那么主线程就要等待子线程结束运行。所以此时主线程mainThread的状态就是无限期等待。

多说一句，其实join()方法内部，调用的也是Object.wait()。
最后，我们说说LockSupport.park()方法，它同样会使线程进入无限期等待状态。也许有的朋友对它很陌生，没有用过，我们来看一个阻塞队列的例子。

```
public static void main(String[] args) throws Exception {

    ArrayBlockingQueue<Long> queue = new ArrayBlockingQueue(1);
    Thread thread = new Thread(() -> {
        while (true){
            try {
                queue.put(System.currentTimeMillis());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    });
    thread.start();
}
```

如上代码，往往我们会通过阻塞队列的方式来做生产者-消费者模型的代码。

这里，ArrayBlockingQueue长度为1，当我们第二次往里面添加数据的时候，发现队列已满，线程就会等待这里，它的源码里面正是调用了LockSupport.park()。

同样的，这里也比较具有迷惑性，我来问你：阻塞队列中，如果队列为空或者队列已满，这时候执行take或者put操作的时候，线程的状态是 Blocked 吗？

那这时候，我们需要谨记这里的线程状态还是 WAITING。它们之间的区别和联系，我们后文再看。

### 3.4 限期等待
同样的，处于限期等待状态下的线程，也不会被分配处理器执行时间，但是它在一定时间之后可以自动的被操作系统唤醒。

这个跟无限期等待的区别，仅仅就是有没有带有超时时间参数。

比如：
```
object.wait(3000);
thread.join(3000);
LockSupport.parkNanos(5000000L);
Thread.sleep(1000);
```

像这种操作，都会使线程处于限期等待的状态 TIMED_WAITING。因为Thread.sleep()必须带有时间参数，所以它不在无限期等待行列中。

### 3.5 阻塞
一个线程因为等待临界区的锁被阻塞产生的状态，也就是说，阻塞状态的产生是因为它正在等待着获取一个排它锁。

这里，我们来看一个 synchronized的例子。
```
public static void main(String[] args) throws Exception {

    Object object = new Object();
    Thread t1 = new Thread(() -> {
        synchronized (object){
            for (;;){}
        }
    });
    t1.start();

    Thread t2 = new Thread(() -> {
        synchronized (object){
            System.out.println("获取到object锁，线程执行。");
        }
    });
    t2.start();
    System.out.println("线程状态："+t2.getState());
}
//输出：线程状态：BLOCKED
```

我们看上面的代码，object对象锁一直被线程 t1 持有，所以线程 t2 的状态一直会是阻塞状态。

我们接着再来看一个锁的例子：
```
public static void main(String[] args){

    Lock lock = new ReentrantLock();
    lock.lock();
    Thread t1 = new Thread(() -> {
        lock.lock();
        System.out.println("已获取lock锁，线程执行");
        lock.unlock();
    });
    t1.start();
    System.out.println("线程状态："+t1.getState());
}
```

如上代码，我们有一个ReentrantLock，main线程已经持有了这个锁，t1 线程会一直等待在lock.lock();。

那么，此时 t1 线程的状态是什么呢 ？

其实答案是WAITING，即无限期等待状态。这又是为什么呢 ？

原因在于，Lock接口是Java API实现的锁，它的底层实现其实是抽象同步队列，简称AQS。

在通过lock.lock()获取锁的时候，如果锁正在被其他线程持有，那么线程会被放入AQS队列后，阻塞挂起。

```
public final void acquire(int arg) {
    if (!tryAcquire(arg) &&
        如果tryAcquire返回false，会把当前线程放入AQS阻塞队列
        acquireQueued(addWaiter(Node.EXCLUSIVE), arg))
        selfInterrupt();
}
```

acquireQueued方法会将当前线程放入 AQS 阻塞队列，然后调用LockSupport.park(this);挂起线程。

所以，这也就解释了为什么lock.lock()获取锁的时候，当前的线程状态会是 WAITING。

常常有人会问，synchronized和Lock的区别，除了一般性的答案，此时你也可以说一下线程状态的差异，我猜可能很少有人会意识到这一点。

### 3.6 结束
一个线程，当它退出或已经执行完成的时候，就是结束状态。
```
public static void main(String[] args) throws Exception {
    
    Thread thread = new Thread(() -> System.out.println("线程已执行"));
    thread.start();
    Thread.sleep(1000);
    System.out.println("线程状态："+thread.getState());
}
//输出：  线程已执行
线程状态：TERMINATED
```

## 4. 总结
本文介绍了 Java 线程的不同状态，以及在何种情况下发生转换。

![线程状态啊](https://gitee.com/wuyilong/picture-bed/raw/master/img/17185f48d25fe5bc.jpg)

来源于 https://juejin.cn/post/6844904129551138824#heading-1