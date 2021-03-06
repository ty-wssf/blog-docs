# Java 面试题（一）的1~20题答案

### 1、面向对象的特征有哪些方面？

**面向对象的特征主要有以下几个方面：**

**抽象：** 抽象是将一类对象的共同特征总结出来构造类的过程，包括数据抽象和行为抽象两方面。抽象只关注对象有哪些属性和行为，并不关注这些行为的细节是什么。

**继承：** 继承是从已有类得到继承信息创建新类的过程。提供继承信息的类被称为父类（超类、基类）；得到继承信息的类被称为子类（派生类）。继承让变化中的软件系统有了一定的延续性，同时继承也是封装程序中可变因素的重要手段（如果不能理解请阅读阎宏博士的《Java 与模式》或《设计模式精解》中关于桥梁模式的部分）。

**封装：** 通常认为封装是把数据和操作数据的方法绑定起来，对数据的访问只能通过已定义的接口。面向对象的本质就是将现实世界描绘成一系列完全自治、封闭的对象。我们在类中编写的方法就是对实现细节的一种封装；我们编写一个类就是对数据和数据操作的封装。可以说，封装就是隐藏一切可隐藏的东西，只向外界提供最简单的编程接口（可以想想普通洗衣机和全自动洗衣机的差别，明显全自动洗衣机封装更好因此操作起来更简单；我们现在使用的智能手机也是封装得足够好的，因为几个按键就搞定了所有的事情）。

**多态性：** 多态性是指允许不同子类型的对象对同一消息作出不同的响应。简单的说就是用同样的对象引用调用同样的方法但是做了不同的事情。多态性分为编译时的多态性和运行时的多态性。如果将对象的方法视为对象向外界提供的服务，那么运行时的多态性可以解释为：当 A 系统访问 B 系统提供的服务时，B系统有多种提供服务的方式，但一切对 A 系统来说都是透明的（就像电动剃须刀是 A 系统，它的供电系统是 B 系统，B 系统可以使用电池供电或者用交流电，甚至还有可能是太阳能，A 系统只会通过 B 类对象调用供电的方法，但并不知道供电系统的底层实现是什么，究竟通过何种方式获得了动力）。方法重载（overload）实现的是编译时的多态性（也称为前绑定），而方法重写（override）实现的是运行时的多态性（也称为后绑定）。运行时的多态是面向对象最精髓的东西，要实现多态需要做两件事：

1). 方法重写（子类继承父类并重写父类中已有的或抽象的方法）； 

2). 对象造型（用父类型引用引用子类型对象，这样同样的引用调用同样的方法就会根据子类对象的不同而表现出不同的行为）。

### 2、 访问修饰符 public,private,protected,以及不写（默认）时的区别？

修饰符 当前类 同 包 子 类 其他包

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/5/16ed5486fab6aaa5~tplv-t2oaga2asx-watermark.awebp)

类的成员不写访问修饰时默认为 default。默认对于同一个包中的其他类相当于公开（public），对于不是同一个包中的其他类相当于私有（private）。受保护（protected）对子类相当于公开，对不是同一包中的没有父子关系的类相当于私有。Java 中，外部类的修饰符只能是 public 或默认，类的成员（包括内部类）的修饰符可以是以上四种

### 3.、String 是最基本的数据类型吗？

不是。Java 中的基本数据类型只有 8 个 ：byte、short、int、long、float、double、char、boolean；除了基本类型（primitive type），剩下的都是引用类型（referencetype），Java 5 以后引入的枚举类型也算是一种比较特殊的引用类型。

### 4.、float f=3.4;是否正确？

不正确。3.4 是双精度数，将双精度型（double）赋值给浮点型（float）属于下转型（down-casting，也称为窄化）会造成精度损失，因此需要强制类型转换float f =(float)3.4; 或者写成 float f =3.4F;。

### 5、short s1 = 1; s1 = s1 + 1;有错吗?short s1 = 1; s1 += 1;有错吗？

对于 short s1 = 1; s1 = s1 + 1;由于 1 是 int 类型，因此 s1+1 运算结果也是 int型，需要强制转换类型才能赋值给 short 型。而 short s1 = 1; s1 += 1;可以正确编译，因为 s1+= 1;相当于 s1 = (short(s1 + 1);其中有隐含的强制类型转换。

### 6、Java 有没有 goto？

goto 是 Java 中的保留字，在目前版本的 Java 中没有使用。（根据 James Gosling（Java 之父）编写的《The Java Programming Language》一书的附录中给出了一个 Java 关键字列表，其中有goto 和 const，但是这两个是目前无法使用的关键字，因此有些地方将其称之为保留字，其实保留字这个词应该有更广泛的意义，因为熟悉 C 语言的程序员都知道，在系统类库中使用过的有特殊意义的但词或单词的组合都被视为保留字）

### 7、int 和 Integer 有什么区别？

Java 是一个近乎纯洁的面向对象编程语言，但是为了编程的方便还是引入了基本数据类型，但是为了能够将这些基本数据类型当成对象操作，Java 为每一个基本数据类型都引入了对应的包装类型（wrapper class），int 的包装类就是 Integer，从 Java 5 开始引入了自动装箱/拆箱机制，使得二者可以相互转换。

Java 为每个原始类型提供了包装类型：

原始类型: boolean，char，byte，short，int，long，float，double

包装类型：Boolean，Character，Byte，Short，Integer，Long，Float，Double

```
class AutoUnboxingTest {
	public static void main(String[] args) {
		Integer a = new Integer(3);
		Integer b = 3;
		// 将 3 自动装箱成 Integer 类型
		int c = 3;
		System.out.println(a == b);
		// false 两个引用没有引用同一对
		象
		System.out.println(a == c);
		// true a 自动拆箱成 int 类型再和 c
		比较
	}
}
```

最近还遇到一个面试题，也是和自动装箱和拆箱有点关系的，代码如下所示：

```
public class Test03 {
	public static void main(String[] args) {
		Integer f1 = 100, f2 = 100, f3 = 150, f4 = 150;
		System.out.println(f1 == f2);
		System.out.println(f3 == f4);
	}
}
```

如果不明就里很容易认为两个输出要么都是 true 要么都是 false。首先需要注意的是 f1、f2、f3、f4 四个变量都是 Integer 对象引用，所以下面的==运算比较的不是值而是引用。装箱的本质是什么呢？当我们给一个 Integer 对象赋一个 int 值的时候，会调用 Integer 类的静态方法 valueOf，如果看 valueOf 的源代码就知道发生了什么。

```
public static Integer valueOf(int i) {
	if (i >= IntegerCache.low && i <= IntegerCache.high)
	return IntegerCache.cache[i + (-IntegerCache.low)];
	return new Integer(i);
}
```

IntegerCache 是 Integer 的内部类，其代码如下所示：

```
/**
* Cache to support the object identity semantics of autoboxing for
values between
* -128 and 127 (inclusive) as required by JLS.
*
* The cache is initialized on first usage. The size of the cache
* may be controlled by the {@code -XX:AutoBoxCacheMax=<size>}
option.
* During VM initialization, java.lang.Integer.IntegerCache.high
property
* may be set and saved in the private system properties in the
* sun.misc.VM class.
*/
private static class IntegerCache {
	static final int low = -128;
	static final int high;
	static final Integer cache[];
	static {
		// high value may be configured by property
		int h = 127;
		String integerCacheHighPropValue =
		sun.misc.VM.getSavedProperty("java.lang.Integer.IntegerCache.high");
		if (integerCacheHighPropValue != null) {
			try {
				int i = parseint(integerCacheHighPropValue);
				i = Math.max(i, 127);
				// Maximum array size is Integer.MAX_VALUE
				h = Math.min(i, Integer.MAX_VALUE - (-low) -1);
			}
			catch( NumberFormatException nfe) {
				// If the property cannot be parsed into an int,
				ignore it.
			}
		}
		high = h;
		cache = new Integer[(high - low) + 1];
		int j = low;
		for (int k = 0; k < cache.length; k++)
		cache[k] = new Integer(j++);
		// range [-128, 127] must be interned (JLS7 5.1.7)
		assert IntegerCache.high >= 127;
	}
	private IntegerCache() {
	}
}
```

简单的说，如果整型字面量的值在-128 到 127 之间，那么不会 new 新的 Integer对象，而是直接引用常量池中的 Integer 对象，所以上面的面试题中 f1f4 的结果是 false。

提醒：越是貌似简单的面试题其中的玄机就越多，需要面试者有相当深厚的功力。 

![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/16ed5486fde3ebe5~tplv-t2oaga2asx-watermark.png)

### 8、&和&&的区别？

&运算符有两种用法：(1)按位与；(2)逻辑与。&&运算符是短路与运算。逻辑与跟短路与的差别是非常巨大的，虽然二者都要求运算符左右两端的布尔值都是true 整个表达式的值才是 true。&&之所以称为短路运算是因为，如果&&左边的表达式的值是 false，右边的表达式会被直接短路掉，不会进行运算。很多时候我们可能都需要用&&而不是&，例如在验证用户登录时判定用户名不是 null 而且不是空字符串，应当写为：username != null &&!username.equals(“”)，二者的顺序不能交换，更不能用&运算符，因为第一个条件如果不成立，根本不能进行字符串的 equals 比较，否则会生 NullPointerException 异常。注意：逻辑或运算符（|）和短路或运算符（||）的差别也是如此。

### 9、解释内存中的栈(stack)、堆(heap)和方法区(method area)的用法。

通常我们定义一个基本数据类型的变量，一个对象的引用，还有就是函数调用的现场保存都使用 JVM 中的栈空间；而通过 new 关键字和构造器创建的对象则放在堆空间，堆是垃圾收集器管理的主要区域，由于现在的垃圾收集器都采用分代收集算法，所以堆空间还可以细分为新生代和老生代，再具体一点可以分为 Eden、Survivor（又可分为 From Survivor 和 To Survivor）、Tenured；方法区和堆都是各个线程共享的内存区域，用于存储已经被 JVM 加载的类信息、常量、静态变量、JIT 编译器编译后的代码等数据；程序中的字面量（literal）如直接书写的 100、”hello”和常量都是放在常量池中，常量池是方法区的一部分，。栈空间操作起来最快但是栈很小，通常大量的对象都是放在堆空间，栈和堆的大小都可以通过 JVM的启动参数来进行调整，栈空间用光了会引发 StackOverflowError，而堆和常量池空间不足则会引发 OutOfMemoryError。

```
String str = new String("hello");
```

上面的语句中变量 str 放在栈上，用 new 创建出来的字符串对象放在堆上，而”hello”这个字面量是放在方法区的。

补充 1：较新版本的 Java（从 Java 6 的某个更新开始）中，由于 JIT 编译器的发展和”逃逸分析”技术的逐渐成熟，栈上分配、标量替换等优化技术使得对象一定分配在堆上这件事情已经变得不那么绝对了。

补充 2：运行时常量池相当于 Class 文件常量池具有动态性，Java 语言并不要求常量一定只有编译期间才能产生，运行期间也可以将新的常量放入池中，String类的 intern()方法就是这样的。

看看下面代码的执行结果是什么并且比较一下 Java 7 以前和以后的运行结果是否一致。

```
String s1 = new StringBuilder("go")
.append("od").toString();
System.out.println(s1.intern() == s1);
String s2 = new StringBuilder("ja")
.append("va").toString();
System.out.println(s2.intern() == s2);
```

### 10、Math.round(11.5) 等于多少？Math.round(-11.5)等于多少？

Math.round(11.5)的返回值是 12，Math.round(-11.5)的返回值是-11。四舍五入的原理是在参数上加 0.5 然后进行下取整。

### 11、switch 是否能作用在 byte 上，是否能作用在 long 上，是否能作用在 String 上？

在 Java 5 以前，switch(expr)中，expr 只能是 byte、short、char、int。从 Java5 开始，Java 中引入了枚举类型，expr 也可以是 enum 类型，从 Java 7 开始，expr 还可以是字符串（String），但是长整型（long）在目前所有的版本中都是不可以的。

### 12、用最有效率的方法计算 2 乘以 8？

2 << 3（左移 3 位相当于乘以 2 的 3 次方，右移 3 位相当于除以 2 的 3 次方）。

**补充：** 我们为编写的类重写 hashCode 方法时，可能会看到如下所示的代码，其实我们不太理解为什么要使用这样的乘法运算来产生哈希码（散列码），而且为什么这个数是个素数，为什么通常选择 31 这个数？前两个问题的答案你可以自己百度一下，选择 31 是因为可以用移位和减法运算来代替乘法，从而得到更好的性能。说到这里你可能已经想到了：31 * num 等价于(num << 5) - num，左移 5位相当于乘以 2 的 5 次方再减去自身就相当于乘以 31，现在的 VM 都能自动完成这个优化。

```
public class PhoneNumber {
	private int areaCode;
	private String prefix;
	private String lineNumber;
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + areaCode;
		result = prime * result
		+ ((lineNumber == null) ? 0 : lineNumber.hashCode());
		result = prime * result + ((prefix == null) ? 0 : prefix.hashCode());
		return result;
	}
	@Override
	public Boolean equals(Object obj) {
		if (this == obj)
		return true;
		if (obj == null)
		return false;
		if (getClass() != obj.getClass())
		return false;
		PhoneNumber other = (PhoneNumber) obj;
		if (areaCode != other.areaCode)
		return false;
		if (lineNumber == null) {
			if (other.lineNumber != null)
			return false;
		} else if (!lineNumber.equals(other.lineNumber))
		return false;
		if (prefix == null) {
			if (other.prefix != null)
			return false;
		} else if (!prefix.equals(other.prefix))
		return false;
		return true;
	}
}
```

### 13、数组有没有 length()方法？String 有没有 length()方法？

数组没有 length()方法 ，有 length 的属性。String 有 length()方法。JavaScript中，获得字符串的长度是通过 length 属性得到的，这一点容易和 Java 混淆。

### 14、在 Java 中，如何跳出当前的多重嵌套循环？

在最外层循环前加一个标记如 A，然后用 break A;可以跳出多重循环。（Java 中支持带标签的 break 和 continue 语句，作用有点类似于 C 和 C++中的 goto 语句，但是就像要避免使用 goto 一样，应该避免使用带标签的 break 和 continue，因为它不会让你的程序变得更优雅，很多时候甚至有相反的作用，所以这种语法其实不知道更好）

### 15、构造器（constructor）是否可被重写（override）？

构造器不能被继承，因此不能被重写，但可以被重载。

### 16、两个对象值相同(x.equals(y) == true)，但却可有不同的hash code，这句话对不对？

不对，如果两个对象 x 和 y 满足 x.equals(y) == true，它们的哈希码（hash code）应当相同。Java 对于 eqauls 方法和 hashCode 方法是这样规定的：

(1)如果两个对象相同（equals 方法返回 true），那么它们的 hashCode 值一定要相同；

(2)如果两个对象的 hashCode 相同，它们并不一定相同。当然，你未必要按照要求去做，但是如果你违背了上述原则就会发现在使用容器时，相同的对象可以出现在 Set 集合中，同时增加新元素的效率会大大下降（对于使用哈希存储的系统，如果哈希码频繁的冲突将会造成存取性能急剧下降）。

**补充：** 关于 equals 和 hashCode 方法，很多 Java 程序都知道，但很多人也就是仅仅知道而已，在 Joshua Bloch 的大作《Effective Java》（很多软件公司，《Effective Java》、《Java 编程思想》以及《重构：改善既有代码质量》是 Java程序员必看书籍，如果你还没看过，那就赶紧去亚马逊买一本吧）中是这样介绍equals 方法的：首先 equals 方法必须满足自反性（x.equals(x)必须返回 true）、

对称性（x.equals(y)返回 true 时，y.equals(x)也必须返回 true）、传递性（x.equals(y)和 y.equals(z)都返回 true 时，x.equals(z)也必须返回 true）和一致性（当 x 和 y 引用的对象信息没有被修改时，多次调用 x.equals(y)应该得到同样的返回值），而且对于任何非 null 值的引用 x，x.equals(null)必须返回 false。

实现高质量的 equals 方法的诀窍包括：

(1) 使用==操作符检查”参数是否为这个对象的引用”；

(2) 使用 instanceof 操作符检查”参数是否为正确的类型”；

(3) 对于类中的关键属性，检查参数传入对象的属性是否与之相匹配；

(4) 编写完 equals方法后，问自己它是否满足对称性、传递性、一致性；

(5) 重写 equals 时总是要重写 hashCode；

(6)  不要将 equals 方法参数中的 Object 对象替换为其他的类型，在重写时不要忘掉@Override 注解。

### 17、是否可以继承 String 类？

String 类是 final 类，不可以被继承。

补充：继承 String 本身就是一个错误的行为，对 String 类型最好的重用方式是关联关系（Has-A）和依赖关系（Use-A）而不是继承关系（Is-A）。

### 18、当一个对象被当作参数传递到一个方法后，此方法可改变这个对象的属性，并可返回变化后的结果，那么这里到底是值传递还是引用传递？

是值传递。Java 语言的方法调用只支持参数的值传递。当一个对象实例作为一个参数被传递到方法中时，参数的值就是对该对象的引用。对象的属性可以在被调用过程中被改变，但对对象引用的改变是不会影响到调用者的。C++和 C#中可以通过传引用或传输出参数来改变传入的参数的值。在 C#中可以编写如下所示的代码，但是在 Java 中却做不到。

```
using System;
namespace CS01 {
	class Program {
		public static void swap(ref int x, ref int y) {
			int temp = x;
			x = y;
			y = temp;
		}
		public static void Main (string[] args) {
			int a = 5, b = 10;
			swap (ref a, ref b);
			// a = 10, b = 5;
			第 225 页 共 485 页
			Console.WriteLine ("a = {0}, b = {1}", a, b);
		}
	}
}
```

**说明：** Java 中没有传引用实在是非常的不方便，这一点在 Java 8 中仍然没有得到改进，正是如此在 Java 编写的代码中才会出现大量的 Wrapper 类（将需要通过方法调用修改的引用置于一个 Wrapper 类中，再将 Wrapper 对象传入方法），这样的做法只会让代码变得臃肿，尤其是让从 C 和 C++转型为 Java 程序员的开发者无法容忍。

### 19、String 和 StringBuilder、StringBuffer 的区别？

Java 平台提供了两种类型的字符串：String 和 StringBuffer/StringBuilder，它们可以储存和操作字符串。其中 String 是只读字符串，也就意味着 String 引用的字符串内容是不能被改变的。而 StringBuffer/StringBuilder 类表示的字符串对象可以直接进行修改。StringBuilder 是 Java 5 中引入的，它和 StringBuffer 的方法完全相同，区别在于它是在单线程环境下使用的，因为它的所有方面都没有被synchronized 修饰，因此它的效率也比 StringBuffer 要高。

面试题 1 - 什么情况下用+运算符进行字符串连接比调用

StringBuffer/StringBuilder 对象的 append 方法连接字符串性能更好？

面试题 2 - 请说出下面程序的输出。

```
class StringEqualTest {
	public static void main(String[] args) {
		String s1 = "Programming";
		String s2 = new String("Programming");
		String s3 = "Program";
		String s4 = "ming";
		String s5 = "Program" + "ming";
		String s6 = s3 + s4;
		System.out.println(s1 == s2);
		System.out.println(s1 == s5);
		System.out.println(s1 == s6);
		System.out.println(s1 == s6.intern());
		System.out.println(s2 == s2.intern());
	}
}
```

**补充：** 解答上面的面试题需要清除两点：

(1)String 对象的 intern 方法会得到字符串对象在常量池中对应的版本的引用（如果常量池中有一个字符串与 String 对象的 equals 结果是 true），如果常量池中没有对应的字符串，则该字符串将被添加到常量池中，然后返回常量池中字符串的引用；

(2)字符串的+操作其本质是创建了 StringBuilder 对象进行 append 操作，然后将拼接后的 StringBuilder 对象用toString 方法处理成 String 对象，这一点可以用 javap -c StringEqualTest.class命令获得 class 文件对应的 JVM 字节码指令就可以看出来。

### 20、重载（Overload）和重写（Override）的区别。重载的方法能否根据返回类型进行区分？

方法的重载和重写都是实现多态的方式，区别在于前者实现的是编译时的多态性，而后者实现的是运行时的多态性。重载发生在一个类中，同名的方法如果有不同的参数列表（参数类型不同、参数个数不同或者二者都不同）则视为重载；重写发生在子类与父类之间，重写要求子类被重写方法与父类被重写方法有相同的返回类型，比父类被重写方法更好访问，不能比父类被重写方法声明更多的异常（里氏代换原则）。重载对返回类型没有特殊的要求。

面试题：华为的面试题中曾经问过这样一个问题 - “为什么不能根据返回类型来区分重载”，快说出你的答案吧！

