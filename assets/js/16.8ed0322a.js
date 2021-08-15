(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{445:function(a,e,t){"use strict";t.r(e);var s=t(30),r=Object(s.a)({},(function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"dockerfile-指令详解"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#dockerfile-指令详解"}},[a._v("#")]),a._v(" Dockerfile 指令详解")]),a._v(" "),t("h2",{attrs:{id:"常用指令"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#常用指令"}},[a._v("#")]),a._v(" 常用指令")]),a._v(" "),t("h3",{attrs:{id:"_1-from-指定基础镜像"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-from-指定基础镜像"}},[a._v("#")]),a._v(" 1 FROM 指定基础镜像")]),a._v(" "),t("p",[a._v("FROM 指令用于指定其后构建新镜像所使用的基础镜像。FROM 指令必是 Dockerfile 文件中的首条命令，启动构建流程后，Docker 将会基于该镜像构建新镜像，FROM 后的命令也会基于这个基础镜像。")]),a._v(" "),t("p",[a._v("FROM语法格式为：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("FROM <image>\n")])])]),t("p",[a._v("或")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("FROM <image>:<tag>\n")])])]),t("p",[a._v("或")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("FROM <image>:<digest>\n")])])]),t("p",[a._v("通过 FROM 指定的镜像，可以是任何有效的基础镜像。FROM 有以下限制：")]),a._v(" "),t("ul",[t("li",[a._v("FROM 必须 是 Dockerfile 中第一条非注释命令")]),a._v(" "),t("li",[a._v("在一个 Dockerfile 文件中创建多个镜像时，FROM 可以多次出现。只需在每个新命令 FROM 之前，记录提交上次的镜像 ID。")]),a._v(" "),t("li",[a._v("tag 或 digest 是可选的，如果不使用这两个值时，会使用 latest 版本的基础镜像")])]),a._v(" "),t("h3",{attrs:{id:"_2-run-执行命令"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-run-执行命令"}},[a._v("#")]),a._v(" 2 RUN 执行命令")]),a._v(" "),t("p",[a._v("在镜像的构建过程中执行特定的命令，并生成一个中间镜像。格式:")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v('#shell格式\nRUN <command>\n#exec格式\nRUN ["executable", "param1", "param2"]\n')])])]),t("ul",[t("li",[a._v("RUN 命令将在当前 image 中执行任意合法命令并提交执行结果。命令执行提交后，就会自动执行 Dockerfile 中的下一个指令。")]),a._v(" "),t("li",[a._v("层级 RUN 指令和生成提交是符合 Docker 核心理念的做法。它允许像版本控制那样，在任意一个点，对 image 镜像进行定制化构建。")]),a._v(" "),t("li",[a._v("RUN 指令创建的中间镜像会被缓存，并会在下次构建中使用。如果不想使用这些缓存镜像，可以在构建时指定 "),t("code",[a._v("--no-cache")]),a._v(" 参数，如："),t("code",[a._v("docker build --no-cache")]),a._v("。")])]),a._v(" "),t("h3",{attrs:{id:"_3-copy-复制文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-copy-复制文件"}},[a._v("#")]),a._v(" 3 COPY 复制文件")]),a._v(" "),t("p",[a._v("格式：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v('COPY <源路径>... <目标路径>\nCOPY ["<源路径1>",... "<目标路径>"]\n')])])]),t("p",[a._v("和 RUN 指令一样，也有两种格式，一种类似于命令行，一种类似于函数调用。COPY 指令将从构建上下文目录中 <源路径> 的文件/目录复制到新的一层的镜像内的"),t("code",[a._v("<目标路径>")]),a._v("位置。比如：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("COPY package.json /usr/src/app/\n")])])]),t("p",[t("code",[a._v("<源路径>")]),a._v("可以是多个，甚至可以是通配符，其通配符规则要满足 Go 的 filepath.Match 规则，如：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("COPY hom* /mydir/\nCOPY hom?.txt /mydir/\n")])])]),t("p",[t("code",[a._v("<目标路径>")]),a._v("可以是容器内的绝对路径，也可以是相对于工作目录的相对路径（工作目录可以用 WORKDIR 指令来指定）。目标路径不需要事先创建，如果目录不存在会在复制文件前先行创建缺失目录。")]),a._v(" "),t("p",[a._v("此外，还需要注意一点，使用 COPY 指令，源文件的各种元数据都会保留。比如读、写、执行权限、文件变更时间等。这个特性对于镜像定制很有用。特别是构建相关文件都在使用 Git 进行管理的时候。")]),a._v(" "),t("h3",{attrs:{id:"_4-add-更高级的复制文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-add-更高级的复制文件"}},[a._v("#")]),a._v(" 4 ADD 更高级的复制文件")]),a._v(" "),t("p",[a._v("ADD 指令和 COPY 的格式和性质基本一致。但是在 COPY 基础上增加了一些功能。比如"),t("code",[a._v("<源路径>")]),a._v("可以是一个 URL，这种情况下，Docker 引擎会试图去下载这个链接的文件放到"),t("code",[a._v("<目标路径>")]),a._v("去。")]),a._v(" "),t("p",[a._v("在构建镜像时，复制上下文中的文件到镜像内，格式：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v('ADD <源路径>... <目标路径>\nADD ["<源路径>",... "<目标路径>"]\n')])])]),t("p",[t("strong",[a._v("注意")]),a._v("\n如果 docker 发现文件内容被改变，则接下来的指令都不会再使用缓存。关于复制文件时需要处理的/，基本跟正常的 copy 一致")]),a._v(" "),t("h3",{attrs:{id:"_5-env-设置环境变量"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_5-env-设置环境变量"}},[a._v("#")]),a._v(" 5 ENV 设置环境变量")]),a._v(" "),t("p",[a._v("格式有两种：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("ENV <key> <value>\nENV <key1>=<value1> <key2>=<value2>...\n")])])]),t("p",[a._v("这个指令很简单，就是设置环境变量而已，无论是后面的其它指令，如 RUN，还是运行时的应用，都可以直接使用这里定义的环境变量。")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v('ENV VERSION=1.0 DEBUG=on \\\n    NAME="Happy Feet"\n')])])]),t("p",[a._v("这个例子中演示了如何换行，以及对含有空格的值用双引号括起来的办法，这和 Shell 下的行为是一致的。")]),a._v(" "),t("h3",{attrs:{id:"_6-expose"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_6-expose"}},[a._v("#")]),a._v(" 6 EXPOSE")]),a._v(" "),t("p",[a._v("为构建的镜像设置监听端口，使容器在运行时监听。格式：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("EXPOSE <port> [<port>...]\n")])])]),t("p",[a._v("EXPOSE 指令并不会让容器监听 host 的端口，如果需要，需要在 docker run 时使用 "),t("code",[a._v("-p")]),a._v("、"),t("code",[a._v("-P")]),a._v(" 参数来发布容器端口到 host 的某个端口上。")]),a._v(" "),t("h3",{attrs:{id:"_7-volume-定义匿名卷"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_7-volume-定义匿名卷"}},[a._v("#")]),a._v(" 7 VOLUME 定义匿名卷")]),a._v(" "),t("p",[a._v("VOLUME用于创建挂载点，即向基于所构建镜像创始的容器添加卷：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v('VOLUME ["/data"]\n')])])]),t("p",[a._v("一个卷可以存在于一个或多个容器的指定目录，该目录可以绕过联合文件系统，并具有以下功能：")]),a._v(" "),t("ul",[t("li",[a._v("卷可以容器间共享和重用")]),a._v(" "),t("li",[a._v("容器并不一定要和其它容器共享卷")]),a._v(" "),t("li",[a._v("修改卷后会立即生效")]),a._v(" "),t("li",[a._v("对卷的修改不会对镜像产生影响")]),a._v(" "),t("li",[a._v("卷会一直存在，直到没有任何容器在使用它")])]),a._v(" "),t("p",[a._v("VOLUME 让我们可以将源代码、数据或其它内容添加到镜像中，而又不并提交到镜像中，并使我们可以多个容器间共享这些内容。")]),a._v(" "),t("h3",{attrs:{id:"_8-workdir-指定工作目录"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_8-workdir-指定工作目录"}},[a._v("#")]),a._v(" 8 WORKDIR 指定工作目录")]),a._v(" "),t("p",[a._v("WORKDIR用于在容器内设置一个工作目录：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("WORKDIR /path/to/workdir\n")])])]),t("p",[a._v("通过WORKDIR设置工作目录后，Dockerfile 中其后的命令 RUN、CMD、ENTRYPOINT、ADD、COPY 等命令都会在该目录下执行。 如，使用WORKDIR设置工作目录：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("WORKDIR /a\nWORKDIR b\nWORKDIR c\nRUN pwd\n")])])]),t("p",[a._v("在以上示例中，pwd 最终将会在 "),t("code",[a._v("/a/b/c")]),a._v(" 目录中执行。在使用 docker run 运行容器时，可以通过"),t("code",[a._v("-w")]),a._v("参数覆盖构建时所设置的工作目录。")]),a._v(" "),t("h3",{attrs:{id:"_9-user-指定当前用户"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_9-user-指定当前用户"}},[a._v("#")]),a._v(" 9 USER 指定当前用户")]),a._v(" "),t("p",[a._v("USER 用于指定运行镜像所使用的用户：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("USER daemon\n")])])]),t("p",[a._v("使用USER指定用户时，可以使用用户名、UID 或 GID，或是两者的组合。以下都是合法的指定试：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("USER user\nUSER user:group\nUSER uid\nUSER uid:gid\nUSER user:gid\nUSER uid:group\n")])])]),t("p",[a._v("使用USER指定用户后，Dockerfile 中其后的命令 RUN、CMD、ENTRYPOINT 都将使用该用户。镜像构建完成后，通过 docker run 运行容器时，可以通过 "),t("code",[a._v("-u")]),a._v(" 参数来覆盖所指定的用户。")]),a._v(" "),t("h3",{attrs:{id:"_10-cmd"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_10-cmd"}},[a._v("#")]),a._v(" 10 CMD")]),a._v(" "),t("p",[a._v("CMD用于指定在容器启动时所要执行的命令。CMD 有以下三种格式：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v('CMD ["executable","param1","param2"]\nCMD ["param1","param2"]\nCMD command param1 param2\n')])])]),t("p",[a._v("省略可执行文件的 exec 格式，这种写法使 CMD 中的参数当做 ENTRYPOINT 的默认参数，此时 ENTRYPOINT 也应该是 exec 格式，具体与 ENTRYPOINT 的组合使用，参考 ENTRYPOINT。")]),a._v(" "),t("p",[t("strong",[a._v("注意")]),a._v("\n与 RUN 指令的区别：RUN 在构建的时候执行，并生成一个新的镜像，CMD 在容器运行的时候执行，在构建时不进行任何操作。")]),a._v(" "),t("h3",{attrs:{id:"_11-entrypoint"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_11-entrypoint"}},[a._v("#")]),a._v(" 11 ENTRYPOINT")]),a._v(" "),t("p",[a._v("ENTRYPOINT 用于给容器配置一个可执行程序。也就是说，每次使用镜像创建容器时，通过 ENTRYPOINT 指定的程序都会被设置为默认程序。ENTRYPOINT 有以下两种形式：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v('ENTRYPOINT ["executable", "param1", "param2"]\nENTRYPOINT command param1 param2\n')])])]),t("p",[a._v("ENTRYPOINT 与 CMD 非常类似，不同的是通过"),t("code",[a._v("docker run")]),a._v("执行的命令不会覆盖 ENTRYPOINT，而"),t("code",[a._v("docker run")]),a._v("命令中指定的任何参数，都会被当做参数再次传递给 ENTRYPOINT。Dockerfile 中只允许有一个 ENTRYPOINT 命令，多指定时会覆盖前面的设置，而只执行最后的 ENTRYPOINT 指令。")]),a._v(" "),t("p",[t("code",[a._v("docker run")]),a._v("运行容器时指定的参数都会被传递给 ENTRYPOINT ，且会覆盖 CMD 命令指定的参数。如，执行"),t("code",[a._v("docker run <image> -d")]),a._v("时，-d 参数将被传递给入口点。")]),a._v(" "),t("p",[a._v("也可以通过"),t("code",[a._v("docker run --entrypoint")]),a._v("重写 ENTRYPOINT 入口点。如：可以像下面这样指定一个容器执行程序：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v('ENTRYPOINT ["/usr/bin/nginx"]\n')])])]),t("p",[a._v("完整构建代码：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v('# Version: 0.0.3\nFROM ubuntu:16.04\nMAINTAINER 何民三 "cn.liuht@gmail.com"\nRUN apt-get update\nRUN apt-get install -y nginx\nRUN echo \'Hello World, 我是个容器\' \\ \n   > /var/www/html/index.html\nENTRYPOINT ["/usr/sbin/nginx"]\nEXPOSE 80\n')])])]),t("p",[a._v("使用docker build构建镜像，并将镜像指定为 itbilu/test：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v('docker build -t="itbilu/test" .\n')])])]),t("p",[a._v("构建完成后，使用itbilu/test启动一个容器：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v('docker run -i -t  itbilu/test -g "daemon off;"\n')])])]),t("p",[a._v("在运行容器时，我们使用了 "),t("code",[a._v('-g "daemon off;"')]),a._v("，这个参数将会被传递给 ENTRYPOINT，最终在容器中执行的命令为 "),t("code",[a._v('/usr/sbin/nginx -g "daemon off;"')]),a._v("。")]),a._v(" "),t("h3",{attrs:{id:"_12-label"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_12-label"}},[a._v("#")]),a._v(" 12 LABEL")]),a._v(" "),t("p",[a._v("LABEL用于为镜像添加元数据，元数以键值对的形式指定：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("LABEL <key>=<value> <key>=<value> <key>=<value> ...\n")])])]),t("p",[a._v("使用LABEL指定元数据时，一条LABEL指定可以指定一或多条元数据，指定多条元数据时不同元数据之间通过空格分隔。推荐将所有的元数据通过一条LABEL指令指定，以免生成过多的中间镜像。 如，通过LABEL指定一些元数据：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v('LABEL version="1.0" description="这是一个Web服务器" by="IT笔录"\n')])])]),t("p",[a._v("指定后可以通过docker inspect查看：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v('docker inspect itbilu/test\n"Labels": {\n    "version": "1.0",\n    "description": "这是一个Web服务器",\n    "by": "IT笔录"\n},\n')])])]),t("h3",{attrs:{id:"_13-arg"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_13-arg"}},[a._v("#")]),a._v(" 13 ARG")]),a._v(" "),t("p",[a._v("ARG用于指定传递给构建运行时的变量：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("ARG <name>[=<default value>]\n")])])]),t("p",[a._v("如，通过ARG指定两个变量：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("ARG site\nARG build_user=IT笔录\n")])])]),t("p",[a._v("以上我们指定了 site 和 build_user 两个变量，其中 build_user 指定了默认值。在使用 docker build 构建镜像时，可以通过 "),t("code",[a._v("--build-arg <varname>=<value>")]),a._v(" 参数来指定或重设置这些变量的值。")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("docker build --build-arg site=itiblu.com -t itbilu/test .\n")])])]),t("p",[a._v("这样我们构建了 itbilu/test 镜像，其中site会被设置为 itbilu.com，由于没有指定 build_user，其值将是默认值 IT 笔录。")]),a._v(" "),t("h3",{attrs:{id:"_14-onbuild"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_14-onbuild"}},[a._v("#")]),a._v(" 14 ONBUILD")]),a._v(" "),t("p",[a._v("ONBUILD用于设置镜像触发器：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("ONBUILD [INSTRUCTION]\n")])])]),t("p",[a._v("当所构建的镜像被用做其它镜像的基础镜像，该镜像中的触发器将会被钥触发。 如，当镜像被使用时，可能需要做一些处理：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("[...]\nONBUILD ADD . /app/src\nONBUILD RUN /usr/local/bin/python-build --dir /app/src\n[...]\n")])])]),t("h3",{attrs:{id:"_15-stopsignal"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_15-stopsignal"}},[a._v("#")]),a._v(" 15 STOPSIGNAL")]),a._v(" "),t("p",[a._v("STOPSIGNAL用于设置停止容器所要发送的系统调用信号：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("STOPSIGNAL signal\n")])])]),t("p",[a._v("所使用的信号必须是内核系统调用表中的合法的值，如：SIGKILL。")]),a._v(" "),t("h3",{attrs:{id:"_16-shell"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_16-shell"}},[a._v("#")]),a._v(" 16 SHELL")]),a._v(" "),t("p",[a._v("SHELL用于设置执行命令（shell式）所使用的的默认 shell 类型：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v('SHELL ["executable", "parameters"]\n')])])]),t("p",[a._v("SHELL在Windows环境下比较有用，Windows 下通常会有 cmd 和 powershell 两种 shell，可能还会有 sh。这时就可以通过 SHELL 来指定所使用的 shell 类型：")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v('FROM microsoft/windowsservercore\n\n# Executed as cmd /S /C echo default\nRUN echo default\n\n# Executed as cmd /S /C powershell -command Write-Host default\nRUN powershell -command Write-Host default\n\n# Executed as powershell -command Write-Host hello\nSHELL ["powershell", "-command"]\nRUN Write-Host hello\n\n# Executed as cmd /S /C echo hello\nSHELL ["cmd", "/S"", "/C"]\nRUN echo hello\n')])])]),t("h2",{attrs:{id:"dockerfile-使用经验"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#dockerfile-使用经验"}},[a._v("#")]),a._v(" Dockerfile 使用经验")]),a._v(" "),t("h3",{attrs:{id:"dockerfile-示例"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#dockerfile-示例"}},[a._v("#")]),a._v(" Dockerfile 示例")]),a._v(" "),t("p",[t("strong",[a._v("构建Nginx运行环境")])]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v('# 指定基础镜像\nFROM sameersbn/ubuntu:14.04.20161014\n\n# 维护者信息\nMAINTAINER sameer@damagehead.com\n\n# 设置环境\nENV RTMP_VERSION=1.1.10 \\\n    NPS_VERSION=1.11.33.4 \\\n    LIBAV_VERSION=11.8 \\\n    NGINX_VERSION=1.10.1 \\\n    NGINX_USER=www-data \\\n    NGINX_SITECONF_DIR=/etc/nginx/sites-enabled \\\n    NGINX_LOG_DIR=/var/log/nginx \\\n    NGINX_TEMP_DIR=/var/lib/nginx \\\n    NGINX_SETUP_DIR=/var/cache/nginx\n\n# 设置构建时变量，镜像建立完成后就失效\nARG BUILD_LIBAV=false\nARG WITH_DEBUG=false\nARG WITH_PAGESPEED=true\nARG WITH_RTMP=true\n\n# 复制本地文件到容器目录中\nCOPY setup/ ${NGINX_SETUP_DIR}/\nRUN bash ${NGINX_SETUP_DIR}/install.sh\n\n# 复制本地配置文件到容器目录中\nCOPY nginx.conf /etc/nginx/nginx.conf\nCOPY entrypoint.sh /sbin/entrypoint.sh\n\n# 运行指令\nRUN chmod 755 /sbin/entrypoint.sh\n\n# 允许指定的端口\nEXPOSE 80/tcp 443/tcp 1935/tcp\n\n# 指定网站目录挂载点\nVOLUME ["${NGINX_SITECONF_DIR}"]\n\nENTRYPOINT ["/sbin/entrypoint.sh"]\nCMD ["/usr/sbin/nginx"]\n')])])]),t("p",[t("strong",[a._v("构建tomcat 环境")])]),a._v(" "),t("p",[a._v("Dockerfile文件")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("# 指定基于的基础镜像\nFROM ubuntu:13.10  \n\n# 维护者信息\nMAINTAINER zhangjiayang \"zhangjiayang@sczq.com.cn\"  \n  \n# 镜像的指令操作\n# 获取APT更新的资源列表\nRUN echo \"deb http://archive.ubuntu.com/ubuntu precise main universe\"> /etc/apt/sources.list\n# 更新软件\nRUN apt-get update  \n  \n# Install curl  \nRUN apt-get -y install curl  \n  \n# Install JDK 7  \nRUN cd /tmp &&  curl -L 'http://download.oracle.com/otn-pub/java/jdk/7u65-b17/jdk-7u65-linux-x64.tar.gz' -H 'Cookie: oraclelicense=accept-securebackup-cookie; gpw_e24=Dockerfile' | tar -xz  \nRUN mkdir -p /usr/lib/jvm  \nRUN mv /tmp/jdk1.7.0_65/ /usr/lib/jvm/java-7-oracle/  \n  \n# Set Oracle JDK 7 as default Java  \nRUN update-alternatives --install /usr/bin/java java /usr/lib/jvm/java-7-oracle/bin/java 300     \nRUN update-alternatives --install /usr/bin/javac javac /usr/lib/jvm/java-7-oracle/bin/javac 300     \n\n# 设置系统环境\nENV JAVA_HOME /usr/lib/jvm/java-7-oracle/  \n  \n# Install tomcat7  \nRUN cd /tmp && curl -L 'http://archive.apache.org/dist/tomcat/tomcat-7/v7.0.8/bin/apache-tomcat-7.0.8.tar.gz' | tar -xz  \nRUN mv /tmp/apache-tomcat-7.0.8/ /opt/tomcat7/  \n  \nENV CATALINA_HOME /opt/tomcat7  \nENV PATH $PATH:$CATALINA_HOME/bin  \n\n# 复件tomcat7.sh到容器中的目录 \nADD tomcat7.sh /etc/init.d/tomcat7  \nRUN chmod 755 /etc/init.d/tomcat7  \n  \n# Expose ports.  指定暴露的端口\nEXPOSE 8080  \n  \n# Define default command.  \nENTRYPOINT service tomcat7 start && tail -f /opt/tomcat7/logs/catalina.out\n")])])]),t("p",[t("code",[a._v("tomcat7.sh")]),a._v("命令文件")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("export JAVA_HOME=/usr/lib/jvm/java-7-oracle/  \nexport TOMCAT_HOME=/opt/tomcat7  \n  \ncase $1 in  \nstart)  \n  sh $TOMCAT_HOME/bin/startup.sh  \n;;  \nstop)  \n  sh $TOMCAT_HOME/bin/shutdown.sh  \n;;  \nrestart)  \n  sh $TOMCAT_HOME/bin/shutdown.sh  \n  sh $TOMCAT_HOME/bin/startup.sh  \n;;  \nesac  \nexit 0\n")])])]),t("h3",{attrs:{id:"原则与建议"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#原则与建议"}},[a._v("#")]),a._v(" 原则与建议")]),a._v(" "),t("ul",[t("li",[a._v("容器轻量化。从镜像中产生的容器应该尽量轻量化，能在足够短的时间内停止、销毁、重新生成并替换原来的容器。")]),a._v(" "),t("li",[a._v("使用 "),t("code",[a._v(".gitignore")]),a._v("。在大部分情况下，Dockerfile 会和构建所需的文件放在同一个目录中，为了提高构建的性能，应该使用 "),t("code",[a._v(".gitignore")]),a._v(" 来过滤掉不需要的文件和目录。")]),a._v(" "),t("li",[a._v("为了减少镜像的大小，减少依赖，仅安装需要的软件包。")]),a._v(" "),t("li",[a._v("一个容器只做一件事。解耦复杂的应用，分成多个容器，而不是所有东西都放在一个容器内运行。如一个 Python Web 应用，可能需要 Server、DB、Cache、MQ、Log 等几个容器。一个更加极端的说法：One process per container。")]),a._v(" "),t("li",[a._v("减少镜像的图层。不要多个 Label、ENV 等标签。")]),a._v(" "),t("li",[a._v("对续行的参数按照字母表排序，特别是使用"),t("code",[a._v("apt-get install -y")]),a._v("安装包的时候。")]),a._v(" "),t("li",[a._v("使用构建缓存。如果不想使用缓存，可以在构建的时候使用参数"),t("code",[a._v("--no-cache=true")]),a._v("来强制重新生成中间镜像。")])])])}),[],!1,null,null,null);e.default=r.exports}}]);