# jQuery中封装ajax请求

## $.get()  get请求方式

有4个参数, url地址是必填参数, 其他参数都是选填参数

参数的形式是对象形式

```
$.get({
    url : 地址(必填)
    data : 携带的参数 对象形式
    dataType : 期望的数据类型,如果为json,会将后端返回的json串,自动解析
    success : function(){} 请求成功时执行的函数
})
```

## $.post()  post请求方式

有4个参数, url地址是必填参数, 其他参数都是选填参数

参数的形式是对象形式

```
$.post({
    url : 地址(必填)
    data : 携带的参数 对象形式
    dataType : 期望的数据类型,如果为json,会将后端返回的json串,自动解析
    success : function(){} 请求成功时执行的函数
})
```

## $.ajax()  综合方式

常规get,post请求(不是跨域), 常用参数

```
$.ajax({
    常用 :
    url : 地址;
    type / method : 请求方式 默认值是get方式
    data : { } 传参参数,必须是对象形式
    dataType : json, 设定为json,会自动解析反应提中的json串
    success : function(){} 请求成功执行的函数 

    不常用:
    async : 设定是否异步,默认值是true,异步执行ajax请求
    error : function(){} 请求错误时执行的函数, 请求成功时不会执行
    timeout : 设定时间,单位毫秒（必须是异步执行）, 如果请求时间超过设定的时间,认为是请求失败
    cache : 设定是否缓存请求结果, 默认值是 true,缓存请求结果必须是get方式,这个设定才起作用post方式不会缓存,设定也没有效果
    context : 指定执行函数中 this的指向
})
```