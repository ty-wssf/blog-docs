# Nexus搭建Maven私服
## 1. 什么是 Nexus
### 1.1 概述
Nexus 是一个强大的仓库管理器，极大地简化了内部仓库的维护和外部仓库的访问。

2016 年 4 月 6 日 Nexus 3.0 版本发布，相较 2.x 版本有了很大的改变：

- 对低层代码进行了大规模重构，提升性能，增加可扩展性以及改善用户体验。
- 升级界面，极大的简化了用户界面的操作和管理。
- 提供新的安装包，让部署更加简单。
- 增加对 Docker, NeGet, npm, Bower 的支持。
- 提供新的管理接口，以及增强对自动任务的管理。

## 2. 安装 Nexus

### 2.1 基于 Docker 安装 Nexus
我们使用 Docker 来安装和运行 Nexus，docker-compose.yml 配置如下：
```
version: '3.1'
services:
  nexus:
    restart: always
    image: sonatype/nexus3
    container_name: nexus
    ports:
      - 8081:8081
    volumes:
      - /usr/local/docker/nexus/data:/nexus-data
```
注： 启动时如果出现权限问题可以使用：chmod 777 /usr/local/docker/nexus/data 赋予数据卷目录可读可写的权限

## 2.2 登录控制台验证安装
地址：http://ip:port/ 用户名：admin 密码：admin123

![Nexus](https://gitee.com/wuyilong/picture-bed/raw/master/img/Nexus.png)

## 3. Maven 仓库介绍
### 3.1 代理仓库
意为第三方仓库，如：
- maven-central
- nuget.org-proxy

版本策略（Version Policy）：
- Release: 正式版本
- Snapshot: 快照版本
- Mixed: 混合模式

布局策略（Layout Policy）：
- Strict：严格
- Permissive：宽松

### 3.2 宿主仓库（Hosted Repository）
存储本地上传的组件和资源的，如：
- maven-releases
- maven-snapshots
- nuget-hosted

部署策略（Deployment Policy）：
- Allow Redeploy：允许重新部署
- Disable Redeploy：禁止重新部署
- Read-Only：只读

### 3.3 仓库组（Repository Group）
通常包含了多个代理仓库和宿主仓库，在项目中只要引入仓库组就可以下载到代理仓库和宿主仓库中的包，如：
- maven-public
- nuget-group

## 4. 在项目中使用 Maven 私服
### 4.1 配置认证信息
在 Maven settings.xml 中添加 Nexus 认证信息(servers 节点下)：
```
<server>
  <id>nexus-releases</id>
  <username>admin</username>
  <password>admin123</password>
</server>

<server>
  <id>nexus-snapshots</id>
  <username>admin</username>
  <password>admin123</password>
</server>
```

### 4.2 Snapshots 与 Releases 的区别
- nexus-releases: 用于发布 Release 版本
- nexus-snapshots: 用于发布 Snapshot 版本（快照版）
- 在项目 pom.xml 中设置的版本号添加 SNAPSHOT 标识的都会发布为 SNAPSHOT 版本，没有 SNAPSHOT 标识的都会发布为 RELEASE 版本。
- SNAPSHOT 版本会自动加一个时间作为标识，如：1.0.0-SNAPSHOT 发布后为变成 1.0.0-SNAPSHOT-20180522.123456-1.jar
- 使用场景:
    - snapshot：
      依赖库中的jar包正被开发中，
      依赖库中的jar包若处于不断更新，更准确的说是不停deploy时，包会被不断发布到私服，但版本号不需要修改，私服中会自动追加后缀时间为版本名，我们使用时，会自动load时间最近也即最新的版本，
      例子：格式：<version>1.0-snapshot</version>
    - release：
      依赖库中的jar包功能确定时，
      其他系统使用时，版本号不变，依赖包则不变，不会自动load最新版本，
      例子：<version>1.0</version>，去掉-snapshot即可

### 4.3 配置自动化部署
在 pom.xml 中添加如下代码：
```
<distributionManagement>  
  <repository>  
    <id>nexus-releases</id>  
    <name>Nexus Release Repository</name>  
    <url>http://127.0.0.1:8081/repository/maven-releases/</url>  
  </repository>  
  <snapshotRepository>  
    <id>nexus-snapshots</id>  
    <name>Nexus Snapshot Repository</name>  
    <url>http://127.0.0.1:8081/repository/maven-snapshots/</url>  
  </snapshotRepository>     
</distributionManagement>
```
注意事项：
- ID 名称必须要与 settings.xml 中 Servers 配置的 ID 名称保持一致。
- 项目版本号中有 SNAPSHOT 标识的，会发布到 Nexus Snapshots Repository, 否则发布到 Nexus Release Repository，并根据 ID 去匹配授权账号。

### 4.4 部署到仓库
```
mvn deploy
```

### 4.5 上传第三方 JAR 包
Nexus 3.0 不支持页面上传，可使用 maven 命令：
```
# 如第三方JAR包：aliyun-sdk-oss-2.2.3.jar
mvn deploy:deploy-file 
  -DgroupId=com.aliyun.oss 
  -DartifactId=aliyun-sdk-oss 
  -Dversion=2.2.3 
  -Dpackaging=jar 
  -Dfile=D:\aliyun-sdk-oss-2.2.3.jar 
  -Durl=http://127.0.0.1:8081/repository/maven-3rd/ 
  -DrepositoryId=nexus-releases
```
注意事项：
- 建议在上传第三方 JAR 包时，创建单独的第三方 JAR 包管理仓库，便于管理有维护。（maven-3rd）
- -DrepositoryId=nexus-releases 对应的是 settings.xml 中 Servers 配置的 ID 名称。（授权）

### 4.6 配置代理仓库
```
<repositories>
    <repository>
        <id>nexus</id>
        <name>Nexus Repository</name>
        <url>http://127.0.0.1:8081/repository/maven-public/</url>
        <snapshots>
            <enabled>true</enabled>
        </snapshots>
        <releases>
            <enabled>true</enabled>
        </releases>
    </repository>
</repositories>
<pluginRepositories>
    <pluginRepository>
        <id>nexus</id>
        <name>Nexus Plugin Repository</name>
        <url>http://127.0.0.1:8081/repository/maven-public/</url>
        <snapshots>
            <enabled>true</enabled>
        </snapshots>
        <releases>
            <enabled>true</enabled>
        </releases>
    </pluginRepository>
</pluginRepositories>
```