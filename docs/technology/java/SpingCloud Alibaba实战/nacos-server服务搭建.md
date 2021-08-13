# nacos-server服务搭建

- Nacos官方网站：[nacos.io/zh-cn/](https://nacos.io/zh-cn/)

## 什么是Nacos

Nacos是阿里巴巴开源的一个动态服务发现、配置管理和服务管理平台。

Nacos英文全称Dynamic Naming and Configuration Service，Na为naming/nameServer即注册中心,co为configuration即注册中心，service是指该注册/配置中心都是以服务为核心。

![Nacos 生态图](https://gitee.com/wuyilong/picture-bed/raw/master/img/df8d64edf9824d3ca4084a8a4b3099e1~tplv-k3u1fbpfcp-watermark.png)

Nacos 无缝支持一些主流的开源生态，使用Nacos，可以简化服务发现、配置管理、服务治理及管理。

如果要把Nacas和SpringCloud Netflix的组件对标的话，那么：

**Nacos = Eureka/Consule + Config + Admin**

## Nacos基本原理

Nacos作为注册中心分为server与client。

![Naocs Client与Server](https://gitee.com/wuyilong/picture-bed/raw/master/img/2bf437f1db384be49fa8e898ac29b3fa~tplv-k3u1fbpfcp-watermark.png)

Server采用Java编写，为client提供注册发现服务与配置服务。而client可以用多语言实现，client与微服务嵌套在一起，nacos提供sdk和openApi，如果没有sdk也可以根据openApi手动写服务注册与发现和配置拉取的逻辑。

### 注册中心原理

![注册中心原理](https://gitee.com/wuyilong/picture-bed/raw/master/img/198ab7bf538c4b94b451cd0e11d74e0c~tplv-k3u1fbpfcp-watermark.png)

服务注册方法：服务注册的策略的是每5秒向nacos server发送一次心跳，心跳带上了服务名，服务ip，服务端口等信息。同时 nacos server也会向client 主动发起健康检查，支持tcp/http检查。如果15秒内无心跳且健康检查失败则认为实例不健康，如果30秒内健康检查失败则剔除实例。

### 配置中心原理

![配置中心原理](https://gitee.com/wuyilong/picture-bed/raw/master/img/edb0b2d3d8ad4d52b44764f12b29d845~tplv-k3u1fbpfcp-watermark.png)

# Nacos-Server服务部署

Nacos 依赖 [Java](https://link.juejin.cn?target=https%3A%2F%2Fdocs.oracle.com%2Fcd%2FE19182-01%2F820-7851%2Finst_cli_jdk_javahome_t%2F) 环境来运行。如果是从代码开始构建并运行Nacos，还需要配置 [Maven](https://link.juejin.cn?target=https%3A%2F%2Fmaven.apache.org%2Findex.html)环境。我们直接使用发行版，需要保证JDK版本在1.8以上。

Nacos Server 有两种运行模式：

- standalone
- cluster

## standalone 模式

我们使用win10来进行Nacos Server的standalone 模式的部署。

1. 下载nacos-server

从[github.com/alibaba/nac…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Falibaba%2Fnacos%2Freleases) 下载nacos-server发行版。

官方推荐的版本是1.4.2或2.0.1。

![官方推荐](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d7a7f3a9c1b43ed9ed84085a33f42a2~tplv-k3u1fbpfcp-watermark.awebp)

按照官方推荐，我们来尝（踩）鲜（坑）最新的发行版2.0.1，下载压缩包，下载完成后解压

![Nacos下载解压](https://gitee.com/wuyilong/picture-bed/raw/master/img/d53f8217983e47fba0956632209f8d17~tplv-k3u1fbpfcp-watermark.png)

1. 启动nacos-server服务

进入%path%\nacos\bin文件夹,执行cmd命令`startup.cmd -m standalone`，其中-m standalone指定为单机模式，否则以cluster集群模式启动。

![nacos-server启动](https://gitee.com/wuyilong/picture-bed/raw/master/img/831e0d6ce21f4a06b5a19d766f7f1a8d~tplv-k3u1fbpfcp-watermark.png)

可以看到Nacos Server的地址，访问 [http://192.168.31.39:8848/nacos/index.html](https://link.juejin.cn?target=http%3A%2F%2F192.168.31.39%3A8848%2Fnacos%2Findex.html)

需要登录，初始账号/密码是 `nacos/nacos`

![Nacos登录](https://gitee.com/wuyilong/picture-bed/raw/master/img/760e7ca5849846878826c21c5a438835~tplv-k3u1fbpfcp-watermark.png)

登录之后可以看到Nacos的控制台。

![Nacos控制台](https://gitee.com/wuyilong/picture-bed/raw/master/img/670322ea4f944b0e98aedc5342bfdfe0~tplv-k3u1fbpfcp-watermark.png)

Linux下部署Nacos-Server服务也是类似，同样是先解压发行压缩包，然后执行启动脚本启动：

```bash
startup.sh -m standalone

```

这种默认情况下，我们的数据写入了了嵌入式数据库。不太方便观察数据存储的情况，nacos也提供了支持mysql数据源的能力。

> 注意：以下操作我在2.0.1版本失败了，所以以下操作是基于1.4.2版本。

MySQL数据库版本要求5.5以上。

1. 创建数据库库，使用初始化文件`nacos-mysql.sql`初始化

![初始化数据库](https://gitee.com/wuyilong/picture-bed/raw/master/img/423255cfa192454b82c8a18bc42def81~tplv-k3u1fbpfcp-watermark.png)

1. 修改`conf/application.properties`文件，增加支持mysql数据源配置（目前只支持mysql），修改mysql数据源的url、用户名和密码。

```java
spring.datasource.platform=mysql

### Count of DB:
db.num=1

### Connect URL of DB:
db.url.0=jdbc:mysql://127.0.0.1:3306/nacos?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useUnicode=true&useSSL=false&serverTimezone=UTC
db.user.0=root
db.password.0=root

### Connection pool configuration: hikariCP
db.pool.config.connectionTimeout=30000
db.pool.config.validationTimeout=10000
db.pool.config.maximumPoolSize=20
db.pool.config.minimumIdle=2

```

1. 使用命令`startup.cmd -m standalone`启动Nacos Server

![使用MySQL存储Nacos数据示例](https://gitee.com/wuyilong/picture-bed/raw/master/img/f6d216f253354f348984df69c143d716~tplv-k3u1fbpfcp-watermark.png)

## cluster 模式

开发和测试，我们直接用standalone 模式，OK，没什么问题。但是生产环境，为了保证Nacos的高可用，我们就得使用 cluster模式。

cluster 模式必须要用 MySQL，MySQL数据导入和上面一致，然后改两个配置文件：

```java
conf/cluster.conf
conf/application.properties

```

大致如下：

1. cluster.conf，填入要运行 Nacos Server 机器的 ip

```java
192.168.100.155
192.168.100.156
192.168.100.157    

```

1. 修改NACOS_PATH/conf/application.properties，加入 MySQL 配置

```java
db.num=1
db.url.0=jdbc:mysql://localhost:3306/nacos_config?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true
db.user=root
db.password=root

```

Nacos采用的一个Leader节点，多个Follower节点的集群架构，数据一致性算法采用的是Raft。

![nacos集群示意图](https://gitee.com/wuyilong/picture-bed/raw/master/img/e32a0b72bcb447799ecc550abee01b3e~tplv-k3u1fbpfcp-watermark.png)

至于实战，由于机器资源资源原因，这里就不再演示。

![穷](https://gitee.com/wuyilong/picture-bed/raw/master/img/5a57a55df5864e019517f3ce06df0421~tplv-k3u1fbpfcp-watermark.png)

下一节，我们会把服务注册到Nacos注册中心，敬请期待！


作者：三分恶
链接：https://juejin.cn/post/6976108108787482655
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。