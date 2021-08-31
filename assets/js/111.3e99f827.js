(window.webpackJsonp=window.webpackJsonp||[]).push([[111],{528:function(e,t,o){"use strict";o.r(t);var r=o(30),n=Object(r.a)({},(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("h1",{attrs:{id:"线程池threadpoolexecutor实现原理"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#线程池threadpoolexecutor实现原理"}},[e._v("#")]),e._v(" 线程池ThreadPoolExecutor实现原理")]),e._v(" "),o("h2",{attrs:{id:"_1-为什么要使用线程池"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#_1-为什么要使用线程池"}},[e._v("#")]),e._v(" 1. 为什么要使用线程池")]),e._v(" "),o("p",[e._v("在实际使用中，线程是很占用系统资源的，如果对线程管理不善很容易导致系统问题。因此，在大多数并发框架中都会使用"),o("strong",[e._v("线程池")]),e._v("来管理线程，使用线程池管理线程主要有如下好处：")]),e._v(" "),o("ol",[o("li",[o("strong",[e._v("降低资源消耗")]),e._v("。通过复用已存在的线程和降低线程关闭的次数来尽可能降低系统性能损耗；")]),e._v(" "),o("li",[o("strong",[e._v("提升系统响应速度")]),e._v("。通过复用线程，省去创建线程的过程，因此整体上提升了系统的响应速度；")]),e._v(" "),o("li",[o("strong",[e._v("提高线程的可管理性")]),e._v("。线程是稀缺资源，如果无限制的创建，不仅会消耗系统资源，还会降低系统的稳定性，因此，需要使用线程池来管理线程。")])]),e._v(" "),o("h2",{attrs:{id:"_2-线程池的工作原理"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#_2-线程池的工作原理"}},[e._v("#")]),e._v(" 2. 线程池的工作原理")]),e._v(" "),o("p",[e._v("当一个并发任务提交给线程池，线程池分配线程去执行任务的过程如下图所示：")]),e._v(" "),o("p",[o("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2018/5/6/163349e503061169?imageView2/0/w/1280/h/960/format/webp/ignore-error/1",alt:"线程池执行流程图.jpg"}}),e._v("线程池执行流程图.jpg")]),e._v(" "),o("p",[e._v("从图可以看出，线程池执行所提交的任务过程主要有这样几个阶段：")]),e._v(" "),o("ol",[o("li",[e._v("先判断线程池中"),o("strong",[e._v("核心线程池")]),e._v("所有的线程是否都在执行任务。如果不是，则新创建一个线程执行刚提交的任务，否则，核心线程池中所有的线程都在执行任务，则进入第 2 步；")]),e._v(" "),o("li",[e._v("判断当前"),o("strong",[e._v("阻塞队列")]),e._v("是否已满，如果未满，则将提交的任务放置在阻塞队列中；否则，则进入第 3 步；")]),e._v(" "),o("li",[e._v("判断"),o("strong",[e._v("线程池中所有的线程")]),e._v("是否都在执行任务，如果没有，则创建一个新的线程来执行任务，否则，则交给饱和策略进行处理")])]),e._v(" "),o("h2",{attrs:{id:"_3-线程池的创建"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#_3-线程池的创建"}},[e._v("#")]),e._v(" 3. 线程池的创建")]),e._v(" "),o("p",[e._v("创建线程池主要是"),o("strong",[e._v("ThreadPoolExecutor")]),e._v("类来完成，ThreadPoolExecutor 的有许多重载的构造方法，通过参数最多的构造方法来理解创建线程池有哪些需要配置的参数。ThreadPoolExecutor 的构造方法为：")]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("ThreadPoolExecutor(int corePoolSize,\n                              int maximumPoolSize,\n                              long keepAliveTime,\n                              TimeUnit unit,\n                              BlockingQueue<Runnable> workQueue,\n                              ThreadFactory threadFactory,\n                              RejectedExecutionHandler handler)\n复制代码\n")])])]),o("p",[e._v("下面对参数进行说明：")]),e._v(" "),o("ol",[o("li",[e._v("corePoolSize：表示核心线程池的大小。当提交一个任务时，如果当前核心线程池的线程个数没有达到 corePoolSize，则会创建新的线程来执行所提交的任务，"),o("strong",[e._v("即使当前核心线程池有空闲的线程")]),e._v("。如果当前核心线程池的线程个数已经达到了 corePoolSize，则不再重新创建线程。如果调用了"),o("code",[e._v("prestartCoreThread()")]),e._v("或者 "),o("code",[e._v("prestartAllCoreThreads()")]),e._v("，线程池创建的时候所有的核心线程都会被创建并且启动。")]),e._v(" "),o("li",[e._v("maximumPoolSize：表示线程池能创建线程的最大个数。如果当阻塞队列已满时，并且当前线程池线程个数没有超过 maximumPoolSize 的话，就会创建新的线程来执行任务。")]),e._v(" "),o("li",[e._v("keepAliveTime：空闲线程存活时间。如果当前线程池的线程个数已经超过了 corePoolSize，并且线程空闲时间超过了 keepAliveTime 的话，就会将这些空闲线程销毁，这样可以尽可能降低系统资源消耗。")]),e._v(" "),o("li",[e._v("unit：时间单位。为 keepAliveTime 指定时间单位。")]),e._v(" "),o("li",[e._v("workQueue：阻塞队列。用于保存任务的阻塞队列，关于阻塞队列"),o("a",{attrs:{href:"https://juejin.im/post/6844903602444582920",target:"_blank",rel:"noopener noreferrer"}},[e._v("可以看这篇文章"),o("OutboundLink")],1),e._v("。可以使用"),o("strong",[e._v("ArrayBlockingQueue, LinkedBlockingQueue, SynchronousQueue, PriorityBlockingQueue")]),e._v("。")]),e._v(" "),o("li",[e._v("threadFactory：创建线程的工程类。可以通过指定线程工厂为每个创建出来的线程设置更有意义的名字，如果出现并发问题，也方便查找问题原因。")]),e._v(" "),o("li",[e._v("handler：饱和策略。当线程池的阻塞队列已满和指定的线程都已经开启，说明当前线程池已经处于饱和状态了，那么就需要采用一种策略来处理这种情况。采用的策略有这几种：\n"),o("ol",[o("li",[e._v("AbortPolicy： 直接拒绝所提交的任务，并抛出"),o("strong",[e._v("RejectedExecutionException")]),e._v("异常；")]),e._v(" "),o("li",[e._v("CallerRunsPolicy：只用调用者所在的线程来执行任务；")]),e._v(" "),o("li",[e._v("DiscardPolicy：不处理直接丢弃掉任务；")]),e._v(" "),o("li",[e._v("DiscardOldestPolicy：丢弃掉阻塞队列中存放时间最久的任务，执行当前任务")])])])]),e._v(" "),o("blockquote",[o("p",[e._v("线程池执行逻辑")])]),e._v(" "),o("p",[e._v("通过 ThreadPoolExecutor 创建线程池后，提交任务后执行过程是怎样的，下面来通过源码来看一看。execute 方法源码如下：")]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("public void execute(Runnable command) {\n    if (command == null)\n        throw new NullPointerException();\n    /*\n     * Proceed in 3 steps:\n     *\n     * 1. If fewer than corePoolSize threads are running, try to\n     * start a new thread with the given command as its first\n     * task.  The call to addWorker atomically checks runState and\n     * workerCount, and so prevents false alarms that would add\n     * threads when it shouldn't, by returning false.\n     *\n     * 2. If a task can be successfully queued, then we still need\n     * to double-check whether we should have added a thread\n     * (because existing ones died since last checking) or that\n     * the pool shut down since entry into this method. So we\n     * recheck state and if necessary roll back the enqueuing if\n     * stopped, or start a new thread if there are none.\n     *\n     * 3. If we cannot queue task, then we try to add a new\n     * thread.  If it fails, we know we are shut down or saturated\n     * and so reject the task.\n     */\n    int c = ctl.get();\n\t//如果线程池的线程个数少于corePoolSize则创建新线程执行当前任务\n    if (workerCountOf(c) < corePoolSize) {\n        if (addWorker(command, true))\n            return;\n        c = ctl.get();\n    }\n\t//如果线程个数大于corePoolSize或者创建线程失败，则将任务存放在阻塞队列workQueue中\n    if (isRunning(c) && workQueue.offer(command)) {\n        int recheck = ctl.get();\n        if (! isRunning(recheck) && remove(command))\n            reject(command);\n        else if (workerCountOf(recheck) == 0)\n            addWorker(null, false);\n    }\n\t//如果当前任务无法放进阻塞队列中，则创建新的线程来执行任务\n    else if (!addWorker(command, false))\n        reject(command);\n}\n复制代码\n")])])]),o("p",[e._v("ThreadPoolExecutor 的 execute 方法执行逻辑请见注释。下图为 ThreadPoolExecutor 的 execute 方法的执行示意图：")]),e._v(" "),o("p",[e._v('![execute执行过程示意图.jpg](data:image/svg+xml;utf8,<?xml version="1.0"?>'),o("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",version:"1.1",width:"1240",height:"875"}}),e._v(")execute执行过程示意图.jpg")]),e._v(" "),o("p",[e._v("execute 方法执行逻辑有这样几种情况：")]),e._v(" "),o("ol",[o("li",[e._v("如果当前运行的线程少于 corePoolSize，则会创建新的线程来执行新的任务；")]),e._v(" "),o("li",[e._v("如果运行的线程个数等于或者大于 corePoolSize，则会将提交的任务存放到阻塞队列 workQueue 中；")]),e._v(" "),o("li",[e._v("如果当前 workQueue 队列已满的话，则会创建新的线程来执行任务；")]),e._v(" "),o("li",[e._v("如果线程个数已经超过了 maximumPoolSize，则会使用饱和策略 RejectedExecutionHandler 来进行处理。")])]),e._v(" "),o("p",[e._v("需要注意的是，线程池的设计思想就是使用了"),o("strong",[e._v("核心线程池 corePoolSize，阻塞队列 workQueue 和线程池 maximumPoolSize")]),e._v("，这样的缓存策略来处理任务，实际上这样的设计思想在需要框架中都会使用。")]),e._v(" "),o("h2",{attrs:{id:"_4-线程池的关闭"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#_4-线程池的关闭"}},[e._v("#")]),e._v(" 4. 线程池的关闭")]),e._v(" "),o("p",[e._v("关闭线程池，可以通过"),o("code",[e._v("shutdown")]),e._v("和"),o("code",[e._v("shutdownNow")]),e._v("这两个方法。它们的原理都是遍历线程池中所有的线程，然后依次中断线程。"),o("code",[e._v("shutdown")]),e._v("和"),o("code",[e._v("shutdownNow")]),e._v("还是有不一样的地方：")]),e._v(" "),o("ol",[o("li",[o("code",[e._v("shutdownNow")]),e._v("首先将线程池的状态设置为"),o("strong",[e._v("STOP")]),e._v(",然后尝试"),o("strong",[e._v("停止所有的正在执行和未执行任务")]),e._v("的线程，并返回等待执行任务的列表；")]),e._v(" "),o("li",[o("code",[e._v("shutdown")]),e._v("只是将线程池的状态设置为"),o("strong",[e._v("SHUTDOWN")]),e._v("状态，然后中断所有没有正在执行任务的线程")])]),e._v(" "),o("p",[e._v("可以看出 shutdown 方法会将正在执行的任务继续执行完，而 shutdownNow 会直接中断正在执行的任务。调用了这两个方法的任意一个，"),o("code",[e._v("isShutdown")]),e._v("方法都会返回 true，当所有的线程都关闭成功，才表示线程池成功关闭，这时调用"),o("code",[e._v("isTerminated")]),e._v("方法才会返回 true。")]),e._v(" "),o("h2",{attrs:{id:"_5-如何合理配置线程池参数"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#_5-如何合理配置线程池参数"}},[e._v("#")]),e._v(" 5. 如何合理配置线程池参数？")]),e._v(" "),o("p",[e._v("要想合理的配置线程池，就必须首先分析任务特性，可以从以下几个角度来进行分析：")]),e._v(" "),o("ol",[o("li",[e._v("任务的性质：CPU 密集型任务，IO 密集型任务和混合型任务。")]),e._v(" "),o("li",[e._v("任务的优先级：高，中和低。")]),e._v(" "),o("li",[e._v("任务的执行时间：长，中和短。")]),e._v(" "),o("li",[e._v("任务的依赖性：是否依赖其他系统资源，如数据库连接。")])]),e._v(" "),o("p",[e._v("任务性质不同的任务可以用不同规模的线程池分开处理。CPU 密集型任务配置尽可能少的线程数量，如配置"),o("strong",[e._v("Ncpu+1")]),e._v("个线程的线程池。IO 密集型任务则由于需要等待 IO 操作，线程并不是一直在执行任务，则配置尽可能多的线程，如"),o("strong",[e._v("2xNcpu")]),e._v("。混合型的任务，如果可以拆分，则将其拆分成一个 CPU 密集型任务和一个 IO 密集型任务，只要这两个任务执行的时间相差不是太大，那么分解后执行的吞吐率要高于串行执行的吞吐率，如果这两个任务执行时间相差太大，则没必要进行分解。我们可以通过"),o("code",[e._v("Runtime.getRuntime().availableProcessors()")]),e._v("方法获得当前设备的 CPU 个数。")]),e._v(" "),o("p",[e._v("优先级不同的任务可以使用优先级队列 PriorityBlockingQueue 来处理。它可以让优先级高的任务先得到执行，需要注意的是如果一直有优先级高的任务提交到队列里，那么优先级低的任务可能永远不能执行。")]),e._v(" "),o("p",[e._v("执行时间不同的任务可以交给不同规模的线程池来处理，或者也可以使用优先级队列，让执行时间短的任务先执行。")]),e._v(" "),o("p",[e._v("依赖数据库连接池的任务，因为线程提交 SQL 后需要等待数据库返回结果，如果等待的时间越长 CPU 空闲时间就越长，那么线程数应该设置越大，这样才能更好的利用 CPU。")]),e._v(" "),o("p",[e._v("并且，阻塞队列"),o("strong",[e._v("最好是使用有界队列")]),e._v("，如果采用无界队列的话，一旦任务积压在阻塞队列中的话就会占用过多的内存资源，甚至会使得系统崩溃。")]),e._v(" "),o("p",[e._v("来源于 https://juejin.cn/post/6844903602452955150")])])}),[],!1,null,null,null);t.default=n.exports}}]);