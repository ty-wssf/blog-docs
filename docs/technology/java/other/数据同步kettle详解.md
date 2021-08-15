# 数据同步kettle详解

## 基础知识

### 什么是kettle

1. Kettle是一款国外开源的ETL工具，纯java编写，可以在Windows、Linux、Unix上运行，数据抽取高效稳定。
2. Kettle 中文名称叫水壶，该项目的主程序员MATT 希望把各种数据放到一个壶里，然后以一种指定的格式流出。
3. Kettle这个ETL工具集，它允许你管理来自不同数据库的数据，通过提供一个图形化的用户环境来描述你想做什么，而不是你想怎么做。
4. Kettle中有两种脚本文件，transformation和job，transformation完成针对数据的基础转换，job则完成整个工作流的控制。

提示

ETL（Extract-Transform-Load的缩写，即数据抽取（extract）、转换（transform）、装载（load）的过程），对于企业或行业应用来说，我们经常会遇到各种数据的 处理，转换，迁移，所以了解并掌握一种etl工具的使用是必不可少的。

### 下载和安装

1. 下载：kettle大约有1个G左右，找自己的版本下载，我下载的是7.1版本。[官网下载地址(opens new window)](https://sourceforge.net/projects/pentaho/files/Data Integration/)
2. 安装：下载kettle压缩包后（没看错，解压后目录为pdi-ce-7.1.0.0-12），因kettle为绿色软件，解压缩到任意本地路径即可。然后打开Spoon.bat（最好用管理员权限运行） ![img](https://www.moyundong.com/moyundong/image/commontools/kettle/kettle1.png)

### 转换示例说明

如何把数据库`A`里面表`A-1`的数据同步到数据库`B`里面的表`A-1`

#### 创建转换

在最左侧转换上右键,新建一个转换 ![img](https://www.moyundong.com/moyundong/image/commontools/kettle/kettle2.png)

TIP

**说明**：转换的意思就是我们可以在这里做很多的数据转换，我们可以把数据库`A`里面的表`A-1`的数据转换到数据库`B`里面的`A-1`里面（表名不同没关系，字段关系对应好就可以）， 也可以把数据库`A`里面的表`A-1`,`A-2`,`A-3`的数据结合起来转换到数据库`B`里面。

#### 创建数据库连接

1. 切换到“主对象树”下，在“DB连接”目录上右键选择新建一个DB ![img](https://www.moyundong.com/moyundong/image/commontools/kettle/kettle3.png)
2. 填写数据库信息

- 选择自己的数据库类型（我选择的是`sqlserver`）
- 把相应数据库类型的jdbcjar包放到kettle的lib目录下（我的是`mssql-jdbc-6.4.0.jre8.jar`），放完jar包应该重启kettle
- 根据实际情况填写自己数据库的连接信息，连接名称自己定义
- 信息填写完成可以点击测试，如果配置正确就能连接成功，如果错误会有错误信息提示，根据提示修改配置信息。 ![img](https://www.moyundong.com/moyundong/image/commontools/kettle/kettle4.png)

1. 创建多个数据库连接，方便测试使用 ![img](https://www.moyundong.com/moyundong/image/commontools/kettle/kettle5.png)

#### 创建输入

1. 左侧切换到“核心对象”
2. 创建输入，如下图所示，直接拖入组件就可以 ![img](https://www.moyundong.com/moyundong/image/commontools/kettle/kettle6.png)
3. 双击右侧面板刚拖入的“表输入”编辑表输入

- 输入步骤名称，例如“T_Alarm表输入”
- 选择数据库连接，这个数据库就是我们第一步创建的数据库（master数据库）
- 获取sql查询语句里面会把我们选择的整个数据库查出来，我们可以选择我们要的表（选择后会把这个的查询语句显示出来，我们也可以修改查询语句），也可以在sql里面自定义查询语句，其实这里可以看成是数据来源的sql语句，和正常sql写法一样。 ![img](https://www.moyundong.com/moyundong/image/commontools/kettle/kettle7.png)

#### 创建输出

1. 在核心对象选择输入菜单，选择插入/更新组件（根据需要可以选择别的），这个组件的功能就可以实现数据的插入和更新。
2. 编辑输出

- 输入步骤名称，例如“T_Alarm插入 / 更新”
- 选择数据库连接，这个数据库就是我们第一步创建的数据库（client数据库）
- 点击浏览选择目标表
- 查询关键字，点击获取字段，然后根据实际情况筛选（这个的类似于主键的作用一样）
- 更新字段，点击获取更新字段，可以自定义筛选，选中的就是要更新的字段 ![img](https://www.moyundong.com/moyundong/image/commontools/kettle/kettle8.png)

#### 连线

鼠标放到输入表上面，会出现如下图所示工具，点击就可以连线

 ![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/kettle9.png) 连成效果图如下 ![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/kettle10.png)

#### 保存转换

一个转换就做好了，ctrl+s保存，会生成一个ktr文件，我们保存在本地就可以，以后可以随时打开使用

#### 运行转换

点击运行按钮就会开始执行，并且只会执行一次。执行结果就是把源数据库`master`选中的表`T_Alarm`数据同步到目标数据库`client`中指定的表`T_Alarm`中 ![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/kettle11.png)

### 作业示例说明

5秒钟执行上面的转换一次

TIP

如果我们想定时执行上面的转换呢，我们就得创建一个作业，可以把作业想象成是一个转换集合，并且作业里面还可以包含作业。我们可以控制这些转换的执行时间，执行顺序等等

#### 创建作业

1. 与新建转换一样，都是在左上角点击新建作业就可以。
2. 在作业里面创建转换：在作业的核心对象里面，选择通用，选择转换组件 ![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/kettle12.png)
3. 双击编辑作业

- 作业名称自己定义
- 点击浏览选择刚才创建的转换 ![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/kettle13.png)

#### 创建开始按钮

1. 如图直接拖动 ![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/kettle14.png)

2. 连线，与转换里面的连线方法一样，效果如下图

    ![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/kettle15.png)

3. 编辑start，双击start根据自己事情情况选择作业调度的方式 ![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/kettle16.png)

#### 保存作业

保存作业会生成一个`.kjb`文件，以后可以直接打开使用

#### 运行作业

点击运行按钮，kettle就会按照我们设计好的功能去同步数据。 ![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/kettle17.png)

## kettle如何共享数据库

配置数据库变量及共享数据库，有时候我们设计的“作业”或者“转换”要在不同的服务器使用，如果数据库配置都是写死的，那么我们还得修改数据库配置。 这样太麻烦了，幸好我们可以配置全局的数据库变量

1. 首先我们在把c盘用户（当前登录的用户）目录下的.kettle文件夹剪切到data-integration目录下，然后用管理员权限运行kettle

WARNING

这里有个问题，有时候移动后会重新生成一个.kettle文件夹，之前移动的还是不起作用，如果遇到这种情况，我们就干脆不移动了， 直接修改C盘用户目录下.kettle文件夹里面的文件就可以了。

2. 创建数据库连接，参数`${变量名}`的方式写例如`${client.server}` ![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/kettle18.png)

3. 点击保存后会在.kettle文件夹下生成一些文件，如下图所示 ![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/kettle19.png)

4. 在kettle.properties文件里面配置具体的数据库信息，注意名字和我们之前配置的要一致，也就是与${}里面的值一样 ![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/kettle20.png)

5. 配置完数据库后，关闭kettle，用管理员权限再重新启动kettle，这样就配置好了

6. 共享数据库，配置好的数据库可以点击右键共享，这样就可以在任意转换和作业里面使用我们配置的数据库了。

## kettle如何实时同步数据

实际应用中，有些表的数据只新增，不修改，比如测点温度的历史数据，每分钟存一次。 如果只需要增量插入数据，并且有写入数据的时间字段的情况。可以根据上次同步时间查询出没有被同步的数据，然后把这些 数据同步到目标数据库里面。具体做法如下：

1. 创建一个表输入，名字为“获取T_Result上次同步时间”，选择的是目标数据库，查询的sql就是当前已经同步的数据的最新时间（MAX(datetime)）， 里面有个判断，如果查询出来是null，我就给一个最小的默认值。我使用的是sqlserver，不同的数据库使用不同的语句，大家根据自己实际情况填写。

```
select case when MAX(datetime) is null   
            then   '2010-10-20 10:20:20.000'   
            else   MAX(datetime)    
            end   as   maxtime     
from   T_Result
```

![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/kettle21.png) 2. 创建一个输入表“T_Result表输入”，数据库选择的是源数据库，sql就是普通的sql查表语句，只不过后面加了一个条件`where datetime > ?`， 这个`？`就是变量，我们选择"替换sql里面的变量"，“从步骤插入数据”选择第一步的“输入取T_Result上次同步时间”，其实第一步就是给我们查询了一个maxtime，这个就是已经更新的最新时间。 ![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/kettle22.png) 3. 创建一个输出表“T_Result表输出”，这个就不用“插入更新”了，直接表输出就行了。选择目标数据库，选择相应的表 ![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/kettle23.png) 4. 连线，最后把线连接好，这个转换就做好了。连线方法同前面讲的一样。

::: tip 提示
我们只讲了kettle的最基本的用法，他的功能还很强大，有需要的朋友可以再继续研究。知识永远是学不完的，哪些知识学到什么程度我们应该心里清楚。
:::