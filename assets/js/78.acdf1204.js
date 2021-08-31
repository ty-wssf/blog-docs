(window.webpackJsonp=window.webpackJsonp||[]).push([[78],{495:function(a,t,e){"use strict";e.r(t);var i=e(30),r=Object(i.a)({},(function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("h1",{attrs:{id:"minio-搭建可视化对象存储服务"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#minio-搭建可视化对象存储服务"}},[a._v("#")]),a._v(" MinIO 搭建可视化对象存储服务")]),a._v(" "),e("h2",{attrs:{id:"什么是-minio"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#什么是-minio"}},[a._v("#")]),a._v(" 什么是 MinIO")]),a._v(" "),e("blockquote",[e("p",[a._v("MinIO 是一款基于 Go 语言高性能，兼容 S3 的对象存储服务。相对于 OSS、AWS S3 这类第三方对象存储服务，MinIO 可以在自己服务器搭建，并携带可视化界面。")])]),a._v(" "),e("h2",{attrs:{id:"安装-minio"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#安装-minio"}},[a._v("#")]),a._v(" 安装 MinIO")]),a._v(" "),e("h3",{attrs:{id:"使用-docker-安装-minio"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#使用-docker-安装-minio"}},[a._v("#")]),a._v(" 使用 Docker 安装 MinIO")]),a._v(" "),e("h4",{attrs:{id:"下载-minio-的-docker-镜像"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#下载-minio-的-docker-镜像"}},[a._v("#")]),a._v(" 下载 MinIO 的 Docker 镜像")]),a._v(" "),e("div",{staticClass:"language-docker extra-class"},[e("pre",{pre:!0,attrs:{class:"language-docker"}},[e("code",[a._v("docker pull minio/minio\n")])])]),e("h4",{attrs:{id:"运行-minio-服务"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#运行-minio-服务"}},[a._v("#")]),a._v(" 运行 MinIO 服务")]),a._v(" "),e("div",{staticClass:"language-docker extra-class"},[e("pre",{pre:!0,attrs:{class:"language-docker"}},[e("code",[a._v('docker run -p 9000:9000 -p 9001:9001 --name minio \\\n  -v /mydata/minio/data1:/data1 \\\n  -v /mydata/minio/data2:/data2 \\\n  -v /mydata/minio/data3:/data3 \\\n  -v /mydata/minio/data4:/data4 \\\n  -v /mydata/minio/config:/root/.minio \\\n  -e "MINIO_ROOT_USER=root" \\\n  -e "MINIO_ROOT_PASSWORD=minio123456789" \\\n  -d minio/minio server /data1 /data2 /data3 /data4 \\\n  --console-address \':9001\'\n')])])]),e("ul",[e("li",[e("code",[a._v("--console-address")]),a._v("指定 MinIO Console 可视化界面端口，"),e("code",[a._v("MINIO_ROOT_USER")]),a._v("和"),e("code",[a._v("MINIO_ROOT_PASSWORD")]),a._v("不能太短")])]),a._v(" "),e("h3",{attrs:{id:"windows-安装minio"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#windows-安装minio"}},[a._v("#")]),a._v(" windows 安装MinIO")]),a._v(" "),e("h4",{attrs:{id:"下载-minio-exe-文件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#下载-minio-exe-文件"}},[a._v("#")]),a._v(" 下载 MinIO.exe 文件")]),a._v(" "),e("div",{staticClass:"language-docker extra-class"},[e("pre",{pre:!0,attrs:{class:"language-docker"}},[e("code",[a._v("http://dl.minio.org.cn/server/minio/release/windows-amd64/\n")])])]),e("h4",{attrs:{id:"运行-minio-服务-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#运行-minio-服务-2"}},[a._v("#")]),a._v(" 运行 MinIO 服务")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("## 单机\nminio.exe server D:\\minioData\n")])])]),e("h2",{attrs:{id:"minio-console-的简单使用"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#minio-console-的简单使用"}},[a._v("#")]),a._v(" MinIO Console 的简单使用")]),a._v(" "),e("h3",{attrs:{id:"进入-minio-console-可视化界面"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#进入-minio-console-可视化界面"}},[a._v("#")]),a._v(" 进入 MinIO Console 可视化界面")]),a._v(" "),e("ul",[e("li",[a._v("浏览器访问自己服务器9000端口或9001端口即可进入界面")])]),a._v(" "),e("p",[e("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master//img/cfb1184d464543e291603c11d1ebd09b~tplv-k3u1fbpfcp-watermark.png",alt:"QQ截图20210820145414.png"}})]),a._v(" "),e("ul",[e("li",[a._v("输入运行时设置的"),e("code",[a._v("MINIO_ROOT_USER")]),a._v("和"),e("code",[a._v("MINIO_ROOT_PASSWORD")]),a._v("即可，默认都是minioadmin")])]),a._v(" "),e("h3",{attrs:{id:"创建一个存储桶"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#创建一个存储桶"}},[a._v("#")]),a._v(" 创建一个存储桶")]),a._v(" "),e("p",[e("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master//img/0c3ae62c7ec34501871da649c742cb42~tplv-k3u1fbpfcp-watermark.png",alt:"创建.png"}})]),a._v(" "),e("h3",{attrs:{id:"上传文件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#上传文件"}},[a._v("#")]),a._v(" 上传文件")]),a._v(" "),e("ol",[e("li",[a._v("进入存储桶")])]),a._v(" "),e("p",[e("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master//img/5835860e87f947699597d207a172e153~tplv-k3u1fbpfcp-watermark.png",alt:"11.png"}})]),a._v(" "),e("ol",[e("li",[a._v("点击上传文件")])]),a._v(" "),e("p",[e("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master//img/eac5b6af6bb54613bd0fb44e838244fa~tplv-k3u1fbpfcp-watermark.png",alt:"1111.png"}})]),a._v(" "),e("h3",{attrs:{id:"公开访问图片"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#公开访问图片"}},[a._v("#")]),a._v(" 公开访问图片")]),a._v(" "),e("ol",[e("li",[a._v("将存储桶策略改为 public")])]),a._v(" "),e("p",[e("img",{attrs:{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/460f4161b2e84900a2d1d7b09d0e012b~tplv-k3u1fbpfcp-watermark.awebp",alt:"33333333333.png"}})]),a._v(" "),e("p",[e("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master//img/d83b09385f61438cbd0f98b7cc34a597~tplv-k3u1fbpfcp-watermark.png",alt:"4444444.png"}})]),a._v(" "),e("ul",[e("li",[a._v("这里只有两种模式可以调整，其实应该还有其他很多策略")])]),a._v(" "),e("ol",[e("li",[a._v("访问图片分享链接红色框的链接即可下载")])]),a._v(" "),e("p",[e("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master//img/9ff9cfd3fb044ee0b4f6dc1becf1de94~tplv-k3u1fbpfcp-watermark.png",alt:"55555555.png"}})]),a._v(" "),e("h3",{attrs:{id:"注意"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#注意"}},[a._v("#")]),a._v(" 注意")]),a._v(" "),e("ul",[e("li",[a._v("MinIO Console 还在快速迭代之中，基本一两个星期可能看到的界面就不一样了。")])]),a._v(" "),e("h2",{attrs:{id:"minio-纠删码"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#minio-纠删码"}},[a._v("#")]),a._v(" MinIO 纠删码")]),a._v(" "),e("h3",{attrs:{id:"什么是纠删码"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#什么是纠删码"}},[a._v("#")]),a._v(" 什么是纠删码？")]),a._v(" "),e("ul",[e("li",[a._v("纠删码（erasure code）是一种恢复丢失和损坏数据的数学算法， Minio采用Reed-Solomon code将对象拆分成N/2数据和N/2 奇偶校验块。 这就意味着如果是12块盘，一个对象会被分成6个数据块、6个奇偶校验块，你可以丢失任意6块盘（不管其是存放的数据块还是奇偶校验块），你仍可以从剩下的盘中的数据进行恢复。")])]),a._v(" "),e("h3",{attrs:{id:"体验-minio-纠删码功能"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#体验-minio-纠删码功能"}},[a._v("#")]),a._v(" 体验 MinIO 纠删码功能")]),a._v(" "),e("ol",[e("li",[a._v("上传一些图片")])]),a._v(" "),e("p",[e("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master//img/53fc9b872bd54c2395a72a77efbe7ff4~tplv-k3u1fbpfcp-watermark.png",alt:"tttttttt.png"}})]),a._v(" "),e("ol",[e("li",[a._v("我们一开始已经使用纠删码运行了MinIO，创建了四个数据磁盘，直接删除其中两个磁盘")])]),a._v(" "),e("p",[e("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master//img/a17e8c27c0d94cd698702ec9c471968e~tplv-k3u1fbpfcp-watermark.png",alt:"bbbbbbbbbb.png"}})]),a._v(" "),e("ol",[e("li",[a._v("再次查看图片，发现可以正常读写")]),a._v(" "),e("li",[a._v("重新启动，恢复磁盘")])]),a._v(" "),e("div",{staticClass:"language-docker extra-class"},[e("pre",{pre:!0,attrs:{class:"language-docker"}},[e("code",[a._v("docker restart minio\n")])])]),e("p",[a._v("作者：木仔建\n链接：https://juejin.cn/post/7002149564450865160\n来源：掘金")])])}),[],!1,null,null,null);t.default=r.exports}}]);