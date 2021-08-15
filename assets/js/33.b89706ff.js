(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{461:function(a,t,e){"use strict";e.r(t);var s=e(30),r=Object(s.a)({},(function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("h1",{attrs:{id:"jvm-调优-命令篇"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#jvm-调优-命令篇"}},[a._v("#")]),a._v(" Jvm 调优-命令篇")]),a._v(" "),e("p",[a._v("运用jvm自带的命令可以方便的在生产监控和打印堆栈的日志信息帮忙我们来定位问题！虽然jvm调优成熟的工具已经有很多：jconsole、大名鼎鼎的VisualVM，IBM的Memory Analyzer等等，但是在生产环境出现问题的时候，一方面工具的使用会有所限制，另一方面喜欢装X的我们，总喜欢在出现问题的时候在终端输入一些命令来解决。所有的工具几乎都是依赖于jdk的接口和底层的这些命令，研究这些命令的使用也让我们更能了解jvm构成和特性。")]),a._v(" "),e("p",[a._v("Sun JDK监控和故障处理命令有jps jstat jmap jhat jstack jinfo下面做一一介绍")]),a._v(" "),e("h2",{attrs:{id:"jps"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#jps"}},[a._v("#")]),a._v(" jps")]),a._v(" "),e("p",[a._v("JVM Process Status Tool,显示指定系统内所有的HotSpot虚拟机进程。")]),a._v(" "),e("h3",{attrs:{id:"命令格式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#命令格式"}},[a._v("#")]),a._v(" 命令格式")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("jps [options] [hostid]\n")])])]),e("h3",{attrs:{id:"option参数"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#option参数"}},[a._v("#")]),a._v(" option参数")]),a._v(" "),e("blockquote",[e("ul",[e("li",[a._v("-l : 输出主类全名或jar路径")]),a._v(" "),e("li",[a._v("-q : 只输出LVMID")]),a._v(" "),e("li",[a._v("-m : 输出JVM启动时传递给main()的参数")]),a._v(" "),e("li",[a._v("-v : 输出JVM启动时显示指定的JVM参数")])])]),a._v(" "),e("p",[a._v("其中[option]、[hostid]参数也可以不写。")]),a._v(" "),e("h3",{attrs:{id:"示例"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#示例"}},[a._v("#")]),a._v(" 示例")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("$ jps -l -m\n  28920 org.apache.catalina.startup.Bootstrap start\n  11589 org.apache.catalina.startup.Bootstrap start\n  25816 sun.tools.jps.Jps -l -m\n")])])]),e("h2",{attrs:{id:"jstat"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#jstat"}},[a._v("#")]),a._v(" jstat")]),a._v(" "),e("p",[a._v("jstat(JVM statistics Monitoring)是用于监视虚拟机运行时状态信息的命令，它可以显示出虚拟机进程中的类装载、内存、垃圾收集、JIT编译等运行数据。")]),a._v(" "),e("h3",{attrs:{id:"命令格式-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#命令格式-2"}},[a._v("#")]),a._v(" 命令格式")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("jstat [option] LVMID [interval] [count]\n")])])]),e("h3",{attrs:{id:"参数"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#参数"}},[a._v("#")]),a._v(" 参数")]),a._v(" "),e("blockquote",[e("ul",[e("li",[a._v("[option] : 操作参数")]),a._v(" "),e("li",[a._v("LVMID : 本地虚拟机进程ID")]),a._v(" "),e("li",[a._v("[interval] : 连续输出的时间间隔")]),a._v(" "),e("li",[a._v("[count] : 连续输出的次数")])])]),a._v(" "),e("h4",{attrs:{id:"option-参数总览"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#option-参数总览"}},[a._v("#")]),a._v(" option 参数总览")]),a._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"left"}},[a._v("Option")]),a._v(" "),e("th",{staticStyle:{"text-align":"left"}},[a._v("Displays…")])])]),a._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"left"}},[a._v("class")]),a._v(" "),e("td",{staticStyle:{"text-align":"left"}},[a._v("class loader的行为统计。Statistics on the behavior of the class loader.")])]),a._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[a._v("compiler")]),a._v(" "),e("td",{staticStyle:{"text-align":"left"}},[a._v("HotSpt JIT编译器行为统计。Statistics of the behavior of the HotSpot Just-in-Time compiler.")])]),a._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[a._v("gc")]),a._v(" "),e("td",{staticStyle:{"text-align":"left"}},[a._v("垃圾回收堆的行为统计。Statistics of the behavior of the garbage collected heap.")])]),a._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[a._v("gccapacity")]),a._v(" "),e("td",{staticStyle:{"text-align":"left"}},[a._v("各个垃圾回收代容量(young,old,perm)和他们相应的空间统计。Statistics of the capacities of the generations and their corresponding spaces.")])]),a._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[a._v("gcutil")]),a._v(" "),e("td",{staticStyle:{"text-align":"left"}},[a._v("垃圾回收统计概述。Summary of garbage collection statistics.")])]),a._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[a._v("gccause")]),a._v(" "),e("td",{staticStyle:{"text-align":"left"}},[a._v("垃圾收集统计概述（同-gcutil），附加最近两次垃圾回收事件的原因。Summary of garbage collection statistics (same as -gcutil), with the cause of the last and")])]),a._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[a._v("gcnew")]),a._v(" "),e("td",{staticStyle:{"text-align":"left"}},[a._v("新生代行为统计。Statistics of the behavior of the new generation.")])]),a._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[a._v("gcnewcapacity")]),a._v(" "),e("td",{staticStyle:{"text-align":"left"}},[a._v("新生代与其相应的内存空间的统计。Statistics of the sizes of the new generations and its corresponding spaces.")])]),a._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[a._v("gcold")]),a._v(" "),e("td",{staticStyle:{"text-align":"left"}},[a._v("年老代和永生代行为统计。Statistics of the behavior of the old and permanent generations.")])]),a._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[a._v("gcoldcapacity")]),a._v(" "),e("td",{staticStyle:{"text-align":"left"}},[a._v("年老代行为统计。Statistics of the sizes of the old generation.")])]),a._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[a._v("gcpermcapacity")]),a._v(" "),e("td",{staticStyle:{"text-align":"left"}},[a._v("永生代行为统计。Statistics of the sizes of the permanent generation.")])]),a._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"left"}},[a._v("printcompilation")]),a._v(" "),e("td",{staticStyle:{"text-align":"left"}},[a._v("HotSpot编译方法统计。HotSpot compilation method statistics.")])])])]),a._v(" "),e("h4",{attrs:{id:"option-参数详解"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#option-参数详解"}},[a._v("#")]),a._v(" option 参数详解")]),a._v(" "),e("h5",{attrs:{id:"class"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#class"}},[a._v("#")]),a._v(" -class")]),a._v(" "),e("p",[a._v("监视类装载、卸载数量、总空间以及耗费的时间")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("$ jstat -class 11589\n Loaded  Bytes  Unloaded  Bytes     Time   \n  7035  14506.3     0     0.0       3.67\n")])])]),e("blockquote",[e("ul",[e("li",[a._v("Loaded : 加载class的数量")]),a._v(" "),e("li",[a._v("Bytes : class字节大小")]),a._v(" "),e("li",[a._v("Unloaded : 未加载class的数量")]),a._v(" "),e("li",[a._v("Bytes : 未加载class的字节大小")]),a._v(" "),e("li",[a._v("Time : 加载时间")])])]),a._v(" "),e("h5",{attrs:{id:"compiler"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#compiler"}},[a._v("#")]),a._v(" -compiler")]),a._v(" "),e("p",[a._v("输出JIT编译过的方法数量耗时等")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("$ jstat -compiler 1262\nCompiled Failed Invalid   Time   FailedType FailedMethod\n    2573      1       0    47.60          1 org/apache/catalina/loader/WebappClassLoader findResourceInternal  \n")])])]),e("blockquote",[e("ul",[e("li",[a._v("Compiled : 编译数量")]),a._v(" "),e("li",[a._v("Failed : 编译失败数量")]),a._v(" "),e("li",[a._v("Invalid : 无效数量")]),a._v(" "),e("li",[a._v("Time : 编译耗时")]),a._v(" "),e("li",[a._v("FailedType : 失败类型")]),a._v(" "),e("li",[a._v("FailedMethod : 失败方法的全限定名")])])]),a._v(" "),e("h5",{attrs:{id:"gc"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#gc"}},[a._v("#")]),a._v(" -gc")]),a._v(" "),e("p",[a._v("垃圾回收堆的行为统计，"),e("strong",[a._v("常用命令")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("$ jstat -gc 1262\n S0C    S1C     S0U     S1U   EC       EU        OC         OU        PC       PU         YGC    YGCT    FGC    FGCT     GCT   \n26112.0 24064.0 6562.5  0.0   564224.0 76274.5   434176.0   388518.3  524288.0 42724.7    320    6.417   1      0.398    6.815\n")])])]),e("p",[e("strong",[a._v("C即Capacity 总容量，U即Used 已使用的容量")])]),a._v(" "),e("blockquote",[e("ul",[e("li",[a._v("S0C : survivor0区的总容量")]),a._v(" "),e("li",[a._v("S1C : survivor1区的总容量")]),a._v(" "),e("li",[a._v("S0U : survivor0区已使用的容量")]),a._v(" "),e("li",[a._v("S1U : survivor1区已使用的容量")]),a._v(" "),e("li",[a._v("EC : Eden区的总容量")]),a._v(" "),e("li",[a._v("EU : Eden区已使用的容量")]),a._v(" "),e("li",[a._v("OC : Old区的总容量")]),a._v(" "),e("li",[a._v("OU : Old区已使用的容量")]),a._v(" "),e("li",[a._v("PC 当前perm的容量 (KB)")]),a._v(" "),e("li",[a._v("PU perm的使用 (KB)")]),a._v(" "),e("li",[a._v("YGC : 新生代垃圾回收次数")]),a._v(" "),e("li",[a._v("YGCT : 新生代垃圾回收时间")]),a._v(" "),e("li",[a._v("FGC : 老年代垃圾回收次数")]),a._v(" "),e("li",[a._v("FGCT : 老年代垃圾回收时间")]),a._v(" "),e("li",[a._v("GCT : 垃圾回收总消耗时间")])])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("$ jstat -gc 1262 2000 20\n")])])]),e("p",[a._v("这个命令意思就是每隔2000ms输出1262的gc情况，一共输出20次")]),a._v(" "),e("h5",{attrs:{id:"gccapacity"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#gccapacity"}},[a._v("#")]),a._v(" -gccapacity")]),a._v(" "),e("p",[a._v("同-gc，不过还会输出Java堆各区域使用到的最大、最小空间")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("$ jstat -gccapacity 1262\n NGCMN    NGCMX     NGC    S0C   S1C       EC         OGCMN      OGCMX      OGC        OC       PGCMN    PGCMX     PGC      PC         YGC    FGC \n614400.0 614400.0 614400.0 26112.0 24064.0 564224.0   434176.0   434176.0   434176.0   434176.0 524288.0 1048576.0 524288.0 524288.0    320     1  \n")])])]),e("blockquote",[e("ul",[e("li",[a._v("NGCMN : 新生代占用的最小空间")]),a._v(" "),e("li",[a._v("NGCMX : 新生代占用的最大空间")]),a._v(" "),e("li",[a._v("OGCMN : 老年代占用的最小空间")]),a._v(" "),e("li",[a._v("OGCMX : 老年代占用的最大空间")]),a._v(" "),e("li",[a._v("OGC：当前年老代的容量 (KB)")]),a._v(" "),e("li",[a._v("OC：当前年老代的空间 (KB)")]),a._v(" "),e("li",[a._v("PGCMN : perm占用的最小空间")]),a._v(" "),e("li",[a._v("PGCMX : perm占用的最大空间")])])]),a._v(" "),e("h5",{attrs:{id:"gcutil"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#gcutil"}},[a._v("#")]),a._v(" -gcutil")]),a._v(" "),e("p",[a._v("同-gc，不过输出的是已使用空间占总空间的百分比")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("$ jstat -gcutil 28920\n  S0     S1     E      O      P     YGC     YGCT    FGC    FGCT     GCT   \n 12.45   0.00  33.85   0.00   4.44  4       0.242     0    0.000    0.242\n")])])]),e("h5",{attrs:{id:"gccause"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#gccause"}},[a._v("#")]),a._v(" -gccause")]),a._v(" "),e("p",[a._v("垃圾收集统计概述（同-gcutil），附加最近两次垃圾回收事件的原因")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("$ jstat -gccause 28920\n  S0     S1     E      O      P       YGC     YGCT    FGC    FGCT     GCT    LGCC                 GCC                 \n 12.45   0.00  33.85   0.00   4.44      4    0.242     0    0.000    0.242   Allocation Failure   No GC  \n")])])]),e("blockquote",[e("ul",[e("li",[a._v("LGCC：最近垃圾回收的原因")]),a._v(" "),e("li",[a._v("GCC：当前垃圾回收的原因")])])]),a._v(" "),e("h5",{attrs:{id:"gcnew"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#gcnew"}},[a._v("#")]),a._v(" -gcnew")]),a._v(" "),e("p",[a._v("统计新生代的行为")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("$ jstat -gcnew 28920\n S0C      S1C      S0U        S1U  TT  MTT  DSS      EC        EU         YGC     YGCT  \n 419392.0 419392.0 52231.8    0.0  6   6    209696.0 3355520.0 1172246.0  4       0.242\n")])])]),e("blockquote",[e("ul",[e("li",[a._v("TT：Tenuring threshold(提升阈值)")]),a._v(" "),e("li",[a._v("MTT：最大的tenuring threshold")]),a._v(" "),e("li",[a._v("DSS：survivor区域大小 (KB)")])])]),a._v(" "),e("h5",{attrs:{id:"gcnewcapacity"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#gcnewcapacity"}},[a._v("#")]),a._v(" -gcnewcapacity")]),a._v(" "),e("p",[a._v("新生代与其相应的内存空间的统计")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("$ jstat -gcnewcapacity 28920\n  NGCMN      NGCMX       NGC      S0CMX     S0C     S1CMX     S1C       ECMX        EC        YGC   FGC \n 4194304.0  4194304.0  4194304.0 419392.0 419392.0 419392.0 419392.0  3355520.0  3355520.0     4     0\n")])])]),e("blockquote",[e("ul",[e("li",[a._v("NGC:当前年轻代的容量 (KB)")]),a._v(" "),e("li",[a._v("S0CMX:最大的S0空间 (KB)")]),a._v(" "),e("li",[a._v("S0C:当前S0空间 (KB)")]),a._v(" "),e("li",[a._v("ECMX:最大eden空间 (KB)")]),a._v(" "),e("li",[a._v("EC:当前eden空间 (KB)")])])]),a._v(" "),e("h5",{attrs:{id:"gcold"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#gcold"}},[a._v("#")]),a._v(" -gcold")]),a._v(" "),e("p",[a._v("统计旧生代的行为")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("$ jstat -gcold 28920\n   PC       PU        OC           OU       YGC    FGC    FGCT     GCT   \n1048576.0  46561.7   6291456.0     0.0      4      0      0.000    0.242\n")])])]),e("h5",{attrs:{id:"gcoldcapacity"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#gcoldcapacity"}},[a._v("#")]),a._v(" -gcoldcapacity")]),a._v(" "),e("p",[a._v("统计旧生代的大小和空间")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("$ jstat -gcoldcapacity 28920\n   OGCMN       OGCMX        OGC         OC         YGC   FGC    FGCT     GCT   \n  6291456.0   6291456.0   6291456.0   6291456.0     4     0    0.000    0.242\n")])])]),e("h5",{attrs:{id:"gcpermcapacity"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#gcpermcapacity"}},[a._v("#")]),a._v(" -gcpermcapacity")]),a._v(" "),e("p",[a._v("永生代行为统计")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("$ jstat -gcpermcapacity 28920\n    PGCMN      PGCMX       PGC         PC      YGC   FGC    FGCT     GCT   \n 1048576.0  2097152.0  1048576.0  1048576.0     4     0    0.000    0.242\n")])])]),e("h5",{attrs:{id:"printcompilation"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#printcompilation"}},[a._v("#")]),a._v(" -printcompilation")]),a._v(" "),e("p",[a._v("hotspot编译方法统计")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("$ jstat -printcompilation 28920\n    Compiled  Size  Type Method\n    1291      78     1    java/util/ArrayList indexOf\n")])])]),e("blockquote",[e("ul",[e("li",[a._v("Compiled：被执行的编译任务的数量")]),a._v(" "),e("li",[a._v("Size：方法字节码的字节数")]),a._v(" "),e("li",[a._v("Type：编译类型")]),a._v(" "),e("li",[a._v("Method：编译方法的类名和方法名。类名使用”/” 代替 “.” 作为空间分隔符. 方法名是给出类的方法名. 格式是一致于HotSpot - XX:+PrintComplation 选项")])])]),a._v(" "),e("h2",{attrs:{id:"jmap"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#jmap"}},[a._v("#")]),a._v(" jmap")]),a._v(" "),e("p",[a._v("jmap(JVM Memory Map)命令用于生成heap dump文件，如果不使用这个命令，还阔以使用-XX:+HeapDumpOnOutOfMemoryError参数来让虚拟机出现OOM的时候·自动生成dump文件。 jmap不仅能生成dump文件，还阔以查询finalize执行队列、Java堆和永久代的详细信息，如当前使用率、当前使用的是哪种收集器等。")]),a._v(" "),e("h3",{attrs:{id:"命令格式-3"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#命令格式-3"}},[a._v("#")]),a._v(" 命令格式")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("jmap [option] LVMID\n")])])]),e("h3",{attrs:{id:"option参数-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#option参数-2"}},[a._v("#")]),a._v(" option参数")]),a._v(" "),e("blockquote",[e("ul",[e("li",[a._v("dump : 生成堆转储快照")]),a._v(" "),e("li",[a._v("finalizerinfo : 显示在F-Queue队列等待Finalizer线程执行finalizer方法的对象")]),a._v(" "),e("li",[a._v("heap : 显示Java堆详细信息")]),a._v(" "),e("li",[a._v("histo : 显示堆中对象的统计信息")]),a._v(" "),e("li",[a._v("permstat : to print permanent generation statistics")]),a._v(" "),e("li",[a._v("F : 当-dump没有响应时，强制生成dump快照")])])]),a._v(" "),e("h3",{attrs:{id:"示例-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#示例-2"}},[a._v("#")]),a._v(" 示例")]),a._v(" "),e("h5",{attrs:{id:"dump"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#dump"}},[a._v("#")]),a._v(" -dump")]),a._v(" "),e("p",[a._v("常用格式")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("-dump::live,format=b,file=<filename> pid \n")])])]),e("p",[a._v("dump堆到文件,format指定输出格式，live指明是活着的对象,file指定文件名")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("$ jmap -dump:live,format=b,file=dump.hprof 28920\n  Dumping heap to /home/xxx/dump.hprof ...\n  Heap dump file created\n")])])]),e("p",[a._v("dump.hprof这个后缀是为了后续可以直接用MAT(Memory Anlysis Tool)打开。")]),a._v(" "),e("h5",{attrs:{id:"finalizerinfo"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#finalizerinfo"}},[a._v("#")]),a._v(" -finalizerinfo")]),a._v(" "),e("p",[a._v("打印等待回收对象的信息")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("$ jmap -finalizerinfo 28920\n  Attaching to process ID 28920, please wait...\n  Debugger attached successfully.\n  Server compiler detected.\n  JVM version is 24.71-b01\n  Number of objects pending for finalization: 0\n")])])]),e("p",[a._v("可以看到当前F-QUEUE队列中并没有等待Finalizer线程执行finalizer方法的对象。")]),a._v(" "),e("h5",{attrs:{id:"heap"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#heap"}},[a._v("#")]),a._v(" -heap")]),a._v(" "),e("p",[a._v("打印heap的概要信息，GC使用的算法，heap的配置及wise heap的使用情况,可以用此来判断内存目前的使用情况以及垃圾回收情况")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("$ jmap -heap 28920\n  Attaching to process ID 28920, please wait...\n  Debugger attached successfully.\n  Server compiler detected.\n  JVM version is 24.71-b01  \n\n  using thread-local object allocation.\n  Parallel GC with 4 thread(s)//GC 方式  \n\n  Heap Configuration: //堆内存初始化配置\n     MinHeapFreeRatio = 0 //对应jvm启动参数-XX:MinHeapFreeRatio设置JVM堆最小空闲比率(default 40)\n     MaxHeapFreeRatio = 100 //对应jvm启动参数 -XX:MaxHeapFreeRatio设置JVM堆最大空闲比率(default 70)\n     MaxHeapSize      = 2082471936 (1986.0MB) //对应jvm启动参数-XX:MaxHeapSize=设置JVM堆的最大大小\n     NewSize          = 1310720 (1.25MB)//对应jvm启动参数-XX:NewSize=设置JVM堆的‘新生代’的默认大小\n     MaxNewSize       = 17592186044415 MB//对应jvm启动参数-XX:MaxNewSize=设置JVM堆的‘新生代’的最大大小\n     OldSize          = 5439488 (5.1875MB)//对应jvm启动参数-XX:OldSize=<value>:设置JVM堆的‘老生代’的大小\n     NewRatio         = 2 //对应jvm启动参数-XX:NewRatio=:‘新生代’和‘老生代’的大小比率\n     SurvivorRatio    = 8 //对应jvm启动参数-XX:SurvivorRatio=设置年轻代中Eden区与Survivor区的大小比值 \n     PermSize         = 21757952 (20.75MB)  //对应jvm启动参数-XX:PermSize=<value>:设置JVM堆的‘永生代’的初始大小\n     MaxPermSize      = 85983232 (82.0MB)//对应jvm启动参数-XX:MaxPermSize=<value>:设置JVM堆的‘永生代’的最大大小\n     G1HeapRegionSize = 0 (0.0MB)  \n\n  Heap Usage://堆内存使用情况\n  PS Young Generation\n  Eden Space://Eden区内存分布\n     capacity = 33030144 (31.5MB)//Eden区总容量\n     used     = 1524040 (1.4534378051757812MB)  //Eden区已使用\n     free     = 31506104 (30.04656219482422MB)  //Eden区剩余容量\n     4.614088270399305% used //Eden区使用比率\n  From Space:  //其中一个Survivor区的内存分布\n     capacity = 5242880 (5.0MB)\n     used     = 0 (0.0MB)\n     free     = 5242880 (5.0MB)\n     0.0% used\n  To Space:  //另一个Survivor区的内存分布\n     capacity = 5242880 (5.0MB)\n     used     = 0 (0.0MB)\n     free     = 5242880 (5.0MB)\n     0.0% used\n  PS Old Generation //当前的Old区内存分布\n     capacity = 86507520 (82.5MB)\n     used     = 0 (0.0MB)\n     free     = 86507520 (82.5MB)\n     0.0% used\n  PS Perm Generation//当前的 “永生代” 内存分布\n     capacity = 22020096 (21.0MB)\n     used     = 2496528 (2.3808746337890625MB)\n     free     = 19523568 (18.619125366210938MB)\n     11.337498256138392% used  \n\n  670 interned Strings occupying 43720 bytes.\n")])])]),e("p",[a._v("可以很清楚的看到Java堆中各个区域目前的情况。")]),a._v(" "),e("h5",{attrs:{id:"histo"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#histo"}},[a._v("#")]),a._v(" -histo")]),a._v(" "),e("p",[a._v("打印堆的对象统计，包括对象数、内存大小等等 （因为在dump:live前会进行full gc，如果带上live则只统计活对象，因此不加live的堆大小要大于加live堆的大小 ）")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("$ jmap -histo:live 28920 | more\n num     #instances         #bytes  class name\n----------------------------------------------\n   1:         83613       12012248  <constMethodKlass>\n   2:         23868       11450280  [B\n   3:         83613       10716064  <methodKlass>\n   4:         76287       10412128  [C\n   5:          8227        9021176  <constantPoolKlass>\n   6:          8227        5830256  <instanceKlassKlass>\n   7:          7031        5156480  <constantPoolCacheKlass>\n   8:         73627        1767048  java.lang.String\n   9:          2260        1348848  <methodDataKlass>\n  10:          8856         849296  java.lang.Class\n  ....\n")])])]),e("p",[a._v("仅仅打印了前10行")]),a._v(" "),e("p",[e("code",[a._v("xml class name")]),a._v("是对象类型，说明如下：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("B  byte\nC  char\nD  double\nF  float\nI  int\nJ  long\nZ  boolean\n[  数组，如[I表示int[]\n[L+类名 其他对象\n")])])]),e("h5",{attrs:{id:"permstat"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#permstat"}},[a._v("#")]),a._v(" -permstat")]),a._v(" "),e("p",[a._v("打印Java堆内存的永久保存区域的类加载器的智能统计信息。对于每个类加载器而言，它的名称、活跃度、地址、父类加载器、它所加载的类的数量和大小都会被打印。此外，包含的字符串数量和大小也会被打印。")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("$ jmap -permstat 28920\n  Attaching to process ID 28920, please wait...\n  Debugger attached successfully.\n  Server compiler detected.\n  JVM version is 24.71-b01\n  finding class loader instances ..done.\n  computing per loader stat ..done.\n  please wait.. computing liveness.liveness analysis may be inaccurate ...\n  \n  class_loader            classes bytes   parent_loader           alive?  type  \n  <bootstrap>             3111    18154296          null          live    <internal>\n  0x0000000600905cf8      1       1888    0x0000000600087f08      dead    sun/reflect/DelegatingClassLoader@0x00000007800500a0\n  0x00000006008fcb48      1       1888    0x0000000600087f08      dead    sun/reflect/DelegatingClassLoader@0x00000007800500a0\n  0x00000006016db798      0       0       0x00000006008d3fc0      dead    java/util/ResourceBundle$RBClassLoader@0x0000000780626ec0\n  0x00000006008d6810      1       3056      null          dead    sun/reflect/DelegatingClassLoader@0x00000007800500a0\n")])])]),e("h5",{attrs:{id:"f"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#f"}},[a._v("#")]),a._v(" -F")]),a._v(" "),e("p",[a._v("强制模式。如果指定的pid没有响应，请使用jmap -dump或jmap -histo选项。此模式下，不支持live子选项。")]),a._v(" "),e("h2",{attrs:{id:"jhat"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#jhat"}},[a._v("#")]),a._v(" jhat")]),a._v(" "),e("p",[a._v("jhat(JVM Heap Analysis Tool)命令是与jmap搭配使用，用来分析jmap生成的dump，jhat内置了一个微型的HTTP/HTML服务器，生成dump的分析结果后，可以在浏览器中查看。在此要注意，一般不会直接在服务器上进行分析，因为jhat是一个耗时并且耗费硬件资源的过程，一般把服务器生成的dump文件复制到本地或其他机器上进行分析。")]),a._v(" "),e("h3",{attrs:{id:"命令格式-4"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#命令格式-4"}},[a._v("#")]),a._v(" 命令格式")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("jhat [dumpfile]\n")])])]),e("h3",{attrs:{id:"参数-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#参数-2"}},[a._v("#")]),a._v(" 参数")]),a._v(" "),e("blockquote",[e("ul",[e("li",[a._v("-stack false|true 关闭对象分配调用栈跟踪(tracking object allocation call stack)。 如果分配位置信息在堆转储中不可用. 则必须将此标志设置为 false. 默认值为 true.>")]),a._v(" "),e("li",[a._v("-refs false|true 关闭对象引用跟踪(tracking of references to objects)。 默认值为 true. 默认情况下, 返回的指针是指向其他特定对象的对象,如反向链接或输入引用(referrers or incoming references), 会统计/计算堆中的所有对象。>")]),a._v(" "),e("li",[a._v("-port port-number 设置 jhat HTTP server 的端口号. 默认值 7000.>")]),a._v(" "),e("li",[a._v("-exclude exclude-file 指定对象查询时需要排除的数据成员列表文件(a file that lists data members that should be excluded from the reachable objects query)。 例如, 如果文件列列出了 java.lang.String.value , 那么当从某个特定对象 Object o 计算可达的对象列表时, 引用路径涉及 java.lang.String.value 的都会被排除。>")]),a._v(" "),e("li",[a._v("-baseline exclude-file 指定一个基准堆转储(baseline heap dump)。 在两个 heap dumps 中有相同 object ID 的对象会被标记为不是新的(marked as not being new). 其他对象被标记为新的(new). 在比较两个不同的堆转储时很有用.>")]),a._v(" "),e("li",[a._v("-debug int 设置 debug 级别. 0 表示不输出调试信息。 值越大则表示输出更详细的 debug 信息.>")]),a._v(" "),e("li",[a._v("-version 启动后只显示版本信息就退出>")]),a._v(" "),e("li",[a._v("-J< flag > 因为 jhat 命令实际上会启动一个JVM来执行, 通过 -J 可以在启动JVM时传入一些启动参数. 例如, -J-Xmx512m 则指定运行 jhat 的Java虚拟机使用的最大堆内存为 512 MB. 如果需要使用多个JVM启动参数,则传入多个 -Jxxxxxx.")])])]),a._v(" "),e("h3",{attrs:{id:"示例-3"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#示例-3"}},[a._v("#")]),a._v(" 示例")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("$ jhat -J-Xmx512m dump.hprof\n  eading from dump.hprof...\n  Dump file created Fri Mar 11 17:13:42 CST 2016\n  Snapshot read, resolving...\n  Resolving 271678 objects...\n  Chasing references, expect 54 dots......................................................\n  Eliminating duplicate references......................................................\n  Snapshot resolved.\n  Started HTTP server on port 7000\n  Server is ready.\n")])])]),e("p",[a._v("中间的-J-Xmx512m是在dump快照很大的情况下分配512M内存去启动HTTP服务器，运行完之后就可在浏览器打开Http://localhost:7000进行快照分析 堆快照分析主要在最后面的Heap Histogram里，里面根据class列出了dump的时候所有存活对象。")]),a._v(" "),e("p",[e("strong",[a._v("分析同样一个dump快照，MAT需要的额外内存比jhat要小的多的多，所以建议使用MAT来进行分析，当然也看个人偏好。")])]),a._v(" "),e("h3",{attrs:{id:"分析"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#分析"}},[a._v("#")]),a._v(" 分析")]),a._v(" "),e("p",[a._v("打开浏览器Http://localhost:7000，该页面提供了几个查询功能可供使用：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("All classes including platform\nShow all members of the rootset\nShow instance counts for all classes (including platform)\nShow instance counts for all classes (excluding platform)\nShow heap histogram\nShow finalizer summary\nExecute Object Query Language (OQL) query\n")])])]),e("p",[a._v("一般查看堆异常情况主要看这个两个部分： Show instance counts for all classes (excluding platform)，平台外的所有对象信息。如下图："),e("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master/img/jvm-jhat-excluding-paltform.png",alt:"img"}}),a._v("\nShow heap histogram 以树状图形式展示堆情况。如下图："),e("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master/img/jvm-jhat-heap-histogram.png",alt:"img"}}),a._v("\n具体排查时需要结合代码，观察是否大量应该被回收的对象在一直被引用或者是否有占用内存特别大的对象无法被回收。\n"),e("strong",[a._v("一般情况，会down到客户端用工具来分析")])]),a._v(" "),e("h2",{attrs:{id:"jstack"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#jstack"}},[a._v("#")]),a._v(" jstack")]),a._v(" "),e("p",[a._v("jstack用于生成java虚拟机当前时刻的线程快照。线程快照是当前java虚拟机内每一条线程正在执行的方法堆栈的集合，生成线程快照的主要目的是定位线程出现长时间停顿的原因，如线程间死锁、死循环、请求外部资源导致的长时间等待等。 线程出现停顿的时候通过jstack来查看各个线程的调用堆栈，就可以知道没有响应的线程到底在后台做什么事情，或者等待什么资源。 如果java程序崩溃生成core文件，jstack工具可以用来获得core文件的java stack和native stack的信息，从而可以轻松地知道java程序是如何崩溃和在程序何处发生问题。另外，jstack工具还可以附属到正在运行的java程序中，看到当时运行的java程序的java stack和native stack的信息, 如果现在运行的java程序呈现hung的状态，jstack是非常有用的。")]),a._v(" "),e("h3",{attrs:{id:"命令格式-5"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#命令格式-5"}},[a._v("#")]),a._v(" 命令格式")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("jstack [option] LVMID\n")])])]),e("h3",{attrs:{id:"option参数-3"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#option参数-3"}},[a._v("#")]),a._v(" option参数")]),a._v(" "),e("blockquote",[e("ul",[e("li",[a._v("-F : 当正常输出请求不被响应时，强制输出线程堆栈")]),a._v(" "),e("li",[a._v("-l : 除堆栈外，显示关于锁的附加信息")]),a._v(" "),e("li",[a._v("-m : 如果调用到本地方法的话，可以显示C/C++的堆栈")])])]),a._v(" "),e("h3",{attrs:{id:"示例-4"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#示例-4"}},[a._v("#")]),a._v(" 示例")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v('$ jstack -l 11494|more\n2016-07-28 13:40:04\nFull thread dump Java HotSpot(TM) 64-Bit Server VM (24.71-b01 mixed mode):\n\n"Attach Listener" daemon prio=10 tid=0x00007febb0002000 nid=0x6b6f waiting on condition [0x0000000000000000]\n   java.lang.Thread.State: RUNNABLE\n\n   Locked ownable synchronizers:\n        - None\n\n"http-bio-8005-exec-2" daemon prio=10 tid=0x00007feb94028000 nid=0x7b8c waiting on condition [0x00007fea8f56e000]\n   java.lang.Thread.State: WAITING (parking)\n        at sun.misc.Unsafe.park(Native Method)\n        - parking to wait for  <0x00000000cae09b80> (a java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject)\n        at java.util.concurrent.locks.LockSupport.park(LockSupport.java:186)\n        at java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.await(AbstractQueuedSynchronizer.java:2043)\n        at java.util.concurrent.LinkedBlockingQueue.take(LinkedBlockingQueue.java:442)\n        at org.apache.tomcat.util.threads.TaskQueue.take(TaskQueue.java:104)\n        at org.apache.tomcat.util.threads.TaskQueue.take(TaskQueue.java:32)\n        at java.util.concurrent.ThreadPoolExecutor.getTask(ThreadPoolExecutor.java:1068)\n        at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1130)\n        at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:615)\n        at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61)\n        at java.lang.Thread.run(Thread.java:745)\n\n   Locked ownable synchronizers:\n        - None\n      .....\n')])])]),e("h3",{attrs:{id:"分析-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#分析-2"}},[a._v("#")]),a._v(" 分析")]),a._v(" "),e("p",[a._v("这里有一篇文章解释的很好 "),e("a",{attrs:{href:"http://www.hollischuang.com/archives/110",target:"_blank",rel:"noopener noreferrer"}},[a._v("分析打印出的文件内容"),e("OutboundLink")],1)]),a._v(" "),e("h2",{attrs:{id:"jinfo"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#jinfo"}},[a._v("#")]),a._v(" jinfo")]),a._v(" "),e("p",[a._v("jinfo(JVM Configuration info)这个命令作用是实时查看和调整虚拟机运行参数。 之前的jps -v口令只能查看到显示指定的参数，如果想要查看未被显示指定的参数的值就要使用jinfo口令")]),a._v(" "),e("h3",{attrs:{id:"命令格式-6"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#命令格式-6"}},[a._v("#")]),a._v(" 命令格式")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("jinfo [option] [args] LVMID\n")])])]),e("h3",{attrs:{id:"option参数-4"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#option参数-4"}},[a._v("#")]),a._v(" option参数")]),a._v(" "),e("blockquote",[e("ul",[e("li",[a._v("-flag : 输出指定args参数的值")]),a._v(" "),e("li",[a._v("-flags : 不需要args参数，输出所有JVM参数的值")]),a._v(" "),e("li",[a._v("-sysprops : 输出系统属性，等同于System.getProperties()")])])]),a._v(" "),e("h3",{attrs:{id:"示例-5"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#示例-5"}},[a._v("#")]),a._v(" 示例")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("$ jinfo -flags 11494\n-XX:CMSInitiatingOccupancyFraction=80\n")])])])])}),[],!1,null,null,null);t.default=r.exports}}]);