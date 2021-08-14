# GitHub Actions 入门教程

## GitHub Actions 是什么？

大家知道，持续集成由很多操作组成，比如抓取代码、运行测试、登录远程服务器，发布到第三方服务等等。GitHub 把这些操作就称为 actions。

很多操作在不同项目里面是类似的，完全可以共享。GitHub 注意到了这一点，想出了一个很妙的点子，允许开发者把每个操作写成独立的脚本文件，存放到代码仓库，使得其他开发者可以引用。

如果你需要某个 action，不必自己写复杂的脚本，直接引用他人写好的 action 即可，整个持续集成过程，就变成了一个 actions 的组合。这就是 GitHub Actions 最特别的地方。

GitHub 做了一个[官方市场](https://github.com/marketplace?type=actions)，可以搜索到他人提交的 actions。另外，还有一个 [awesome actions](https://github.com/sdras/awesome-actions) 的仓库，也可以找到不少 action。

![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/bg2019091105.jpg)

上面说了，每个 action 就是一个独立脚本，因此可以做成代码仓库，使用`userName/repoName`的语法引用 action。比如，`actions/setup-node`就表示`github.com/actions/setup-node`这个[仓库](https://github.com/actions/setup-node)，它代表一个 action，作用是安装 Node.js。事实上，GitHub 官方的 actions 都放在 [github.com/actions](https://github.com/actions) 里面。

既然 actions 是代码仓库，当然就有版本的概念，用户可以引用某个具体版本的 action。下面都是合法的 action 引用，用的就是 Git 的指针概念，详见[官方文档](https://help.github.com/en/articles/about-actions#versioning-your-action)。

> ```bash
> actions/setup-node@74bc508 # 指向一个 commit
> actions/setup-node@v1.0    # 指向一个标签
> actions/setup-node@master  # 指向一个分支
> ```

## 基本概念

GitHub Actions 有一些自己的术语。

（1）**workflow** （工作流程）：持续集成一次运行的过程，就是一个 workflow。

（2）**job** （任务）：一个 workflow 由一个或多个 jobs 构成，含义是一次持续集成的运行，可以完成多个任务。

（3）**step**（步骤）：每个 job 由多个 step 构成，一步步完成。

（4）**action** （动作）：每个 step 可以依次执行一个或多个命令（action）。

# workflow 文件

GitHub Actions 的配置文件叫做 workflow 文件，存放在代码仓库的`.github/workflows`目录。

workflow 文件采用 [YAML 格式](https://www.ruanyifeng.com/blog/2016/07/yaml.html)，文件名可以任意取，但是后缀名统一为`.yml`，比如`foo.yml`。一个库可以有多个 workflow 文件。GitHub 只要发现`.github/workflows`目录里面有`.yml`文件，就会自动运行该文件。

workflow 文件的配置字段非常多，详见[官方文档](https://help.github.com/en/articles/workflow-syntax-for-github-actions)。下面是一些基本字段。

**（1）`name`**

`name`字段是 workflow 的名称。如果省略该字段，默认为当前 workflow 的文件名。

> ```bash
> name: GitHub Actions Demo
> ```

**（2）`on`**

`on`字段指定触发 workflow 的条件，通常是某些事件。

> ```bash
> on: push
> ```

上面代码指定，`push`事件触发 workflow。

`on`字段也可以是事件的数组。

> ```bash
> on: [push, pull_request]
> ```

上面代码指定，`push`事件或`pull_request`事件都可以触发 workflow。

完整的事件列表，请查看[官方文档](https://help.github.com/en/articles/events-that-trigger-workflows)。除了代码库事件，GitHub Actions 也支持外部事件触发，或者定时运行。

**（3）`on.<push|pull_request>.<tags|branches>`**

指定触发事件时，可以限定分支或标签。

> ```bash
> on:
>   push:
>     branches:    
>       - master
> ```

上面代码指定，只有`master`分支发生`push`事件时，才会触发 workflow。

**（4）`jobs.<job_id>.name`**

workflow 文件的主体是`jobs`字段，表示要执行的一项或多项任务。

`jobs`字段里面，需要写出每一项任务的`job_id`，具体名称自定义。`job_id`里面的`name`字段是任务的说明。

> ```javascript
> jobs:
>   my_first_job:
>     name: My first job
>   my_second_job:
>     name: My second job
> ```

上面代码的`jobs`字段包含两项任务，`job_id`分别是`my_first_job`和`my_second_job`。

**（5）`jobs.<job_id>.needs`**

`needs`字段指定当前任务的依赖关系，即运行顺序。

> ```javascript
> jobs:
>   job1:
>   job2:
>     needs: job1
>   job3:
>     needs: [job1, job2]
> ```

上面代码中，`job1`必须先于`job2`完成，而`job3`等待`job1`和`job2`的完成才能运行。因此，这个 workflow 的运行顺序依次为：`job1`、`job2`、`job3`。

**（6）`jobs.<job_id>.runs-on`**

`runs-on`字段指定运行所需要的虚拟机环境。它是必填字段。目前可用的虚拟机如下。

> - `ubuntu-latest`，`ubuntu-18.04`或`ubuntu-16.04`
> - `windows-latest`，`windows-2019`或`windows-2016`
> - `macOS-latest`或`macOS-10.14`

下面代码指定虚拟机环境为`ubuntu-18.04`。

> ```javascript
> runs-on: ubuntu-18.04
> ```

**（7）`jobs.<job_id>.steps`**

`steps`字段指定每个 Job 的运行步骤，可以包含一个或多个步骤。每个步骤都可以指定以下三个字段。

> - `jobs.<job_id>.steps.name`：步骤名称。
> - `jobs.<job_id>.steps.run`：该步骤运行的命令或者 action。
> - `jobs.<job_id>.steps.env`：该步骤所需的环境变量。

下面是一个完整的 workflow 文件的范例。

> ```javascript
> name: Greeting from Mona
> on: push
> 
> jobs:
>   my-job:
>     name: My Job
>     runs-on: ubuntu-latest
>     steps:
>     - name: Print a greeting
>       env:
>         MY_VAR: Hi there! My name is
>         FIRST_NAME: Mona
>         MIDDLE_NAME: The
>         LAST_NAME: Octocat
>       run: |
>         echo $MY_VAR $FIRST_NAME $MIDDLE_NAME $LAST_NAME.
> ```

上面代码中，`steps`字段只包括一个步骤。该步骤先注入四个环境变量，然后执行一条 Bash 命令

## 实例：VuePress 项目发布到 GitHub Pages

第一步，在这个仓库的`.github/workflows`目录，生成一个 workflow 文件，名字可以随便取，这个示例是`gitee-repos-sync.yml`。

> ```javascript
> name: Sync Github Repos To Gitee
> 
> on:
>   push:
>     branches:
>       - master
> 
> jobs:
>   build-and-deploy:
>     runs-on: ubuntu-latest
>     steps:
>     - name: Checkout 🛎️
>       uses: actions/checkout@v2.3.1
> 
>     - name: Install and Build 🔧 # This example project is built using npm and outputs the result to the 'build' folder. Replace with the commands required to build your project, or remove this step entirely if your site is pre-built.
>       run: |
>         npm install
>         npm run docs:build
> 
>     - name: Deploy 🚀
>       uses: JamesIves/github-pages-deploy-action@4.1.4
>       with:
>         branch: pages # The branch the action should deploy to.
>         folder: docs/.vuepress/dist # The folder the action should deploy.
> 
>     - name: Sync Github Repos To Gitee  # 名字随便起
>       uses: Yikun/hub-mirror-action@v1.1  # 使用Yikun/hub-mirror-action
>       with:
>         src: github/ty-wssf  # 源端账户名(github)
>         dst: gitee/wuyilong  # 目的端账户名(gitee)
>         dst_key: ${{ secrets.GITEE_PRIVATE_KEY }}  # SSH密钥对中的私钥
>         dst_token:  ${{ secrets.GITEE_TOKEN }}  # Gitee账户的私人令牌
>         account_type: user  # 账户类型
>         clone_style: "https"  # 使用https方式进行clone，也可以使用ssh
>         debug: true  # 启用后会显示所有执行命令
>         force_update: true  # 启用后，强制同步，即强制覆盖目的端仓库
>         static_list: "blog-docs"  # 静态同步列表，在此填写需要同步的仓库名称，可填写多个
>         timeout: '600s'  # git超时设置，超时后会自动重试git操作
> ```

上面这个 workflow 文件的要点如下。

> 1. 整个流程在`master`分支发生`push`事件时触发。
> 2. 只有一个`job`，运行在虚拟机环境`ubuntu-latest`。
> 3. 第一步是获取源码，使用的 action 是`actions/checkout`。
> 4. 第二步是构建。
> 5. 第三步是部署，使用的 action 是`JamesIves/github-pages-deploy-action`。
> 6. 第三步需要四个环境变量，分别为 GitHub 密钥、发布分支、构建成果所在目录。其中，只有 GitHub 密钥是秘密变量，需要写在双括号里面，其他三个都可以直接写在文件里。
> 7. 第三步是将GitHub仓库同步到gitee

第五步，保存上面的文件后，将整个仓库推送到 GitHub。

GitHub 发现了 workflow 文件以后，就会自动运行。你可以在网站上实时查看[运行日志](https://github.com/ruanyf/github-actions-demo/commit/24fbf6a875351297f31434fd44bc3146accf9e59/checks)，日志默认保存30天。

![img](https://gitee.com/wuyilong/picture-bed/raw/master/img/bg2019091108.jpg)

等到 workflow 运行结束，访问 [GitHub Page](https://ty-wssf.github.io/blog-docs/)，会看到构建成果已经发上网了。