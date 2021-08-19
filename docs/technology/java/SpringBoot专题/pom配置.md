# pom配置

## 配置阿里镜像仓库

```xml
<!-- 配置阿里镜像仓库 -->
<repositories>
    <repository>
        <id>maven-ali</id>
        <url>https://maven.aliyun.com/repository/public</url>
        <!-- 是否开启发布版构件下载 -->	
        <releases>
            <enabled>true</enabled>
        </releases>
        <!-- 是否开启快照版构件下载 -->
        <snapshots>
            <enabled>true</enabled>
            <updatePolicy>always</updatePolicy>
            <checksumPolicy>fail</checksumPolicy>
        </snapshots>
    </repository>
</repositories>
```

## 统一编译jdk版本

```xml
<!-- 统一编译jdk版本 -->
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <configuration>
                <source>${java.version}</source>
                <target>${java.version}</target>
                <encoding>${project.build.sourceEncoding}</encoding>
            </configuration>
        </plugin>
    </plugins>
</build>
```

