# VuePress 基于 Vue 的静态网站生成器

## 介绍

VuePress 由两部分组成：第一部分是一个[极简静态网站生成器 (opens new window)](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/core)，它包含由 Vue 驱动的[主题系统](https://vuepress.vuejs.org/zh/theme/)和[插件 API](https://vuepress.vuejs.org/zh/plugin/)，另一个部分是为书写技术文档而优化的[默认主题](https://vuepress.vuejs.org/zh/theme/default-theme-config.html)，它的诞生初衷是为了支持 Vue 及其子项目的文档需求。

每一个由 VuePress 生成的页面都带有预渲染好的 HTML，也因此具有非常好的加载性能和搜索引擎优化（SEO）。同时，一旦页面被加载，Vue 将接管这些静态内容，并将其转换成一个完整的单页应用（SPA），其他的页面则会只在用户浏览到的时候才按需加载。

[VuePress官网](https://vuepress.vuejs.org/zh/)

## Markdown详解

Markdown 是一种轻量级标记语言，创始人为约翰·格鲁伯（John Gruber）和亚伦·斯沃茨（Aaron Swartz）。它允许人们“使用易读易写的纯文本格式编写文档，然后转换成有效的XHTML(或者HTML)文档

::: danger
最好就是直接在最后写个`<Vssue />`就可以了，系统会默认把当前页面标题传到github，并且创建一个评论。自定义标题比较麻烦，还容易重名。
:::

### 一、标题

#### 说明：

\#后面跟的内容就是标题，一个#就是一级标题，有几个#就是几级标题，例如2级标题就有两个##，markdown的2级和3级标题会默认自动作为子目录， 注意：#后面必须有个空格，然后再跟内容，否则#就是普通字符

####  示例：

```
# 这是一级标题
## 这是二级标题，二级标题底下有横线
### 这是三级标题
#### 这是四级标题
##### 这是五级标题
###### 这是六级标题
```

::: warning
最好就是直接在最后写个`<Vssue />`就可以了，系统会默认把当前页面标题传到github，并且创建一个评论。自定义标题比较麻烦，还容易重名。
:::

### 二、字体

#### 说明：

- **加粗**	：要加粗的文字左右分别用两个*号包起来
- **斜体**：要倾斜的文字左右分别用一个*号包起来
- **斜体加粗**：要倾斜和加粗的文字左右分别用三个*号包起来
- **删除线**：要加删除线的文字左右分别用两个~~号包起来

####  示例：

```
**这是加粗的文字**<br/>
*这是倾斜的文字*`<br/>
***这是斜体加粗的文字***<br/>
~~这是加删除线的文字~~<br/>
```

#### 效果：

**这是加粗的文字**
*这是倾斜的文字*`
***这是斜体加粗的文字***
~~这是加删除线的文字~~

### 三、引用

#### 说明：

在引用的文字前加>即可。引用也可以嵌套，如加两个>>三个>>>

#### 示例：

```md
>这是1级引用的内容

>>这是2级引用的内容

>>>这是3级引用的内容
```

#### 效果：

> 这是1级引用的内容

> > 这是2级引用的内容

> > > 这是3级引用的内容

### 四、分割线

#### 说明：

三个或者三个以上的 - 或者 * 都可以。111111顶顶顶

#### 示例：

```md
开始分割线
***
使用3个或者多个“*”的分割线

---
使用3个或者多个“-”的分割线
```

::: warning 警告
注：在三个或者多个“-”的上面加文字的话会自动变成2级标题，所以要么空一行要么就使用“*”
:::

#### 效果：

开始分割线

------

使用3个或者多个“*”的分割线

------

使用3个或者多个“-”的分割线

### 五、图片

#### 说明：

格式：“![图片alt] (图片地址 "图片title")”，含义分别如下：

**图片alt**：就是显示在图片下面的文字，相当于对图片内容的解释。

**图片地址**:可以是本地路径的图片，也可以是网络上的图片

**图片title**：是图片的标题，当鼠标移到图片上时显示的内容。title可加可不加

::: danger 警告：
中括号与小括号之间是没有空格的，参考示例
:::

#### 示例：

```md
本地图片
![图片火影忍者](./img/huoying.jpeg "火影忍者")
网络图片
![vue官网logo](https://cn.vuejs.org/images/logo.png "vue官网logo")
```

#### 效果：

本地图片

![图片火影忍者](https://www.moyundong.com/moyundong/image/frontend/vuepress/huoying.jpeg)

网络图片

![vue官网logo](https://dss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=3417302627,3804776716&fm=218&app=122&f=PNG?w=121&h=75&s=0FA1E800A8B6C9BD49582D53030090B2)

::: warning 警告
上面的写法，vuepress里面完全是没有问题的，简书也没有问题，但有些博客网站这样写会失效，比如CSDN（时好时坏，之前发布的文章有时候图片能看有时候不行）， 想要在CSDN里面也使用图片，那么用`<img src="https://cn.vuejs.org/images/logo.png" />`这种方式就可以了。这种方式vuepress也可以用，但是直接使用标签简书不行。
:::

### 六、超链接

#### 说明：

格式：[超链接名] (超链接地址 "超链接title") 注：title可加可不加

::: warning 警告
中括号与小括号之间是没有空格的，参考示例
:::

#### 示例：

```md
[java乐园](http://www.moyundong.com)
[简书](http://jianshu.com)
[百度](http://baidu.com)
```

#### 效果：

[java乐园(opens new window)](http://www.moyundong.com/)<br/>
[简书(opens new window)](http://jianshu.com/)<br/>
[百度](http://baidu.com/)

### 七、内部链接

#### 说明：

网站内部的链接，将会被转换成 `<router-link>`用于 SPA 导航。同时，站内的每一个文件夹下的`README.md`或者 index.md 文件都会被自动编译为`index.html`，对应的链接将被视为`/`。

#### 示例：

```md
以如下的文件结构为例：
.
├─ README.md
├─ foo
│  ├─ README.md
│  ├─ one.md
│  └─ two.md
└─ bar
   ├─ README.md
   ├─ three.md
   └─ four.md
```

#### 效果：

```md
假设你现在在 foo/one.md 中：
[Home](/) <!-- 跳转到根部的 README.md -->
[foo](/foo/) <!-- 跳转到 foo 文件夹的 index.html -->
[foo](./two) <!-- 跳转到 two 文件 -->
[foo heading](./#heading) <!-- 跳转到 foo/index.html 的特定标题位置 -->
[bar - three](../bar/three.md) <!-- 具体文件可以使用 .md 结尾（推荐） -->
[bar - four](../bar/four.html) <!-- 也可以用 .html -->
```

### 八、列表

#### 说明：

- **无序列表**：无序列表用 - + * 任何一种加上一个空格再加内容就可以了
- **有序列表**：数字加点空格加内容
- **列表嵌套**：第二行缩进两个空格就可以嵌套了

#### 示例：

```md
无序列表
- 列表内容1
+ 列表内容2
* 列表内容3
有序列表
1. 列表内容
2. 列表内容
3. 列表内容
列表嵌套
+ 一级无序列表内容1
   1. 二级有序列表内容11
   2. 二级有序列表内容12
   3. 二级有序列表内容13
+ 一级无序列表内容2
   1. 二级有序列表内容21
   2. 二级有序列表内容22
   3. 二级有序列表内容23
```

#### 效果：

无序列表

- 列表内容1

- 列表内容2

- 列表内容3

有序列表

1. 列表内容
2. 列表内容
3. 列表内容

列表嵌套

- 一级无序列表内容1
  1. 二级有序列表内容11
  2. 二级有序列表内容12
  3. 二级有序列表内容13
- 一级无序列表内容2
  1. 二级有序列表内容21
  2. 二级有序列表内容22
  3. 二级有序列表内容23

### 九、表格

#### 说明：

```md
表头|表头|表头
---|:--:|---:
内容|内容|内容
内容|内容|内容

-第二行分割表头和内容。- 有一个就行，为了书写对齐，多加了几个，内容会自动撑开表格宽度
-文字默认居左
-在第二行“--”两边加“：”表示文字居中
-在第二行“--”右边加“：”表示文字居右
```

#### 示例：

```md
姓名|年龄|国家
----|:--:|--:
内容默认居左|内容居中|内容居右
张三|19|中华人民共和国
李四|29|中国
王麻子|18|中华人民共和国
```

#### 效果：

| 姓名         |   年龄   |           国家 |
| ------------ | :------: | -------------: |
| 内容默认居左 | 内容居中 |       内容居右 |
| 张三         |    19    | 中华人民共和国 |
| 李四         |    29    |           中国 |
| 王麻子       |    18    | 中华人民共和国 |

### 十、代码块儿

#### 说明：

- **单行代码**：代码之间分别用一个反引号（`）包起来就行，或者只要开头的反引号
- **代码块儿**：
  1. 代码块儿是用一组三个反引号包起来，
  2. 指定代码块儿的类型，三个反引号后面加个空格再加类型，类型如java，html，js，md等等。（可选）
  3. 指定某一行高亮显示，在类型后面加个花括号，里面指定数字就可以，数字可以是一个{6}，也可以是一个范围{2-8}。（可选）

#### 示例：

```md
单行代码：
`create database test;`
代码块：
(``` js {3-6})
  function show(){
           console.log("这里是js代码");
           console.log("这一行是高亮的");
           console.log("这一行是高亮的");
           console.log("这一行是高亮的");
      }
(```)
注：实际中去掉两边小括号。为了防止转译，前后三个反引号处加了小括号，实际是没有的。
```

#### 效果：

单行代码： `create database test;`

代码块：

```js
    function show(){
         console.log("这里是js代码");
         console.log("这一行是高亮的");
         console.log("这一行是高亮的");
         console.log("这一行是高亮的");
    }
```

### 十一、文字位置

#### 说明：

默认文字都是左对齐的（例如本句话），想要居中和右对齐需要手动添加

#### 示例：

```md
居中：
<center>文字居中</center>
右对齐：
<p align="right">右对齐</p>
```

#### 效果：

**居中**：

<center>文字居中</center>

**右对齐**：

<p align="right">右对齐</p>

### 十二、提示信息

#### 说明：

提示信息是用一组三个冒号包起来的，第一行冒号加一个空格后面跟提示级别，再加个空格后面跟别名。

- 级别分别如下：
  1. tip 提示
  2. warning 警告
  3. danger 危险警告
  4. details 详情

#### 示例：

```md
::: tip 提示
这是一个tip，使用了别名“提示”
:::
::: warning
这是一个warning，没有使用别名
:::
::: danger
这是一个danger，没有使用别名
:::
::: details 请看详情
这是一个details，使用了别名“请看详情”
:::
```

#### 效果：

::: tip 提示
这是一个tip，使用了别名“提示”
:::
::: warning
这是一个warning，没有使用别名
:::
::: danger
这是一个danger，没有使用别名
:::
::: details 请看详情
这是一个details，使用了别名“请看详情”
:::

### 十三、Emoji表情

#### 说明：

所有表情都是一个符号，[表情符号对应表下载](http://www.moyundong.com/moyundong/download/frontend/vuepress/emoji.zip)

#### 示例：

```md
想使用表情，之间在md文件里面使用表情符号就可以了
  :tada: 
  :100: 
  :game_die:
```

#### 效果：

:tada:  💯 🎲

### 十四、显示代码块行号

#### 说明：

在config.js做如下配置就可以了

```js
module.exports = {
  markdown: {
    lineNumbers: true
  }
}
```

### 十五、显示目录

#### 说明：

一般在最顶部使用，显示这一篇文章的目录。

#### 示例：

```md
[[toc]]
直接在文档里面写一个[[top]]就可以生成目录
```

#### 效果：

[[toc]]

## 评论插件vssue

### 选择评论插件vssue

由于你的页面是“静态”的，你没有数据库和后端 API 的支持。但是你希望让你的页面拥有评论功能，让用户可以登录和发表评论。 代码托管平台（如 Github、Gitlab、Bitbucket、Coding 等平台，**示例选择了github**）提供了 OAuth API ， 在它们的帮助下，Vssue 可以让用户通过这些平台的帐号登录，将评论存储在这些平台的 Issue 系统中，并在当前页面展示。

### 安装

```sh
npm install @vssue/vuepress-plugin-vssue
npm install @vssue/api-github-v3 或者 npm install @vssue/api-github-v4
```

### 配置

```js
// .vuepress/config.js

module.exports = {
  plugins: {
    '@vssue/vuepress-plugin-vssue': {
      platform: 'github', //v3的platform是github，v4的是github-v4
      locale: 'zh', //语言
      // 其他的 Vssue 配置
      owner: 'OWNER_OF_REPO', //github账户名
      repo: 'NAME_OF_REPO', //github一个项目的名称
      clientId: 'YOUR_CLIENT_ID',//注册的Client ID
      clientSecret: 'YOUR_CLIENT_SECRET',//注册的Client Secret
      autoCreateIssue:true // 自动创建评论，默认是false，最好开启，这样首次进入页面的时候就不用去点击创建评论的按钮了。
    },
  },
};
```

::: tip 提示
@vssue/api-github-v3 和@vssue/api-github-v4的区别是v3不用登录，但是有调用次数限制，v4必须登录但没有次数限制 v3的platform是github，v4的是github-v4 用的是github的评论功能，所以必须有github账号
:::

### 如何获取clientId和clientSecret

#### 第一步：

登录github后点击 settings

![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/vuepress7-1.png)

#### 第二步：

点击 Developer settings

![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/vuepress7-2.png)

#### 第三步：

点击 New OAuth App

![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/vuepress7-3.png)

#### 第四步：

点击注册按钮

![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/vuepress7-4.png)

#### 第五步：

这里的`Client ID`和`Client Secret`就是我们想要的了。

![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/vuepress7-5.png)

### 页面添加评论功能

在*.md文件底部加上`<Vssue />`或者`<Vssue title="自定义名字" />`就可以了，示例如下：

```md
<!-- README.md -->
# Vssue Demo

<Vssue title="test评论" />
```

或者

```md
<!-- README.md -->
---
title: 页面标题
---
# Vssue Demo

<Vssue  />
```

::: warning
最好就是直接在最后写个`<Vssue />`就可以了，系统会默认把当前页面标题传到github，并且创建一个评论。自定义标题比较麻烦，还容易重名。
:::

### 实际效果

实际效果就是本页面可以评论

<Vssue  />