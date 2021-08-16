(window.webpackJsonp=window.webpackJsonp||[]).push([[111],{540:function(a,t,e){"use strict";e.r(t);var r=e(30),n=Object(r.a)({},(function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("h1",{attrs:{id:"并发编程的优缺点"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#并发编程的优缺点"}},[a._v("#")]),a._v(" 并发编程的优缺点")]),a._v(" "),e("p",[a._v("一直以来并发编程对于刚入行的小白来说总是觉得高深莫测，于是乎，就诞生了想写点东西记录下，以提升理解和堆并发编程的认知。为什么需要用的并发？凡事总有好坏两面，之间的trade-off是什么，也就是说并发编程具有哪些缺点？以及在进行并发编程时应该了解和掌握的概念是什么？这篇文章主要以这三个问题来谈一谈。")]),a._v(" "),e("h2",{attrs:{id:"_1-为什么要用到并发"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-为什么要用到并发"}},[a._v("#")]),a._v(" 1. 为什么要用到并发")]),a._v(" "),e("p",[a._v('一直以来，硬件的发展极其迅速，也有一个很著名的"摩尔定律"，可能会奇怪明明讨论的是并发编程为什么会扯到了硬件的发展，这其中的关系应该是多核CPU的发展为并发编程提供的硬件基础。摩尔定律并不是一种自然法则或者是物理定律，它只是基于认为观测数据后，对未来的一种预测。按照所预测的速度，我们的计算能力会按照指数级别的速度增长，不久以后会拥有超强的计算能力，正是在畅想未来的时候，2004年，Intel宣布4GHz芯片的计划推迟到2005年，然后在2004年秋季，Intel宣布彻底取消4GHz的计划，也就是说摩尔定律的有效性超过了半个世纪戛然而止。但是，聪明的硬件工程师并没有停止研发的脚步，他们为了进一步提升计算速度，而不是再追求单独的计算单元，而是将多个计算单元整合到了一起，也就是形成了多核CPU。短短十几年的时间，家用型CPU,比如Intel i7就可以达到4核心甚至8核心。而专业服务器则通常可以达到几个独立的CPU，每一个CPU甚至拥有多达8个以上的内核。因此，摩尔定律似乎在CPU核心扩展上继续得到体验。因此，多核的CPU的背景下，催生了并发编程的趋势，通过'),e("strong",[a._v("并发编程的形式可以将多核CPU的计算能力发挥到极致，性能得到提升")]),a._v("。")]),a._v(" "),e("p",[a._v("顶级计算机科学家Donald Ervin Knuth如此评价这种情况：在我看来，这种现象（并发）或多或少是由于硬件设计者无计可施了导致的，他们将摩尔定律的责任推给了软件开发者。")]),a._v(" "),e("p",[a._v("另外，在特殊的业务场景下先天的就适合于并发编程。比如在图像处理领域，一张1024X768像素的图片，包含达到78万6千多个像素。即时将所有的像素遍历一边都需要很长的时间，面对如此复杂的计算量就需要充分利用多核的计算的能力。又比如当我们在网上购物时，为了提升响应速度，需要拆分，减库存，生成订单等等这些操作，就可以进行拆分利用多线程的技术完成。"),e("strong",[a._v("面对复杂业务模型，并行程序会比串行程序更适应业务需求，而并发编程更能吻合这种业务拆分")]),a._v(" 。正是因为这些优点，使得多线程技术能够得到重视，也是一名CS学习者应该掌握的：")]),a._v(" "),e("ul",[e("li",[a._v("充分利用多核CPU的计算能力；")]),a._v(" "),e("li",[a._v("方便进行业务拆分，提升应用性能")])]),a._v(" "),e("h2",{attrs:{id:"_2-并发编程有哪些缺点"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-并发编程有哪些缺点"}},[a._v("#")]),a._v(" 2. 并发编程有哪些缺点")]),a._v(" "),e("p",[a._v("多线程技术有这么多的好处，难道就没有一点缺点么，就在任何场景下就一定适用么？很显然不是。")]),a._v(" "),e("h3",{attrs:{id:"_2-1-频繁的上下文切换"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-频繁的上下文切换"}},[a._v("#")]),a._v(" 2.1 频繁的上下文切换")]),a._v(" "),e("p",[a._v("时间片是CPU分配给各个线程的时间，因为时间非常短，所以CPU不断通过切换线程，让我们觉得多个线程是同时执行的，时间片一般是几十毫秒。而每次切换时，需要保存当前的状态起来，以便能够进行恢复先前状态，而这个切换时非常损耗性能，过于频繁反而无法发挥出多线程编程的优势。通常减少上下文切换可以采用无锁并发编程，CAS算法，使用最少的线程和使用协程。")]),a._v(" "),e("ul",[e("li",[a._v("无锁并发编程：可以参照concurrentHashMap锁分段的思想，不同的线程处理不同段的数据，这样在多线程竞争的条件下，可以减少上下文切换的时间。")]),a._v(" "),e("li",[a._v("CAS算法，利用Atomic下使用CAS算法来更新数据，使用了乐观锁，可以有效的减少一部分不必要的锁竞争带来的上下文切换")]),a._v(" "),e("li",[a._v("使用最少线程：避免创建不需要的线程，比如任务很少，但是创建了很多的线程，这样会造成大量的线程都处于等待状态")]),a._v(" "),e("li",[a._v("协程：在单线程里实现多任务的调度，并在单线程里维持多个任务间的切换")])]),a._v(" "),e("p",[a._v('由于上下文切换也是个相对比较耗时的操作，所以在"java并发编程的艺术"一书中有过一个实验，并发累加未必会比串行累加速度要快。 可以使用'),e("strong",[a._v("Lmbench3测量上下文切换的时长")]),a._v(" "),e("strong",[a._v("vmstat测量上下文切换次数")])]),a._v(" "),e("h3",{attrs:{id:"_2-2-线程安全"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-线程安全"}},[a._v("#")]),a._v(" 2.2 线程安全")]),a._v(" "),e("p",[a._v("多线程编程中最难以把握的就是临界区线程安全问题，稍微不注意就会出现死锁的情况，一旦产生死锁就会造成系统功能不可用。")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v('public class DeadLockDemo {\n    private static String resource_a = "A";\n    private static String resource_b = "B";\n\n    public static void main(String[] args) {\n        deadLock();\n    }\n\n    public static void deadLock() {\n        Thread threadA = new Thread(new Runnable() {\n            @Override\n            public void run() {\n                synchronized (resource_a) {\n                    System.out.println("get resource a");\n                    try {\n                        Thread.sleep(3000);\n                        synchronized (resource_b) {\n                            System.out.println("get resource b");\n                        }\n                    } catch (InterruptedException e) {\n                        e.printStackTrace();\n                    }\n                }\n            }\n        });\n        Thread threadB = new Thread(new Runnable() {\n            @Override\n            public void run() {\n                synchronized (resource_b) {\n                    System.out.println("get resource b");\n                    synchronized (resource_a) {\n                        System.out.println("get resource a");\n                    }\n                }\n            }\n        });\n        threadA.start();\n        threadB.start();\n\n    }\n}\n')])])]),e("p",[a._v("在上面的这个demo中，开启了两个线程threadA, threadB,其中threadA占用了resource_a, 并等待被threadB释放的resource _b。threadB占用了resource _b正在等待被threadA释放的resource _a。因此threadA,threadB出现线程安全的问题，形成死锁。同样可以通过jps,jstack证明这种推论：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v('"Thread-1":\n  waiting to lock monitor 0x000000000b695360 (object 0x00000007d5ff53a8, a java.lang.String),\n  which is held by "Thread-0"\n"Thread-0":\n  waiting to lock monitor 0x000000000b697c10 (object 0x00000007d5ff53d8, a java.lang.String),\n  which is held by "Thread-1"\n\nJava stack information for the threads listed above:\n===================================================\n"Thread-1":\n        at learn.DeadLockDemo$2.run(DeadLockDemo.java:34)\n        - waiting to lock <0x00000007d5ff53a8(a java.lang.String)\n        - locked <0x00000007d5ff53d8(a java.lang.String)\n        at java.lang.Thread.run(Thread.java:722)\n"Thread-0":\n        at learn.DeadLockDemo$1.run(DeadLockDemo.java:20)\n        - waiting to lock <0x00000007d5ff53d8(a java.lang.String)\n        - locked <0x00000007d5ff53a8(a java.lang.String)\n        at java.lang.Thread.run(Thread.java:722)\n\nFound 1 deadlock.\n')])])]),e("p",[a._v("如上所述，完全可以看出当前死锁的情况。")]),a._v(" "),e("p",[a._v("那么，通常可以用如下方式避免死锁的情况：")]),a._v(" "),e("ol",[e("li",[a._v("避免一个线程同时获得多个锁；")]),a._v(" "),e("li",[a._v("避免一个线程在锁内部占有多个资源，尽量保证每个锁只占用一个资源；")]),a._v(" "),e("li",[a._v("尝试使用定时锁，使用lock.tryLock(timeOut)，当超时等待时当前线程不会阻塞；")]),a._v(" "),e("li",[a._v("对于数据库锁，加锁和解锁必须在一个数据库连接里，否则会出现解锁失败的情况")])]),a._v(" "),e("p",[a._v("所以，如何正确的使用多线程编程技术有很大的学问，比如如何保证线程安全，如何正确理解由于JMM内存模型在原子性，有序性，可见性带来的问题，比如数据脏读，DCL等这些问题（在后续篇幅会讲述）。而在学习多线程编程技术的过程中也会让你收获颇丰。")]),a._v(" "),e("h2",{attrs:{id:"_3-应该了解的概念"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-应该了解的概念"}},[a._v("#")]),a._v(" 3. 应该了解的概念")]),a._v(" "),e("h3",{attrs:{id:"_3-1-同步vs异步"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-同步vs异步"}},[a._v("#")]),a._v(" 3.1 同步VS异步")]),a._v(" "),e("p",[a._v("同步和异步通常用来形容一次方法调用。同步方法调用一开始，调用者必须等待被调用的方法结束后，调用者后面的代码才能执行。而异步调用，指的是，调用者不用管被调用方法是否完成，都会继续执行后面的代码，当被调用的方法完成后会通知调用者。比如，在超时购物，如果一件物品没了，你得等仓库人员跟你调货，直到仓库人员跟你把货物送过来，你才能继续去收银台付款，这就类似同步调用。而异步调用了，就像网购，你在网上付款下单后，什么事就不用管了，该干嘛就干嘛去了，当货物到达后你收到通知去取就好。")]),a._v(" "),e("h3",{attrs:{id:"_3-2-并发与并行"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-并发与并行"}},[a._v("#")]),a._v(" 3.2 并发与并行")]),a._v(" "),e("p",[a._v("并发和并行是十分容易混淆的概念。并发指的是多个任务交替进行，而并行则是指真正意义上的“同时进行”。实际上，如果系统内只有一个CPU，而使用多线程时，那么真实系统环境下不能并行，只能通过切换时间片的方式交替进行，而成为并发执行任务。真正的并行也只能出现在拥有多个CPU的系统中。")]),a._v(" "),e("h3",{attrs:{id:"_3-3-阻塞和非阻塞"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-3-阻塞和非阻塞"}},[a._v("#")]),a._v(" 3.3 阻塞和非阻塞")]),a._v(" "),e("p",[a._v("阻塞和非阻塞通常用来形容多线程间的相互影响，比如一个线程占有了临界区资源，那么其他线程需要这个资源就必须进行等待该资源的释放，会导致等待的线程挂起，这种情况就是阻塞，而非阻塞就恰好相反，它强调没有一个线程可以阻塞其他线程，所有的线程都会尝试地往前运行。")]),a._v(" "),e("h3",{attrs:{id:"_3-4-临界区"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-4-临界区"}},[a._v("#")]),a._v(" 3.4 临界区")]),a._v(" "),e("p",[a._v("临界区用来表示一种公共资源或者说是共享数据，可以被多个线程使用。但是每个线程使用时，一旦临界区资源被一个线程占有，那么其他线程必须等待。")]),a._v(" "),e("p",[a._v("来源于 https://juejin.cn/post/6844903600301293582")])])}),[],!1,null,null,null);t.default=n.exports}}]);