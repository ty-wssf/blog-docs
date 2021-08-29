# Rust编程语言入门

## 简介

### 为什么要用Rust ?

- Rust是一种令人兴奋的新编程语言，它可以让每个人编写可靠且高效的软件。
- 它可以用来替换C/C++，Rust和它们具有同样的性能，但是很多常见的bug在编译时就可以被消灭。

- Rust是一-种通用的编程语言，但是它更善于以下场景:
  - 需要运行时的速度
  - 需要内存安全
  - 需要内存安全

### 与其它语言比较

- C/C++性能非常好，但类型系统和内存都不太安全。
- Java/C#， 拥有GC，能保证内存安全，也有很多优秀特性，但是性能不行。

- Rust:
  - 安全
  - 无需GC
  - 易于维护、调试，代码安全高效

### Rust特别擅长的领域

- 高性能Web Service
- WebAssembly
- 命令行工具
- 网络编程
- 嵌入式设备
- 系统编程

### Rust与Firefox
- Rust最初是Mozilla公司的-一个研究性项目。Firefox是Rust产品应用的一一个重要
  的例子。
- Moilla一直以来都在用Rust创建一个名为Servo的实验性浏览器引擎，其中的
  所有内容都是并行执行的。
  - 目前Servo的部分功能已经被集成到Firefox里面了

- Firefox原来的量子版就包含了Servo的CSS渲染引擎.
  - Rust使得Firefox在这方面得到了巨大的性能改进

### Rust的用户和案例
- Google:新操作系统Fuschia,其中Rust代码量大约占30% ,
- Amazon:基于Linux开发的直接可以在裸机、虚机上运行容器的操作系统
- System76: 纯Rust开发了下一-代安全操作系统Redox
- 蚂蚁金服:库操作系统Occlum
- 斯坦福和密歇根大学:嵌入式实时操作系统，应用于Google的加密产品
- 微软:正在使用Rust重写Windows系统中的一些低级组件。
- 微软: WinRT/Rust项目
- Dropbox、Yelp、 Coursera、 LINE、 Cloudflare、 Atlqssian、 npm、
  、Ceph、百度、华为、Sentry、Deno...

### Rust的优点

- 性能

- 安全性
- 无所畏惧的并发

### Rust的缺点

- 难学

### 注意

- Rust有很多独有的概念，它们和现在大多主流语言都不同。
- 所以学习Rust必须从基础概念-步一 步学，否则会懵。

## 安装 Rust

### 安装

- [官网](https://www.rust-lang.orgl) 
- Linux or Mac:
  - curl https://sh.rustup.rs -sSf| sh

- Windows: 按官网指示操作

- Windows Subsystem for Linux:
  - curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

### 更新与卸载 Rust

- 更新Rust
  - rustup update

- 卸载Rust
  - rustup self uninstall

### 安装验证
- rustc --version
  - 结果格式: rustc x.y.z (abcabcabc yyyy mm-dd)
  - 会显示最新稳定版的:版本号、commit hash、commit 日期

### 本地文档

- 安装Rust的时候，还会在本地安装文档，可离线浏览
- 运行rustup doc可在浏览器打开本地文档

### 开发工具
- Visual Studio Code
  - Rust插件

- Clion (Intellij Idea系列)
  - Rust插件

## Hello World

### 编写Rust程序

- 程序文件后缀名：rs

- 文件命名规范: hello_ world.rs

- (例子)

  ```rust
  fn main() {
      println!("Hello World" );
  }
  ```

### 编译与运行Rust程序

- 编译: `rustc main.rs`

- 运行:

  - Windows: `.\main.exe`

  - Linux/mac: `./main`

### Rust程序解剖

- 定义函数: `fn main(){}`
  - 没有参数，没有返回

- main函数很特别:它是每个Rust可执行程序最先运行的代码

- 打印文本: `println!("Hello, world!");`

  - Rust 的缩进是4个空格而不是tab

  - `printIn!`是一个`Rust macro` (宏)
    如果是函数的话，就没有!
  - “`Hello World`"是字符串，它是`printIn!` 的参数
    这行代码以`;`结尾

### 编译和运行是单独的两步

- 运行Rust程序之前必须先编译，命令为: `rustc` 源文件名
  - `rustc main.rs`

- 编译成功后，会生成一个二进制文件
  - 在Windows上还会生成一一个.pdb文件，里面包含调试信息

- Rust是`ahead-of-time`编译的语言
  - 可以先编译程序，然后把可执行文件交给别人运行(无需安装Rust)

- rustc只适合简单的Rust程序...
