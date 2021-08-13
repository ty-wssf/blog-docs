# 使用OpenFeign服务调用

在上一个章节，我们已经成功地将服务注册到了Nacos注册中心，实现了服务注册和服务发现，接下来我们要做的是服务间调用。

想一下，我们日常调用接口有哪些方式呢？常见有的有JDK自带的网络连接类`HttpURLConnection`、Apache Common封装的`HttpClient`、Spring封装的`RestTemplate`。这些调用接口工具也许在你看来都并不困难那，但是如果引入feign，使用声明式调用，调用远程服务像调用本地api一样丝滑。

> OpenFeign项目地址：[github.com/OpenFeign/f…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FOpenFeign%2Ffeign)

## Feign简介

Feign是一种声明式、模板化的HTTP客户端。使用Feign，可以做到声明式调用。

尽管Feign目前已经不再迭代，处于维护状态，但是Feign仍然是目前使用最广泛的远程调用框架之一。

在SpringCloud Alibaba的生态体系内，有另一个应用广泛的远程服务调用框架Dubbo，在后面我们会接触到。

Feign是在RestTemplate 和 Ribbon的基础上进一步封装，使用RestTemplate实现Http调用，使用Ribbon实现负载均衡。

![Feign封装](https://gitee.com/wuyilong/picture-bed/raw/master/img/006b6a25bb554f17bc102d642400b1bf~tplv-k3u1fbpfcp-watermark.png)

接下来，我们开始学习Feign的使用，非常简单！

## Feign使用

### 引入OpenFeign

在前面的章节里，我们已经引入了SpringCloud，现在我们只需要在需要引入的子模块中添加依赖：

```java
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>

```

### Feign远程调用

我们现在来完成一个业务：`添加商品`

![添加商品](https://gitee.com/wuyilong/picture-bed/raw/master/img/6e0865d611d14783bea7ae44e61d87c0~tplv-k3u1fbpfcp-watermark.png)

这个业务涉及两个子服务，添加商品的时候同时要添加库存，查询商品的时候，同时要查询库存。商品服务作为消费者，库存服务作为生产者。

### 服务提供者

作为服务提供者的库存服务很简单，提供两个接口`添加库存`、`根据商品ID获取库存量`。

- 控制层

```java
@RestController
@RequestMapping("/shop-stock/api")
@Slf4j
@Api(value = "商品服务对外接口", tags = "商品服务对外接口")
public class ShopStockApiController {
    @Autowired
    private IShopStockService shopStockService;

    @PostMapping(value = "/add")
    @ApiOperation("添加库存")
    public Integer addStock(@RequestBody StockAddDTO stockAddDTO) {
        log.info("client call add stock interface,param:{}", stockAddDTO);
        return this.shopStockService.addStockApi(stockAddDTO);
    }

    @GetMapping(value = "/account/get")
    @ApiOperation("根据商品ID获取库存量")
    public Integer getAccountById(@RequestParam Integer goodsId) {
        return this.shopStockService.getAccountById(goodsId);
    }
}

```

注意看，为了演示出本地调用类似的效果，这两个接口和普通的前后端接口不同。

![普通接口](https://gitee.com/wuyilong/picture-bed/raw/master/img/01d72ca410f84957ba099c60427bc2f2~tplv-k3u1fbpfcp-watermark.png)

我们没有返回之前定下的统一返回结果`CommonResult`，而是直接返回了数据。

- 业务层

  普通的增、查而已

```java
    /**
     * 添加库存-直接返回主键
     *
     * @param stockAddDTO
     * @return
     */
    public Integer addStockApi(StockAddDTO stockAddDTO) {
        ShopStock stock = new ShopStock();
        stock.setGoodsId(stockAddDTO.getGoodsId());
        stock.setInventory(stockAddDTO.getAccount());
        log.info("准备添加库存,参数:{}", stock.toString());
        this.baseMapper.insert(stock);
        Integer stockId =stock.getStockId();
        log.info("添加库存成功,stockId:{}", stockId);
        return stockId;
    }

    /**
     * 根据商品ID获取商品库存
     *
     * @param goodsId
     * @return
     */
    public Integer getAccountById(Integer goodsId) {
        ShopStock stock = this.getOne(Wrappers.<ShopStock>lambdaQuery().eq(ShopStock::getGoodsId, goodsId));
        Integer account = stock.getInventory();
        return account;
    }


```

- 添加库存实体类

```java
@Data
@EqualsAndHashCode(callSuper = false)
@ApiModel(value = "库存添加", description = "")
public class StockAddDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "商品主键")
    private Integer goodsId;

    @ApiModelProperty(value = "数量")
    private Integer account;
}

```

至此，我们的服务提供者的相关开发到此完成，打开地址 [http://localhost:8050/doc.html](https://link.juejin.cn?target=http%3A%2F%2Flocalhost%3A8050%2Fdoc.html) ,可以看到我们开发的接口：

![服务提供者接口](https://gitee.com/wuyilong/picture-bed/raw/master/img/0b5d33def2da410694c3c3553e883c5b~tplv-k3u1fbpfcp-watermark.png)

### 服务消费者

好了，接下里要开始我们的服务消费者，也就是商品服务的开发。

- 远程调用Feign客户端

声明式调用——看一下Feign客户端的代码，你就知道什么是声明式调用：

```java
/**
 * @Author: 三分恶
 * @Date: 2021/5/26
 * @Description: 库存服务feign客户端
 **/
@FeignClient(value = "stock-service")
public interface StockClientFeign {

    /**
     * 调用添加库存接口
     *
     * @param stockAddDTO
     * @return
     */
    @PostMapping(value = "/shop-stock/api/add")
    Integer addStock(@RequestBody StockAddDTO stockAddDTO);

    /**
     * 调用根据商品ID获取库存量接口
     *
     * @param goodsId
     * @return
     */
    @GetMapping(value = "/shop-stock/api/account/get")
    Integer getAccountById(@RequestParam(value = "goodsId") Integer goodsId);
}

```

- 定义完成之后，我们还要在启动类上加上注解`@EnableFeignClients`去扫描Feign客户端。

```java
@SpringBootApplication
@MapperScan("cn.fighter3.mapper")
@EnableDiscoveryClient
@EnableFeignClients(basePackages = "cn.fighter3.client")
public class EshopGoodsApplication {

    public static void main(String[] args) {
        SpringApplication.run(EshopGoodsApplication.class, args);
    }
}

```

使用Feign客户端也很简单，直接在需要使用的地方注入就行了。

```java
@Autowired
private StockClientFeign stockClientFeign;

```

- 商品服务控制层

```java
/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author 三分恶
 * @since 2021-05-18
 */
@RestController
@RequestMapping("/shop-goods")
@Api(value = "商品管理接口", tags = "商品接口")
@Slf4j
public class ShopGoodsController {

    @Autowired
    private IShopGoodsService goodsService;

    @PostMapping(value = "/add")
    @ApiOperation(value = "添加商品")
    public CommonResult addGoods(@RequestBody GoodsAddDTO goodsAddDTO) {
        return this.goodsService.addGoods(goodsAddDTO);
    }

    @GetMapping(value = "/get/by-id")
    @ApiOperation(value = "根据ID获取商品")
    public CommonResult<GoodsVO> getGoodsById(@RequestParam Integer goodsId) {
        return this.goodsService.getGoodsById(goodsId);
    }

}

```

- 服务层

在服务层除了对商品库的操作之外，还通过Feign客户端远程调用库存服务的接口。

```java
@Service
@Slf4j
public class ShopGoodsServiceImpl extends ServiceImpl<ShopGoodsMapper, ShopGoods> implements IShopGoodsService {

    @Autowired
    private StockClientFeign stockClientFeign;

    /**
     * 添加商品
     *
     * @param goodsAddDTO
     * @return
     */
    public CommonResult addGoods(GoodsAddDTO goodsAddDTO) {
        ShopGoods shopGoods = new ShopGoods();
        BeanUtils.copyProperties(goodsAddDTO, shopGoods);
        this.baseMapper.insert(shopGoods);
        log.info("添加商品，商品主键：{}", shopGoods.getGoodsId());
        log.info(shopGoods.toString());
        StockAddDTO stockAddDTO = StockAddDTO.builder().goodsId(shopGoods.getGoodsId()).account(goodsAddDTO.getAccount()).build();
        log.info("准备添加库存，参数：{}", stockAddDTO.toString());
        Integer stockId = this.stockClientFeign.addStock(stockAddDTO);
        log.info("添加库存结束，库存主键:{}", stockId);
        return CommonResult.ok();
    }

    /**
     * 获取商品
     *
     * @param goodsId
     * @return
     */
    public CommonResult<GoodsVO> getGoodsById(Integer goodsId) {
        GoodsVO goodsVO = new GoodsVO();
        //获取商品基本信息
        ShopGoods shopGoods = this.baseMapper.selectById(goodsId);
        BeanUtils.copyProperties(shopGoods, goodsVO);
        //获取商品库存数量
        Integer account = this.stockClientFeign.getAccountById(goodsId);
        log.info("商品数量:{}", account);
        goodsVO.setAccount(account);
        return CommonResult.ok(goodsVO);
    }
}

```

- 实体类

  添加库存实体类和库存服务相同，略过，商品展示实体类

```java
@Data
@EqualsAndHashCode(callSuper = false)
@ApiModel(value = "商品", description = "")
public class GoodsVO implements Serializable {
    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "商品主键")
    private Integer goodsId;

    @ApiModelProperty(value = "商品名称")
    private String goodsName;

    @ApiModelProperty(value = "价格")
    private BigDecimal price;

    @ApiModelProperty(value = "商品介绍")
    private String description;

    @ApiModelProperty(value = "数量")
    private Integer account;
}

```

### 效果演示

接下来启动nacos-server，商品服务，库存服务。

访问地址 [http://127.0.0.1:8848/nacos/index.html](https://link.juejin.cn?target=http%3A%2F%2F127.0.0.1%3A8848%2Fnacos%2Findex.html) ，登录之后，可以在服务列表里看到我们注册的两个服务：

![Nacos服务注册](https://gitee.com/wuyilong/picture-bed/raw/master/img/2b40875b7ce74a628d07e9723d13055a~tplv-k3u1fbpfcp-watermark.png)

访问商品服务Knife4j地址：[http://localhost:8020/doc.html](https://link.juejin.cn?target=http%3A%2F%2Flocalhost%3A8020%2Fdoc.html)  ，可以看到添加商品和根据商品ID查找商品的接口，分别调试调用：

- 添加商品

![添加商品](https://gitee.com/wuyilong/picture-bed/raw/master/img/020f7e8814a54a22832ca5aa405a462e~tplv-k3u1fbpfcp-watermark.png)

- 根据ID获取商品

![根据ID获取商品](https://gitee.com/wuyilong/picture-bed/raw/master/img/50de7beeaf3f4de1b7a10faf885f73e8~tplv-k3u1fbpfcp-watermark.png)

可以看到各自对应的数据库也有数据生成：

![数据生成](https://gitee.com/wuyilong/picture-bed/raw/master/img/8548c681253e425abaf51908009a2217~tplv-k3u1fbpfcp-watermark.png)

整体的远程调用示意图大概如下：

![远程调用示意图](https://gitee.com/wuyilong/picture-bed/raw/master/img/1984dc6c76c747598f08191762eac835~tplv-k3u1fbpfcp-watermark.png)

## Ribbon负载均衡

关于负载均衡，这里偷个懒，就不再演示了。

感兴趣的可以吧库存服务打包，以不同的端口启动，然后添加商品，通过日志查看商品服务调用的负载情况。

Feign负载均衡是通过Ribbon实现，Ribbon是一种客户端的负载均衡——也就是从注册中心获取服务列表，由客户端自己决定调用哪一个远程服务。

![Ribbon客户端负载均衡](https://gitee.com/wuyilong/picture-bed/raw/master/img/c1435fa367cb479f84cafba420971a22~tplv-k3u1fbpfcp-watermark.png)

Ribbon的主要负载均衡策略有以下几种：

| 规则名称                  | 特点                                                         |
| ------------------------- | ------------------------------------------------------------ |
| AvailabilityFilteringRule | 过滤掉一直连接失败的被标记为circuit tripped的后端Server，并 过滤掉那些高并发的后端Server或者使用一个AvailabilityPredicate 来包含过滤server的逻辑，其实就是检查status里记录的各个server 的运行状态 |
| BestAvailableRule         | 选择一个最小的并发请求的server，逐个考察server， 如果Server被tripped了，则跳过 |
| RandomRule                | 随机选择一个Server                                           |
| ResponseTimeWeightedRule  | 已废弃，作用同WeightedResponseTimeRule                       |
| WeightedResponseTimeRule  | 根据响应时间加权，响应时间越长，权重越小，被选中的可能性越低 |
| RetryRule                 | 对选定的负载均衡策略加上重试机制，在一个配置时间段内当 选择Server不成功，则一直尝试使用subRule的方式选择一个 可用的Server |
| RoundRobinRule            | 轮询选择，轮询index，选择index对应位置的Server               |
| ZoneAvoidanceRule         | 默认的负载均衡策略，即复合判断Server所在区域的性能和Server的可用性 选择Server，在没有区域的环境下，类似于轮询(RandomRule) |

这里就不再展开讲了，感兴趣的自行了解。

## 意外状况

- 发现远程调用的时候出现读取响应结果超时的情况：

```java
java.net.SocketTimeoutException: Read timed out

```

修改Ribbon超时配置就行了：

```java
# ribbon超时时间
ribbon:
  ReadTimeout: 30000
  ConnectTimeout: 30000

```

- Feign接口中，使用`@RequestParam`报错

发现报错：

```java
Caused by: java.lang.IllegalStateException: RequestParam.value() was empty on parameter 0

```

Feign声明里需要加上`value`：

```java
Integer getAccountById(@RequestParam(value = "goodsId") Integer goodsId);
```


作者：三分恶
链接：https://juejin.cn/post/6978696566378856455
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。