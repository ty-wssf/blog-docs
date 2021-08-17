# jwt与token+redis，哪种方案更好用？

**两种Token**

## 去中心化的JWT token

- 优点：
  1. 去中心化，便于分布式系统使用
  2. 基本信息可以直接放在token中。 username，nickname，role
  3. 功能权限信息可以直接放在token中。用bit位表示用户所具有的功能权限。
- 缺点：服务端无法主动让token失效

## 中心化的 redis token / memory session等

- 优点：服务端可以主动让token失效
- 缺点：每次都要进行redis查询。占用redis存储空间。

## 优化方案

​		1. Jwt Token中，增加TokenId字段。
​		2. 将TokenId字段存储在redis中，用来让服务端可以主动控制token失效
​		3  牺牲了JWT去中心化的特点。
 	   4  使用非对称加密。颁发token的认证服务器存储私钥：私钥生成签名。其他业务系统存储公钥：公钥验证签名。