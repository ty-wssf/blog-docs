# Spring bean的生命流程

Spring 是一个轻量级的 J2EE 开源框架，其目标是降低企业级应用开发难度，提高企业级应用开发效率。在日程开发中，我们会经常使用 Spring 框架去构建应用。所以作为一个经常使用的框架，了解其原理还是很有必要的。接下来我们就从宏观层面上，来看看 Spring 中的 bean 由实例化到销毁的过程。在详细讨论 bean 生命周期前，先上一张图，后面也会围绕这张图展开讨论。

[![bean实例化过程](https://blog-pictures.oss-cn-shanghai.aliyuncs.com/bean实例化过程.png)](http://www.coolblog.xyz/)

图1 bean实例化过程

接下来对照上图，一步一步对 singleton 类型 bean 的生命周期进行解析：

1. 实例化 bean 对象，类似于 new XXObject()
2. 将配置文件中配置的属性填充到刚刚创建的 bean 对象中。
3. 检查 bean 对象是否实现了 Aware 一类的接口，如果实现了则把相应的依赖设置到 bean 对象中。比如如果 bean 实现了 BeanFactoryAware 接口，Spring 容器在实例化bean的过程中，会将 BeanFactory 容器注入到 bean 中。
4. 调用 BeanPostProcessor 前置处理方法，即 postProcessBeforeInitialization(Object bean, String beanName)。
5. 检查 bean 对象是否实现了 InitializingBean 接口，如果实现，则调用 afterPropertiesSet 方法。或者检查配置文件中是否配置了 init-method 属性，如果配置了，则去调用 init-method 属性配置的方法。
6. 调用 BeanPostProcessor 后置处理方法，即 postProcessAfterInitialization(Object bean, String beanName)。我们所熟知的 AOP 就是在这里将 Adivce 逻辑织入到 bean 中的。
7. 注册 Destruction 相关回调方法。
8. bean 对象处于就绪状态，可以使用了。
9. 应用上下文被销毁，调用注册的 Destruction 相关方法。如果 bean 实现了 DispostbleBean 接口，Spring 容器会调用 destroy 方法。如果在配置文件中配置了 destroy 属性，Spring 容器则会调用 destroy 属性对应的方法。

上述流程从宏观上对 Spring 中 singleton 类型 bean 的生命周期进行了描述，接下来说说所上面流程中的一些细节问题。
先看流程中的第二步 – 设置对象属性。在这一步中，对于普通类型的属性，例如 String，Integer等，比较容易处理，直接设置即可。但是如果某个 bean 对象依赖另一个 bean 对象，此时就不能直接设置了。Spring 容器首先要先去实例化 bean 依赖的对象，实例化好后才能设置到当前 bean 中。大致流程如下：
[![img](https://blog-pictures.oss-cn-shanghai.aliyuncs.com/bean注入依赖过程.png)](http://www.coolblog.xyz/)

图2 依赖实例化流程图

上面图片描述的依赖比较简单，就是 BeanA 依赖 BeanB。现在考虑这样一种情况，BeanA 依赖 BeanB，BeanB 依赖 BeanC，BeanC 又依赖 BeanA。三者形成了循环依赖，如下所示：

[![img](https://blog-pictures.oss-cn-shanghai.aliyuncs.com/循环依赖.png)](http://www.coolblog.xyz/)

图3 循环依赖

对于这样的循环依赖，根据依赖注入方式的不同，Spring 处理方式也不同。如果依赖靠构造器方式注入，则无法处理，Spring 直接会报循环依赖异常。这个理解起来也不复杂，构造 BeanA 时需要 BeanB 作为构造器参数，此时 Spring 容器会先实例化 BeanB。构造 BeanB 时，BeanB 又需要 BeanC 作为构造器参数，Spring 容器又不得不先去构造 BeanC。最后构造 BeanC 时，BeanC 又依赖 BeanA 才能完成构造。此时，BeanA 还没构造完成，BeanA 要等 BeanB 实例化好才能完成构造，BeanB 又要等 BeanC，BeanC 等 BeanA。这样就形成了死循环，所以对于以构造器注入方式的循环依赖是无解的，Spring 容器会直接报异常。对于 setter 类型注入的循环依赖则可以顺利完成实例化并依次注入，这里具体细节就不说了，详细可以参考《Spring源码深度解析》一书相关章节。

循环依赖问题说完，接下来 bean 实例化流程中的第6步 – 调用 BeanPostProcessor 后置处理方法。先介绍一下 BeanPostProcessor 接口，BeanPostProcessor 接口中包含了两个方法，其定义如下：

```
public interface BeanPostProcessor {

    Object postProcessBeforeInitialization(Object bean, String beanName) throws Exception;

    Object postProcessAfterInitialization(Object bean, String beanName) throws Exception;
}
```

BeanPostProcessor 是一个很有用的接口，通过实现接口我们就可以插手 bean 的实例化过程，为拓展提供了可能。我们所熟知的 AOP 就是在这里进行织如入，具体点说是在 postProcessAfterInitialization(Object bean, String beanName) 执行织入逻辑的。下面就来说说 Spring AOP 织入的流程，以及 AOP 是怎样和 IOC 整合的。先说 Spring AOP 织入流程，大致如下：

1. 查找实现了 PointcutAdvisor 类型的切面类，切面类包含了 Pointcut 和 Advice 实现类对象。
2. 检查 Pointcut 中的表达式是否能匹配当前 bean 对象。
3. 如果匹配到了，表明应该对此对象织入 Advice。
4. 将 bean，bean class对象，bean实现的interface的数组，Advice对象传给代理工厂 ProxyFactory。代理工厂创建出 AopProxy 实现类，最后由 AopProxy 实现类创建 bean 的代理类，并将这个代理类返回。此时从 postProcessAfterInitialization(Object bean, String beanName) 返回的 bean 此时就不是原来的 bean 了，而是 bean 的代理类。原 bean 就这样被无感的替换掉了，是不是有点偷天换柱的感觉。

大家现在应该知道 AOP 是怎样作用在 bean 上的了，那么 AOP 是怎样和 IOC 整合起来并协同工作的呢？下面就来简单说一下。

Spring AOP 生成代理类的逻辑是在 AbstractAutoProxyCreator 相关子类中实现的，比如 DefaultAdvisorAutoProxyCreator、AspectJAwareAdvisorAutoProxyCreator 等。上面说了 BeanPostProcessor 为拓展留下了可能，这里 AbstractAutoProxyCreator 就将可能变为了现实。AbstractAutoProxyCreator 实现了 BeanPostProcessor 接口，这样 AbstractAutoProxyCreator 可以在 bean 初始化时做一些事情。光继承这个接口还不够，继承这个接口只能获取 bean，要想让 AOP 生效，还需要拿到切面对象（包含 Pointcut 和 Advice）才行。所以 AbstractAutoProxyCreator 同时继承了 BeanFactoryAware 接口，通过实现该接口，AbstractAutoProxyCreator 子类就可拿到 BeanFactory，有了 BeanFactory，就可以获取 BeanFactory 中所有的切面对象了。有了目标对象 bean，所有的切面类，此时就可以为 bean 生成代理对象了。

[![AbstractAutoProxyCreator继承图](https://blog-pictures.oss-cn-shanghai.aliyuncs.com/AbstractAutoProxyCreator继承图.png)](http://www.coolblog.xyz/)

图4 AbstractAutoProxyCreator继承图（删掉了一些不关心的继承分支）

到这里，从宏观上已经对 bean 的生命流程进行了较为详细的描述。由于暂时能力有限，只能从宏观上分析，以前尝试过去看 Spring IOC 的实现代码，感觉还是太复杂了，细节太多，跟踪了十几二十个方法后就开始凌乱了。在几次失败的尝试后，终于放弃了。后来总结了一下失败的原因，当时自己刚工作不是很久，代码写的少，经验不足。并且在对 Spring 很多特性不熟悉的情况下就去看 Spring 源码，结果只能到处碰壁，陷入 Spring 各种细节之中久久不能自拔😂。所以对于想看某个框架代码的同学，一定要在熟练使用这个框架的基础上再去看。不要像我这样急于求成，不然到最后只能失败啊。本人这篇博客建立在仿写了 Spring IOC 和 AOP的基础上写出来的，在仿写过程中参考了黄亿华前辈的 [tiny-spring](https://github.com/code4craft/tiny-spring) 项目，有兴趣的同学可以读读 tiny-spring。我自己仿写的项目也放在了github上，传送门 --> [toy-spring](https://github.com/code4wt/toy-spring)。

本篇博客到此结束，如果有写错的地方，欢迎指出来，谢谢！如果错误的地方对你造成了困扰，我表示很抱歉。

#####  参考：

- [《Spring揭秘》](https://book.douban.com/subject/3897837/)
- [《Spring源码深度解析》](https://book.douban.com/subject/25866350/)
- https://www.zybuluo.com/dugu9sword/note/382745