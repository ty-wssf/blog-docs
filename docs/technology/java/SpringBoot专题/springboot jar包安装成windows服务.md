# springboot jar包安装成windows服务（winsw）

## 下载

下载exe [winsw](https://github.com/winsw/winsw) 

## 服务安装

新建一个目录autService

在目录里面新建一个autService.xml,同时把winsw-2.3.0-bin.exe重命名陈autService.exe

必须这么做，否则无法安装启动服务。

编辑autService.xml文件

```
<?xml version="1.0" encoding="utf-8" ?>
<service>
	<!-- 服务id（必须唯一） -->
    <id>nongyeServer</id> <!-- must be unique -->
	<!-- 显示的服务名 -->
    <name>nongyeServer</name>
	<!-- 显示的服务描述 -->
    <description>服务描述</description>
    <executable>javaw</executable>
	<!-- 替换自己的jar -->
    <arguments>-jar "%BASE%\nongye.jar"</arguments>
    <logpath>%BASE%\log</logpath>
    <log mode="roll-by-time">
    <pattern>yyyy-MM-dd</pattern>   
    </log>
</service>
复制代码
```

**（注：此处注意，如果用的是文本编辑器修改，务必将编码格式换成Unicode编码）**

用管理方式启动控制台（cmd）,切换到该文件夹内

安装服务命令

`autService.exe install`

卸载服务命令

`autService.exe uninstall`

安装完，在系统服务里可以看到已经安装的服务

## winsw配置文件参数详解

```
id：指定Windows内部用于标识服务的id。在系统中安装的所有服务中必须是唯一的，并且应完全由字母数字字符组成。

executable：该元素指定要启动的可执行文件。它可以是绝对路径，也可以只指定可执行文件名称并从PATH中搜索

arguments：该标签指定的参数传递给可执行文件，多个参数以空格隔开

name：服务的简短显示名称，可以包含空格和其他字符。在系统的所有服务中也必须是唯一的。

description：对服务的完整人类可读描述。

startmode：该元素指定Windows服务的启动模式。它可以是以下值之一
    Boot：设备驱动程序由操作系统加载程序启动。此值仅对驱动程序服务有效。
    System：设备驱动程序由操作系统初始化过程启动。此值仅对驱动程序服务有效。
    Automatic：自动，服务控制管理器将在系统启动期间自动启动服务。
    Manual：手动，当进程调用StartService方法时，由服务控制管理器启动的服务。
    Disabled：禁用，无法再启动的服务。
    默认值为Automatic

delayedAutoStart：是否启用延迟启动模式(true或者false，需要startmode设置为Automatic)

depend：指定此服务依赖的其他服务的ID，仅在依赖的服务运行时此服务才能运行，可以使用多个标签指定多个依赖

logpath：指定在其中创建日志文件的目录，默认为配置文件所在的目录。

log：该标签的mode属性指定从启动过程中捕获stdout和stderr的几种不同方法：
    append：追加模式
    reset：重设模式，每次服务启动时，旧的日志文件都会被截断
    none：不生成任何日志文件
    roll-by-size：按日志文件大小滚动，日志大于指定大小后重新生成新的日志文件进行写入，日志文件名最后以阿拉伯数字区分
        嵌套sizeThreshold标签指定日志文件多大时生成新日志文件，单位为KB
        嵌套keepFiles标签指定最多要保留的日志文件数
    roll-by-time：按日志文件时间段滚动
        必须嵌套pattern标签指定日志文件名的时间标记格式，如yyyyMMdd HH:mm
    roll-by-size-time：按日志文件大小和时间模式滚动
        嵌套sizeThreshold标签指定日志文件多大时生成新日志文件，单位为KB
        嵌套pattern标签指定当日志文件文件名最后的区分字段格式(时间格式，如yyyyMMdd HH:mm)
        嵌套autoRollAtTime标签指定每天在指定时间进行日志滚动。如00:00:00表示每天凌晨进行日志滚动

stopexecutable：指定当请求停止服务时启动另一个进程的可执行文件，不提供默认使用executable指定的文件

stopargument：当请求停止服务时启动另一个进程时的参数

stopparentprocessfirst：是否在停止子进程之前终止父进程，默认true

waithint：指定多长时间内服务应该对SetServiceStatus函数进行下一次调用，否则会被标记为无响应，默认"15 sec"

sleeptime：服务两次调用SetServiceStatus函数的间隔时间，默认"1 sec"

prestart：预启动，服务启动时和主进程启动之前，将执行预启动命令
poststart：启动后，服务启动时和主进程启动后，将执行启动后命令
prestop：停止前，服务停止时和主进程停止之前，执行停止前命令
以上三个标签可以内部嵌套executable，arguments，stdoutPath，stderrPath等

preshutdown：是否关机前进行阻止立即关机，当启动时服务有更多时间停止

preshutdownTimeout：关机前超时，默认值为"3 min"

stoptimeout：停止超时时间
    当请求停止服务时，尝试向控制台应用程序发送Ctrl + C信号，或向Windows应用程序发布关闭消息，然后等待指定时间以使进程自行正常退出。
    如果超时到期或无法发送信号或消息，则会立即终止服务，默认值为"15sec"。

env：为子进程设置环境变量，可以使用多次从而设置多个变量
    单标签，听过name和value两个属性设置环境变的值

interactive：是否允许该服务与桌面进行交互

beeponshutdown：是否允许在服务关闭时发出简单的提示音，调试功能，某些系统或硬件不支持

download：服务包装程序从指定URL下载到本地。在启动服务时且启动服务程序之前运行
    from属性指定要下载文件的的url地址
    to属性指定下载到本地的文件名
    proxy属性指定代理，格式为"http://[USERNAME:PASSWORD@]HOST:PORT/"
    auth：身份验证，默认值为none(不验证)，为basic则表示使用基本身份验证
        当使用基本身份验证时需要额外的附加属性，user指定用户名，password指定密码
    failOnError：下载失败是否继续启动服务，默认true

onfailure：指定服务启动失败时的行为
    action属性指定行为，可选的值有restart(重启服务)，reboot(重启系统)和none
    delay属性指定服务启动失败多久后执行操作，默认为0。
    多个onfailure按失败顺序依次执行，当失败实数超过onfailure标签数量时，重复执行最后一个onfailure标签指定的操作。

resetfailure：重置故障计数的时间，如该标签值为"1 hour"表示服务持续正常运行超过一小时则故障计数会重置为0。

serviceaccount：指定服务运行时使用的账户，默认使用LocalSystem内置账户
    嵌套username标签指定用户名(格式DomainName\UserName或者UserName@DomainName)，当前内置域使用".\UserName"
        显示的使用内置账户(内置账户没有密码，即使提供密码也会被忽略)的几个值："LocalSystem"，"NT AUTHORITY\LocalService"，"NT AUTHORITY\NetworkService"，，
    嵌套password指定用户的密码
    嵌套allowservicelogon表示是否自动为指定帐户设置“允许作为服务登录”权限
    嵌套prompt表示提示输入用户名和密码，该值格式为<prompt>dialog|console</prompt>
        dialog：使用对话框提示
        console：在控制台上提示

workingdirectory：指定服务运行时的工作目录

autoRefresh：服务启动，停止，重启，测试(test)时是否自动刷新服务属性
```

 

 

 

 