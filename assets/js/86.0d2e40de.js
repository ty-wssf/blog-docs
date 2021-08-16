(window.webpackJsonp=window.webpackJsonp||[]).push([[86],{515:function(t,e,a){"use strict";a.r(e);var r=a(30),s=Object(r.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"解-java-8-的-lambda、函数式接口、stream-用法和原理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#解-java-8-的-lambda、函数式接口、stream-用法和原理"}},[t._v("#")]),t._v(" 解 Java 8 的 Lambda、函数式接口、Stream 用法和原理")]),t._v(" "),a("h2",{attrs:{id:"lambda-表达式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#lambda-表达式"}},[t._v("#")]),t._v(" Lambda 表达式")]),t._v(" "),a("blockquote",[a("p",[t._v("Lambda 表达式是一个"),a("a",{attrs:{href:"https://link.juejin.cn?target=https%3A%2F%2Fbaike.baidu.com%2Fitem%2F%25E5%258C%25BF%25E5%2590%258D%25E5%2587%25BD%25E6%2595%25B0%2F4337265",target:"_blank",rel:"noopener noreferrer"}},[t._v("匿名函数"),a("OutboundLink")],1),t._v("，Lambda表达式基于数学中的"),a("a",{attrs:{href:"https://link.juejin.cn?target=https%3A%2F%2Fbaike.baidu.com%2Fitem%2F%25CE%25BB%25E6%25BC%2594%25E7%25AE%2597",target:"_blank",rel:"noopener noreferrer"}},[t._v("λ演算"),a("OutboundLink")],1),t._v("得名，直接对应于其中的lambda抽象，是一个匿名函数，即没有函数名的函数。Lambda表达式可以表示闭包。")])]),t._v(" "),a("p",[t._v("在 Java 中，Lambda 表达式的格式是像下面这样")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('// 无参数，无返回值\n() -> log.info("Lambda")\n\n // 有参数，有返回值\n(int a, int b) -> { a+b }\n')])])]),a("p",[t._v("其等价于")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('log.info("Lambda");\n\nprivate int plus(int a, int b){\n   return a+b;\n}\n')])])]),a("p",[t._v("最常见的一个例子就是新建线程，有时候为了省事，会用下面的方法创建并启动一个线程，这是匿名内部类的写法，"),a("code",[t._v("new Thread")]),t._v("需要一个 implements 自"),a("code",[t._v("Runnable")]),t._v("类型的对象实例作为参数，比较好的方式是创建一个新类，这个类 "),a("code",[t._v("implements Runnable")]),t._v("，然后 new 出这个新类的实例作为参数传给 Thread。而匿名内部类不用找对象接收，直接当做参数。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('new Thread(new Runnable() {\n    @Override\n    public void run() {\n        System.out.println("快速新建并启动一个线程");\n    }\n}).start();\n')])])]),a("p",[t._v("但是这样写是不是感觉看上去很乱、很土，而这时候，换上 Lambda 表达式就是另外一种感觉了。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('new Thread(()->{\n    System.out.println("快速新建并启动一个线程");\n}).start();\n')])])]),a("p",[t._v("怎么样，这样一改，瞬间感觉清新脱俗了不少，简洁优雅了不少。")]),t._v(" "),a("p",[t._v("Lambda 表达式简化了匿名内部类的形式，可以达到同样的效果，但是 Lambda 要优雅的多。虽然最终达到的目的是一样的，但其实内部的实现原理却不相同。")]),t._v(" "),a("p",[t._v("匿名内部类在编译之后会创建一个新的匿名内部类出来，而 Lambda 是调用 JVM "),a("code",[t._v("invokedynamic")]),t._v("指令实现的，并不会产生新类。")]),t._v(" "),a("h2",{attrs:{id:"方法引用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#方法引用"}},[t._v("#")]),t._v(" 方法引用")]),t._v(" "),a("p",[t._v("方法引用的出现，使得我们可以将一个方法赋给一个变量或者作为参数传递给另外一个方法。"),a("code",[t._v("::")]),t._v("双冒号作为方法引用的符号，比如下面这两行语句，引用 "),a("code",[t._v("Integer")]),t._v("类的 "),a("code",[t._v("parseInt")]),t._v("方法。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('Function<String, Integer> s = Integer::parseInt;\nInteger i = s.apply("10");\n')])])]),a("p",[t._v("或者下面这两行，引用 "),a("code",[t._v("Integer")]),t._v("类的 "),a("code",[t._v("compare")]),t._v("方法。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("Comparator<Integer> comparator = Integer::compare;\nint result = comparator.compare(100,10);\n")])])]),a("p",[t._v("再比如，下面这两行代码，同样是引用 "),a("code",[t._v("Integer")]),t._v("类的 "),a("code",[t._v("compare")]),t._v("方法，但是返回类型却不一样，但却都能正常执行，并正确返回。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("IntBinaryOperator intBinaryOperator = Integer::compare;\nint result = intBinaryOperator.applyAsInt(10,100);\n")])])]),a("p",[t._v("相信有的同学看到这里恐怕是下面这个状态，完全不可理喻吗，也太随便了吧，返回给谁都能接盘。")]),t._v(" "),a("p",[t._v("先别激动，来来来，现在咱们就来解惑，解除蒙圈脸。")]),t._v(" "),a("p",[a("strong",[t._v("Q：什么样的方法可以被引用？")])]),t._v(" "),a("p",[t._v("A：这么说吧，任何你有办法访问到的方法都可以被引用。")]),t._v(" "),a("p",[a("strong",[t._v("Q：返回值到底是什么类型？")])]),t._v(" "),a("p",[t._v("A：这就问到点儿上了，上面又是 "),a("code",[t._v("Function")]),t._v("、又是"),a("code",[t._v("Comparator")]),t._v("、又是 "),a("code",[t._v("IntBinaryOperator")]),t._v("的，看上去好像没有规律，其实不然。")]),t._v(" "),a("p",[t._v("返回的类型是 Java 8 专门定义的函数式接口，这类接口用 "),a("code",[t._v("@FunctionalInterface")]),t._v(" 注解。")]),t._v(" "),a("p",[t._v("比如 "),a("code",[t._v("Function")]),t._v("这个函数式接口的定义如下：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("@FunctionalInterface\npublic interface Function<T, R> {\n    R apply(T t);\n}\n")])])]),a("p",[t._v("还有很关键的一点，你的引用方法的参数个数、类型，返回值类型要和函数式接口中的方法声明一一对应才行。")]),t._v(" "),a("p",[t._v("比如 "),a("code",[t._v("Integer.parseInt")]),t._v("方法定义如下：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("public static int parseInt(String s) throws NumberFormatException {\n    return parseInt(s,10);\n}\n\n")])])]),a("p",[t._v("首先"),a("code",[t._v("parseInt")]),t._v("方法的参数个数是 1 个，而 "),a("code",[t._v("Function")]),t._v("中的 "),a("code",[t._v("apply")]),t._v("方法参数个数也是 1 个，参数个数对应上了，再来，"),a("code",[t._v("apply")]),t._v("方法的参数类型和返回类型是泛型类型，所以肯定能和 "),a("code",[t._v("parseInt")]),t._v("方法对应上。")]),t._v(" "),a("p",[t._v("这样一来，就可以正确的接收"),a("code",[t._v("Integer::parseInt")]),t._v("的方法引用，并可以调用"),a("code",[t._v("Funciton")]),t._v("的"),a("code",[t._v("apply")]),t._v("方法，这时候，调用到的其实就是对应的 "),a("code",[t._v("Integer.parseInt")]),t._v("方法了。")]),t._v(" "),a("p",[t._v("用这套标准套到 "),a("code",[t._v("Integer::compare")]),t._v("方法上，就不难理解为什么即可以用 "),a("code",[t._v("Comparator<Integer>")]),t._v("接收，又可以用 "),a("code",[t._v("IntBinaryOperator")]),t._v("接收了，而且调用它们各自的方法都能正确的返回结果。")]),t._v(" "),a("p",[a("code",[t._v("Integer.compare")]),t._v("方法定义如下：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("public static int compare(int x, int y) {\n    return (x < y) ? -1 : ((x == y) ? 0 : 1);\n}\n")])])]),a("p",[t._v("返回值类型 "),a("code",[t._v("int")]),t._v("，两个参数，并且参数类型都是 "),a("code",[t._v("int")]),t._v("。")]),t._v(" "),a("p",[t._v("然后来看"),a("code",[t._v("Comparator")]),t._v("和"),a("code",[t._v("IntBinaryOperator")]),t._v("它们两个的函数式接口定义和其中对应的方法：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("@FunctionalInterface\npublic interface Comparator<T> {\n    int compare(T o1, T o2);\n}\n\n@FunctionalInterface\npublic interface IntBinaryOperator {\n    int applyAsInt(int left, int right);\n}\n")])])]),a("p",[t._v("对不对，都能正确的匹配上，所以前面示例中用这两个函数式接口都能正常接收。其实不止这两个，只要是在某个函数式接口中声明了这样的方法：两个参数，参数类型是 "),a("code",[t._v("int")]),t._v("或者泛型，并且返回值是 "),a("code",[t._v("int")]),t._v("或者泛型的，都可以完美接收。")]),t._v(" "),a("p",[t._v("JDK 中定义了很多函数式接口，主要在 "),a("code",[t._v("java.util.function")]),t._v("包下，还有 "),a("code",[t._v("java.util.Comparator")]),t._v(" 专门用作定制比较器。另外，前面说的 "),a("code",[t._v("Runnable")]),t._v("也是一个函数式接口。")]),t._v(" "),a("h2",{attrs:{id:"自己动手实现一个例子"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#自己动手实现一个例子"}},[t._v("#")]),t._v(" 自己动手实现一个例子")]),t._v(" "),a("p",[a("strong",[t._v("1. 定义一个函数式接口，并添加一个方法")])]),t._v(" "),a("p",[t._v("定义了名称为 KiteFunction 的函数式接口，使用 "),a("code",[t._v("@FunctionalInterface")]),t._v("注解，然后声明了具有两个参数的方法 "),a("code",[t._v("run")]),t._v("，都是泛型类型，返回结果也是泛型。")]),t._v(" "),a("p",[t._v("还有一点很重要，函数式接口中只能声明一个可被实现的方法，你不能声明了一个 "),a("code",[t._v("run")]),t._v("方法，又声明一个 "),a("code",[t._v("start")]),t._v("方法，到时候编译器就不知道用哪个接收了。而用"),a("code",[t._v("default")]),t._v(" 关键字修饰的方法则没有影响。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("@FunctionalInterface\npublic interface KiteFunction<T, R, S> {\n\n    /**\n     * 定义一个双参数的方法\n     * @param t\n     * @param s\n     * @return\n     */\n    R run(T t,S s);\n}\n")])])]),a("p",[a("strong",[t._v("2. 定义一个与 KiteFunction 中 run 方法对应的方法")])]),t._v(" "),a("p",[t._v("在 FunctionTest 类中定义了方法 "),a("code",[t._v("DateFormat")]),t._v("，一个将 "),a("code",[t._v("LocalDateTime")]),t._v("类型格式化为字符串类型的方法。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("public class FunctionTest {\n    public static String DateFormat(LocalDateTime dateTime, String partten) {\n        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(partten);\n        return dateTime.format(dateTimeFormatter);\n    }\n}\n")])])]),a("p",[a("strong",[t._v("3.用方法引用的方式调用")])]),t._v(" "),a("p",[t._v("正常情况下我们直接使用 "),a("code",[t._v("FunctionTest.DateFormat()")]),t._v("就可以了。")]),t._v(" "),a("p",[t._v("而用函数式方式，是这样的。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('KiteFunction<LocalDateTime,String,String> functionDateFormat = FunctionTest::DateFormat;\nString dateString = functionDateFormat.run(LocalDateTime.now(),"yyyy-MM-dd HH:mm:ss");\n')])])]),a("p",[t._v("而其实我可以不专门在外面定义 "),a("code",[t._v("DateFormat")]),t._v("这个方法，而是像下面这样，使用匿名内部类。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('public static void main(String[] args) throws Exception {\n  \n    String dateString = new KiteFunction<LocalDateTime, String, String>() {\n        @Override\n        public String run(LocalDateTime localDateTime, String s) {\n            DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(s);\n            return localDateTime.format(dateTimeFormatter);\n        }\n    }.run(LocalDateTime.now(), "yyyy-MM-dd HH:mm:ss");\n    System.out.println(dateString);\n}\n\n')])])]),a("p",[t._v("前面第一个 "),a("code",[t._v("Runnable")]),t._v("的例子也提到了，这样的匿名内部类可以用 Lambda 表达式的形式简写，简写后的代码如下：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('public static void main(String[] args) throws Exception {\n\n        KiteFunction<LocalDateTime, String, String> functionDateFormat = (LocalDateTime dateTime, String partten) -> {\n            DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(partten);\n            return dateTime.format(dateTimeFormatter);\n        };\n        String dateString = functionDateFormat.run(LocalDateTime.now(), "yyyy-MM-dd HH:mm:ss");\n        System.out.println(dateString);\n}\n')])])]),a("p",[t._v("使用（LocalDateTime dateTime, String partten) -> { } 这样的 Lambda 表达式直接返回方法引用。")]),t._v(" "),a("h2",{attrs:{id:"stream-api"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#stream-api"}},[t._v("#")]),t._v(" Stream API")]),t._v(" "),a("p",[t._v("为了说一下 Stream API 的使用，可以说是大费周章啊，知其然，也要知其所以然吗，追求技术的态度和姿势要正确。")]),t._v(" "),a("p",[t._v("当然 Stream 也不只是 Lambda 表达式就厉害了，真正厉害的还是它的功能，Stream 是 Java 8 中集合数据处理的利器，很多本来复杂、需要写很多代码的方法，比如过滤、分组等操作，往往使用 Stream 就可以在一行代码搞定，当然也因为 Stream 都是链式操作，一行代码可能会调用好几个方法。")]),t._v(" "),a("p",[a("code",[t._v("Collection")]),t._v("接口提供了 "),a("code",[t._v("stream()")]),t._v("方法，让我们可以在一个集合方便的使用 Stream API 来进行各种操作。值得注意的是，我们执行的任何操作都不会对源集合造成影响，你可以同时在一个集合上提取出多个 stream 进行操作。")]),t._v(" "),a("p",[t._v("我们看 Stream 接口的定义，继承自 "),a("code",[t._v("BaseStream")]),t._v("，机会所有的接口声明都是接收方法引用类型的参数，比如 "),a("code",[t._v("filter")]),t._v("方法，接收了一个 "),a("code",[t._v("Predicate")]),t._v("类型的参数，它就是一个函数式接口，常用来作为条件比较、筛选、过滤用，"),a("code",[t._v("JPA")]),t._v("中也使用了这个函数式接口用来做查询条件拼接。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("public interface Stream<T> extends BaseStream<T, Stream<T>> {\n  \n  Stream<T> filter(Predicate<? super T> predicate);\n  \n  // 其他接口\n}  \n")])])]),a("p",[t._v("下面就来看看 Stream 常用 API。")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master//img/agyrz-pqm57.png",alt:"img"}})]),t._v(" "),a("h3",{attrs:{id:"of"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#of"}},[t._v("#")]),t._v(" of")]),t._v(" "),a("p",[t._v("可接收一个泛型对象或可变成泛型集合，构造一个 Stream 对象。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('private static void createStream(){\n    Stream<String> stringStream = Stream.of("a","b","c");\n}\n')])])]),a("h3",{attrs:{id:"empty"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#empty"}},[t._v("#")]),t._v(" empty")]),t._v(" "),a("p",[t._v("创建一个空的  Stream 对象。")]),t._v(" "),a("h3",{attrs:{id:"concat"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#concat"}},[t._v("#")]),t._v(" concat")]),t._v(" "),a("p",[t._v("连接两个 Stream ，不改变其中任何一个 Steam 对象，返回一个新的 Stream 对象。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('private static void concatStream(){\n    Stream<String> a = Stream.of("a","b","c");\n    Stream<String> b = Stream.of("d","e");\n    Stream<String> c = Stream.concat(a,b);\n}\n')])])]),a("h3",{attrs:{id:"max"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#max"}},[t._v("#")]),t._v(" max")]),t._v(" "),a("p",[t._v("一般用于求数字集合中的最大值，或者按实体中数字类型的属性比较，拥有最大值的那个实体。它接收一个 "),a("code",[t._v("Comparator<T>")]),t._v("，上面也举到这个例子了，它是一个函数式接口类型，专门用作定义两个对象之间的比较，例如下面这个方法使用了 "),a("code",[t._v("Integer::compareTo")]),t._v("这个方法引用。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("private static void max(){\n    Stream<Integer> integerStream = Stream.of(2, 2, 100, 5);\n    Integer max = integerStream.max(Integer::compareTo).get();\n    System.out.println(max);\n}\n")])])]),a("p",[t._v("当然，我们也可以自己定制一个 "),a("code",[t._v("Comparator")]),t._v("，顺便复习一下 Lambda 表达式形式的方法引用。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("private static void max(){\n    Stream<Integer> integerStream = Stream.of(2, 2, 100, 5);\n    Comparator<Integer> comparator =  (x, y) -> (x.intValue() < y.intValue()) ? -1 : ((x.equals(y)) ? 0 : 1);\n    Integer max = integerStream.max(comparator).get();\n    System.out.println(max);\n}\n")])])]),a("h3",{attrs:{id:"min"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#min"}},[t._v("#")]),t._v(" min")]),t._v(" "),a("p",[t._v("与 max 用法一样，只不过是求最小值。")]),t._v(" "),a("h3",{attrs:{id:"findfirst"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#findfirst"}},[t._v("#")]),t._v(" findFirst")]),t._v(" "),a("p",[t._v("获取 Stream 中的第一个元素。")]),t._v(" "),a("h3",{attrs:{id:"findany"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#findany"}},[t._v("#")]),t._v(" findAny")]),t._v(" "),a("p",[t._v("获取 Stream 中的某个元素，如果是串行情况下，一般都会返回第一个元素，并行情况下就不一定了。")]),t._v(" "),a("h3",{attrs:{id:"count"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#count"}},[t._v("#")]),t._v(" count")]),t._v(" "),a("p",[t._v("返回元素个数。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('Stream<String> a = Stream.of("a", "b", "c");\nlong x = a.count();\n')])])]),a("h3",{attrs:{id:"peek"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#peek"}},[t._v("#")]),t._v(" peek")]),t._v(" "),a("p",[t._v("建立一个通道，在这个通道中对 Stream 的每个元素执行对应的操作，对应 "),a("code",[t._v("Consumer<T>")]),t._v("的函数式接口，这是一个消费者函数式接口，顾名思义，它是用来消费 Stream 元素的，比如下面这个方法，把每个元素转换成对应的大写字母并输出。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('private static void peek() {\n    Stream<String> a = Stream.of("a", "b", "c");\n    List<String> list = a.peek(e->System.out.println(e.toUpperCase())).collect(Collectors.toList());\n}\n')])])]),a("h3",{attrs:{id:"foreach"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#foreach"}},[t._v("#")]),t._v(" forEach")]),t._v(" "),a("p",[t._v("和 peek 方法类似，都接收一个消费者函数式接口，可以对每个元素进行对应的操作，但是和 peek 不同的是，"),a("code",[t._v("forEach")]),t._v(" 执行之后，这个 Stream 就真的被消费掉了，之后这个 Stream 流就没有了，不可以再对它进行后续操作了，而 "),a("code",[t._v("peek")]),t._v("操作完之后，还是一个可操作的 Stream 对象。")]),t._v(" "),a("p",[t._v("正好借着这个说一下，我们在使用 Stream API 的时候，都是一串链式操作，这是因为很多方法，比如接下来要说到的 "),a("code",[t._v("filter")]),t._v("方法等，返回值还是这个 Stream 类型的，也就是被当前方法处理过的 Stream 对象，所以 Stream API 仍然可以使用。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('private static void forEach() {\n    Stream<String> a = Stream.of("a", "b", "c");\n    a.forEach(e->System.out.println(e.toUpperCase()));\n}\n')])])]),a("h3",{attrs:{id:"foreachordered"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#foreachordered"}},[t._v("#")]),t._v(" forEachOrdered")]),t._v(" "),a("p",[t._v("功能与 "),a("code",[t._v("forEach")]),t._v("是一样的，不同的是，"),a("code",[t._v("forEachOrdered")]),t._v("是有顺序保证的，也就是对 Stream 中元素按插入时的顺序进行消费。为什么这么说呢，当开启并行的时候，"),a("code",[t._v("forEach")]),t._v("和 "),a("code",[t._v("forEachOrdered")]),t._v("的效果就不一样了。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('Stream<String> a = Stream.of("a", "b", "c");\na.parallel().forEach(e->System.out.println(e.toUpperCase()));\n')])])]),a("p",[t._v("当使用上面的代码时，输出的结果可能是 B、A、C 或者 A、C、B或者A、B、C，而使用下面的代码，则每次都是 A、 B、C")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('Stream<String> a = Stream.of("a", "b", "c");\na.parallel().forEachOrdered(e->System.out.println(e.toUpperCase()));\n')])])]),a("h3",{attrs:{id:"limit"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#limit"}},[t._v("#")]),t._v(" limit")]),t._v(" "),a("p",[t._v("获取前 n 条数据，类似于 MySQL 的limit，只不过只能接收一个参数，就是数据条数。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('private static void limit() {\n    Stream<String> a = Stream.of("a", "b", "c");\n    a.limit(2).forEach(e->System.out.println(e));\n}\n')])])]),a("p",[t._v("上述代码打印的结果是 a、b。")]),t._v(" "),a("h3",{attrs:{id:"skip"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#skip"}},[t._v("#")]),t._v(" skip")]),t._v(" "),a("p",[t._v("跳过前 n 条数据，例如下面代码，返回结果是 c。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('private static void skip() {\n    Stream<String> a = Stream.of("a", "b", "c");\n    a.skip(2).forEach(e->System.out.println(e));\n}\n')])])]),a("h3",{attrs:{id:"distinct"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#distinct"}},[t._v("#")]),t._v(" distinct")]),t._v(" "),a("p",[t._v("元素去重，例如下面方法返回元素是 a、b、c，将重复的 b 只保留了一个。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('private static void distinct() {\n    Stream<String> a = Stream.of("a", "b", "c","b");\n    a.distinct().forEach(e->System.out.println(e));\n}\n')])])]),a("h3",{attrs:{id:"sorted"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#sorted"}},[t._v("#")]),t._v(" sorted")]),t._v(" "),a("p",[t._v("有两个重载，一个无参数，另外一个有个 "),a("code",[t._v("Comparator")]),t._v("类型的参数。")]),t._v(" "),a("p",[t._v("无参类型的按照自然顺序进行排序，只适合比较单纯的元素，比如数字、字母等。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('private static void sorted() {\n    Stream<String> a = Stream.of("a", "c", "b");\n    a.sorted().forEach(e->System.out.println(e));\n}\n')])])]),a("p",[t._v("有参数的需要自定义排序规则，例如下面这个方法，按照第二个字母的大小顺序排序，最后输出的结果是 a1、b3、c6。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('private static void sortedWithComparator() {\n    Stream<String> a = Stream.of("a1", "c6", "b3");\n    a.sorted((x,y)->Integer.parseInt(x.substring(1))>Integer.parseInt(y.substring(1))?1:-1).forEach(e->System.out.println(e));\n}\n')])])]),a("p",[a("strong",[t._v("为了更好的说明接下来的几个 API ，我模拟了几条项目中经常用到的类似数据，10条用户信息。")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('private static List<User> getUserData() {\n    Random random = new Random();\n    List<User> users = new ArrayList<>();\n    for (int i = 1; i <= 10; i++) {\n        User user = new User();\n        user.setUserId(i);\n        user.setUserName(String.format("古时的风筝 %s 号", i));\n        user.setAge(random.nextInt(100));\n        user.setGender(i % 2);\n        user.setPhone("18812021111");\n        user.setAddress("无");\n        users.add(user);\n    }\n    return users;\n}\n')])])]),a("h3",{attrs:{id:"filter"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#filter"}},[t._v("#")]),t._v(" filter")]),t._v(" "),a("p",[t._v("用于条件筛选过滤，筛选出符合条件的数据。例如下面这个方法，筛选出性别为 0，年龄大于 50 的记录。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("private static void filter(){\n    List<User> users = getUserData();\n    Stream<User> stream = users.stream();\n    stream.filter(user -> user.getGender().equals(0) && user.getAge()>50).forEach(e->System.out.println(e));\n\n    /**\n     *等同于下面这种形式 匿名内部类\n     */\n//    stream.filter(new Predicate<User>() {\n//        @Override\n//        public boolean test(User user) {\n//            return user.getGender().equals(0) && user.getAge()>50;\n//        }\n//    }).forEach(e->System.out.println(e));\n}\n")])])]),a("h3",{attrs:{id:"map"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#map"}},[t._v("#")]),t._v(" map")]),t._v(" "),a("p",[a("code",[t._v("map")]),t._v("方法的接口方法声明如下，接受一个 "),a("code",[t._v("Function")]),t._v("函数式接口，把它翻译成映射最合适了，通过原始数据元素，映射出新的类型。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("<R> Stream<R> map(Function<? super T, ? extends R> mapper);\n")])])]),a("p",[t._v("而 "),a("code",[t._v("Function")]),t._v("的声明是这样的，观察 "),a("code",[t._v("apply")]),t._v("方法，接受一个 T 型参数，返回一个 R 型参数。用于将一个类型转换成另外一个类型正合适，这也是 "),a("code",[t._v("map")]),t._v("的初衷所在，用于改变当前元素的类型，例如将 "),a("code",[t._v("Integer")]),t._v(" 转为 "),a("code",[t._v("String")]),t._v("类型，将 DAO 实体类型，转换为 DTO 实例类型。")]),t._v(" "),a("p",[t._v("当然了，T 和 R 的类型也可以一样，这样的话，就和 "),a("code",[t._v("peek")]),t._v("方法没什么不同了。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("@FunctionalInterface\npublic interface Function<T, R> {\n\n    /**\n     * Applies this function to the given argument.\n     *\n     * @param t the function argument\n     * @return the function result\n     */\n    R apply(T t);\n}\n")])])]),a("p",[t._v("例如下面这个方法，应该是业务系统的常用需求，将 User 转换为 API 输出的数据格式。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("private static void map(){\n    List<User> users = getUserData();\n    Stream<User> stream = users.stream();\n    List<UserDto> userDtos = stream.map(user -> dao2Dto(user)).collect(Collectors.toList());\n}\n\nprivate static UserDto dao2Dto(User user){\n    UserDto dto = new UserDto();\n    BeanUtils.copyProperties(user, dto);\n    //其他额外处理\n    return dto;\n}\n")])])]),a("h3",{attrs:{id:"maptoint"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#maptoint"}},[t._v("#")]),t._v(" mapToInt")]),t._v(" "),a("p",[t._v("将元素转换成 int 类型，在 "),a("code",[t._v("map")]),t._v("方法的基础上进行封装。")]),t._v(" "),a("h3",{attrs:{id:"maptolong"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#maptolong"}},[t._v("#")]),t._v(" mapToLong")]),t._v(" "),a("p",[t._v("将元素转换成 Long 类型，在 "),a("code",[t._v("map")]),t._v("方法的基础上进行封装。")]),t._v(" "),a("h3",{attrs:{id:"maptodouble"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#maptodouble"}},[t._v("#")]),t._v(" mapToDouble")]),t._v(" "),a("p",[t._v("将元素转换成 Double 类型，在 "),a("code",[t._v("map")]),t._v("方法的基础上进行封装。")]),t._v(" "),a("h3",{attrs:{id:"flatmap"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#flatmap"}},[t._v("#")]),t._v(" flatMap")]),t._v(" "),a("p",[t._v("这是用在一些比较特别的场景下，当你的 Stream 是以下这几种结构的时候，需要用到 "),a("code",[t._v("flatMap")]),t._v("方法，用于将原有二维结构扁平化。")]),t._v(" "),a("ol",[a("li",[a("code",[t._v("Stream<String[]>")])]),t._v(" "),a("li",[a("code",[t._v("Stream<Set<String>>")])]),t._v(" "),a("li",[a("code",[t._v("Stream<List<String>>")])])]),t._v(" "),a("p",[t._v("以上这三类结构，通过 "),a("code",[t._v("flatMap")]),t._v("方法，可以将结果转化为 "),a("code",[t._v("Stream<String>")]),t._v("这种形式，方便之后的其他操作。")]),t._v(" "),a("p",[t._v("比如下面这个方法，将"),a("code",[t._v("List<List<User>>")]),t._v("扁平处理，然后再使用 "),a("code",[t._v("map")]),t._v("或其他方法进行操作。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("private static void flatMap(){\n    List<User> users = getUserData();\n    List<User> users1 = getUserData();\n    List<List<User>> userList = new ArrayList<>();\n    userList.add(users);\n    userList.add(users1);\n    Stream<List<User>> stream = userList.stream();\n    List<UserDto> userDtos = stream.flatMap(subUserList->subUserList.stream()).map(user -> dao2Dto(user)).collect(Collectors.toList());\n}\n")])])]),a("h3",{attrs:{id:"flatmaptoint"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#flatmaptoint"}},[t._v("#")]),t._v(" flatMapToInt")]),t._v(" "),a("p",[t._v("用法参考 "),a("code",[t._v("flatMap")]),t._v("，将元素扁平为 int 类型，在 "),a("code",[t._v("flatMap")]),t._v("方法的基础上进行封装。")]),t._v(" "),a("h3",{attrs:{id:"flatmaptolong"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#flatmaptolong"}},[t._v("#")]),t._v(" flatMapToLong")]),t._v(" "),a("p",[t._v("用法参考 "),a("code",[t._v("flatMap")]),t._v("，将元素扁平为 Long 类型，在 "),a("code",[t._v("flatMap")]),t._v("方法的基础上进行封装。")]),t._v(" "),a("h3",{attrs:{id:"flatmaptodouble"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#flatmaptodouble"}},[t._v("#")]),t._v(" flatMapToDouble")]),t._v(" "),a("p",[t._v("用法参考 "),a("code",[t._v("flatMap")]),t._v("，将元素扁平为 Double 类型，在 "),a("code",[t._v("flatMap")]),t._v("方法的基础上进行封装。")]),t._v(" "),a("h3",{attrs:{id:"collection"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#collection"}},[t._v("#")]),t._v(" collection")]),t._v(" "),a("p",[t._v("在进行了一系列操作之后，我们最终的结果大多数时候并不是为了获取 Stream 类型的数据，而是要把结果变为 List、Map 这样的常用数据结构，而 "),a("code",[t._v("collection")]),t._v("就是为了实现这个目的。")]),t._v(" "),a("p",[t._v("就拿 map 方法的那个例子说明，将对象类型进行转换后，最终我们需要的结果集是一个 "),a("code",[t._v("List<UserDto >")]),t._v("类型的，使用 "),a("code",[t._v("collect")]),t._v("方法将 Stream 转换为我们需要的类型。")]),t._v(" "),a("p",[t._v("下面是 "),a("code",[t._v("collect")]),t._v("接口方法的定义：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("<R, A> R collect(Collector<? super T, A, R> collector);\n")])])]),a("p",[t._v("下面这个例子演示了将一个简单的 Integer Stream 过滤出大于 7 的值，然后转换成 "),a("code",[t._v("List<Integer>")]),t._v("集合，用的是 "),a("code",[t._v("Collectors.toList()")]),t._v("这个收集器。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("private static void collect(){\n    Stream<Integer> integerStream = Stream.of(1,2,5,7,8,12,33);\n    List<Integer> list = integerStream.filter(s -> s.intValue()>7).collect(Collectors.toList());\n}\n")])])]),a("p",[t._v("很多同学表示看不太懂这个 "),a("code",[t._v("Collector")]),t._v("是怎么一个意思，来，我们看下面这段代码，这是 "),a("code",[t._v("collect")]),t._v("的另一个重载方法，你可以理解为它的参数是按顺序执行的，这样就清楚了，这就是个 ArrayList 从创建到调用 "),a("code",[t._v("addAll")]),t._v("方法的一个过程。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("private static void collect(){\n    Stream<Integer> integerStream = Stream.of(1,2,5,7,8,12,33);\n    List<Integer> list = integerStream.filter(s -> s.intValue()>7).collect(ArrayList::new, ArrayList::add,\n            ArrayList::addAll);\n}\n")])])]),a("p",[t._v("我们在自定义 "),a("code",[t._v("Collector")]),t._v("的时候其实也是这个逻辑，不过我们根本不用自定义， "),a("code",[t._v("Collectors")]),t._v("已经为我们提供了很多拿来即用的收集器。比如我们经常用到"),a("code",[t._v("Collectors.toList()")]),t._v("、"),a("code",[t._v("Collectors.toSet()")]),t._v("、"),a("code",[t._v("Collectors.toMap()")]),t._v("。另外还有比如"),a("code",[t._v("Collectors.groupingBy()")]),t._v("用来分组，比如下面这个例子，按照 userId 字段分组，返回以 userId 为key，List 为value 的 Map，或者返回每个 key 的个数。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("// 返回 userId:List<User>\nMap<String,List<User>> map = user.stream().collect(Collectors.groupingBy(User::getUserId));\n\n// 返回 userId:每组个数\nMap<String,Long> map = user.stream().collect(Collectors.groupingBy(User::getUserId,Collectors.counting()));\n")])])]),a("h3",{attrs:{id:"toarray"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#toarray"}},[t._v("#")]),t._v(" toArray")]),t._v(" "),a("p",[a("code",[t._v("collection")]),t._v("是返回列表、map 等，"),a("code",[t._v("toArray")]),t._v("是返回数组，有两个重载，一个空参数，返回的是 "),a("code",[t._v("Object[]")]),t._v("。")]),t._v(" "),a("p",[t._v("另一个接收一个 "),a("code",[t._v("IntFunction<R>")]),t._v("类型参数。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("@FunctionalInterface\npublic interface IntFunction<R> {\n\n    /**\n     * Applies this function to the given argument.\n     *\n     * @param value the function argument\n     * @return the function result\n     */\n    R apply(int value);\n}\n")])])]),a("p",[t._v("比如像下面这样使用，参数是 "),a("code",[t._v("User[]::new")]),t._v("也就是new 一个 User 数组，长度为最后的 Stream 长度。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("private static void toArray() {\n    List<User> users = getUserData();\n    Stream<User> stream = users.stream();\n    User[] userArray = stream.filter(user -> user.getGender().equals(0) && user.getAge() > 50).toArray(User[]::new);\n}\n")])])]),a("h3",{attrs:{id:"reduce"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#reduce"}},[t._v("#")]),t._v(" reduce")]),t._v(" "),a("p",[t._v("它的作用是每次计算的时候都用到上一次的计算结果，比如求和操作，前两个数的和加上第三个数的和，再加上第四个数，一直加到最后一个数位置，最后返回结果，就是 "),a("code",[t._v("reduce")]),t._v("的工作过程。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("private static void reduce(){\n    Stream<Integer> integerStream = Stream.of(1,2,5,7,8,12,33);\n    Integer sum = integerStream.reduce(0,(x,y)->x+y);\n    System.out.println(sum);\n}\n")])])]),a("p",[t._v("另外 "),a("code",[t._v("Collectors")]),t._v("好多方法都用到了 "),a("code",[t._v("reduce")]),t._v("，比如 "),a("code",[t._v("groupingBy")]),t._v("、"),a("code",[t._v("minBy")]),t._v("、"),a("code",[t._v("maxBy")]),t._v("等等。")]),t._v(" "),a("h2",{attrs:{id:"并行-stream"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#并行-stream"}},[t._v("#")]),t._v(" 并行 Stream")]),t._v(" "),a("p",[t._v("Stream 本质上来说就是用来做数据处理的，为了加快处理速度，Stream API 提供了并行处理 Stream 的方式。通过 "),a("code",[t._v("users.parallelStream()")]),t._v("或者"),a("code",[t._v("users.stream().parallel()")]),t._v(" 的方式来创建并行 Stream 对象，支持的 API 和普通 Stream 几乎是一致的。")]),t._v(" "),a("p",[t._v("并行 Stream 默认使用 "),a("code",[t._v("ForkJoinPool")]),t._v("线程池，当然也支持自定义，不过一般情况下没有必要。ForkJoin 框架的分治策略与并行流处理正好契合。")]),t._v(" "),a("p",[t._v("虽然并行这个词听上去很厉害，但并不是所有情况使用并行流都是正确的，很多时候完全没这个必要。")]),t._v(" "),a("p",[a("strong",[t._v("什么情况下使用或不应使用并行流操作呢？")])]),t._v(" "),a("ol",[a("li",[t._v("必须在多核 CPU 下才使用并行 Stream，听上去好像是废话。")]),t._v(" "),a("li",[t._v("在数据量不大的情况下使用普通串行 Stream 就可以了，使用并行 Stream 对性能影响不大。")]),t._v(" "),a("li",[t._v("CPU 密集型计算适合使用并行 Stream，而 IO 密集型使用并行 Stream 反而会更慢。")]),t._v(" "),a("li",[t._v("虽然计算是并行的可能很快，但最后大多数时候还是要使用 "),a("code",[t._v("collect")]),t._v("合并的，如果合并代价很大，也不适合用并行 Stream。")]),t._v(" "),a("li",[t._v("有些操作，比如 limit、 findFirst、forEachOrdered 等依赖于元素顺序的操作，都不适合用并行 Stream。")])])])}),[],!1,null,null,null);e.default=s.exports}}]);