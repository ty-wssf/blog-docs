# 安装Redis

## Windows 安装 Redis(.msi)

### 下载

Github 下载地址：https://github.com/MicrosoftArchive/redis/tags

下载的时候下载 msi 安装文件：

![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/format9.png)

### 安装

1. 首先双击现在完的安装程序  

   ![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/redis1.png)

2. 点击 next

   ![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/format10.png)

3. 点击接受，继续 next

   ![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/format.png)

4. 设置 Redis 的服务端口，默认为 **6379**，默认就好，单击 next

   ![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/format2.png)

5. 选择安装的路径，并且打上勾（这个非常重要），添加到 path 是把 Redis 设置成 windows 下的服务，不然你每次都要在该目录下启动命令 redis-server redis.windows.conf，但是只要一关闭 cmd 窗口，redis 就会消失，这样就比较麻烦。

   ![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/format3.png)

6. 设置 Max Memory，然后 next 进入安装

   ![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/format4.png)

7. 安装完成

8. 测试所安装的Redis

   如果你是和我一样通过msi文件的安装，你可以在 “**计算机管理→服务与应用程序→服务**” 看到Redis正在运行

   ![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/format5.png)

   在 cmd 窗口进入Redis的安装路径的根目录

   输入命令 redis-server.exe redis.windows.conf，出现下图证明 Redis 服务启动成功：

![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/format6.png)

9. 下面进行测试：

   你可以在 Redis 的安装根目录下找到 redis-cli.exe 文件启动(我用的是这种方法)，或在 cmd 中先进入 Redis 的安装根目录用命令 redis-cli.exe -h 192.168.10.61 -p 6379（注意换成自己的 IP，本地可以是 127.0.0.1）的方式打开

   测试方法：设置键值对，取出键值对（我这里键值对是 peng）
   ![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/format7.png)