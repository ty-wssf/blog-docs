# vue使用nginx部署配置
```
location /* {
    try_files $uri $uri/ /index.html;
    root   html;
    index  index.html index.htm;
}

location / {
    try_files $uri $uri/ /index.html;
}

location /api {
    proxy_pass http://127.0.0.1:30000/;	# 一定要注意在末尾添加/
}
```