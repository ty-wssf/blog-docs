(window.webpackJsonp=window.webpackJsonp||[]).push([[79],{507:function(t,a,r){"use strict";r.r(a);var e=r(30),s=Object(e.a)({},(function(){var t=this,a=t.$createElement,r=t._self._c||a;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("h1",{attrs:{id:"typora-图床-码云"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#typora-图床-码云"}},[t._v("#")]),t._v(" Typora + 图床 + 码云")]),t._v(" "),r("h2",{attrs:{id:"_1-准备"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_1-准备"}},[t._v("#")]),t._v(" 1.准备")]),t._v(" "),r("h3",{attrs:{id:"_1-1-typora"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-typora"}},[t._v("#")]),t._v(" 1.1 Typora")]),t._v(" "),r("ol",[r("li",[t._v("需要下载 "),r("a",{attrs:{href:"https://www.typora.io/#windows",target:"_blank",rel:"noopener noreferrer"}},[t._v("Typora"),r("OutboundLink")],1),t._v(" 0.9.92以上版本的软件，这个自行去官网下载")])]),t._v(" "),r("h3",{attrs:{id:"_1-2-picgo"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-picgo"}},[t._v("#")]),t._v(" 1.2 PicGO")]),t._v(" "),r("ol",[r("li",[r("p",[t._v("需要下载 Picgo 2.2.2(推荐此版本)以上版本")])]),t._v(" "),r("li",[r("p",[t._v("还需要下载"),r("a",{attrs:{href:"http://nodejs.cn/download/",target:"_blank",rel:"noopener noreferrer"}},[t._v("nodejs"),r("OutboundLink")],1),t._v("(我的是14.7)，因为后续picgo安装插件的时候需要用到")])])]),t._v(" "),r("h2",{attrs:{id:"_2-码云"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-码云"}},[t._v("#")]),t._v(" 2.码云")]),t._v(" "),r("h3",{attrs:{id:"_2-1-新建仓库"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-新建仓库"}},[t._v("#")]),t._v(" 2.1 新建仓库")]),t._v(" "),r("p",[t._v("需要到我们远程服务器，创建一个默认仓库，用户存放图床的信息")]),t._v(" "),r("p",[r("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master/img/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTAyNDcxNjY=,size_16,color_FFFFFF,t_70",alt:"在这里插入图片描述"}})]),t._v(" "),r("p",[r("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master/img/2262499581f151695d290106f558bf24.png",alt:"image-20210115232437626"}})]),t._v(" "),r("h3",{attrs:{id:"_2-2-设置私密令牌"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-设置私密令牌"}},[t._v("#")]),t._v(" 2.2 设置私密令牌")]),t._v(" "),r("p",[t._v("选择“设置”，找到私人令牌，设置相关权限")]),t._v(" "),r("p",[r("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master/img/10f3185685562b71b73c9c12f2b7db11.png",alt:"image-20210115232654365"}})]),t._v(" "),r("p",[t._v("点击提交后，就可以生成我们需要的令牌了，"),r("strong",[t._v("注意：令牌生成后，需要记住下来，后续不会显示的")])]),t._v(" "),r("p",[r("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master/img/2f825485c45abbdfc1f74d958ea6873b.png",alt:"image-20210115232741906"}})]),t._v(" "),r("h2",{attrs:{id:"_3-picgo配置"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_3-picgo配置"}},[t._v("#")]),t._v(" 3.PicGo配置")]),t._v(" "),r("h3",{attrs:{id:"_3-1-插件下载"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-插件下载"}},[t._v("#")]),t._v(" 3.1 插件下载")]),t._v(" "),r("p",[t._v("下载如图插件即可")]),t._v(" "),r("p",[r("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master/img/42f337054c31d7b42da60c574342b44e.png",alt:"image-20210115232950071"}})]),t._v(" "),r("h3",{attrs:{id:"_3-2-gitee配置"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-gitee配置"}},[t._v("#")]),t._v(" 3.2 gitee配置")]),t._v(" "),r("p",[t._v("如图，只需要配置账户-仓库-路径-令牌，即可")]),t._v(" "),r("p",[r("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master/img/c071083818bb128b180fdb801c136b96.png",alt:"image-20210115233055210"}})]),t._v(" "),r("h3",{attrs:{id:"_3-3-服务器开启"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_3-3-服务器开启"}},[t._v("#")]),t._v(" 3.3 服务器开启")]),t._v(" "),r("p",[t._v("配置好本地服务器，这个服务器主要是用来服务器本地其他应用的，比如后续我要用Typora上传，Typora就会通过此服务中介来上传到我们的码云中，网上说有时候电脑重启，端口会变，后续若变了，则在这里重启设置成原来端口即可")]),t._v(" "),r("p",[r("img",{attrs:{src:"https://i.loli.net/2021/08/16/CmSJzd9ApuElwKT.png",alt:"image-20210816100434937"}})]),t._v(" "),r("p",[r("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master/img/aa8aad61eddb9db27f76a7c2e5622325.png",alt:"image-20210115233200642"}})]),t._v(" "),r("p",[r("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master/img/6e4fbcfd709681e58eb3d8bc543b8469.png",alt:"image-20210116102722930"}})]),t._v(" "),r("h2",{attrs:{id:"_4-typora配置"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_4-typora配置"}},[t._v("#")]),t._v(" 4.Typora配置")]),t._v(" "),r("h3",{attrs:{id:"_4-1-配置picgo"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-配置picgo"}},[t._v("#")]),t._v(" 4.1 配置PicGo")]),t._v(" "),r("p",[t._v("选择 文件-偏好设置，对图像进行配置即可")]),t._v(" "),r("p",[r("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master/img/769d2a15cff4d835d6ff65707ec2e223.png",alt:"image-20210115233942065"}})]),t._v(" "),r("p",[r("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master/img/53bce1c00f2a97b35d2f3c31c424cf97.png",alt:"image-20210115234136016"}})])])}),[],!1,null,null,null);a.default=s.exports}}]);