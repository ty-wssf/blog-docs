@echo off
REM 声明采用UTF-8编码
chcp 65001

rem 生成静态文件
call build.bat

echo 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

echo 如果发布到 https://<USERNAME>.github.io
git push -f git@github.com:ty-wssf/blog-docs pages
echo 发布完成

echo 返回根目录
cd ../../../

echo 退出进程
cd -
