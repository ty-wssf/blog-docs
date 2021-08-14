module.exports = {
    title: '吴益龙的博客',
    description: '吴益龙的博客',
    base: '/blog-docs/',
    // 主题配置
    themeConfig: {
        // 默认主题
        /*theme: "@vuepress/theme-default",*/
        theme: '@vuepress/blog',
        // 顶部导航栏
        nav: [
            {text: '安装文档', link: '/install/'},
            {
                text: '技术栈', items: [
                    {
                        text: 'java', items: [
                            {text: 'Spring专题', link: '/technology/java/spring/Spring IOC/SpringBean的生命流程/'},
                            {text: 'SpringBoot专题', link: '/technology/java/SpringBoot专题/'},
                            {
                                text: 'SpingCloud Alibaba实战',
                                link: '/technology/java/SpingCloud Alibaba实战/微服务与SpringCloud Alibaba/'
                            },
                            {text: 'MyBatis', link: '/technology/java/MyBatis/MyBatis 源码分析系列文章导读/'},
                            {text: 'Dubbo', link: '/technology/java/Dubbo/Dubbo 源码分析 - SPI 机制/'},
                            {text: '查缺补漏', link: '/technology/java/查缺补漏/Java面试题基础系列228道/'},
                            {text: '其它', link: '/technology/java/other/基于canal的mysql数据同步/'},
                        ]
                    },
                ]
            },
            {
                text: '在线工具', items: [
                    {
                        text: '在线编辑', items: [
                            {text: 'PDF 转换器', link: 'https://smallpdf.com/cn/pdf-to-word'},
                            {text: 'JSON 编辑器', link: 'https://www.json.cn/'},
                            {text: 'MD 表格生成', link: 'https://tableconvert.com/?output=text'},
                            {text: 'CRON 表达式', link: 'https://cron.qqe2.com/'},
                            {text: '代码格式化', link: 'https://tool.oschina.net/codeformat/html'},
                            {text: '二维码生成器', link: 'https://cli.im/'},
                            {text: '在线编码转换', link: 'http://tool.chinaz.com/tools/native_ascii.aspx'},
                            {text: 'YAML <--> Properties', link: 'https://www.toyaml.com/index.html'},
                        ]
                    },
                    {
                        text: '趋势分析', items: [
                            {text: '百度指数', link: 'https://index.baidu.com/v2/index.html#/'},
                        ]
                    },
                ]
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
                        'Linux下SpringBoot Jar 如何实现service服务',
                        'springboot jar包安装成windows服务',
                        '使用 Docker 部署 Spring Boot',
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
                        '常用脚本',
                        'vue使用nginx部署配置',
                        'ShardingSphere分表分库解决方案',
                        'GitHub Actions 入门教程',
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
