(window.webpackJsonp=window.webpackJsonp||[]).push([[131],{558:function(a,e,s){"use strict";s.r(e);var t=s(30),_=Object(t.a)({},(function(){var a=this,e=a.$createElement,s=a._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"elasticsearch-面试题2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#elasticsearch-面试题2"}},[a._v("#")]),a._v(" Elasticsearch 面试题2")]),a._v(" "),s("h2",{attrs:{id:"前言"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#前言"}},[a._v("#")]),a._v(" 前言")]),a._v(" "),s("h3",{attrs:{id:"_1-elasticsearch-是一个分布式的-restful-风格的搜索和数据分析引擎。"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-elasticsearch-是一个分布式的-restful-风格的搜索和数据分析引擎。"}},[a._v("#")]),a._v(" 1.Elasticsearch 是一个分布式的 RESTful 风格的搜索和数据分析引擎。")]),a._v(" "),s("p",[a._v("（1）查询 ： Elasticsearch 允许执行和合并多种类型的搜索 — 结构化、非结构化、地理位置、度量指标 — 搜索方式随心而变。")]),a._v(" "),s("p",[a._v("（2）分析 ： 找到与查询最匹配的十个文档是一回事。但是如果面对的是十亿行日志，又该如何解读呢？Elasticsearch 聚合让您能够从大处着眼，探索数据的趋势和模式。")]),a._v(" "),s("p",[a._v("（3）速度 ： Elasticsearch 很快。真的，真的很快。")]),a._v(" "),s("p",[a._v("（4）可扩展性 ： 可以在笔记本电脑上运行。 也可以在承载了 PB 级数据的成百上千台服务器上运行。")]),a._v(" "),s("p",[a._v("（5）弹性 ： Elasticsearch 运行在一个分布式的环境中，从设计之初就考虑到了这一点。")]),a._v(" "),s("p",[a._v("（6）灵活性 ： 具备多个案例场景。数字、文本、地理位置、结构化、非结构化。所有的数据类型都欢迎。")]),a._v(" "),s("p",[a._v("（7）HADOOP & SPARK ： Elasticsearch + Hadoop")]),a._v(" "),s("h3",{attrs:{id:"_2-elasticsearch是一个高度可伸缩的开源全文搜索和分析引擎。它允许您快速和接近实时地存储、搜索和分析大量数据。"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-elasticsearch是一个高度可伸缩的开源全文搜索和分析引擎。它允许您快速和接近实时地存储、搜索和分析大量数据。"}},[a._v("#")]),a._v(" 2.Elasticsearch是一个高度可伸缩的开源全文搜索和分析引擎。它允许您快速和接近实时地存储、搜索和分析大量数据。")]),a._v(" "),s("p",[a._v("这里有一些使用Elasticsearch的用例：")]),a._v(" "),s("p",[a._v("（1）你经营一个网上商店，你允许你的顾客搜索你卖的产品。在这种情况下，您可以使用Elasticsearch来存储整个产品目录和库存，并为它们提供搜索和自动完成建议。")]),a._v(" "),s("p",[a._v("（2）你希望收集日志或事务数据，并希望分析和挖掘这些数据，以查找趋势、统计、汇总或异常。在这种情况下，你可以使用loghide (Elasticsearch/ loghide /Kibana堆栈的一部分)来收集、聚合和解析数据，然后让loghide将这些数据输入到Elasticsearch中。一旦数据在Elasticsearch中，你就可以运行搜索和聚合来挖掘你感兴趣的任何信息。")]),a._v(" "),s("p",[a._v("（3）你运行一个价格警报平台，允许精通价格的客户指定如下规则:“我有兴趣购买特定的电子设备，如果下个月任何供应商的产品价格低于X美元，我希望得到通知”。在这种情况下，你可以抓取供应商的价格，将它们推入到Elasticsearch中，并使用其反向搜索(Percolator)功能来匹配价格走势与客户查询，并最终在找到匹配后将警报推送给客户。")]),a._v(" "),s("p",[a._v("（4）你有分析/业务智能需求，并希望快速调查、分析、可视化，并对大量数据提出特别问题(想想数百万或数十亿的记录)。在这种情况下，你可以使用Elasticsearch来存储数据，然后使用Kibana (Elasticsearch/ loghide /Kibana堆栈的一部分)来构建自定义仪表板，以可视化对您来说很重要的数据的各个方面。此外，还可以使用Elasticsearch聚合功能对数据执行复杂的业务智能查询。")]),a._v(" "),s("h2",{attrs:{id:"elasticsearch面试题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#elasticsearch面试题"}},[a._v("#")]),a._v(" Elasticsearch面试题")]),a._v(" "),s("p",[a._v("1、详细描述一下 Elasticsearch 更新和删除文档的过程。")]),a._v(" "),s("p",[a._v("2、详细描述一下 Elasticsearch 搜索的过程。")]),a._v(" "),s("p",[a._v("3、在 Elasticsearch 中，是怎么根据一个词找到对应的倒排索引的？")]),a._v(" "),s("p",[a._v("4、Elasticsearch 在部署时，对 Linux 的设置有哪些优化方法？")]),a._v(" "),s("p",[a._v("5、对于 GC 方面，在使用 Elasticsearch 时要注意什么？")]),a._v(" "),s("p",[a._v("6、Elasticsearch 对于大数据量（上亿量级）的聚合如何实现？")]),a._v(" "),s("p",[a._v("7、在并发情况下，Elasticsearch 如果保证读写一致？")]),a._v(" "),s("p",[a._v("8、如何监控 Elasticsearch 集群状态？")]),a._v(" "),s("p",[a._v("9、介绍下你们电商搜索的整体技术架构。")]),a._v(" "),s("p",[a._v("10、介绍一下你们的个性化搜索方案？")]),a._v(" "),s("p",[a._v("11、是否了解字典树？")]),a._v(" "),s("p",[a._v("12、拼写纠错是如何实现的？")]),a._v(" "),s("h2",{attrs:{id:"elasticsearch面试题答案解析"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#elasticsearch面试题答案解析"}},[a._v("#")]),a._v(" Elasticsearch面试题答案解析")]),a._v(" "),s("h3",{attrs:{id:"_1、详细描述一下-elasticsearch-更新和删除文档的过程。"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1、详细描述一下-elasticsearch-更新和删除文档的过程。"}},[a._v("#")]),a._v(" 1、详细描述一下 Elasticsearch 更新和删除文档的过程。")]),a._v(" "),s("p",[a._v("（1）删除和更新也都是写操作，但是 Elasticsearch 中的文档是不可变的，因此不能被删除或者改动以展示其变更；")]),a._v(" "),s("p",[a._v("（2）磁盘上的每个段都有一个相应的.del 文件。当删除请求发送后，文档并没有真的被删除，而是在.del 文件中被标记为删除。该文档依然能匹配查询，但是会在结果中被过滤掉。当段合并时，在.del 文件中被标记为删除的文档将不会被写入新段。")]),a._v(" "),s("p",[a._v("（3）在新的文档被创建时，Elasticsearch 会为该文档指定一个版本号，当执行更新时，旧版本的文档在.del 文件中被标记为删除，新版本的文档被索引到一个新段。旧版本的文档依然能匹配查询，但是会在结果中被过滤掉。")]),a._v(" "),s("h3",{attrs:{id:"_2、详细描述一下-elasticsearch-搜索的过程。"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2、详细描述一下-elasticsearch-搜索的过程。"}},[a._v("#")]),a._v(" 2、详细描述一下 Elasticsearch 搜索的过程。")]),a._v(" "),s("p",[a._v("（1）搜索被执行成一个两阶段过程，我们称之为 Query Then Fetch；")]),a._v(" "),s("p",[a._v("（2）在初始查询阶段时，查询会广播到索引中每一个分片拷贝（主分片或者副本分片）。 每个分片在本地执行搜索并构建一个匹配文档的大小为 from + size 的优先队列。")]),a._v(" "),s("p",[a._v("PS：在搜索的时候是会查询 Filesystem Cache 的，但是有部分数据还在 MemoryBuffer，所以搜索是近实时的。")]),a._v(" "),s("p",[a._v("（3）每个分片返回各自优先队列中 所有文档的 ID 和排序值 给协调节点，它合并这些值到自己的优先队列中来产生一个全局排序后的结果列表。")]),a._v(" "),s("p",[a._v("（4）接下来就是 取回阶段，协调节点辨别出哪些文档需要被取回并向相关的分片提交多个 GET 请求。每个分片加载并 丰 富 文档，如果有需要的话，接着返回文档给协调节点。一旦所有的文档都被取回了，协调节点返回结果给客户端。")]),a._v(" "),s("p",[a._v("（5）补充：Query Then Fetch 的搜索类型在文档相关性打分的时候参考的是本分片的数据，这样在文档数量较少的时候可能不够准确，DFS Query Then Fetch 增加了一个预查询的处理，询问 Term 和 Document frequency，这个评分更准确，但是性能会变差。*")]),a._v(" "),s("p",[s("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master/img/16f4126064267b88~tplv-t2oaga2asx-watermark.png",alt:"img"}})]),a._v(" "),s("h3",{attrs:{id:"_3、在-elasticsearch-中-是怎么根据一个词找到对应的倒排索引的"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3、在-elasticsearch-中-是怎么根据一个词找到对应的倒排索引的"}},[a._v("#")]),a._v(" 3、在 Elasticsearch 中，是怎么根据一个词找到对应的倒排索引的？")]),a._v(" "),s("p",[a._v("（1）Lucene的索引过程，就是按照全文检索的基本过程，将倒排表写成此文件格式的过程。")]),a._v(" "),s("p",[a._v("（2）Lucene的搜索过程，就是按照此文件格式将索引进去的信息读出来，然后计算每篇文档打分(score)的过程。")]),a._v(" "),s("h3",{attrs:{id:"_4、elasticsearch-在部署时-对-linux-的设置有哪些优化方法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4、elasticsearch-在部署时-对-linux-的设置有哪些优化方法"}},[a._v("#")]),a._v(" 4、Elasticsearch 在部署时，对 Linux 的设置有哪些优化方法？")]),a._v(" "),s("p",[a._v("（1）64 GB 内存的机器是非常理想的， 但是 32 GB 和 16 GB 机器也是很常见的。少于 8 GB 会适得其反。")]),a._v(" "),s("p",[a._v("（2）如果你要在更快的 CPUs 和更多的核心之间选择，选择更多的核心更好。多个内核提供的额外并发远胜过稍微快一点点的时钟频率。")]),a._v(" "),s("p",[a._v("（3）如果你负担得起 SSD，它将远远超出任何旋转介质。 基于 SSD 的节点，查询和索引性能都有提升。如果你负担得起，SSD 是一个好的选择。")]),a._v(" "),s("p",[a._v("（4）即使数据中心们近在咫尺，也要避免集群跨越多个数据中心。绝对要避免集群跨越大的地理距离。")]),a._v(" "),s("p",[a._v("（5）请确保运行你应用程序的 JVM 和服务器的 JVM 是完全一样的。 在Elasticsearch 的几个地方，使用 Java 的本地序列化。")]),a._v(" "),s("p",[a._v("（6）通过设置 gateway.recover_after_nodes、gateway.expected_nodes、gateway.recover_after_time 可以在集群重启的时候避免过多的分片交换，这可能会让数据恢复从数个小时缩短为几秒钟。")]),a._v(" "),s("p",[a._v("（7）Elasticsearch 默认被配置为使用单播发现，以防止节点无意中加入集群。只有在同一台机器上运行的节点才会自动组成集群。最好使用单播代替组播。")]),a._v(" "),s("p",[a._v("（8）不要随意修改垃圾回收器（CMS）和各个线程池的大小。")]),a._v(" "),s("p",[a._v("（9）把你的内存的（少于）一半给 Lucene（但不要超过 32 GB！），通过ES_HEAP_SIZE 环境变量设置。")]),a._v(" "),s("p",[a._v("（10）内存交换到磁盘对服务器性能来说是致命的。如果内存交换到磁盘上，一个100 微秒的操作可能变成 10 毫秒。 再想想那么多 10 微秒的操作时延累加起来。 不难看出 swapping 对于性能是多么可怕。")]),a._v(" "),s("p",[a._v("（11）Lucene 使用了大 量 的文件。同时，Elasticsearch 在节点和 HTTP 客户端之间进行通信也使用了大量的套接字。 所有这一切都需要足够的文件描述符。你应该增加你的文件描述符，设置一个很大的值，如 64,000。")]),a._v(" "),s("p",[a._v("补充：索引阶段性能提升方法")]),a._v(" "),s("p",[a._v("（1）使用批量请求并调整其大小：每次批量数据 5–15 MB 大是个不错的起始点。")]),a._v(" "),s("p",[a._v("（2）存储：使用 SSD")]),a._v(" "),s("p",[a._v("（3）段和合并：Elasticsearch 默认值是 20 MB/s，对机械磁盘应该是个不错的设置。如果你用的是 SSD，可以考虑提高到 100–200 MB/s。如果你在做批量导入，完全不在意搜索，你可以彻底关掉合并限流。另外还可以增加index.translog.flush_threshold_size 设置，从默认的 512 MB 到更大一些的值，比如 1 GB，这可以在一次清空触发的时候在事务日志里积累出更大的段。")]),a._v(" "),s("p",[a._v("（4）如果你的搜索结果不需要近实时的准确度，考虑把每个索引的index.refresh_interval 改到 30s。")]),a._v(" "),s("p",[a._v("（5）如果你在做大批量导入，考虑通过设置 index.number_of_replicas: 0 关闭副本。")]),a._v(" "),s("h3",{attrs:{id:"_5、对于-gc-方面-在使用-elasticsearch-时要注意什么"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5、对于-gc-方面-在使用-elasticsearch-时要注意什么"}},[a._v("#")]),a._v(" 5、对于 GC 方面，在使用 Elasticsearch 时要注意什么？")]),a._v(" "),s("p",[a._v("（1）倒排词典的索引需要常驻内存，无法 GC，需要监控 data node 上 segmentmemory 增长趋势。")]),a._v(" "),s("p",[a._v("（2）各类缓存，field cache, filter cache, indexing cache, bulk queue 等等，要设置合理的大小，并且要应该根据最坏的情况来看 heap 是否够用，也就是各类缓存全部占满的时候，还有 heap 空间可以分配给其他任务吗？避免采用 clear cache等“自欺欺人”的方式来释放内存。")]),a._v(" "),s("p",[a._v("（3）避免返回大量结果集的搜索与聚合。确实需要大量拉取数据的场景，可以采用scan & scroll api 来实现。")]),a._v(" "),s("p",[a._v("（4）cluster stats 驻留内存并无法水平扩展，超大规模集群可以考虑分拆成多个集群通过 tribe node 连接。")]),a._v(" "),s("p",[a._v("（5）想知道 heap 够不够，必须结合实际应用场景，并对集群的 heap 使用情况做持续的监控。")]),a._v(" "),s("p",[a._v("（6）根据监控数据理解内存需求，合理配置各类circuit breaker，将内存溢出风险降低到最低")]),a._v(" "),s("h3",{attrs:{id:"_6、elasticsearch-对于大数据量-上亿量级-的聚合如何实现"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_6、elasticsearch-对于大数据量-上亿量级-的聚合如何实现"}},[a._v("#")]),a._v(" 6、Elasticsearch 对于大数据量（上亿量级）的聚合如何实现？")]),a._v(" "),s("p",[a._v("Elasticsearch 提供的首个近似聚合是 cardinality 度量。它提供一个字段的基数，即该字段的 distinct 或者 unique 值的数目。它是基于 HLL 算法的。HLL 会先对我们的输入作哈希运算，然后根据哈希运算的结果中的 bits 做概率估算从而得到基数。其特点是：可配置的精度，用来控制内存的使用（更精确 ＝ 更多内存）；小的数据集精度是非常高的；我们可以通过配置参数，来设置去重需要的固定内存使用量。无论数千还是数十亿的唯一值，内存使用量只与你配置的精确度相关。")]),a._v(" "),s("h3",{attrs:{id:"_7、在并发情况下-elasticsearch-如果保证读写一致"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_7、在并发情况下-elasticsearch-如果保证读写一致"}},[a._v("#")]),a._v(" 7、在并发情况下，Elasticsearch 如果保证读写一致？")]),a._v(" "),s("p",[a._v("（1）可以通过版本号使用乐观并发控制，以确保新版本不会被旧版本覆盖，由应用层来处理具体的冲突；")]),a._v(" "),s("p",[a._v("（2）另外对于写操作，一致性级别支持 quorum/one/all，默认为 quorum，即只有当大多数分片可用时才允许写操作。但即使大多数可用，也可能存在因为网络等原因导致写入副本失败，这样该副本被认为故障，分片将会在一个不同的节点上重建。")]),a._v(" "),s("p",[a._v("（3）对于读操作，可以设置 replication 为 sync(默认)，这使得操作在主分片和副本分片都完成后才会返回；如果设置 replication 为 async 时，也可以通过设置搜索请求参数_preference 为 primary 来查询主分片，确保文档是最新版本。")]),a._v(" "),s("h3",{attrs:{id:"_8、如何监控-elasticsearch-集群状态"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_8、如何监控-elasticsearch-集群状态"}},[a._v("#")]),a._v(" 8、如何监控 Elasticsearch 集群状态？")]),a._v(" "),s("p",[a._v("Marvel 让你可以很简单的通过 Kibana 监控 Elasticsearch。你可以实时查看你的集群健康状态和性能，也可以分析过去的集群、索引和节点指标。")]),a._v(" "),s("h3",{attrs:{id:"_9、介绍下你们电商搜索的整体技术架构。"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_9、介绍下你们电商搜索的整体技术架构。"}},[a._v("#")]),a._v(" 9、介绍下你们电商搜索的整体技术架构。")]),a._v(" "),s("p",[s("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master/img/16f412606724edeb~tplv-t2oaga2asx-watermark.png",alt:"img"}})]),a._v(" "),s("h3",{attrs:{id:"_10、介绍一下你们的个性化搜索方案"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_10、介绍一下你们的个性化搜索方案"}},[a._v("#")]),a._v(" 10、介绍一下你们的个性化搜索方案？")]),a._v(" "),s("p",[a._v("基于word2vec和Elasticsearch实现个性化搜索")]),a._v(" "),s("p",[a._v("（1）基于word2vec、Elasticsearch和自定义的脚本插件，我们就实现了一个个性化的搜索服务，相对于原有的实现，新版的点击率和转化率都有大幅的提升；")]),a._v(" "),s("p",[a._v("（2）基于word2vec的商品向量还有一个可用之处，就是可以用来实现相似商品的推荐；")]),a._v(" "),s("p",[a._v("（3）使用word2vec来实现个性化搜索或个性化推荐是有一定局限性的，因为它只能处理用户点击历史这样的时序数据，而无法全面的去考虑用户偏好，这个还是有很大的改进和提升的空间；")]),a._v(" "),s("h3",{attrs:{id:"_11、是否了解字典树"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_11、是否了解字典树"}},[a._v("#")]),a._v(" 11、是否了解字典树？")]),a._v(" "),s("p",[a._v("常用字典数据结构如下所示：")]),a._v(" "),s("p",[s("img",{attrs:{src:"https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/26/16f41260671abdb0~tplv-t2oaga2asx-watermark.awebp",alt:"img"}})]),a._v(" "),s("p",[a._v("Trie 的核心思想是空间换时间，利用字符串的公共前缀来降低查询时间的开销以达到提高效率的目的。它有 3 个基本性质：")]),a._v(" "),s("p",[a._v("1）根节点不包含字符，除根节点外每一个节点都只包含一个字符。")]),a._v(" "),s("p",[a._v("2）从根节点到某一节点，路径上经过的字符连接起来，为该节点对应的字符串。")]),a._v(" "),s("p",[a._v("3）每个节点的所有子节点包含的字符都不相同。")]),a._v(" "),s("p",[s("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master/img/16f4126066ec7ccf~tplv-t2oaga2asx-watermark.png",alt:"img"}})]),a._v(" "),s("p",[a._v("（1）可以看到，trie 树每一层的节点数是 26^i 级别的。所以为了节省空间，我们还可以用动态链表，或者用数组来模拟动态。而空间的花费，不会超过单词数×单词长度。")]),a._v(" "),s("p",[a._v("（2）实现：对每个结点开一个字母集大小的数组，每个结点挂一个链表，使用左儿子右兄弟表示法记录这棵树；")]),a._v(" "),s("p",[a._v("（3）对于中文的字典树，每个节点的子节点用一个哈希表存储，这样就不用浪费太大的空间，而且查询速度上可以保留哈希的复杂度 O(1)。")]),a._v(" "),s("h3",{attrs:{id:"_12、拼写纠错是如何实现的"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_12、拼写纠错是如何实现的"}},[a._v("#")]),a._v(" 12、拼写纠错是如何实现的？")]),a._v(" "),s("p",[a._v("（1）拼写纠错是基于编辑距离来实现；编辑距离是一种标准的方法，它用来表示经过插入、删除和替换操作从一个字符串转换到另外一个字符串的最小操作步数；")]),a._v(" "),s("p",[a._v("（2）编辑距离的计算过程：比如要计算 batyu 和 beauty 的编辑距离，先创建一个7×8 的表（batyu 长度为 5，coffee 长度为 6，各加 2），接着，在如下位置填入黑色数字。其他格的计算过程是取以下三个值的最小值：")]),a._v(" "),s("p",[a._v("如果最上方的字符等于最左方的字符，则为左上方的数字。否则为左上方的数字+1。（对于 3,3 来说为 0）")]),a._v(" "),s("p",[a._v("左方数字+1（对于 3,3 格来说为 2）")]),a._v(" "),s("p",[a._v("上方数字+1（对于 3,3 格来说为 2）")]),a._v(" "),s("p",[a._v("最终取右下角的值即为编辑距离的值 3。")]),a._v(" "),s("p",[s("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master/img/16f4126066d9e378~tplv-t2oaga2asx-watermark.png",alt:"img"}})]),a._v(" "),s("p",[a._v("对于拼写纠错，我们考虑构造一个度量空间（Metric Space），该空间内任何关系满足以下三条基本条件：")]),a._v(" "),s("p",[a._v("d(x,y) = 0 -- 假如 x 与 y 的距离为 0，则 x=y")]),a._v(" "),s("p",[a._v("d(x,y) = d(y,x) -- x 到 y 的距离等同于 y 到 x 的距离")]),a._v(" "),s("p",[a._v("d(x,y) + d(y,z) >= d(x,z) -- 三角不等式")]),a._v(" "),s("p",[a._v("（1）根据三角不等式，则满足与 query 距离在 n 范围内的另一个字符转 B，其与 A的距离最大为 d+n，最小为 d-n。")]),a._v(" "),s("p",[a._v("（2）BK 树的构造就过程如下：每个节点有任意个子节点，每条边有个值表示编辑距离。所有子节点到父节点的边上标注 n 表示编辑距离恰好为 n。比如，我们有棵树父节点是”book”和两个子节点”cake”和”books”，”book”到”books”的边标号 1，”book”到”cake”的边上标号 4。从字典里构造好树后，无论何时你想插入新单词时，计算该单词与根节点的编辑距离，并且查找数值为d(neweord, root)的边。递归得与各子节点进行比较，直到没有子节点，你就可以创建新的子节点并将新单词保存在那。比如，插入”boo”到刚才上述例子的树中，我们先检查根节点，查找 d(“book”, “boo”) = 1 的边，然后检查标号为1 的边的子节点，得到单词”books”。我们再计算距离 d(“books”, “boo”)=2，则将新单词插在”books”之后，边标号为 2。")]),a._v(" "),s("p",[a._v("3、查询相似词如下：计算单词与根节点的编辑距离 d，然后递归查找每个子节点标号为 d-n 到 d+n（包含）的边。假如被检查的节点与搜索单词的距离 d 小于 n，则返回该节点并继续查询。比如输入 cape 且最大容忍距离为 1，则先计算和根的编辑距离 d(“book”, “cape”)=4，然后接着找和根节点之间编辑距离为 3 到5 的，这个就找到了 cake 这个节点，计算 d(“cake”, “cape”)=1，满足条件所以返回 cake，然后再找和 cake 节点编辑距离是 0 到 2 的，分别找到 cape 和cart 节点，这样就得到 cape 这个满足条件的结果。")]),a._v(" "),s("p",[s("img",{attrs:{src:"https://gitee.com/wuyilong/picture-bed/raw/master/img/16f412606760af54~tplv-t2oaga2asx-watermark.png",alt:"img"}})])])}),[],!1,null,null,null);e.default=_.exports}}]);