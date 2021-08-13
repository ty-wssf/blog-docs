# Linux下SpringBoot Jar 如何实现service服务

## 实现service服务

1. **确保目标服务器已经配置好Java运行环境**

```
# 检查jar环境
@ java -version
openjdk version "1.8.0_222"
OpenJDK Runtime Environment (build 1.8.0_222-b10)
OpenJDK 64-Bit Server VM (build 25.222-b10, mixed mode)
```

2. **上传jar到目标机器**

```
scp cloud-txlcn.jar root@192.168.2.101:/opt/cloud/txlcn
```

3. **建立软连接**

```
ln -s /opt/cloud/txlcn/cloud-txlcn/jar /etc/init.d/cloud-txlcn
# cloud-txcln服务名
```

4. **配置service相关信息**

```
# 启动应用
service cloud-txlcn start/stop
# 配置开机服务
systemctl enable cloud-txlcn
# 重启应用
systemctl restart cloud-txlcn
# 重启服务器
reboot
# 验证是否生效
ps aux|grep cloud-txlcn
root  5914 29.1 17.9 2272304 181856 pts/1  Sl   22:41   0:32 /bin/java -Dsun.misc.URLClassPath.disableJarChecking=true -jar /opt/cloud/tm/txlcn-tm-5.0.2.RELEASE.jar
```

## 问题

1. **使用service xxx start命令启动失败。**

   ```
   service xxx start
   /etc/init.d/cloud-txlcn: /etc/init.d/cloud-txlcn: cannot execute binary file
   ```

   > 原因就是打成的jar包不能自己执行 

   注意：在pom.xml中没有配置```<executable>true</executable>```，那么生成的jar包是没法自己执行的，只能通过java -jar xxx.jar执行。 或者 

   ```
   nohup java -Xms64m -Xmx256m -Xmn128m -Xss256k -jar sentinel-dashboard-1.6.3.jar logs/start.out 2>&1 &
   ```

2. **执行 service cloud-txlcn start 显示权限不够**

   ```
   service xxx start
   env: /etc/init.d/cloud-txlcn: 权限不够
   ```

   > 解决方法：chmod a+wrx /etc/init.d/cloud-txlcn 