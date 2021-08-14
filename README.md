# 本地启动服务
```$xslt
yarn docs:dev # npm run docs:dev
```
# pages
- GitHub pages
https://ty-wssf.github.io/blog-docs/

 # 页面添加评论功能

在*.md文件底部加上`<Vssue />`或者`<Vssue title="自定义名字" />`就可以了，示例如下：

```
<!-- README.md -->
# Vssue Demo

<Vssue title="test评论" />
```

或者

```
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