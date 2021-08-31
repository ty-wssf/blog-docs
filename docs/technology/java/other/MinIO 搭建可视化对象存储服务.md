# MinIO 搭建可视化对象存储服务

## 什么是 MinIO

> MinIO 是一款基于 Go 语言高性能，兼容 S3 的对象存储服务。相对于 OSS、AWS S3 这类第三方对象存储服务，MinIO 可以在自己服务器搭建，并携带可视化界面。

## 安装 MinIO

###  使用 Docker 安装 MinIO

#### 下载 MinIO 的 Docker 镜像

```docker
docker pull minio/minio
```

#### 运行 MinIO 服务

```docker
docker run -p 9000:9000 -p 9001:9001 --name minio \
  -v /mydata/minio/data1:/data1 \
  -v /mydata/minio/data2:/data2 \
  -v /mydata/minio/data3:/data3 \
  -v /mydata/minio/data4:/data4 \
  -v /mydata/minio/config:/root/.minio \
  -e "MINIO_ROOT_USER=root" \
  -e "MINIO_ROOT_PASSWORD=minio123456789" \
  -d minio/minio server /data1 /data2 /data3 /data4 \
  --console-address ':9001'
```

- `--console-address`指定 MinIO Console 可视化界面端口，`MINIO_ROOT_USER`和`MINIO_ROOT_PASSWORD`不能太短

### windows 安装MinIO

#### 下载 MinIO.exe 文件

```docker
http://dl.minio.org.cn/server/minio/release/windows-amd64/
```

#### 运行 MinIO 服务

```docker
docker run -p 9000:9000 -p 9001:9001 --name minio \
  -v /mydata/minio/data1:/data1 \
  -v /mydata/minio/data2:/data2 \
  -v /mydata/minio/data3:/data3 \
  -v /mydata/minio/data4:/data4 \
  -v /mydata/minio/config:/root/.minio \
  -e "MINIO_ROOT_USER=root" \
  -e "MINIO_ROOT_PASSWORD=minio123456789" \
  -d minio/minio server /data1 /data2 /data3 /data4 \
  --console-address ':9001'
```

## MinIO Console 的简单使用

### 进入 MinIO Console 可视化界面

- 浏览器访问自己服务器9000端口或9001端口即可进入界面

![QQ截图20210820145414.png](https://gitee.com/wuyilong/picture-bed/raw/master//img/cfb1184d464543e291603c11d1ebd09b~tplv-k3u1fbpfcp-watermark.png)

- 输入运行时设置的`MINIO_ROOT_USER`和`MINIO_ROOT_PASSWORD`即可，默认都是minioadmin

### 创建一个存储桶

![创建.png](https://gitee.com/wuyilong/picture-bed/raw/master//img/0c3ae62c7ec34501871da649c742cb42~tplv-k3u1fbpfcp-watermark.png)

### 上传文件

1. 进入存储桶

![11.png](https://gitee.com/wuyilong/picture-bed/raw/master//img/5835860e87f947699597d207a172e153~tplv-k3u1fbpfcp-watermark.png)

1. 点击上传文件

![1111.png](https://gitee.com/wuyilong/picture-bed/raw/master//img/eac5b6af6bb54613bd0fb44e838244fa~tplv-k3u1fbpfcp-watermark.png)

### 公开访问图片

1. 将存储桶策略改为 public

![33333333333.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/460f4161b2e84900a2d1d7b09d0e012b~tplv-k3u1fbpfcp-watermark.awebp)

![4444444.png](https://gitee.com/wuyilong/picture-bed/raw/master//img/d83b09385f61438cbd0f98b7cc34a597~tplv-k3u1fbpfcp-watermark.png)

- 这里只有两种模式可以调整，其实应该还有其他很多策略

1. 访问图片分享链接红色框的链接即可下载

![55555555.png](https://gitee.com/wuyilong/picture-bed/raw/master//img/9ff9cfd3fb044ee0b4f6dc1becf1de94~tplv-k3u1fbpfcp-watermark.png)

### 注意

- MinIO Console 还在快速迭代之中，基本一两个星期可能看到的界面就不一样了。

## MinIO 纠删码

### 什么是纠删码？

- 纠删码（erasure code）是一种恢复丢失和损坏数据的数学算法， Minio采用Reed-Solomon code将对象拆分成N/2数据和N/2 奇偶校验块。 这就意味着如果是12块盘，一个对象会被分成6个数据块、6个奇偶校验块，你可以丢失任意6块盘（不管其是存放的数据块还是奇偶校验块），你仍可以从剩下的盘中的数据进行恢复。

### 体验 MinIO 纠删码功能

1. 上传一些图片

![tttttttt.png](https://gitee.com/wuyilong/picture-bed/raw/master//img/53fc9b872bd54c2395a72a77efbe7ff4~tplv-k3u1fbpfcp-watermark.png)

1. 我们一开始已经使用纠删码运行了MinIO，创建了四个数据磁盘，直接删除其中两个磁盘

![bbbbbbbbbb.png](https://gitee.com/wuyilong/picture-bed/raw/master//img/a17e8c27c0d94cd698702ec9c471968e~tplv-k3u1fbpfcp-watermark.png)

1. 再次查看图片，发现可以正常读写
2. 重新启动，恢复磁盘

```docker
docker restart minio
```


作者：木仔建
链接：https://juejin.cn/post/7002149564450865160
来源：掘金