module.exports = {
    title: '吴益龙的博客',
    description: '吴益龙的博客',
    // 部署到GitHub上设置基础路径，部署到vercel上不设置基础路径
    base: '/blog-docs/',
    // 主题配置
    themeConfig: {
        // 最后更新时间
        lastUpdated: '最后更新时间', // string | boolean

        // Git 仓库和编辑链接
        // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
        repo: 'ty-wssf/blog-docs',
        // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
        // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
        repoLabel: 'GitHub',
        // 以下为可选的编辑链接选项
        // 假如你的文档仓库和项目本身不在一个仓库：
        docsRepo: 'ty-wssf/blog-docs',
        // 假如文档不是放在仓库的根目录下：
        docsDir: 'docs',
        // 假如文档放在一个特定的分支下：
        docsBranch: 'master',
        // 默认是 false, 设置为 true 来启用
        editLinks: true,
        // 默认为 "Edit this page"
        editLinkText: '帮助我们改善此页面！',

        // 顶部导航栏
        nav: [
            {text: '安装文档', link: '/install/'},
            {text: '前端', link: '/technology/前端/jQuery中封装ajax请求/'},
            {
                text: 'java', items: [
                    {text: 'Spring专题', link: '/technology/java/spring/Spring IOC/SpringBean的生命流程/'},
                    {text: 'SpringBoot专题', link: '/technology/java/SpringBoot专题/'},
                    {
                        text: '基于OAuth2.0的统一身份认证中心',
                        link: '/technology/java/基于OAuth2.0的统一身份认证中心/Spring Security oAuth2/'
                    },
                    {
                        text: 'SpingCloud Alibaba实战',
                        link: '/technology/java/SpingCloud Alibaba实战/微服务与SpringCloud Alibaba/'
                    },
                    {text: 'MyBatis', link: '/technology/java/MyBatis/MyBatis 源码分析系列文章导读/'},
                    {text: 'Dubbo', link: '/technology/java/Dubbo/Dubbo 源码分析 - SPI 机制/'},
                    {text: 'Docker', link: '/technology/java/Docker/Docker入门教程/'},
                    {text: 'Jvm系列', link: '/technology/java/Jvm系列/Java类的加载机制/'},
                    {text: '高并发', link: '/technology/java/thread/基础知识/并发编程的优缺点/'},
                    {text: '算法', link: '/technology/java/算法/Java手写二叉搜索树算法/'},
                    {text: '查缺补漏', link: '/technology/java/查缺补漏/Java面试题基础系列228道/'},
                    {text: '其它', link: '/technology/java/other/基于canal的mysql数据同步/'},
                ]
            },
            {
                text: '在线工具', items: [
                    {
                        text: '在线编辑', items: [
                            {text: 'WEBP转JPG - 在线转换图像文件', link: 'https://www.aconvert.com/cn/image/webp-to-jpg/'},
                            {text: 'PDF 转换器', link: 'https://smallpdf.com/cn/pdf-to-word'},
                            {text: 'JSON 编辑器', link: 'https://www.json.cn/'},
                            {text: 'MD 表格生成', link: 'https://tableconvert.com/?output=text'},
                            {text: 'CRON 表达式', link: 'https://cron.qqe2.com/'},
                            {text: '代码格式化', link: 'https://tool.oschina.net/codeformat/html'},
                            {text: '二维码生成器', link: 'https://cli.im/'},
                            {text: '在线编码转换', link: 'http://tool.chinaz.com/tools/native_ascii.aspx'},
                            {text: 'YAML <--> Properties', link: 'https://www.toyaml.com/index.html'},
                            {text: 'JWT解码', link: 'https://jwt.io/'},
                        ]
                    },
                    {
                        text: '趋势分析', items: [
                            {text: '百度指数', link: 'https://index.baidu.com/v2/index.html#/'},
                        ]
                    },
                ]
            },
            {
                text: '常用网站', items: [
                    {text: '掘金', link: 'https://juejin.cn/'},
                    {text: '牛魔王的博客', link: 'https://www.moyundong.com/'},
                    {text: '田小波的博客', link: 'https://www.tianxiaobo.com/'},
                    {text: '千锋教育-李卫民', link: 'https://funtl.com/'},
                ]
            },
            {
                text: 'gitee', link: 'https://gitee.com/wuyilong/blog-docs'
            },
        ],
        // 侧边栏
        sidebar: {
            '/install/': [
                {
                    title: '安装文档',   // 必要的
                    //path: '/install/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        '',
                        'mysql',
                        'redis'
                    ]
                }
            ],
            '/technology/java/spring/': [
                {
                    title: 'Spring IOC',   // 必要的
                    //path: '/install/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        'Spring IOC/SpringBean的生命流程',
                        'Spring IOC/Spring IOC 容器源码分析系列文章导读',
                        'Spring IOC/Spring IOC 容器源码分析 - 获取单例 bean',
                        'Spring IOC/Spring IOC 容器源码分析 - 创建单例 bean 的过程',
                        'Spring IOC/Spring IOC 容器源码分析 - 创建原始 bean 对象',
                        'Spring IOC/Spring IOC 容器源码分析 - 循环依赖的解决办法',
                        'Spring IOC/Spring IOC 容器源码分析 - 填充属性到 bean 原始对象',
                        'Spring IOC/Spring IOC 容器源码分析 - 余下的初始化工作',
                    ]
                },
                {
                    title: 'Spring AOP',   // 必要的
                    //path: '/install/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        'Spring AOP/Spring AOP 源码分析系列文章导读',
                        'Spring AOP/Spring AOP 源码分析 - 筛选合适的通知器',
                        'Spring AOP/Spring AOP 源码分析 - 创建代理对象',
                        'Spring AOP/Spring AOP 源码分析 - 拦截器链的执行过程',
                    ]
                },
                {
                    title: 'Spring MVC',   // 必要的
                    //path: '/install/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        'Spring MVC/Spring MVC 原理探秘 - 一个请求的旅行过程',
                        'Spring MVC/Spring MVC 原理探秘 - 容器的创建过程',
                    ]
                },
            ],
            '/technology/java/SpringBoot专题/': [
                {
                    title: 'SpringBoot专题',   // 必要的
                    //path: '/install/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        '',
                        'Spring Boot 2 尝鲜-动态 Banner',
                        'Spring Boot 如何解决项目启动时初始化资源',
                        'Spring Boot 如何测试打包部署',
                        'pom配置',
                        'Linux下SpringBoot Jar 如何实现service服务',
                        'springboot jar包安装成windows服务',
                        '使用 Docker 部署 Spring Boot',
                        'Docker Compose + Spring Boot + Nginx + Mysql 实践',
                        '使用 Jenkins 部署 Spring Boot',
                        'Web 综合开发',
                        'Spring Boot初始化数据库脚本',
                        'Spring Boot 中 Redis 的使用',
                        'Spring Boot 集成 Memcached',
                        'Thymeleaf 使用详解',
                        '如何优雅的使用 Mybatis',
                        '如何优雅的使用 MyBatis 之 MyBatis-Plus',
                        'Mybatis 多数据源最简解决方案',
                        'RabbitMQ 详解',
                        '定时任务',
                        '邮件服务',
                        '使用 Spring Boot Actuator 监控应用',
                        '使用 spring-boot-admin 对 Spring Boot 服务进行监控',
                        'Spring Boot、微服务架构和大数据治理三者之间的故事'
                    ]
                }
            ],
            '/technology/java/基于OAuth2.0的统一身份认证中心/': [
                {
                    title: '基于OAuth2.0的统一身份认证中心',   // 必要的
                    //path: '/install/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        'Spring Security oAuth2',
                    ]
                }
            ],
            '/technology/java/SpingCloud Alibaba实战/': [
                {
                    title: 'SpingCloud Alibaba实战',   // 必要的
                    //path: '/install/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        '微服务与SpringCloud Alibaba',
                        '电商系统业务分析',
                        '存储设计与基础架构设计',
                        '基本开发框架搭建',
                        '子模块基本业务开发',
                        'nacos-server服务搭建',
                        'nacos注册中心管理微服务',
                        '使用OpenFeign服务调用',
                        'Hystrix容错保护',
                        '分布式配置中心',
                        '引入服务网关Gateway',
                    ]
                },
            ],
            '/technology/java/MyBatis/': [
                {
                    title: 'MyBatis',   // 必要的
                    //path: '/install/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        'MyBatis 源码分析系列文章导读',
                        'MyBatis 源码分析 - 配置文件解析过程',
                        'MyBatis 源码分析 - 映射文件解析过程',
                        'MyBatis 源码分析 - SQL 的执行过程',
                        'MyBatis 源码分析 - 内置数据源',
                        'MyBatis 源码分析 - 缓存原理',
                        'MyBatis 源码分析 - 插件机制',
                    ]
                },
            ],
            '/technology/java/Dubbo/': [
                {
                    title: 'MyBatis',   // 必要的
                    //path: '/install/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        'Dubbo 源码分析 - SPI 机制',
                        'Dubbo 源码分析 - 自适应拓展原理',
                        'Dubbo 源码分析 - 服务导出',
                        'Dubbo 源码分析 - 服务引用',
                        'Dubbo 源码分析 - 集群容错之 Directory',
                        'Dubbo 源码分析 - 集群容错之 Router',
                        'Dubbo 源码分析 - 集群容错之 Cluster',
                        'Dubbo 源码分析 - 集群容错之 LoadBalance',
                        'Dubbo 源码分析 - 服务调用过程',
                    ]
                },
            ],
            '/technology/java/查缺补漏/': [
                {
                    title: '查缺补漏',   // 必要的
                    //path: '/install/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        'Java面试题基础系列228道',
                        'Java面试题（一）的1~20题答案',
                        'Java面试题（一）的21~50题答案',
                        'Java面试题（一）的51~95题答案',
                        'Java面试题（二）的1~20题答案',
                        'Java面试题（二）的21~50题答案',
                        'Java面试题（二）的51~80题答案',
                        'Java面试题（二）的81~115题答案',
                        'Java面试题（二）的116~133题答案',
                        'Java并发编程面试题合集',
                        'Spring系列面试题129道',
                        'MyBatis面试题',
                        'Redis 面试题',
                        'ZooKeeper面试题',
                        'Spring Boot 面试题',
                        'SpringCloud面试题',
                        'Java微服务面试题',
                        'kafka 面试题',
                        'RabbitMQ 面试题',
                        'Dubbo 面试题',
                        'Elasticsearch 面试题1',
                        'Elasticsearch 面试题2',
                        'Linux 面试题',
                    ]
                },

            ],
            '/technology/java/other/': [
                {
                    title: '其它',   // 必要的
                    //path: '/install/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        '基于canal的mysql数据同步',
                        'Nexus搭建Maven私服',
                        '常用脚本',
                        'vue使用nginx部署配置',
                        'ShardingSphere分表分库解决方案',
                        'GitHub Actions 入门教程',
                        'VuePress 基于 Vue 的静态网站生成器',
                        '数据同步kettle详解',
                        'github国内加速解决方案',
                        'Typora + 图床 + 码云',
                        '解 Java 8 的 Lambda、函数式接口、Stream 用法和原理',
                        'jwt与token+redis，哪种方案更好用？',
                        '加密与数字证书',
                        'windows安装 OpenSSH',
                    ]
                },
            ],
            '/technology/java/Docker/': [
                {
                    title: 'Docker',   // 必要的
                    //path: '/install/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        'Docker入门教程',
                        'Dockerfile 使用介绍',
                        'Dockerfile 指令详解',
                        'Docker 三剑客之 Docker Compose',
                        'Docker 三剑客之 Docker Machine',
                        'Docker 三剑客之 Docker Swarm',
                    ]
                },

            ],
            '/technology/java/Jvm系列/': [
                {
                    title: 'Jvm系列',   // 必要的
                    //path: '/install/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        'Java类的加载机制',
                        'Jvm内存结构',
                        'GC算法垃圾收集器',
                        'Jvm调优命令篇',
                        'Java-GC分析',
                        'Java服务GC参数调优案例',
                        'Jvm调优-工具篇',
                        '如何优化Java-GC「译」'
                    ]
                },
            ],
            '/technology/java/thread/': [
                {
                    title: '基础知识',   // 必要的
                    //path: '基础知识/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        '基础知识/并发编程的优缺点',
                        '基础知识/线程的状态转换以及基本操作',
                        '基础知识/漫谈Java线程状态',
                    ]
                },
                {
                    title: '并发原理',   // 必要的
                    //path: '基础知识/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        '并发原理/Java内存模型以及happens-before规则',
                    ]
                },
                {
                    title: '并发关键字',   // 必要的
                    //path: '基础知识/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        '并发关键字/彻底理解synchronized',
                        '并发关键字/深入分析Synchronized原理',
                        '并发关键字/彻底理解volatile',
                        '并发关键字/你以为你真的了解final吗',
                        '并发关键字/三大性质总结：原子性、可见性以及有序性',
                    ]
                },
                {
                    title: 'Lock体系',   // 必要的
                    //path: '基础知识/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        'Lock体系/初识Lock与AbstractQueuedSynchronizer(AQS)',
                        'Lock体系/深入理解AbstractQueuedSynchronizer(AQS)',
                        'Lock体系/彻底理解ReentrantLock',
                        'Lock体系/深入理解读写锁ReentrantReadWriteLock',
                        'Lock体系/详解Condition的await和signal等待通知机制',
                        'Lock体系/LockSupport工具',
                    ]
                },
                {
                    title: '并发容器',   // 必要的
                    //path: '基础知识/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        '并发容器/并发容器之ConcurrentHashMap(JDK-1.8版本)',
                        '并发容器/并发容器之CopyOnWriteArrayList',
                        '并发容器/并发容器之ConcurrentLinkedQueue',
                        '并发容器/并发容器之ThreadLocal',
                        '并发容器/从源码深入详解ThreadLocal内存泄漏问题',
                        '并发容器/并发容器之BlockingQueue',
                        '并发容器/并发容器之ArrayBlockingQueue和LinkedBlockingQueue实现原理详解',
                    ]
                },
                {
                    title: 'Executor体系',   // 必要的
                    //path: '基础知识/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        'Executor体系/线程池ThreadPoolExecutor实现原理',
                        'Executor体系/线程池之ScheduledThreadPoolExecutor',
                        'Executor体系/FutureTask基本操作总结',
                    ]
                },
                {
                    title: '原子操作类',   // 必要的
                    //path: '基础知识/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        '原子操作类/Java中atomic包中的原子操作类总结',
                    ]
                },
                {
                    title: '并发工具',   // 必要的
                    //path: '基础知识/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        '并发工具/大白话说java并发工具类-CountDownLatch，CyclicBarrier',
                        '并发工具/大白话说java并发工具类-Semaphore，Exchanger',
                    ]
                },
                {
                    title: '并发实战',   // 必要的
                    //path: '基础知识/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        '并发实战/彻底弄懂生产者--消费者问题',
                    ]
                },
            ],
            '/technology/java/算法/': [
                {
                    title: '算法',   // 必要的
                    //path: '/install/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        'Java手写二叉搜索树算法',
                        '二叉平衡树（AVL树）',
                        '红黑树',
                    ]
                },
            ],
        },
    },
    plugins: {
        // 评论插件
        '@vssue/vuepress-plugin-vssue': {
            platform: 'github-v4', //v3的platform是github，v4的是github-v4
            locale: 'zh', //语言
            // 其他的 Vssue 配置
            owner: 'ty-wssf', //github账户名
            repo: 'ty-wssf.github.io', //github一个项目的名称
            clientId: 'acfc04a4e1dd14e78639',//注册的Client ID
            clientSecret: '9db6335cb3b92d9276dcfef58e8fa1fe1ff01bcc',//注册的Client Secret
            autoCreateIssue: true // 自动创建评论，默认是false，最好开启，这样首次进入页面的时候就不用去点击创建评论的按钮了。
        },
        // back-to-top 插件
        '@vuepress/back-to-top': true,
    },
}
