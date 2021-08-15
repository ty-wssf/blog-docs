# Typora + 图床 + 码云

## 1.准备
### 1.1 Typora
1. 需要下载 [Typora](https://www.typora.io/#windows) 0.9.92以上版本的软件，这个自行去官网下载

### 1.2 PicGO

1. 需要下载 Picgo 2.2.2(推荐此版本)以上版本

2. 还需要下载[nodejs](http://nodejs.cn/download/)(我的是14.7)，因为后续picgo安装插件的时候需要用到

## 2.码云

### 2.1 新建仓库

需要到我们远程服务器，创建一个默认仓库，用户存放图床的信息

![在这里插入图片描述](https://gitee.com/wuyilong/picture-bed/raw/master/img/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTAyNDcxNjY=,size_16,color_FFFFFF,t_70)



![image-20210115232437626](https://gitee.com/wuyilong/picture-bed/raw/master/img/2262499581f151695d290106f558bf24.png)

### 2.2 设置私密令牌

选择“设置”，找到私人令牌，设置相关权限

![image-20210115232654365](https://gitee.com/wuyilong/picture-bed/raw/master/img/10f3185685562b71b73c9c12f2b7db11.png)

点击提交后，就可以生成我们需要的令牌了，**注意：令牌生成后，需要记住下来，后续不会显示的**

![image-20210115232741906](https://gitee.com/wuyilong/picture-bed/raw/master/img/2f825485c45abbdfc1f74d958ea6873b.png)

## 3.PicGo配置

### 3.1 插件下载

下载如图插件即可

![image-20210115232950071](https://gitee.com/wuyilong/picture-bed/raw/master/img/42f337054c31d7b42da60c574342b44e.png)

### 3.2 gitee配置

如图，只需要配置账户-仓库-路径-令牌，即可

![image-20210115233055210](https://gitee.com/wuyilong/picture-bed/raw/master/img/c071083818bb128b180fdb801c136b96.png)

### 3.3 服务器开启

配置好本地服务器，这个服务器主要是用来服务器本地其他应用的，比如后续我要用Typora上传，Typora就会通过此服务中介来上传到我们的码云中，网上说有时候电脑重启，端口会变，后续若变了，则在这里重启设置成原来端口即可

![image-20210115233414759](C:\Users\Administrator\Desktop\新建文件夹\e8eadc100083b3021300820ddaad4a84.png)



![image-20210115233200642](https://gitee.com/wuyilong/picture-bed/raw/master/img/aa8aad61eddb9db27f76a7c2e5622325.png)



![image-20210116102722930](https://gitee.com/wuyilong/picture-bed/raw/master/img/6e4fbcfd709681e58eb3d8bc543b8469.png)

## 4.Typora配置

### 4.1 配置PicGo

选择 文件-偏好设置，对图像进行配置即可

![image-20210115233942065](https://gitee.com/wuyilong/picture-bed/raw/master/img/769d2a15cff4d835d6ff65707ec2e223.png)



![image-20210115234136016](https://gitee.com/wuyilong/picture-bed/raw/master/img/53bce1c00f2a97b35d2f3c31c424cf97.png)