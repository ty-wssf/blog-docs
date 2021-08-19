(window.webpackJsonp=window.webpackJsonp||[]).push([[114],{587:function(t,a,e){"use strict";e.r(a);var n=e(30),r=Object(n.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"漫谈java线程状态"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#漫谈java线程状态"}},[t._v("#")]),t._v(" 漫谈Java线程状态")]),t._v(" "),e("h2",{attrs:{id:"_1-前言"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-前言"}},[t._v("#")]),t._v(" 1. 前言")]),t._v(" "),e("p",[t._v("Java语言定义了 6 种线程状态，在任意一个时间点中，一个线程只能只且只有其中的一种状态，并且可以通过特定的方法在不同状态之间进行转换。")]),t._v(" "),e("p",[t._v("今天，我们就详细聊聊这几种状态，以及在什么情况下会发生转换。")]),t._v(" "),e("h2",{attrs:{id:"_2-线程状态"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-线程状态"}},[t._v("#")]),t._v(" 2. 线程状态")]),t._v(" "),e("p",[t._v("要想知道Java线程都有哪些状态，我们可以直接来看 Thread，它有一个枚举类 State。")]),t._v(" "),e("div",{staticClass:"language-java extra-class"},[e("pre",{pre:!0,attrs:{class:"language-java"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Thread")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n    "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("enum")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("State")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n        "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n         * 新建状态\n         * 创建后尚未启动的线程\n         */")]),t._v("\n        NEW"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\n        "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n         * 运行状态\n         * 包括正在执行，也可能正在等待操作系统为它分配执行时间\n         */")]),t._v("\n        RUNNABLE"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\n        "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n         * 阻塞状态\n         * 一个线程因为等待临界区的锁被阻塞产生的状态\n         */")]),t._v("\n        BLOCKED"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\n        "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n         * 无限期等待状态\n         * 线程不会被分配处理器执行时间，需要等待其他线程显式唤醒\n         */")]),t._v("\n        WAITING"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\n        "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n         * 限期等待状态\n         * 线程不会被分配处理器执行时间，但也无需等待被其他线程显式唤醒\n         * 在一定时间之后，它们会由操作系统自动唤醒\n         */")]),t._v("\n        TIMED_WAITING"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\n        "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n         * 结束状态\n         * 线程退出或已经执行完成\n         */")]),t._v("\n        TERMINATED"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("h2",{attrs:{id:"_3-状态转换"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-状态转换"}},[t._v("#")]),t._v(" 3. 状态转换")]),t._v(" "),e("p",[t._v("我们说，线程状态并非是一成不变的，可以通过特定的方法在不同状态之间进行转换。那么接下来，我们通过代码，具体来看看这些个状态是怎么形成的。")]),t._v(" "),e("h3",{attrs:{id:"_3-1-新建"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-新建"}},[t._v("#")]),t._v(" 3.1 新建")]),t._v(" "),e("p",[t._v("新建状态最为简单，创建一个线程后，尚未启动的时候就处于此种状态。")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('public static void main(String[] args) {\n    Thread thread = new Thread("新建线程");\n    System.out.println("线程状态："+thread.getState());\n}\n-- 输出：线程状态：NEW\n')])])]),e("h3",{attrs:{id:"_3-2-运行"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-运行"}},[t._v("#")]),t._v(" 3.2 运行")]),t._v(" "),e("p",[t._v("可运行线程的状态，当我们调用了start()方法，线程正在Java虚拟机中执行，但它可能正在等待来自操作系统（如处理器）的其他资源。")]),t._v(" "),e("p",[t._v("所以，这里实际上包含了两种状态：Running 和 Ready，统称为 Runnable。这是为什么呢？")]),t._v(" "),e("p",[t._v("这里涉及到一个Java线程调度的问题：")]),t._v(" "),e("blockquote",[e("p",[t._v("线程调度，是指系统为线程分配处理器使用权的过程。调度主要方式有两种，协同式线程调度和抢占式线程调度。")])]),t._v(" "),e("ul",[e("li",[t._v("协同式线程调度")])]),t._v(" "),e("p",[t._v("线程的执行时间由线程本身来控制，线程把自己的工作执行完毕之后，要主动通知系统切换到另外一个线程上去。")]),t._v(" "),e("ul",[e("li",[t._v("抢占式线程调度")])]),t._v(" "),e("p",[t._v("每个线程将由系统来自动分配执行时间，线程的切换不由线程本身来决定，是基于CPU时间分片的方式。")]),t._v(" "),e("p",[t._v("它们孰优孰劣，不在本文讨论范围之内。我们只需要知道，Java使用的线程调度方式就是抢占式调度。")]),t._v(" "),e("p",[t._v("通常，这个时间分片是很小的，可能只有几毫秒或几十毫秒。所以，线程的实际状态可能会在Running 和 Ready状态之间不断变化。所以，再去区分它们意义不大。")]),t._v(" "),e("p",[t._v("那么，我们再多想一下，如果Java线程调度方式是协同式调度，也许再去区分这两个状态就很有必要了。")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('public static void main(String[] args) {\n\t\n    Thread thread = new Thread(() -> {\n        for (;;){}\n    });\n    thread.start();\n    System.out.println("线程状态："+thread.getState());\n}\n-- 输出：线程状态：RUNNABLE\n')])])]),e("p",[t._v("简单来看，上面的代码就使线程处于Runnable状态。但值得我们注意的是，如果一个线程在等待阻塞I/O的操作时，它的状态也是Runnable的。")]),t._v(" "),e("p",[t._v("我们来看两个经典阻塞IO的例子：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('public static void main(String[] args) throws Exception {\n\n    Thread t1 = new Thread(() -> {\n        try {\n            ServerSocket serverSocket = new ServerSocket(9999);\n            while (true){\n                Socket socket = serverSocket.accept();\n                OutputStream outputStream = socket.getOutputStream();\n                outputStream.write("Hello".getBytes());\n                outputStream.flush();\n            }\n        } catch (IOException e) {\n            e.printStackTrace();\n        }\n    },"accept");\n    t1.start();\n\n    Thread t2 = new Thread(() -> {\n        try {\n            Socket socket = new Socket("127.0.0.1",9999);\n            for (;;){\n                InputStream inputStream = socket.getInputStream();\n                byte[] bytes = new byte[5];\n                inputStream.read(bytes);\n                System.out.println(new String(bytes));\n            }\n        } catch (IOException e) {\n            e.printStackTrace();\n        }\n    },"read");\n    t2.start();\n}\n')])])]),e("p",[t._v("上面的代码中，我们知道，serverSocket.accept()和inputStream.read(bytes);都是阻塞式方法。")]),t._v(" "),e("p",[t._v("它们一个在等待客户端的连接；一个在等待数据的到来。但是，这两个线程的状态却是 RUNNABLE的。")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('"read" #13 prio=5 os_prio=0 tid=0x0000000023f6c800 nid=0x1cd0 runnable [0x0000000024b3e000]\n   java.lang.Thread.State: RUNNABLE\n\tat java.net.SocketInputStream.socketRead0(Native Method)\n\tat java.net.SocketInputStream.socketRead(SocketInputStream.java:116)\n\tat java.net.SocketInputStream.read(SocketInputStream.java:171)\n\tat java.net.SocketInputStream.read(SocketInputStream.java:141)\n"accept" #12 prio=5 os_prio=0 tid=0x0000000023f68000 nid=0x4cec runnable [0x0000000024a3e000]\n   java.lang.Thread.State: RUNNABLE\n\tat java.net.DualStackPlainSocketImpl.accept0(Native Method)\n\tat java.net.DualStackPlainSocketImpl.socketAccept(DualStackPlainSocketImpl.java:131)\n\tat java.net.AbstractPlainSocketImpl.accept(AbstractPlainSocketImpl.java:409)\n\tat java.net.PlainSocketImpl.accept(PlainSocketImpl.java:199)\n')])])]),e("p",[t._v("这又是为什么呢 ？")]),t._v(" "),e("p",[t._v("我们前面说过，处于 Runnable 状态下的线程，正在 Java 虚拟机中执行，但它可能正在等待来自操作系统（如处理器）的其他资源。")]),t._v(" "),e("p",[t._v("不管是CPU、网卡还是硬盘，这些都是操作系统的资源而已。当进行阻塞式的IO操作时，或许底层的操作系统线程确实处在阻塞状态，但在这里我们的 Java 虚拟机线程的状态还是 Runnable。")]),t._v(" "),e("p",[t._v("不要小看这个问题，很具有迷惑性。有些面试官如果问到，如果一个线程正在进行阻塞式 I/O 操作时，它处于什么状态？是Blocked还是Waiting？")]),t._v(" "),e("p",[t._v("那这时候，我们就要义正言辞的告诉他：亲，都不是哦~")]),t._v(" "),e("h3",{attrs:{id:"_3-3-无限期等待"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-3-无限期等待"}},[t._v("#")]),t._v(" 3.3 无限期等待")]),t._v(" "),e("p",[t._v("处于无限期等待状态下的线程，不会被分配处理器执行时间，除非其他线程显式的唤醒它。")]),t._v(" "),e("p",[t._v("最简单的场景就是调用了 Object.wait() 方法。")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("public static void main(String[] args) throws Exception {\n\n    Object object = new Object();\n    new Thread(() -> {\n        synchronized (object){\n        try {\n            object.wait();\n        } catch (InterruptedException e) {\n            e.printStackTrace();\n        }\n    }}).start();\n}\n-- 输出：线程状态：WAITING\n")])])]),e("p",[t._v("此时这个线程就处于无限期等待状态，除非有别的线程显式的调用object.notifyAll();来唤醒它。")]),t._v(" "),e("p",[t._v("然后，就是Thread.join()方法，当主线程调用了此方法，就必须等待子线程结束之后才能继续进行。")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('public static void main(String[] args) throws Exception {\n\n    Thread mainThread = new Thread(() -> {\n        Thread subThread = new Thread(() -> {\n            for (;;){}\n        });\n        subThread.start();\n        try {\n            subThread.join();\n        } catch (InterruptedException e) {\n            e.printStackTrace();\n        }\n    });\n    mainThread.start();\n    System.out.println("线程状态："+mainThread.getState());\n}\n//输出：线程状态：WAITING\n')])])]),e("p",[t._v("如上代码，在主线程 mainThread 中调用了子线程的join()方法，那么主线程就要等待子线程结束运行。所以此时主线程mainThread的状态就是无限期等待。")]),t._v(" "),e("p",[t._v("多说一句，其实join()方法内部，调用的也是Object.wait()。\n最后，我们说说LockSupport.park()方法，它同样会使线程进入无限期等待状态。也许有的朋友对它很陌生，没有用过，我们来看一个阻塞队列的例子。")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("public static void main(String[] args) throws Exception {\n\n    ArrayBlockingQueue<Long> queue = new ArrayBlockingQueue(1);\n    Thread thread = new Thread(() -> {\n        while (true){\n            try {\n                queue.put(System.currentTimeMillis());\n            } catch (Exception e) {\n                e.printStackTrace();\n            }\n        }\n    });\n    thread.start();\n}\n")])])]),e("p",[t._v("如上代码，往往我们会通过阻塞队列的方式来做生产者-消费者模型的代码。")]),t._v(" "),e("p",[t._v("这里，ArrayBlockingQueue长度为1，当我们第二次往里面添加数据的时候，发现队列已满，线程就会等待这里，它的源码里面正是调用了LockSupport.park()。")]),t._v(" "),e("p",[t._v("同样的，这里也比较具有迷惑性，我来问你：阻塞队列中，如果队列为空或者队列已满，这时候执行take或者put操作的时候，线程的状态是 Blocked 吗？")]),t._v(" "),e("p",[t._v("那这时候，我们需要谨记这里的线程状态还是 WAITING。它们之间的区别和联系，我们后文再看。")]),t._v(" "),e("h3",{attrs:{id:"_3-4-限期等待"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-4-限期等待"}},[t._v("#")]),t._v(" 3.4 限期等待")]),t._v(" "),e("p",[t._v("同样的，处于限期等待状态下的线程，也不会被分配处理器执行时间，但是它在一定时间之后可以自动的被操作系统唤醒。")]),t._v(" "),e("p",[t._v("这个跟无限期等待的区别，仅仅就是有没有带有超时时间参数。")]),t._v(" "),e("p",[t._v("比如：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("object.wait(3000);\nthread.join(3000);\nLockSupport.parkNanos(5000000L);\nThread.sleep(1000);\n")])])]),e("p",[t._v("像这种操作，都会使线程处于限期等待的状态 TIMED_WAITING。因为Thread.sleep()必须带有时间参数，所以它不在无限期等待行列中。")]),t._v(" "),e("h3",{attrs:{id:"_3-5-阻塞"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-5-阻塞"}},[t._v("#")]),t._v(" 3.5 阻塞")]),t._v(" "),e("p",[t._v("一个线程因为等待临界区的锁被阻塞产生的状态，也就是说，阻塞状态的产生是因为它正在等待着获取一个排它锁。")]),t._v(" "),e("p",[t._v("这里，我们来看一个 synchronized的例子。")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('public static void main(String[] args) throws Exception {\n\n    Object object = new Object();\n    Thread t1 = new Thread(() -> {\n        synchronized (object){\n            for (;;){}\n        }\n    });\n    t1.start();\n\n    Thread t2 = new Thread(() -> {\n        synchronized (object){\n            System.out.println("获取到object锁，线程执行。");\n        }\n    });\n    t2.start();\n    System.out.println("线程状态："+t2.getState());\n}\n//输出：线程状态：BLOCKED\n')])])]),e("p",[t._v("我们看上面的代码，object对象锁一直被线程 t1 持有，所以线程 t2 的状态一直会是阻塞状态。")]),t._v(" "),e("p",[t._v("我们接着再来看一个锁的例子：")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('public static void main(String[] args){\n\n    Lock lock = new ReentrantLock();\n    lock.lock();\n    Thread t1 = new Thread(() -> {\n        lock.lock();\n        System.out.println("已获取lock锁，线程执行");\n        lock.unlock();\n    });\n    t1.start();\n    System.out.println("线程状态："+t1.getState());\n}\n')])])]),e("p",[t._v("如上代码，我们有一个ReentrantLock，main线程已经持有了这个锁，t1 线程会一直等待在lock.lock();。")]),t._v(" "),e("p",[t._v("那么，此时 t1 线程的状态是什么呢 ？")]),t._v(" "),e("p",[t._v("其实答案是WAITING，即无限期等待状态。这又是为什么呢 ？")]),t._v(" "),e("p",[t._v("原因在于，Lock接口是Java API实现的锁，它的底层实现其实是抽象同步队列，简称AQS。")]),t._v(" "),e("p",[t._v("在通过lock.lock()获取锁的时候，如果锁正在被其他线程持有，那么线程会被放入AQS队列后，阻塞挂起。")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("public final void acquire(int arg) {\n    if (!tryAcquire(arg) &&\n        如果tryAcquire返回false，会把当前线程放入AQS阻塞队列\n        acquireQueued(addWaiter(Node.EXCLUSIVE), arg))\n        selfInterrupt();\n}\n")])])]),e("p",[t._v("acquireQueued方法会将当前线程放入 AQS 阻塞队列，然后调用LockSupport.park(this);挂起线程。")]),t._v(" "),e("p",[t._v("所以，这也就解释了为什么lock.lock()获取锁的时候，当前的线程状态会是 WAITING。")]),t._v(" "),e("p",[t._v("常常有人会问，synchronized和Lock的区别，除了一般性的答案，此时你也可以说一下线程状态的差异，我猜可能很少有人会意识到这一点。")]),t._v(" "),e("h3",{attrs:{id:"_3-6-结束"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-6-结束"}},[t._v("#")]),t._v(" 3.6 结束")]),t._v(" "),e("p",[t._v("一个线程，当它退出或已经执行完成的时候，就是结束状态。")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('public static void main(String[] args) throws Exception {\n    \n    Thread thread = new Thread(() -> System.out.println("线程已执行"));\n    thread.start();\n    Thread.sleep(1000);\n    System.out.println("线程状态："+thread.getState());\n}\n//输出：  线程已执行\n线程状态：TERMINATED\n')])])]),e("h2",{attrs:{id:"_4-总结"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4-总结"}},[t._v("#")]),t._v(" 4. 总结")]),t._v(" "),e("p",[t._v("本文介绍了 Java 线程的不同状态，以及在何种情况下发生转换。")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master/img/17185f48d25fe5bc.jpg",alt:"线程状态啊"}})]),t._v(" "),e("p",[t._v("来源于 https://juejin.cn/post/6844904129551138824#heading-1")])])}),[],!1,null,null,null);a.default=r.exports}}]);