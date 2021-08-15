(window.webpackJsonp=window.webpackJsonp||[]).push([[124],{551:function(e,t,a){"use strict";a.r(t);var o=a(30),l=Object(o.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"并发容器之concurrentlinkedqueue"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#并发容器之concurrentlinkedqueue"}},[e._v("#")]),e._v(" 并发容器之ConcurrentLinkedQueue")]),e._v(" "),a("h1",{attrs:{id:"_1-concurrentlinkedqueue-简介"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-concurrentlinkedqueue-简介"}},[e._v("#")]),e._v(" 1.ConcurrentLinkedQueue 简介")]),e._v(" "),a("p",[e._v("在单线程编程中我们会经常用到一些集合类，比如 ArrayList,HashMap 等，但是这些类都不是线程安全的类。在面试中也经常会有一些考点，比如 ArrayList 不是线程安全的，Vector 是线程安全。而保障 Vector 线程安全的方式，是非常粗暴的在方法上用 synchronized 独占锁，将多线程执行变成串行化。要想将 ArrayList 变成线程安全的也可以使用"),a("code",[e._v("Collections.synchronizedList(List<T> list)")]),e._v("方法 ArrayList 转换成线程安全的，但这种转换方式依然是通过 synchronized 修饰方法实现的，很显然这不是一种高效的方式，同时，队列也是我们常用的一种数据结构，为了解决线程安全的问题，Doug Lea 大师为我们准备了 ConcurrentLinkedQueue 这个线程安全的队列。从类名就可以看的出来实现队列的数据结构是链式。")]),e._v(" "),a("h2",{attrs:{id:"_1-1-node"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-node"}},[e._v("#")]),e._v(" 1.1 Node")]),e._v(" "),a("p",[e._v("要想先学习 ConcurrentLinkedQueue 自然而然得先从它的节点类看起，明白它的底层数据结构。Node 类的源码为：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("private static class Node<E> {\n        volatile E item;\n        volatile Node<E> next;\n\t\t.......\n}\n复制代码\n")])])]),a("p",[e._v("Node 节点主要包含了两个域：一个是数据域 item，另一个是 next 指针，用于指向下一个节点从而构成链式队列。并且都是用 volatile 进行修饰的，以保证内存可见性（关于 volatile"),a("a",{attrs:{href:"https://juejin.im/post/6844903601064640525",target:"_blank",rel:"noopener noreferrer"}},[e._v("可以看这篇文章"),a("OutboundLink")],1),e._v("）。另外 ConcurrentLinkedQueue 含有这样两个成员变量：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("private transient volatile Node<E> head;\nprivate transient volatile Node<E> tail;\n复制代码\n")])])]),a("p",[e._v("说明 ConcurrentLinkedQueue 通过持有头尾指针进行管理队列。当我们调用无参构造器时，其源码为：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("public ConcurrentLinkedQueue() {\n    head = tail = new Node<E>(null);\n}\n复制代码\n")])])]),a("p",[e._v("head 和 tail 指针会指向一个 item 域为 null 的节点,此时 ConcurrentLinkedQueue 状态如下图所示：")]),e._v(" "),a("p",[e._v("如图，head 和 tail 指向同一个节点 Node0，该节点 item 域为 null,next 域为 null。")]),e._v(" "),a("p",[e._v('![1.ConcurrentLinkedQueue初始化状态.png](data:image/svg+xml;utf8,<?xml version="1.0"?>'),a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",version:"1.1",width:"176",height:"280"}}),e._v(")1.ConcurrentLinkedQueue初始化状态.png")]),e._v(" "),a("h2",{attrs:{id:"_1-2-操作-node-的几个-cas-操作"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-操作-node-的几个-cas-操作"}},[e._v("#")]),e._v(" 1.2 操作 Node 的几个 CAS 操作")]),e._v(" "),a("p",[e._v("在队列进行出队入队的时候免不了对节点需要进行操作，在多线程就很容易出现线程安全的问题。可以看出在处理器指令集能够支持"),a("strong",[e._v("CMPXCHG")]),e._v("指令后，在 java 源码中涉及到并发处理都会使用 CAS 操作"),a("a",{attrs:{href:"https://juejin.im/post/6844903600334831629",target:"_blank",rel:"noopener noreferrer"}},[e._v("(关于 CAS 操作可以看这篇文章的第 3.1 节"),a("OutboundLink")],1),e._v(")，那么在 ConcurrentLinkedQueue 对 Node 的 CAS 操作有这样几个：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("//更改Node中的数据域item\nboolean casItem(E cmp, E val) {\n    return UNSAFE.compareAndSwapObject(this, itemOffset, cmp, val);\n}\n//更改Node中的指针域next\nvoid lazySetNext(Node<E> val) {\n    UNSAFE.putOrderedObject(this, nextOffset, val);\n}\n//更改Node中的指针域next\nboolean casNext(Node<E> cmp, Node<E> val) {\n    return UNSAFE.compareAndSwapObject(this, nextOffset, cmp, val);\n}\n复制代码\n")])])]),a("p",[e._v("可以看出这些方法实际上是通过调用 UNSAFE 实例的方法，UNSAFE 为"),a("strong",[e._v("sun.misc.Unsafe")]),e._v("类，该类是 hotspot 底层方法，目前为止了解即可，知道 CAS 的操作归根结底是由该类提供就好。")]),e._v(" "),a("h1",{attrs:{id:"_2-offer-方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-offer-方法"}},[e._v("#")]),e._v(" 2.offer 方法")]),e._v(" "),a("p",[e._v("对一个队列来说，插入满足 FIFO 特性，插入元素总是在队列最末尾的地方进行插入，而取（移除）元素总是从队列的队头。所有要想能够彻底弄懂 ConcurrentLinkedQueue 自然而然是从 offer 方法和 poll 方法开始。那么为了能够理解 offer 方法，采用 debug 的方式来一行一行的看代码走。另外，在看多线程的代码时，可采用这样的思维方式：")]),e._v(" "),a("blockquote",[a("p",[a("strong",[e._v("单个线程 offer")]),e._v(" > "),a("strong",[e._v("多个线程 offer")]),e._v(" > "),a("strong",[e._v("部分线程 offer，部分线程 poll")]),e._v(' ----offer 的速度快于 poll --------队列长度会越来越长，由于 offer 节点总是在对队列队尾，而 poll 节点总是在队列对头，也就是说 offer 线程和 poll 线程两者并无“交集”，也就是说两类线程间并不会相互影响，这种情况站在相对速率的角度来看，也就是一个"单线程 offer" ----offer 的速度慢于 poll --------poll 的相对速率快于 offer，也就是队头删的速度要快于队尾添加节点的速度，导致的结果就是队列长度会越来越短，而 offer 线程和 poll 线程就会出现“交集”，即那一时刻就可以称之为 offer 线程和 poll 线程同时操作的节点为 '),a("strong",[e._v("临界点")]),e._v(" ，且在该节点 offer 线程和 poll 线程必定相互影响。根据在临界点时 offer 和 poll 发生的相对顺序又可从两个角度去思考："),a("strong",[e._v("1. 执行顺序为 offer--\x3epoll--\x3eoffer")]),e._v("，即表现为当 offer 线程在 Node1 后插入 Node2 时，此时 poll 线程已经将 Node1 删除，这种情况很显然需要在 offer 方法中考虑； "),a("strong",[e._v("2.执行顺序可能为：poll--\x3eoffer--\x3epoll")]),e._v("，即表现为当 poll 线程准备删除的节点（队列为空队列），此时 offer 线程插入一个节点使得队列变为非空队列")])]),e._v(" "),a("p",[e._v("先看这么一段代码：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("1. ConcurrentLinkedQueue<Integer> queue = new ConcurrentLinkedQueue<>();\n2. queue.offer(1);\n3. queue.offer(2);\n复制代码\n")])])]),a("p",[e._v("创建一个 ConcurrentLinkedQueue 实例，先 offer 1，然后再 offer 2。offer 的源码为：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('public boolean offer(E e) {\n1.    checkNotNull(e);\n2.    final Node<E> newNode = new Node<E>(e);\n3.    for (Node<E> t = tail, p = t;;) {\n4.        Node<E> q = p.next;\n5.        if (q == null) {\n6.            // p is last node\n7.            if (p.casNext(null, newNode)) {\n                // Successful CAS is the linearization point\n                // for e to become an element of this queue,\n               // and for newNode to become "live".\n8.                if (p != t) // hop two nodes at a time\n9.                    casTail(t, newNode);  // Failure is OK.\n10.                return true;\n            }\n            // Lost CAS race to another thread; re-read next\n        }\n11.        else if (p == q)\n            // We have fallen off list.  If tail is unchanged, it\n            // will also be off-list, in which case we need to\n            // jump to head, from which all live nodes are always\n            // reachable.  Else the new tail is a better bet.\n12.            p = (t != (t = tail)) ? t : head;\n           else\n            // Check for tail updates after two hops.\n13.            p = (p != t && t != (t = tail)) ? t : q;\n    }\n}\n复制代码\n')])])]),a("p",[a("strong",[e._v("单线程执行角度分析")]),e._v("：")]),e._v(" "),a("p",[e._v("先从"),a("strong",[e._v("单线程执行的角度")]),e._v("看起，分析 offer 1 的过程。第 1 行代码会对是否为 null 进行判断，为 null 的话就直接抛出空指针异常，第 2 行代码将 e 包装成一个 Node 类，第 3 行为 for 循环，只有初始化条件没有循环结束条件，这很符合 CAS 的“套路”，在循环体 CAS 操作成功会直接 return 返回，如果 CAS 操作失败的话就在 for 循环中不断重试直至成功。这里实例变量 t 被初始化为 tail，p 被初始化为 t 即 tail。为了方便下面的理解，"),a("strong",[e._v("p 被认为队列真正的尾节点，tail 不一定指向对象真正的尾节点，因为在 ConcurrentLinkedQueue 中 tail 是被延迟更新的")]),e._v("，具体原因我们慢慢来看。代码走到第 3 行的时候，t 和 p 都分别指向初始化时创建的 item 域为 null，next 域为 null 的 Node0。第 4 行变量 q 被赋值为 null，第 5 行 if 判断为 true，在第 7 行使用 casNext 将插入的 Node 设置成当前队列尾节点 p 的 next 节点，如果 CAS 操作失败，此次循环结束在下次循环中进行重试。CAS 操作成功走到第 8 行，此时 p==t，if 判断为 false,直接 return true 返回。如果成功插入 1 的话，此时 ConcurrentLinkedQueue 的状态如下图所示：")]),e._v(" "),a("p",[e._v('![2.offer 1后队列的状态.png](data:image/svg+xml;utf8,<?xml version="1.0"?>'),a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",version:"1.1",width:"403",height:"289"}}),e._v(")2.offer 1后队列的状态.png")]),e._v(" "),a("p",[e._v("如图，此时队列的尾节点应该为 Node1,而 tail 指向的节点依然还是 Node0,因此可以说明 tail 是延迟更新的。那么我们继续来看 offer 2 的时候的情况，很显然此时第 4 行 q 指向的节点不为 null 了，而是指向 Node1,第 5 行 if 判断为 false,第 11 行 if 判断为 false,代码会走到第 13 行。好了，**再插入节点的时候我们会问自己这样一个问题？上面已经解释了 tail 并不是指向队列真正的尾节点，那么在插入节点的时候，我们是不是应该最开始做的就是找到队列当前的尾节点在哪里才能插入？*"),a("em",[e._v("那么第 13 行代码就是*"),a("em",[e._v("找出队列真正的尾节点")])]),e._v("。")]),e._v(" "),a("blockquote",[a("p",[a("strong",[e._v("定位队列真正的对尾节点")])])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("p = (p != t && t != (t = tail)) ? t : q;\n复制代码\n")])])]),a("p",[e._v("我们来分析一下这行代码，如果这段代码在"),a("strong",[e._v("单线程环境")]),e._v("执行时，很显然由于 p==t,此时 p 会被赋值为 q,而 q 等于"),a("code",[e._v("Node<E> q = p.next")]),e._v("，即 Node1。在第一次循环中指针 p 指向了队列真正的队尾节点 Node1，那么在下一次循环中第 4 行 q 指向的节点为 null，那么在第 5 行中 if 判断为 true,那么在第 7 行依然通过 casNext 方法设置 p 节点的 next 为当前新增的 Node,接下来走到第 8 行，这个时候 p!=t，第 8 行 if 判断为 true,会通过"),a("code",[e._v("casTail(t, newNode)")]),e._v('将当前节点 Node 设置为队列的队尾节点,此时的队列状态示意图如下图所示： ![3.队列offer 2后的状态.png](data:image/svg+xml;utf8,<?xml version="1.0"?>'),a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",version:"1.1",width:"800",height:"600"}}),e._v(")")]),e._v(" "),a("p",[a("strong",[e._v("tail 指向的节点由 Node0 改变为 Node2")]),e._v(",这里的 casTail 失败不需要重试的原因是，offer 代码中主要是通过 p 的 next 节点 q("),a("code",[e._v("Node<E> q = p.next")]),e._v(')决定后面的逻辑走向的，当 casTail 失败时状态示意图如下： ![4.队列进行入队操作后casTail失败后的状态图.png](data:image/svg+xml;utf8,<?xml version="1.0"?>'),a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",version:"1.1",width:"632",height:"299"}}),e._v(")")]),e._v(" "),a("p",[e._v("如图，"),a("strong",[e._v("如果这里 casTail 设置 tail 失败即 tail 还是指向 Node0 节点的话，无非就是多循环几次通过 13 行代码定位到队尾节点")]),e._v("。")]),e._v(" "),a("p",[e._v("通过对单线程执行角度进行分析，我们可以了解到 poll 的执行逻辑为：")]),e._v(" "),a("ol",[a("li",[a("strong",[e._v("如果 tail 指向的节点的下一个节点（next 域）为 null 的话，说明 tail 指向的节点即为队列真正的队尾节点，因此可以通过 casNext 插入当前待插入的节点,但此时 tail 并未变化，如图 2;")])]),e._v(" "),a("li",[a("strong",[e._v("如果 tail 指向的节点的下一个节点（next 域）不为 null 的话，说明 tail 指向的节点不是队列的真正队尾节点。通过"),a("code",[e._v("q（Node<E> q = p.next）")]),e._v("指针往前递进去找到队尾节点，然后通过 casNext 插入当前待插入的节点，并通过 casTail 方式更改 tail，如图 3")]),e._v("。")])]),e._v(" "),a("p",[e._v("我们回过头再来看"),a("code",[e._v("p = (p != t && t != (t = tail)) ? t : q;")]),e._v("这行代码在单线程中，这段代码永远不会将 p 赋值为 t,那么这么写就不会有任何作用，那我们试着在"),a("strong",[e._v("多线程")]),e._v("的情况下进行分析。")]),e._v(" "),a("p",[a("strong",[e._v("多线程执行角度分析")])]),e._v(" "),a("blockquote",[a("p",[a("strong",[e._v("多个线程 offer")])])]),e._v(" "),a("p",[e._v("很显然这么写另有深意，其实在"),a("strong",[e._v("多线程环境")]),e._v("下这行代码很有意思的。 "),a("code",[e._v("t != (t = tail)")]),e._v("这个操作"),a("strong",[e._v("并非一个原子操作")]),e._v("，有这样一种情况：")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2018/5/6/16334599933a4aab?imageView2/0/w/1280/h/960/format/webp/ignore-error/1",alt:"5.线程A和线程B有可能的执行时序.png"}}),e._v("5.线程A和线程B有可能的执行时序.png")]),e._v(" "),a("p",[e._v("如图，假设线程 A 此时读取了变量 t，线程 B 刚好在这个时候 offer 一个 Node 后，此时会修改 tail 指针,那么这个时候线程 A 再次执行 t=tail 时 t 会指向另外一个节点，很显然线程 A 前后两次读取的变量 t 指向的节点不相同，即"),a("code",[e._v("t != (t = tail)")]),e._v("为 true,并且由于 t 指向节点的变化"),a("code",[e._v("p != t")]),e._v("也为 true，此时该行代码的执行结果为 p 和 t 最新的 t 指针指向了同一个节点，并且此时 t 也是队列真正的对尾节点。那么，现在已经定位到队列真正的队尾节点，就可以执行 offer 操作了。")]),e._v(" "),a("blockquote",[a("p",[a("strong",[e._v("offer->poll->offer")])])]),e._v(" "),a("p",[e._v("那么还剩下第 11 行的代码我们没有分析，大致可以猜想到应该就是回答"),a("strong",[e._v("一部分线程 offer，一部分 poll")]),e._v("的这种情况。当"),a("code",[e._v("if (p == q)")]),e._v("为 true 时，说明 p 指向的节点的 next 也指向它自己，这种节点称之为"),a("strong",[e._v("哨兵节点")]),e._v("，"),a("strong",[e._v("这种节点在队列中存在的价值不大，一般表示为要删除的节点或者是空节点")]),e._v("。为了能够很好的理解这种情况，我们先看看 poll 方法的执行过程后，再回过头来看，总之这是一个很有意思的事情 😃。")]),e._v(" "),a("h1",{attrs:{id:"_3-poll-方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-poll-方法"}},[e._v("#")]),e._v(" 3.poll 方法")]),e._v(" "),a("p",[e._v("poll 方法源码如下：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("public E poll() {    restartFromHead:    1. for (;;) {    2.    for (Node<E> h = head, p = h, q;;) {    3.        E item = p.item; 4.        if (item != null && p.casItem(item, null)) {            // Successful CAS is the linearization point            // for item to be removed from this queue. 5.            if (p != h) // hop two nodes at a time 6.                updateHead(h, ((q = p.next) != null) ? q : p); 7.            return item;        } 8.        else if ((q = p.next) == null) { 9.            updateHead(h, p); 10.            return null;        } 11.        else if (p == q) 12.            continue restartFromHead;        else 13.            p = q;    } } 复制代码 复制代码\n} \n")])])]),a("p",[e._v("我们还是先站在"),a("strong",[e._v("单线程的角度")]),e._v("去理清该方法的基本逻辑。假设 ConcurrentLinkedQueue 初始状态如下图所示：")]),e._v(" "),a("p",[e._v('![6.队列初始状态.png](data:image/svg+xml;utf8,<?xml version="1.0"?>'),a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",version:"1.1",width:"584",height:"318"}}),e._v(")6.队列初始状态.png")]),e._v(" "),a("p",[e._v("参数 offer 时的定义，我们还是先将"),a("strong",[e._v("变量 p 作为队列要删除真正的队头节点，h（head）指向的节点并不一定是队列的队头节点")]),e._v("。先来看 poll 出 Node1 时的情况，由于"),a("code",[e._v("p=h=head")]),e._v("，参照上图，很显然此时 p 指向的 Node1 的数据域不为 null,在第 4 行代码中"),a("code",[e._v("item!=null")]),e._v("判断为 true 后接下来通过"),a("code",[e._v("casItem")]),e._v("将 Node1 的数据域设置为 null。如果 CAS 设置失败则此次循环结束等待下一次循环进行重试。若第 4 行执行成功进入到第 5 行代码，此时 p 和 h 都指向 Node1,第 5 行 if 判断为 false,然后直接到第 7 行 return 回 Node1 的数据域 1，方法运行结束，此时的队列状态如下图。")]),e._v(" "),a("p",[e._v('![7.队列出队操作后的状态.png](data:image/svg+xml;utf8,<?xml version="1.0"?>'),a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",version:"1.1",width:"571",height:"322"}}),e._v(")7.队列出队操作后的状态.png")]),e._v(" "),a("p",[e._v("下面继续从队列中 poll，很显然当前 h 和 p 指向的 Node1 的数据域为 null，那么第一件事就是要"),a("strong",[e._v("定位准备删除的队头节点(找到数据域不为 null 的节点)")]),e._v("。")]),e._v(" "),a("blockquote",[a("p",[e._v("定位删除的队头节点")])]),e._v(" "),a("p",[e._v("继续看，第三行代码 item 为 null,第 4 行代码 if 判断为 false,走到第 8 行代码（"),a("code",[e._v("q = p.next")]),e._v("）if 也为 false，由于 q 指向了 Node2,在第 11 行的 if 判断也为 false，因此代码走到了第 13 行，这个时候 p 和 q 共同指向了 Node2,也就找到了要删除的真正的队头节点。可以总结出，定位待删除的队头节点的过程为："),a("strong",[e._v("如果当前节点的数据域为 null，很显然该节点不是待删除的节点，就用当前节点的下一个节点去试探")]),e._v("。在经过第一次循环后，此时状态图为下图：")]),e._v(" "),a("p",[e._v('![8.经过一次循环后的状态.png](data:image/svg+xml;utf8,<?xml version="1.0"?>'),a("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",version:"1.1",width:"584",height:"317"}}),e._v(")8.经过一次循环后的状态.png")]),e._v(" "),a("p",[e._v("进行下一次循环，第 4 行的操作同上述，当前假设第 4 行中 casItem 设置成功，由于 p 已经指向了 Node2,而 h 还依旧指向 Node1,此时第 5 行的 if 判断为 true，然后执行"),a("code",[e._v("updateHead(h, ((q = p.next) != null) ? q : p)")]),e._v("，此时 q 指向的 Node3，所有传入 updateHead 方法的分别是指向 Node1 的 h 引用和指向 Node3 的 q 引用。updateHead 方法的源码为：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("final void updateHead(Node<E> h, Node<E> p) {\n    if (h != p && casHead(h, p))\n        h.lazySetNext(h);\n}\n复制代码\n")])])]),a("p",[e._v("该方法主要是通过"),a("code",[e._v("casHead")]),e._v("将队列的 head 指向 Node3,并且通过 "),a("code",[e._v("h.lazySetNext")]),e._v("将 Node1 的 next 域指向它自己。最后在第 7 行代码中返回 Node2 的值。此时队列的状态如下图所示：")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2018/5/6/16334599be78fdde?imageView2/0/w/1280/h/960/format/webp/ignore-error/1",alt:"9.Node2从队列中出队后的状态.png"}}),e._v("9.Node2从队列中出队后的状态.png")]),e._v(" "),a("p",[e._v("Node1 的 next 域指向它自己，head 指向了 Node3。如果队列为空队列的话，就会执行到代码的第 8 行"),a("code",[e._v("(q = p.next) == null")]),e._v("，if 判断为 true,因此在第 10 行中直接返回 null。以上的分析是从单线程执行的角度去看，也可以让我们了解 poll 的整体思路，现在来做一个总结：")]),e._v(" "),a("ol",[a("li",[a("strong",[e._v("如果当前 head,h 和 p 指向的节点的 Item 不为 null 的话，说明该节点即为真正的队头节点（待删除节点），只需要通过 casItem 方法将 item 域设置为 null,然后将原来的 item 直接返回即可。")])]),e._v(" "),a("li",[a("strong",[e._v("如果当前 head,h 和 p 指向的节点的 item 为 null 的话，则说明该节点不是真正的待删除节点，那么应该做的就是寻找 item 不为 null 的节点。通过让 q 指向 p 的下一个节点（q = p.next）进行试探，若找到则通过 updateHead 方法更新 head 指向的节点以及构造哨兵节点（"),a("code",[e._v("通过updateHead方法的h.lazySetNext(h)")]),e._v("）")]),e._v("。")])]),e._v(" "),a("p",[e._v("接下来，按照上面分析 offer 的思维方式，下面来分析一下多线程的情况，第一种情况是；")]),e._v(" "),a("p",[a("strong",[e._v("多线程执行情况分析：")])]),e._v(" "),a("blockquote",[a("p",[a("strong",[e._v("多个线程 poll")])])]),e._v(" "),a("p",[e._v("现在回过头来看 poll 方法的源码，有这样一部分：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("else if (p == q)\n    continue restartFromHead;\n复制代码\n")])])]),a("p",[e._v("这一部分就是处理多个线程 poll 的情况，"),a("code",[e._v("q = p.next")]),e._v("也就是说 q 永远指向的是 p 的下一个节点，那么什么情况下会使得 p,q 指向同一个节点呢？根据上面我们的分析，只有 p 指向的节点在 poll 的时候转变成了"),a("strong",[e._v("哨兵节点")]),e._v("（通过 updateHead 方法中的 h.lazySetNext）。当线程 A 在判断"),a("code",[e._v("p==q")]),e._v("时，线程 B 已经将执行完 poll 方法将 p 指向的节点转换为"),a("strong",[e._v("哨兵节点")]),e._v("并且 head 指向的节点已经发生了改变，所以就需要从 restartFromHead 处执行，保证用到的是最新的 head。")]),e._v(" "),a("blockquote",[a("p",[a("strong",[e._v("poll->offer->poll")])])]),e._v(" "),a("p",[e._v("试想，还有这样一种情况，如果当前队列为空队列，线程 A 进行 poll 操作，同时线程 B 执行 offer，然后线程 A 在执行 poll，那么此时线程 A 返回的是 null 还是线程 B 刚插入的最新的那个节点呢？我们来写一代 demo：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('public static void main(String[] args) {\n    Thread thread1 = new Thread(() -> {\n        Integer value = queue.poll();\n        System.out.println(Thread.currentThread().getName() + " poll 的值为：" + value);\n        System.out.println("queue当前是否为空队列：" + queue.isEmpty());\n    });\n    thread1.start();\n    Thread thread2 = new Thread(() -> {\n        queue.offer(1);\n    });\n    thread2.start();\n}\n复制代码\n')])])]),a("p",[e._v("输出结果为：")]),e._v(" "),a("blockquote",[a("p",[e._v("Thread-0 poll 的值为：null queue 当前是否为空队列：false")])]),e._v(" "),a("p",[e._v("通过 debug 控制线程 thread1 和线程 thread2 的执行顺序，thread1 先执行到第 8 行代码"),a("code",[e._v("if ((q = p.next) == null)")]),e._v("，由于此时队列为空队列 if 判断为 true，进入 if 块，此时先让 thread1 暂停，然后 thread2 进行 offer 插入值为 1 的节点后，thread2 执行结束。再让 thread1 执行，这时"),a("strong",[e._v("thread1 并没有进行重试")]),e._v("，而是代码继续往下走，返回 null，尽管此时队列由于 thread2 已经插入了值为 1 的新的节点。所以输出结果为 thread0 poll 的为 null,然队列不为空队列。因此，"),a("strong",[e._v("在判断队列是否为空队列的时候是不能通过线程在 poll 的时候返回为 null 进行判断的，可以通过 isEmpty 方法进行判断")]),e._v("。")]),e._v(" "),a("h1",{attrs:{id:"_4-offer-方法中部分线程-offer-部分线程-poll"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-offer-方法中部分线程-offer-部分线程-poll"}},[e._v("#")]),e._v(" 4. offer 方法中部分线程 offer 部分线程 poll")]),e._v(" "),a("p",[e._v("在分析 offer 方法的时候我们还留下了一个问题，即对 offer 方法中第 11 行代码的理解。")]),e._v(" "),a("blockquote",[a("p",[a("strong",[e._v("offer->poll->offer")])])]),e._v(" "),a("p",[e._v("在 offer 方法的第 11 行代码"),a("code",[e._v("if (p == q)")]),e._v("，能够让 if 判断为 true 的情况为 p 指向的节点为"),a("strong",[e._v("哨兵节点")]),e._v("，而什么时候会构造哨兵节点呢？在对 poll 方法的讨论中，我们已经找到了答案，即**当 head 指向的节点的 item 域为 null 时会寻找真正的队头节点，等到待插入的节点插入之后，会更新 head，并且将原来 head 指向的节点设置为哨兵节点。**假设队列初始状态如下图所示： "),a("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2018/5/6/16334599c2390c2b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1",alt:"10.offer和poll相互影响分析时队列初始状态.png"}}),e._v(" 因此在线程 A 执行 offer 时，线程 B 执行 poll 就会存在如下一种情况： "),a("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2018/5/6/16334599cd4cbdab?imageView2/0/w/1280/h/960/format/webp/ignore-error/1",alt:"11.线程A和线程B可能存在的执行时序.png"}})]),e._v(" "),a("p",[e._v("如图，线程 A 的 tail 节点存在 next 节点 Node1,因此会通过引用 q 往前寻找队列真正的队尾节点，当执行到判断"),a("code",[e._v("if (p == q)")]),e._v("时，此时线程 B 执行 poll 操作，在对线程 B 来说，head 和 p 指向 Node0,由于 Node0 的 item 域为 null,同样会往前递进找到队列真正的队头节点 Node1,在线程 B 执行完 poll 之后，Node0 就会转换为"),a("strong",[e._v("哨兵节点")]),e._v("，也就意味着队列的 head 发生了改变，此时队列状态为下图。")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2018/5/6/16334599d7d92981?imageView2/0/w/1280/h/960/format/webp/ignore-error/1",alt:"12.线程B进行poll后队列的状态图.png"}}),e._v("12.线程B进行poll后队列的状态图.png")]),e._v(" "),a("p",[e._v("此时线程 A 在执行判断"),a("code",[e._v("if (p == q)")]),e._v("时就为 true,会继续执行"),a("code",[e._v("p = (t != (t = tail)) ? t : head;")]),e._v("，由于 tail 指针没有发生改变所以 p 被赋值为 head,重新从 head 开始完成插入操作。")]),e._v(" "),a("h1",{attrs:{id:"_5-hops-的设计"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-hops-的设计"}},[e._v("#")]),e._v(" 5. HOPS 的设计")]),e._v(" "),a("p",[e._v("通过上面对 offer 和 poll 方法的分析，我们发现 tail 和 head 是延迟更新的，两者更新触发时机为：")]),e._v(" "),a("p",[a("strong",[e._v("tail 更新触发时机")]),e._v("：当 tail 指向的节点的下一个节点不为 null 的时候，会执行定位队列真正的队尾节点的操作，找到队尾节点后完成插入之后才会通过 casTail 进行 tail 更新；当 tail 指向的节点的下一个节点为 null 的时候，只插入节点不更新 tail。")]),e._v(" "),a("p",[e._v("**head 更新触发时机：**当 head 指向的节点的 item 域为 null 的时候，会执行定位队列真正的队头节点的操作，找到队头节点后完成删除之后才会通过 updateHead 进行 head 更新；当 head 指向的节点的 item 域不为 null 的时候，只删除节点不更新 head。")]),e._v(" "),a("p",[e._v("并且在更新操作时，源码中会有注释为："),a("strong",[e._v("hop two nodes at a time")]),e._v("。所以这种延迟更新的策略就被叫做 HOPS 的大概原因是这个（猜的 😃），从上面更新时的状态图可以看出，head 和 tail 的更新是“跳着的”即中间总是间隔了一个。那么这样设计的意图是什么呢？")]),e._v(" "),a("p",[e._v("如果让 tail 永远作为队列的队尾节点，实现的代码量会更少，而且逻辑更易懂。但是，这样做有一个缺点，**如果大量的入队操作，每次都要执行 CAS 进行 tail 的更新，汇总起来对性能也会是大大的损耗。如果能减少 CAS 更新的操作，无疑可以大大提升入队的操作效率，所以 doug lea 大师每间隔 1 次（tail 和队尾节点的距离为 1）进行才利用 CAS 更新 tail。**对 head 的更新也是同样的道理，虽然，这样设计会多出在循环中定位队尾节点，但总体来说读的操作效率要远远高于写的性能，因此，多出来的在循环中定位尾节点的操作的性能损耗相对而言是很小的。")]),e._v(" "),a("p",[e._v("来源于 https://juejin.cn/post/6844903602427805704")])])}),[],!1,null,null,null);t.default=l.exports}}]);