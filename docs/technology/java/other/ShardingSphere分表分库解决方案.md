# ShardingSphere分表分库解决方案
## 1.1 简介

**ShardingSphere**一套开源的分布式数据库中间件解决方案组成的生态圈，它由**Sharding-JDBC**、**Sharding-Proxy**和**Sharding-Sidecar**（计划中）这3款相互独立的产品组成。 他们均提供标准化的数据分片、分布式事务和数据库治理功能，可适用于如Java同构、异构语言、云原生等各种多样化的应用场景。

**ShardingSphere**定位为关系型数据库中间件，旨在充分合理地在分布式的场景下利用关系型数据库的计算和存储能力，而并非实现一个全新的关系型数据库。 它与NoSQL和NewSQL是并存而非互斥的关系。NoSQL和NewSQL作为新技术探索的前沿，放眼未来，拥抱变化，是非常值得推荐的。反之，也可以用另一种思路看待问题，放眼未来，关注不变的东西，进而抓住事物本质。 关系型数据库当今依然占有巨大市场，是各个公司核心业务的基石，未来也难于撼动，我们目前阶段更加关注在原有基础上的增量，而非颠覆。

![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/2f3d638e48027e510a9100504b0d08bc_1828752-20200926000514644-1159706331.png)

## 1.2 Sharding-JDBC简介

定位为轻量级 Java 框架，在 Java 的 JDBC 层提供的额外服务。 它使用客户端直连数据库，以 jar 包形式提供服务，无需额外部署和依赖，可理解为增强版的 JDBC 驱动，完全兼容 JDBC 和各种 ORM 框架。

- 适用于任何基于JDBC的ORM框架，如：JPA, Hibernate, Mybatis, Spring JDBC Template或直接使用JDBC。

- 支持任何第三方的数据库连接池，如：DBCP, C3P0, BoneCP, Druid, HikariCP等。
- 支持任意实现JDBC规范的数据库。目前支持MySQL，Oracle，SQLServer，PostgreSQL以及任何遵循SQL92标准的数据库

![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/1828752-20200926000616844-1445404276.png)

## 1.3  Sharding-Proxy简介

定位为透明化的数据库代理端，提供封装了数据库二进制协议的服务端版本，用于完成对异构语言的支持。 目前先提供MySQL/PostgreSQL版本，它可以使用任何兼容MySQL/PostgreSQL协议的访问客户端(如：MySQL Command Client, MySQL Workbench, Navicat等)操作数据，对DBA更加友好。

- 向应用程序完全透明，可直接当做MySQL/PostgreSQL使用。
- 适用于任何兼容MySQL/PostgreSQL协议的的客户端。

![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/1828752-20200926000720270-17216569.png)

## 1.4 Sharding-Sidecar（TODO）简介

定位为Kubernetes的云原生数据库代理，以Sidecar的形式代理所有对数据库的访问。 通过无中心、零侵入的方案提供与数据库交互的的啮合层，即Database Mesh，又可称数据网格。

Database Mesh的关注重点在于如何将分布式的数据访问应用与数据库有机串联起来，它更加关注的是交互，是将杂乱无章的应用与数据库之间的交互有效的梳理。使用Database Mesh，访问数据库的应用和数据库终将形成一个巨大的网格体系，应用和数据库只需在网格体系中对号入座即可，它们都是被啮合层所治理的对象。

![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/1828752-20200926000820077-1230480748.png)

![image-20210414202025184](https://gitee.com/wuyilong/picture-bed/raw/master/img/image-20210414202025184.png)

## 1.5 功能列表

### 1.5.1 数据分片

- 分库 & 分表
- 读写分离
- 分片策略定制化
- 无中心化分布式主键

### 1.5.2 分布式事务

- 标准化事务接口
- XA强一致事务
- 柔性事务

### 1.5.3 数据库治理

- 配置动态化
- 编排 & 治理
- 数据脱敏
- 可视化链路追踪

# 2. Sharding-JDBC

## 2.1 分库分表

### 2.1.1 准备测试数据库和表

```
SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- 创建数据库
-- ----------------------------
DROP database if exists ds0;
DROP database if exists ds1;
CREATE database ds0;
CREATE database ds1;

-- ----------------------------
-- Table structure for user_0
-- ----------------------------
DROP TABLE IF EXISTS ds0.`user_0`;
CREATE TABLE ds0.`user_0` (
  `id` bigint NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `create_time` datetime,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for user_1
-- ----------------------------
DROP TABLE IF EXISTS ds0.`user_1`;
CREATE TABLE ds0.`user_1` (
  `id` bigint NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `create_time` datetime,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for user_
-- ----------------------------
DROP TABLE IF EXISTS ds0.`user_2021_3`
CREATE TABLE ds0.`user_2021_3` (
  `id` bigint NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `create_time` datetime,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for user_0
-- ----------------------------
DROP TABLE IF EXISTS ds1.`user_0`;
CREATE TABLE ds1.`user_0` (
  `id` bigint NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `create_time` datetime,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for user_1
-- ----------------------------
DROP TABLE IF EXISTS `ds1.user_1`;
CREATE TABLE ds1.`user_1` (
  `id` bigint NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `create_time` datetime,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for user_
-- ----------------------------
DROP TABLE IF EXISTS ds1.`user_2021_3`
CREATE TABLE ds1.`user_2021_3` (
  `id` bigint NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `create_time` datetime,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### 2.1.2 创建maven项目并添加依赖

```
<dependency>
    <groupId>org.apache.shardingsphere</groupId>
    <artifactId>sharding-jdbc-spring-boot-starter</artifactId>
    <version>4.0.1</version>
</dependency>
<!-- https://mvnrepository.com/artifact/javax.xml.bind/jaxb-api -->
<dependency>
    <groupId>javax.xml.bind</groupId>
    <artifactId>jaxb-api</artifactId>
    <version>2.3.0-b170201.1204</version>
</dependency>
<!-- https://mvnrepository.com/artifact/javax.activation/activation -->
<dependency>
    <groupId>javax.activation</groupId>
    <artifactId>activation</artifactId>
    <version>1.1</version>
</dependency>
<!-- https://mvnrepository.com/artifact/org.glassfish.jaxb/jaxb-runtime -->
<dependency>
    <groupId>org.glassfish.jaxb</groupId>
    <artifactId>jaxb-runtime</artifactId>
    <version>2.3.0-b170127.1453</version>
</dependency>
```

### 2.1.3 spring.properties配置

```
#配置数据源 boke_1 boke_2
spring.shardingsphere.datasource.names=ds0,ds1

# ds1 数据源配置
spring.shardingsphere.datasource.ds0.type=com.zaxxer.hikari.HikariDataSource
spring.shardingsphere.datasource.ds0.driver-class-name=com.mysql.cj.jdbc.Driver
spring.shardingsphere.datasource.ds0.jdbc-url=jdbc:mysql://localhost:3306/ds0?useUnicode=true&characterEncoding=UTF-8&autoReconnect=true&serverTimezone=Asia/Shanghai
spring.shardingsphere.datasource.ds0.username=root
spring.shardingsphere.datasource.ds0.password=123456

# ds0 数据源配置
spring.shardingsphere.datasource.ds1.type=com.zaxxer.hikari.HikariDataSource
spring.shardingsphere.datasource.ds1.driver-class-name=com.mysql.cj.jdbc.Driver
spring.shardingsphere.datasource.ds1.jdbc-url=jdbc:mysql://localhost:3306/ds1?useUnicode=true&characterEncoding=UTF-8&autoReconnect=true&serverTimezone=Asia/Shanghai
spring.shardingsphere.datasource.ds1.username=root
spring.shardingsphere.datasource.ds1.password=123456

#  分库策略（水平） 以 id 取模  进行 分库
spring.shardingsphere.sharding.default-database-strategy.inline.sharding-column=id
spring.shardingsphere.sharding.default-database-strategy.inline.algorithm-expression=ds$->{id % 2}

# 绑定表  user
spring.shardingsphere.sharding.binding-tables=user

# 使用SNOWFLAKE算法生成主键
spring.shardingsphere.sharding.tables.user.key-generator.column=id
spring.shardingsphere.sharding.tables.user.key-generator.type=SNOWFLAKE

# 非自定义配置
#  user 分表策略
#spring.shardingsphere.sharding.tables.user.actual-data-nodes=ds$->{0..1}.user_$->{0..1}
#  分表 id
#spring.shardingsphere.sharding.tables.user.table-strategy.inline.sharding-column=age
#  分表策略  id 取模
#spring.shardingsphere.sharding.tables.user.table-strategy.inline.algorithm-expression=user_$->{age % 2}
```

### 2.1.4 代码测试

```
@Resource
private UserService userService;

// 新增测试
@Test
public void testInsert() {
    for (int i = 0; i < 20; i++) {
        User user = new User();
        user.setName("张三");
        user.setAge(11);
        user.setCreateTime(new Date());
        userService.save(user);
    }
}

// 更新测试
@Test
public void testUpdate() {
    User user = new User();
    user.setId(1370681228566134785L);
    user.setAge(12);
    user.setName("1111");
    // 不能更新分片字段
    //user.setCreateTime(new Date());
    userService.updateById(user);
}

// 删除测试
@Test
public void testDelete() {
	userService.removeById(1368486339065597954L);
}

// 单个查询测试
@Test
public void testSelect1() {
    User user = userService.getById(1370681228566134785L);
    System.out.println("=============" + user);
}

// 按条件查询测试
@Test
public void testSelect2() {
    QueryWrapper<User> wrapper = new QueryWrapper<User>();
    wrapper.eq("name", "张三");
    List<User> list = userService.list(wrapper);
    System.out.println(list);
    System.out.println(list.size());
}

// 分页、条件、排序查询
@Test
public void testSelect3() {
    Page<User> page = new Page<>(0, 10);
    page.setAsc("create_time");
    QueryWrapper<User> wrapper = new QueryWrapper<User>();
    wrapper.eq("name", "张三");
    IPage<User> pageList = userService.page(page, wrapper);
    for (int i = 0; i < pageList.getRecords().size(); i++) {
    	System.out.println("==============" + pageList.getRecords().get(i));
    }
}
```

### 2.1.5 自定义分片策略

#### 2.1.5.1 自定义分库策略

```
public class DBShardingAlgorithm implements PreciseShardingAlgorithm<Long> {

    @Override
    public String doSharding(Collection<String> availableTargetNames, PreciseShardingValue<Long> shardingValue) {

        System.out.println("DB  PreciseShardingAlgorithm  ");
        // 真实节点
        availableTargetNames.stream().forEach((item) -> {
            System.out.println(String.format("actual node db:%s", item));
        });

        System.out.println(String.format("logic table name:%s,rout column:%s", shardingValue.getLogicTableName(), shardingValue.getColumnName()));

        //精确分片
        System.out.println(String.format("column value:%s", shardingValue.getValue()));

        long db_index = shardingValue.getValue() % 2;

        for (String each : availableTargetNames) {
            if (each.equals("ds" + db_index)) {
                return each;
            }
        }
        throw new IllegalArgumentException();
    }
}
```

#### 2.1.5.2 自定义分表策略

```
package com.hy.shardingsphere.support;

import org.apache.shardingsphere.api.sharding.standard.PreciseShardingAlgorithm;
import org.apache.shardingsphere.api.sharding.standard.PreciseShardingValue;

import java.util.Collection;
import java.util.Date;

public class TableShardingAlgorithm implements PreciseShardingAlgorithm<Date> {
    @Override
    public String doSharding(Collection<String> availableTargetNames, PreciseShardingValue<Date> shardingValue) {

        System.out.println("table PreciseShardingAlgorithm ");
        // 真实节点
        availableTargetNames.stream().forEach((item) -> {
            System.out.println(String.format("actual node table:%s", item));
        });

        System.out.println(String.format("logic table name:%s,rout column:%s", shardingValue.getLogicTableName(), shardingValue.getColumnName()));

        //精确分片
        System.out.println(String.format("column value:%s", shardingValue.getValue()));


        String tb_name = shardingValue.getLogicTableName() + "_";


        // 根据当前日期 来 分库分表
        Date date = shardingValue.getValue();
        String year = String.format("%tY", date);
        String mon = String.format("%tm", date);
        String dat = String.format("%td", date);


        // 选择表
        tb_name = tb_name + year + "_" + mon.replaceAll("^(0+)", "");
        System.out.println("tb_name:" + tb_name);

        for (String each : availableTargetNames) {
            if (each.equals(tb_name)) {
                return each;
            }
        }

        throw new IllegalArgumentException();
    }
}

```

#### 2.1.5.3 配置种指定自定义策略

```
spring.shardingsphere.sharding.tables.user.actual-data-nodes=ds$->{0..1}.user_$->{2021}_$->{3}
# 自定义 分片算法
# 分库分片健      database-strategy 数据库策略
spring.shardingsphere.sharding.tables.user.database-strategy.standard.sharding-column=id
# 自定义 分片 策略
spring.shardingsphere.sharding.tables.user.database-strategy.standard.precise-algorithm-class-name=com.hy.shardingsphere.support.DBShardingAlgorithm
# table-strategy   表 的 策略
spring.shardingsphere.sharding.tables.user.table-strategy.standard.sharding-column=create_time
spring.shardingsphere.sharding.tables.user.table-strategy.standard.precise-algorithm-class-name=com.hy.shardingsphere.support.TableShardingAlgorithm
```

# 3. Sharding-Proxy

## 3.1 分库分表

### 3.1.1 下载Sharding-Proxy并安装

- 下载地址：https://shardingsphere.apache.org/document/current/cn/downloads/

- 下载后直接解压即可
- 需要将对应数据库的驱动包拷贝到 **lib** 目录下  

### 3.1.2 系统配置

修改conf/server.yaml配置Sharding-Proxy系统配置

```
authentication:
  users:
    root:
      password: root  #root用户密码
    sharding:	#其他用户的配置
      password: sharding 
      authorizedSchemas: sharding_db  #该用户能够访问的数据库
```

### 3.1.3 分片配置

harding-Proxy 将 分片配置提取到了 config-sharding.yaml 里面,配置和 sharding-jdbc基本一样

```
schemaName: sharding_db  #数据库名字

dataSources:
  ds0:
    url: jdbc:mysql://localhost:3306/ds0?useUnicode=true&characterEncoding=UTF-8&autoReconnect=true&serverTimezone=Asia/Shanghai
    username: root
    password: 123456
    connectionTimeoutMilliseconds: 30000
    idleTimeoutMilliseconds: 60000
    maxLifetimeMilliseconds: 1800000
    maxPoolSize: 50
  ds1:
    url: jdbc:mysql://localhost:3306/ds1?useUnicode=true&characterEncoding=UTF-8&autoReconnect=true&serverTimezone=Asia/Shanghai
    username: root
    password: 123456
    connectionTimeoutMilliseconds: 30000
    idleTimeoutMilliseconds: 60000
    maxLifetimeMilliseconds: 1800000
    maxPoolSize: 50

# 分片规则
shardingRule:
  tables:
    user:
      actualDataNodes: ds$->{0..1}.user_$->{0..1}  # 
      tableStrategy:  # 配置表分片
        inline:
          shardingColumn: age #按照age字段分片
          algorithmExpression: user_$->{age % 2}   # 分片规则
      keyGenerator:
        type: SNOWFLAKE # id生成算法 雪花算法
        column: id      # 主键列
  bindingTables:
    - user
  defaultDatabaseStrategy:  # 配置库分片
    inline:
      shardingColumn: id
      algorithmExpression: ds$->{id % 2}
  defaultTableStrategy:
    none:
```

### 3.1.4 启动 Sharding-Proxy

```
windows: bin/start.bat
linux: start.sh

注意: Sharding-Proxy启动默认端口为 3307 启动时可指定
windows: start.bat 3308
linux : start.sh 3308
```

### 3.1.5 测试

项目的数据库连接改为连接Sharding-Proxy 后插入数据,数据能够正常添加。

### 3.1.6 自定义分片策略

- 按照Sharding-JDBC的方式开发自定义分片策略类项目
- 将该项目打成jar包
- 将jar包丢到proxy的lib目录下
- 配置如下

```
schemaName: sharding_db

dataSources:
  ds0:
    url: jdbc:mysql://localhost:3306/ds0?useUnicode=true&characterEncoding=UTF-8&autoReconnect=true&serverTimezone=Asia/Shanghai
    username: root
    password: 123456
    connectionTimeoutMilliseconds: 30000
    idleTimeoutMilliseconds: 60000
    maxLifetimeMilliseconds: 1800000
    maxPoolSize: 50
  ds1:
    url: jdbc:mysql://localhost:3306/ds1?useUnicode=true&characterEncoding=UTF-8&autoReconnect=true&serverTimezone=Asia/Shanghai
    username: root
    password: 123456
    connectionTimeoutMilliseconds: 30000
    idleTimeoutMilliseconds: 60000
    maxLifetimeMilliseconds: 1800000
    maxPoolSize: 50

shardingRule:
  tables:
    user:
      actualDataNodes: ds$->{0..1}.user_$->{2021}_$->{3}
      tableStrategy:
        standard:   # 区别在这里  指定自定义分片字段和自定义分片策略类
          shardingColumn: create_time
          preciseAlgorithmClassName: com.hy.shardingsphere.support.TableShardingAlgorithm
      keyGenerator:
        type: SNOWFLAKE
        column: id
  bindingTables:
    - user
  defaultDatabaseStrategy:
    inline:
      shardingColumn: id
      algorithmExpression: ds$->{id % 2}
  defaultTableStrategy:
    none:
```