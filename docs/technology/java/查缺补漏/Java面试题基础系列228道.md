# Java面试题基础系列228道

## Java面试题（一）

1、面向对象的特征有哪些方面？

2、访问修饰符 public,private,protected,以及不写（默认）时的区别？

3、String 是最基本的数据类型吗？

4、float f=3.4;是否正确？

5、short s1 = 1; s1 = s1 + 1;有错吗?short s1 = 1; s1 += 1;有错吗？

6、Java 有没有 goto？

7、int 和 Integer 有什么区别？

8、&和&&的区别？

9、解释内存中的栈(stack)、堆(heap)和方法区(method area)的用法。

10、Math.round(11.5) 等于多少？Math.round(-11.5)等于多少？

11、switch 是否能作用在 byte 上，是否能作用在 long 上，是否能作用在 String 上？

12、用最有效率的方法计算 2 乘以 8？

13、数组有没有 length()方法？String 有没有 length()方法？

14、在 Java 中，如何跳出当前的多重嵌套循环？

15、构造器（constructor）是否可被重写（override）？

16、两个对象值相同(x.equals(y) == true)，但却可有不同的 hashcode，这句话对不对？

17、是否可以继承 String 类？

18、当一个对象被当作参数传递到一个方法后，此方法可改变这个对象的属性，并可返回变化后的结果，那么这里到底是值传递还是引用传递？

19、String 和 StringBuilder、StringBuffer 的区别？

20、重载（Overload）和重写（Override）的区别。重载的方法能否根据返回类型进行区分？

21、描述一下 JVM 加载 class 文件的原理机制？

22、char 型变量中能不能存贮一个中文汉字，为什么？

23、抽象类（abstract class）和接口（interface）有什么异同？

24、静态嵌套类(Static Nested Class)和内部类（Inner Class）的不同？

25、Java 中会存在内存泄漏吗，请简单描述。

26、抽象的（abstract）方法是否可同时是静态的（static）,是否可同时是本地方法（native），是否可同时被 synchronized 修饰？

27、阐述静态变量和实例变量的区别。

28、是否可以从一个静态（static）方法内部发出对非静态（non-static）方法的调用？

29、如何实现对象克隆？

30、GC 是什么？为什么要有 GC？

31、String s = new String(“xyz”);创建了几个字符串对象？

32 、 接 口 是 否 可 继 承 （ extends ） 接 口 ？ 抽 象 类 是 否 可 实 现（implements）接口？抽象类是否可继承具体类（concrete class）？

33、一个”.java”源文件中是否可以包含多个类（不是内部类）？有什么限制？

34、Anonymous Inner Class(匿名内部类)是否可以继承其它类？是否可以实现接口？

35、内部类可以引用它的包含类（外部类）的成员吗？有没有什么限制？

36、Java 中的 final 关键字有哪些用法？

37、指出下面程序的运行结果

38、数据类型之间的转换：

39、如何实现字符串的反转及替换？

40、怎样将 GB2312 编码的字符串转换为 ISO-8859-1 编码的字符串？

41、日期和时间：

42、打印昨天的当前时刻。

43、比较一下 Java 和 JavaSciprt。

44、什么时候用断言（assert）？

45、Error 和 Exception 有什么区别？

46、try{}里有一个 return 语句，那么紧跟在这个 try 后的 finally{}里的代码会不会被执行，什么时候被执行，在 return 前还是后?

47、Java 语言如何进行异常处理，关键字：throws、throw、try、catch、finally 分别如何使用？

48、运行时异常与受检异常有何异同？

49、列出一些你常见的运行时异常？

50、阐述 final、finally、finalize 的区别。

51、类 ExampleA 继承 Exception，类 ExampleB 继承 ExampleA。

52、List、Set、Map 是否继承自 Collection 接口？

53、阐述 ArrayList、Vector、LinkedList 的存储性能和特性。

54、Collection 和 Collections 的区别？

55、List、Map、Set 三个接口存取元素时，各有什么特点？

56、TreeMap 和 TreeSet 在排序时如何比较元素？Collections 工具类中的 sort()方法如何比较元素？

57、Thread 类的 sleep()方法和对象的 wait()方法都可以让线程暂停执行，它们有什么区别?

58、线程的 sleep()方法和 yield()方法有什么区别？

59、当一个线程进入一个对象的 synchronized 方法 A 之后，其它线程是否可进入此对象 synchronized 方法 B？

60、请说出与线程同步以及线程调度相关的方法。

61、编写多线程程序有几种实现方式？

62、synchronized 关键字的用法？

63、举例说明同步和异步。

64、启动一个线程是调用 run()还是 start()方法？

65、什么是线程池（thread pool）？

66、线程的基本状态以及状态之间的关系？

67、简述 synchronized 和 java.util.concurrent.locks.Lock 的异同？

68、Java 中如何实现序列化，有什么意义？

69、Java 中有几种类型的流？

70、写一个方法，输入一个文件名和一个字符串，统计这个字符串在这个文件中出现的次数。

71、如何用 Java 代码列出一个目录下所有的文件？

72、用 Java 的套接字编程实现一个多线程的回显（echo）服务器。

73、XML 文档定义有几种形式？它们之间有何本质区别？解析 XML文档有哪几种方式？

74、你在项目中哪些地方用到了 XML？

75、阐述 JDBC 操作数据库的步骤。

76、Statement 和 PreparedStatement 有什么区别？哪个性能更好？

77、使用 JDBC 操作数据库时，如何提升读取数据的性能？如何提升更新数据的性能？

78、在进行数据库编程时，连接池有什么作用？

79、什么是 DAO 模式？

80、事务的 ACID 是指什么？

82、JDBC 能否处理 Blob 和 Clob？

83、简述正则表达式及其用途。

84、Java 中是如何支持正则表达式操作的？

85、获得一个类的类对象有哪些方式？

88、如何通过反射调用对象的方法？

90、简述一下你了解的设计模式。

91、用 Java 写一个单例类。

92、什么是 UML？

93、UML 中有哪些常用的图？

95、用 Java 写一个折半查找。

## Java 面试题（二）

1、Java 中能创建 volatile 数组吗？

2、volatile 能使得一个非原子操作变成原子操作吗？

3、volatile 修饰符的有过什么实践？

4、volatile 类型变量提供什么保证？

5、10 个线程和 2 个线程的同步代码，哪个更容易写？

6、你是如何调用 wait（）方法的？使用 if 块还是循环？为什么？

8、什么是 Busy spin？我们为什么要使用它？

9、Java 中怎么获取一份线程 dump 文件？

10、Swing 是线程安全的？

11、什么是线程局部变量？

12、用 wait-notify 写一段代码来解决生产者-消费者问题？

13、用 Java 写一个线程安全的单例模式（Singleton）？

14、Java 中 sleep 方法和 wait 方法的区别？

15、什么是不可变对象（immutable object）？Java 中怎么创建一个不可变对象？

16、我们能创建一个包含可变对象的不可变对象吗？

17、Java 中应该使用什么数据类型来代表价格？

18、怎么将 byte 转换为 String？

19、Java 中怎样将 bytes 转换为 long 类型？

20、我们能将 int 强制转换为 byte 类型的变量吗？如果该值大于byte 类型的范围，将会出现什么现象？

21、存在两个类，B 继承 A ，C 继承 B，我们能将 B 转换为 C 么？如 C = (C) B；

22、哪个类包含 clone 方法？是 Cloneable 还是 Object？

23、Java 中 ++ 操作符是线程安全的吗？

23、不是线程安全的操作。它涉及到多个指令，如读取变量值，增加，然后存储回内存，这个过程可能会出现多个线程交差。

24、a = a + b 与 a += b 的区别

25、我能在不进行强制转换的情况下将一个 double 值赋值给 long类型的变量吗？

26、3*0.1 == 0.3 将会返回什么？true 还是 false？

27、int 和 Integer 哪个会占用更多的内存？

28、为什么 Java 中的 String 是不可变的（Immutable）？

31、64 位 JVM 中，int 的长度是多数？

32、Serial 与 Parallel GC 之间的不同之处？

33、32 位和 64 位的 JVM，int 类型变量的长度是多数？

34、Java 中 WeakReference 与 SoftReference 的区别？

35、WeakHashMap 是怎么工作的？

36、JVM 选项 -XX:+UseCompressedOops 有什么作用？为什么要使用？

37、怎样通过 Java 程序来判断 JVM 是 32 位 还是 64 位？

38、32 位 JVM 和 64 位 JVM 的最大堆内存分别是多数？

39、JRE、JDK、JVM 及 JIT 之间有什么不同？

40、解释 Java 堆空间及 GC？

41、你能保证 GC 执行吗？

42、怎么获取 Java 程序使用的内存？堆使用的百分比？

43、Java 中堆和栈有什么区别？

44、“a==b”和”a.equals(b)”有什么区别？

45、a.hashCode() 有什么用？与 a.equals(b) 有什么关系？

46、final、finalize 和 finally 的不同之处？

47、Java 中的编译期常量是什么？使用它又什么风险？

48、List、Set、Map 和 Queue 之间的区别(答案)

49、poll() 方法和 remove() 方法的区别？

50、Java 中 LinkedHashMap 和 PriorityQueue 的区别是什么？

51、ArrayList 与 LinkedList 的不区别？

52、用哪两种方式来实现集合的排序？

53、Java 中怎么打印数组？

54、Java 中的 LinkedList 是单向链表还是双向链表？

55、Java 中的 TreeMap 是采用什么树实现的？(答案)

56、Hashtable 与 HashMap 有什么不同之处？

57、Java 中的 HashSet，内部是如何工作的？

58、写一段代码在遍历 ArrayList 时移除一个元素？

59、我们能自己写一个容器类，然后使用 for-each 循环码？

60、ArrayList 和 HashMap 的默认大小是多数？

61、有没有可能两个不相等的对象有有相同的 hashcode？

62、两个相同的对象会有不同的的 hash code 吗？

63、我们可以在 hashcode() 中使用随机数字吗？

64、Java 中，Comparator 与 Comparable 有什么不同？

66、在我 Java 程序中，我有三个 socket，我需要多少个线程来处理？

67、Java 中怎么创建 ByteBuffer？

68、Java 中，怎么读写 ByteBuffer ？

69、Java 采用的是大端还是小端？

70、ByteBuffer 中的字节序是什么？

71、Java 中，直接缓冲区与非直接缓冲器有什么区别？

72、Java 中的内存映射缓存区是什么？

73、socket 选项 TCP NO DELAY 是指什么？

74、TCP 协议与 UDP 协议有什么区别？

75、Java 中，ByteBuffer 与 StringBuffer 有什么区别？(答案)

76、Java 中，编写多线程程序的时候你会遵循哪些最佳实践？

77、说出几点 Java 中使用 Collections 的最佳实践

78、说出至少 5 点在 Java 中使用线程的最佳实践。

79、说出 5 条 IO 的最佳实践(答案)

80、列出 5 个应该遵循的 JDBC 最佳实践

81、说出几条 Java 中方法重载的最佳实践？

82、在多线程环境下，SimpleDateFormat 是线程安全的吗？

83、Java 中如何格式化一个日期？如格式化为 ddMMyyyy 的形式？

84、Java 中，怎么在格式化的日期中显示时区？

85、Java 中 java.util.Date 与 java.sql.Date 有什么区别？

86、Java 中，如何计算两个日期之间的差距？

87、Java 中，如何将字符串 YYYYMMDD 转换为日期？

89、如何测试静态方法？(答案)

90、怎么利用 JUnit 来测试一个方法的异常？

91、你使用过哪个单元测试库来测试你的 Java 程序？

92、@Before 和 @BeforeClass 有什么区别？

93、怎么检查一个字符串只包含数字？解决方案

94、Java 中如何利用泛型写一个 LRU 缓存？

95、写一段 Java 程序将 byte 转换为 long？

96、在不使用 StringBuffer 的前提下，怎么反转一个字符串？

97、Java 中，怎么获取一个文件中单词出现的最高频率？

98、如何检查出两个给定的字符串是反序的？

99、Java 中，怎么打印出一个字符串的所有排列？

100、Java 中，怎样才能打印出数组中的重复元素？

101、Java 中如何将字符串转换为整数？

102、在没有使用临时变量的情况如何交换两个整数变量的值？

103、接口是什么？为什么要使用接口而不是直接使用具体类？

104、Java 中，抽象类与接口之间有什么不同？

105、除了单例模式，你在生产环境中还用过什么设计模式？

106、你能解释一下里氏替换原则吗?

107、什么情况下会违反迪米特法则？为什么会有这个问题？

108、适配器模式是什么？什么时候使用？

109、什么是“依赖注入”和“控制反转”？为什么有人使用？

110、抽象类是什么？它与接口有什么区别？你为什么要使用过抽象类？

111、构造器注入和 setter 依赖注入，那种方式更好？

112、依赖注入和工程模式之间有什么不同？

113、适配器模式和装饰器模式有什么区别？

114、适配器模式和代理模式之前有什么不同？

115、什么是模板方法模式？

116、什么时候使用访问者模式？

117、什么时候使用组合模式？

118、继承和组合之间有什么不同？

119、描述 Java 中的重载和重写？

120、Java 中，嵌套公共静态类与顶级类有什么不同？

121、 OOP 中的 组合、聚合和关联有什么区别？

122、给我一个符合开闭原则的设计模式的例子？

123、抽象工厂模式和原型模式之间的区别？

125、嵌套静态类与顶级类有什么区别？

126、你能写出一个正则表达式来判断一个字符串是否是一个数字吗？

127、Java 中，受检查异常 和 不受检查异常的区别？

128、Java 中，throw 和 throws 有什么区别

129、Java 中，Serializable 与 Externalizable 的区别？

130、Java 中，DOM 和 SAX 解析器有什么不同？

131、说出 JDK 1.7 中的三个新特性？

132、说出 5 个 JDK 1.8 引入的新特性？

133、Java 中，Maven 和 ANT 有什么区别？