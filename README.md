# Taro3-template
持续创作，加速成长！这是我参与「掘金日新计划 · 6 月更文挑战」的第1天，[点击查看活动详情](https://juejin.cn/post/7099702781094674468 "https://juejin.cn/post/7099702781094674468")

# 刚做好H5就要求做成小程序，咋办

首先你根本预料不到，需求会什么时候变，怎么变，比如这次，我刚用**React**开发完一个H5网页，就被要求做成小程序，这分明是两个很像但不一样的东西，不是说转成就能转成的，而且deadline越来越近，彻底从头用微信小程序原生写或用**Vue**写法的**Uniapp**写都不现实了，就算写的完，bug修复也够喝上一壶，所以我得想个办法，尽可能复用上刚用**React**写完的项目，这样才能让开发时间尽可能的快和稳。

## 技术框架有不少，我需要找出符合我的

我先是上网找了些小程序框架的横向测评文章看了看，以“**可以用React写小程序的**”为标准，我选出了三个，分别是：

- **taro3**
- **remax**
- **rax**

## 能不能痛快的用react开发，没什么枷锁限制

然后我又有了一个顾虑，那便是能不能痛快的使用react开发，没有条条框框束缚限制，于是我进行了一些相关调研，发现这些转换成小程序的框架，以实现方案划分，可以分为两类：

- **编译时**
- **运行时**

怎么理解这些“时”呢？首先对于一个不是很了解并且暂时不需要特别了解实现原理的我来讲，我要确定我的目标，那便是：**能够判断出哪个能更好的用react开发小程序**，就够了，那么以此为指导思想，对这“二时”进行了必要的学习了解，得出初步结论：

- **编译时可以简单理解为**：开发完项目，直接编译成小程序，这样可以使用react语法开发，但是会有一定程度的限制，毕竟要通过babel转一下。
  - **优点**：性能好。
  - **缺点**：react写法上会有一些限制，毕竟react编译成微信小程序，百分之百能转明白的编译器目前好像没有。

- **运行时简单理解为**：根据开发完的项目，生成出一些数据，然后提供给一个比较重的运行时 `JS` 代码进行渲染。
  - **优点**：react使用上几乎没有限制。
  - **缺点**：性能会有问题，毕竟运行的时候通过`js`渲染上去的，会好性能，（不过taro3提供了`CustomWrapper`组件来一定程度的优化）。

那么这么一看，**运行时方案**更适合我，因为我就想要一个“痛快开发react”的框架，毕竟项目不算大，性能要求不高。那么经过筛选，入围的都有：
- **taro3**：taro3是**运行时方案**，1&2是**编译时方案**。
  - **出品方**：京东-凹凸实验室。
- **remax**：**运行时方案**。
  - **出品方**：阿里。
- **rax**：**运行时方案**和**编译时方案**，这个厉害啊。
  - **出品方**：阿里，自称内部应用最广泛的。

首先这三者基本都符合**运行时方案**，然后出品方还都不错，起初我以为rax是**运行时方案**，当我做完项目才知道可以选择**编译时方案**，所以就没考虑，是我草率了，然后我就在taro3和remax之间进行了比较。

## taro3和remax比较，我选了taro3

首先如何选出适合自己的框架，我觉得主要需要关注的两个关键要素就是：
- 配套的组件库是否强大且好用
  - 原因：快速的画页面，一些常见功能直接调现成的api，提高开发效率
- 技术社区是否活跃
  - 原因：越活跃就越说明用的人多，就会促进技术框架不断成熟稳定，而且有问题还容易找到解决办法，而我用一个比较简单粗暴的方式来衡量，那就是看star就完了，23333。

那么以此为指导思路再分析一下taro3和remax:

- taro3
  - 组件库：[taro-ui](https://taro-ui.jd.com/#/docs/introduction)
    ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/212201853ecc4dad873fa0e93a83204b~tplv-k3u1fbpfcp-watermark.image?)
    - star数：3.9k
    - 组件量：还算够用。
  - taro社区：[官方](https://github.com/NervJS/taro/discussions)
    ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9ca93411a16f4de4bcfc5b82bbc7a445~tplv-k3u1fbpfcp-watermark.image?)
    - star：31k
  - 物料市场：[官方](https://taro-ext.jd.com/)
  
    ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/74614372467f4c25ab0f3e953e32e614~tplv-k3u1fbpfcp-watermark.image?)
  

- remax
    ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b0158d10d3d442da334109b8c452649~tplv-k3u1fbpfcp-watermark.image?)
  - 组件库：[@kqinfo/ui](https://cqkqinfo.github.io/ui/)（应该是一帮侠客们写的，用爱发电做的）
    ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae9fb359544446588f2a0bb747e73d59~tplv-k3u1fbpfcp-watermark.image?)
    - star数：46（可怜的少。。。）
    - 功能上：太强了，非常全，不单单是组件，还有一堆工具函数可以用
      - 工具函数和hooks：哎我去，axios，CDN，websocket啥的都帮你搞了，简直不要太贴心。
        
        ![WX20220524-165356@2x.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/361f0533f7724567b31801ceda4ae27f~tplv-k3u1fbpfcp-watermark.image?)
       
        ![WX20220524-165852@2x.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80bcca3255394a3ea5af1be1de0763e9~tplv-k3u1fbpfcp-watermark.image?)

      - 统一平台：顾名思义，应该是跨平台的一些通用功能api，真的我虽然没实际用，但就这诚意，我是感受到了的。
      
      ![WX20220524-170059@2x.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/94dbefc318494d22af98cee5c27c8f53~tplv-k3u1fbpfcp-watermark.image?)
      
      
当时的我非常纠结，我心里非常想用remax写的，因为@kqinfo/ui足够打动我，但是可怜的star数，让我望而却步，我知道单从star数就否定一个开源库是愚昧的冷气的势利的，只不过出于对风险的现实考量，我还是选择了taro3，因为其受欢迎，但remax+@kqinfo/ui成为了我的意难平，但我祝福ta，也盼望自己哪天能够有契机好好的试一试。

# Taro3开发一个完整项目的全历程盘点
## 创建项目
创建一个taro3项目这件事儿上，我卡了好一阵，主要还是被各种眼花缭乱的模板迷住了，不清楚该选哪个，
- 首先安装taro3的命令行工具
- 然后使用taro-cli创建一个模板项目
- 起初我选了社区的集成**antd-mobile**的模版，我觉得不是特别完善，有不少组件还没有，而且还是老版本的**antd-mobile**，样子不是特别好看。
- 那么选来选去，我觉得还是taroUi的模版项目适合我，那么就决定是是ta了。
## 样式相关
### h5样式不能直接用，因为taro会转换px
首先，换算规则如下：
> 1rpx = 0.5px = 1物理像素

在taro中，px会直接变成rpx，如12px直接变成12rpx，那么根据换算比例就是变成一半大小，那么解决办法是：
- px写成Px，这样taro就不转了，[taro文档中有介绍](https://taro-docs.jd.com/taro/docs/size#:~:text=%E5%A6%82%E6%9E%9C%E4%BD%A0%E5%B8%8C%E6%9C%9B%E9%83%A8%E5%88%86%20px%20%E5%8D%95%E4%BD%8D%E4%B8%8D%E8%A2%AB%E8%BD%AC%E6%8D%A2%E6%88%90%20rpx%20%E6%88%96%E8%80%85%20rem%20%EF%BC%8C%E6%9C%80%E7%AE%80%E5%8D%95%E7%9A%84%E5%81%9A%E6%B3%95%E5%B0%B1%E6%98%AF%E5%9C%A8%20px%20%E5%8D%95%E4%BD%8D%E4%B8%AD%E5%A2%9E%E5%8A%A0%E4%B8%80%E4%B8%AA%E5%A4%A7%E5%86%99%E5%AD%97%E6%AF%8D%EF%BC%8C%E4%BE%8B%E5%A6%82%20Px%20%E6%88%96%E8%80%85%20PX%20%E8%BF%99%E6%A0%B7%EF%BC%8C%E5%88%99%E4%BC%9A%E8%A2%AB%E8%BD%AC%E6%8D%A2%E6%8F%92%E4%BB%B6%E5%BF%BD%E7%95%A5%E3%80%82)
    - 缺点：不能自适应了，手机ok，但iPad不行了，所以不靠谱。
- 直接修改配置文件中deviceRatio的配置，如下图，designWidth设置了750，那么就根据deviceRatio中配置的比例就行转，目前是1，那就是一比一的转，写成2，那就是1px转成2rpx。
    ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/218f032ad91f4321b08c7c5c973c6ea5~tplv-k3u1fbpfcp-watermark.image?)
    - 缺点：改完的话，就不能直接使用蓝湖的样式了，还得手动除2，费劲

最后，两种方法我都没采用，用了比较笨，但是比较稳妥的方式，就是直接手动根据换算规则改一下，比如h5的样式12px，我拷贝过来就改成24px。

### 使用cssModule，并修改taroUi的默认样式
我们用taroUI画页面，参照的是蓝湖的原型图，那么我无法避免的要根据效果图来定制taroUI的样式，那么这就涉及了修了taroUI的底层样式，并且还要注意不能因为修改底层样式对全局造成了污染等问题。所以使用cssModule非常有必要，这样借助cssModule就达到了不污染环境还能修改底层样式的目的。

**具体实现流程如下：**
- 创建***.module.scss文件

    ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0966564ad3b74ba9aeff2dc7a245f75b~tplv-k3u1fbpfcp-watermark.image?)

- 然后在开发者工具中找到这个节点，查看taroUI的样式名字

    ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b14744b78734279a6123d79467f2912~tplv-k3u1fbpfcp-watermark.image?)

- 然后通过:global进行修改

    ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9752df273e114d998ed0ce5dd3a65e42~tplv-k3u1fbpfcp-watermark.image?)

这样基本就可以定制taroUI的样式，从而实现效果图的样子。

## 地图相关

这一块h5和taro3的差异是真大，前者是调用js实现，后者是通过内置组件的方式实现，具体的使用上差别不小，二者几乎无法复用一套逻辑。

### 创建地图相关
- h5
    - 通过cdn引入地图库
    - 然后渲染`Map`组件
    - 用`useRef`创建名为`mapRef`的`ref`，来保存地图组件实例，以便后续的业务要用。
    ```js
    // cdn引入
    <script charset="utf-8"
    src="https://map.qq.com/api/js?v=2.exp&key=你的key&libraries=geometry"></script>
    // html
    <div id="allmap"></div>
    // js
    ...
    // 来保存地图组件实例，以便后续的业务要用。
    const mapRef = useRef();
    ...
    var center = new TMap.LatLng(position.lat, position.lng);//定义地图中心点坐标
    var map = new TMap.Map(document.getElementById("allmap"), {
        center: center, //设置地图中心点坐标
        zoom: 13, //设置地图缩放级别
    });
    mapRef.current = map; // 地图实例对象
    ...
    ```
- taro3
    - 引入`Map`组件
    - 然后渲染`Map`组件
    - 然后在`useEffect`中创建`mapContext`，从而获得地图组件实例，通过ta调用api来做一些操作。
    - 用`useRef`创建名为`mapRef`的`ref`，来保存地图组件实例，以便后续的业务要用。
    ```js
    import { Map } from "@tarojs/components";
    ...
    const mapRef = useRef(); // 创建一个ref，用来保存地图组件实例
    useEffect(()=>{
        mapRef.current = Taro.createMapContext("surroundMap");
    },[])
    ...
    <Map
      scale={13.8}
      onRegionChange={({ type }) => {
        // 视野发生变化时触发 
        // type值：开始-“begin”，结束-“end”
      }}
      onMarkerTap={(data) => {
         // marker点击事件
      }}
      latitude={currentPos?.latitude}
      longitude={currentPos?.longitude}
      id="surroundMap"
      className={styles.map}
      enableZoom={true}
      markers={markerList} // marker点的数据结合
    ></Map>
    ...
    ```
### marker相关
- **创建marker**
    - **h5**
        - 创建`TMap.MultiMarker`的实例。
        - 传入参数`map`，值为地图实例对象。意思为将该`TMap.MultiMarker`的实例添加到地图实例上。
        - 传入参数`styles`，值为样式字典，每个样式数据都是`TMap.MarkerStyle`的实例。
        - 传入参数`geometries`,值为Marker数据集合，数据中主要坐标信息、id、、样式id。
        ```js
        ...
        const markerRef = useRef();
        ...
        const markerLayer = new TMap.MultiMarker({
        map: ref.current,
        styles: {
          // 点标记样式
          markerA: new TMap.MarkerStyle({
            width: 25, // 样式宽
            height: 36, // 样式高
            anchor: { x: 12, y: 24 }, // 描点位置
            src: "/img/markerA.png", // 使用的public下的资源
          }),
          // 点标记样式
          markerB: new TMap.MarkerStyle({
            width: 25, // 样式宽
            height: 36, // 样式高
            anchor: { x: 12, y: 24 }, // 描点位置
            src: "/img/markerB.png", // 使用的public下的资源
          }),
        },
        geometries: [{
            position: ref.current.getCenter(),
            id: disMarkerId,
            styleId: "markerB",
          }],
      });
      // 通过useRef保存一下，以后业务会用到
      markerRef.current = markerLayer;
      ```
        - 动态添加新的`marker`
            ```js
            markerRef.current.add([
              {
                position: mapRef.current.getCenter(),
                id: disMarkerId,
                styleId: "markerE",
              },
            ]);
            ```
    - **taro3**
        - 直接创建`marker`数据即可，然后放入一个数组中，并用一个`useState`管理起来：
            ```
            const [ markerList，setMarkerList ] = useState([{
              width: 25, // 样式宽
              height: 36, // 样式高
              latitude:120.1,
              longitude:28.1,
              // 标记位置(纬度，经度，高度)
              id: item.id,
              iconPath: require("./markerA.png"),// 图片可以直接使用工程项目中的资源文件。
            }])
            ```
        - 然后直接作为Map组件的`markers`参数传入即可:
            ```js
            <Map
              ...
              markers={markerList}
              ...
            />
            ```
        - 动态添加新的`marker`
            ```js
            setMarkerList([
                ...markerList,
                {
                  width: 25, // 样式宽
                  height: 36, // 样式高
                  latitude:121.1,
                  longitude:29.1,
                  // 标记位置(纬度，经度，高度)
                  id: item.id,
                  iconPath: require("./markerA.png"),// 图片可以直接使用工程项目中的资源文件。
                }
            ])
            ```
- **添加事件**
    - **h5**
        ```js
        markerLayer.on("click", (e) => {
            const { geometry } = e;
            const { id } = geometry;
            // 通过id进行节点区分
        });
        ```
    - **taro3**
        ```js
        <Map
          ...
          onMarkerTap={(data) => {
            if (popupVisable) return;
            const { detail:{id} } = data;
            // 通过id进行节点区分
          }}
          ...
        />
        ```
- **删除**
    - **h5**
    
      将要删除的数据的id放入一个数组中，调用`remove`函数进行删除。
      
            ```js
            let targetId = 666
            markerRef.current.remove([targetId]);
            ```
        
    - **taro3**
    
        毕竟是数据驱动，直接创建新的数据集合驱动就完了。
        ```js
        ...
        setMarkerList([])
        ...
        <Map
          ...
          markers={markerList}
          ...
        />
        ```
        
### 地图中心位置相关

- **获得地图中心位置**
    - **h5**：通过`getCenter`直接获得即可
        ```js
        let pos = mapRef.current.getCenter()
        ```

    - **taro3**：获得中心坐标的函数是异步的，这跟h5同步获得不同，要注意。
        ```js
        mapRef.current.getCenterLocation().then((data) => {
            const { longitude, latitude } = data;
            let centerpos = {
              latitude,
              longitude,
            };
            // 获得经纬度数据
        });
        ```
- **设置中心位置**
    - **h5**
        - 创建**TMap.LatLng**实例
        - 调用**setCenter**设置
            ```js
            let center = new TMap.LatLng(temp.lat, temp.lng);
            mapRef.current.setCenter(center);
            ```
    - **taro3**：因为没找到直接设置中心位置的api，但发现可以用两外一种方式替代，那便是移动到中心位置。
        - 创建一个包含经纬度的对象
        - 调用`moveToLocation`移动中心到指定位置。
            ```js
            mapRef.current.moveToLocation({
              latitude: temp?.latitude,
              longitude: temp?.longitude,
            });
            ```
### 导航相关

导航这块，h5相比小程序就复杂了不少，因为网页要考虑的是，如果是在微信中打开，就调用wx的导航，如果是浏览器打开，那就得接入第三方的导航，但反观taro3就简单了不少，这用调用taro封装好的相关api就可以了。
    
- **h5**
    - 微信中打开，需要先按照wxjssdk的相关要求，进行前期配置准备
        - cdn引入**wxjssdk**，这是[官方文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)
        - 然后跟后台配合请求会一些相关数据，然后进行`wx.config`，否则无法使用微信的`api`。
        - 调用openLocation，打开微信的“到这去”。
           
            ```js
            // cdn引入wxjssdk
            <script src="https://res2.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
            // 然后跟后台配合请求会一些相关数据，然后进行wx.config，否则无法使用wx的api。
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: signature.appId, // 必填，公众号的唯一标识
              timestamp: signature.timestamp, // 必填，生成签名的时间戳<?= $data['timestamp']?>
              nonceStr: signature.nonceStr, // 必填，生成签名的随机串<?= $data['noncestr']?>
              signature: signature.signature, // 必填，签名<?= $data['signature']?>
              signType: signature.signType,
              jsApiList: ["openLocation","getLocation"], // 必填，需要使用的JS接口列表// 必填，需要使用的JS接口列表
            });
            // 调用openLocation，打开微信的“到这去”
             wx.openLocation({
                longitude: parseFloat(data.longitude),
                latitude: parseFloat(data.latitude),
                name: data.name,
                address: data.address,
              });
            ```
       - 效果图：
             ![IMG_1086.PNG](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b4951324615547e6821597b28733748a~tplv-k3u1fbpfcp-watermark.image?)
    - 浏览器打开，高德、腾讯、百度等地图url调起的方式大同小异，不需要cdn引入什么，直接跳转就行，我整合了一下，做了一个组件
            ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7677f7aeb5594185b91aebf396a8d010~tplv-k3u1fbpfcp-watermark.image?)
  

        - 腾讯：腾讯是唯一一个带有返回地址配置的，这样点击返回按钮直接，返回到原网页上，体验不错。
        
            ![IMG_1083.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18f8bcdb3f264fae8bc5dfeca7169006~tplv-k3u1fbpfcp-watermark.image?)
            
        - 高德
        
            ![IMG_1082.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/11da623b971b4a40b0639ce6dc563c5d~tplv-k3u1fbpfcp-watermark.image?)
            
        - 百度
        
            ![IMG_1084.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/898db2dec96643bfb7fc11e40bd2143d~tplv-k3u1fbpfcp-watermark.image?)
            
        - 导航组件code：
            ```js
            import { Button } from "antd-mobile";
            import { transformFromGCJToWGS } from "@SRC/common/transferPos";

            let btnArr = {
              gaode: {
                info: "高德地图",
                handleClick: ({ start, end }) => {
                  window.location.href = `https://uri.amap.com/navigation?from=${
                    start.lng || 120.88
                  },${start.lat || 31.98},${start.addr}&to=${end?.longitude},${
                    end?.latitude
                  },${end?.name}&mode=car&callnative=1&coordinate=wgs84&src=mypage`;
                },
              },
              tengxun: {
                info: "腾讯地图",
                handleClick: ({ start, end }) => {
                  window.location.href = `https://apis.map.qq.com/tools/routeplan/eword=${
                    end?.name
                  }&epointx=${end?.longitude}&epointy=${end?.latitude}&sword=${
                    start.addr
                  }&spointx=${start.lng || 120.88}&spointy=${
                    start.lat || 31.98
                  }?referer=myapp&key=EHVBZ-CRJCD-J2K4J-HXCPD-PIFXZ-TQFWY&backurl=${encodeURIComponent(
                    window.location.href.split("#")[0]
                  )}`;
                },
              },
              baidu: {
                info: "百度",
                handleClick: ({ start, end }) => {
                  window.location.href = `http://api.map.baidu.com/direction?origin=latlng:${
                    start.lat || 31.98
                  },${start.lng || 120.88}|name:我家&destination=${end?.latitude},${
                    end?.longitude
                  }&mode=driving&region=成都&output=html&coord_type=gcj02&src=webapp.baidu.openAPIdemo`;
                },
              },
            };
            export default ({ data, posData }) => {
              return (
                <div>
                  {Object.values(btnArr).map((item, key) => {
                    const { info, handleClick } = item;
                    return (
                      <div key={key}>
                        <Button
                          style={{
                            width: "100%",
                          }}
                          onClick={handleClick.bind(null, { start: posData, end: data })}
                        >
                          {info}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              );
            };
            ```

- **taro3**
    - 引入Taro
    - 通过`Taro.openLocation`调起，用法一致，不过这可是小程序，不需要配置wx.config就能直接用这个api。
        ```js
        import Taro from "@tarojs/taro";
        ...
        Taro.openLocation({
            longitude: parseFloat(data.longitude),
            latitude: parseFloat(data.latitude),
            name: data.name,
            address: data.address,
          });
        ...
        ```
    
 我这里直接用的**Taro3**二次封装的同名`api`，当然你也完全可以直接调用`wx.openLocation`也是可以的。
    
    
## 业务相关
### 集成了mobx，进而优化了共用数据反复传递的麻烦
本来，我打算先不集成mobx这类的数据管理模块，主要担心会不会有坑，不过很多共用数据的反复传递，太费劲了，不如托管统一位置来的方便，所以我还是集成吧，目前基本的使用没发现问题，一切良好，taro3官方也提供了一些辅助库，不过我还是用的原滋原味的`mobx-react`，主要是熟悉了。

- 集成mobx
    - 创建store
        ```js
        import { observable, action } from "mobx";

        class GlobalStore {
          @observable posData = null;
          @observable noticeArr = [];
          @observable counter = 0;

          @action.bound
          setNoticeArr(data) {
            this.noticeArr = data;
          }

          @action.bound
          setPosData(data) {
            this.posData = data;
          }

          @action.bound
          setCounter(data) {
            this.counter = data;
          }

        }

        export default new GlobalStore();
        ```
    - 创建多文件store导出
        ```js
        import globalStore from "./globalStore";

        export default {
            globalStore,
        };

        ```
    - 然后把多文件stores提供给provider，并在顶层`app.js`组件中包裹一下。
        ```js
        import { Provider } from "mobx-react";
        import stores from "@SRC/stores/index";
        
        <Provider {...stores}>{this.props.children}</Provider>;
        ```
    - 在需要用到mobx中stores数据的组件中，进行状态注入`@inject("globalStore")`和监听刷新`@observer`
        ```js
        import { observer, inject } from "mobx-react";
        
        @inject("globalStore")
        @observer
        export default class Index extends Component {
        ...
        }
        ```
    - 但是我的项目中，大部分都是用的函数组件，我用`inject`和`observer`这俩`hoc`先后对函数组件进行包装，居然报错了。`observer`是可以包装的，但`inject`是不行的，也就是获得**Mobx**的**stores**中的状态数据不行，那么换个方式被，用`mobx-react`提供的`Context`，封装成一个名为`useStores`的`hook`，方便函数组件使用。
        ```js
        // useStores.js
        import React from "react";
        import { MobXProviderContext } from "mobx-react";

        export default () => {
          return React.useContext(MobXProviderContext);
        };
        ```
    - 在函数组件中使用封装好的`useStores`
        ```js
        import { useStores } from "@SRC/common/hooks";
        
        export default (props) => {
            ...
            const { globalStore } = useStores();
            ...
        }
        ```

### taro3都扩展了哪些生命周期函数，了解一下
首先要区分两种，一种是“**入口文件**”和“**页面组件及子组件**”，入口文件如唯一的。这二者taro3扩展了不同的生命周期，先说一下数量最多，最常见的“**页面组件及子组件**”。


- 页面组件及子组件
    
    支持 React 的生命周期以外，还根据小程序的标准，额外支持以下**生命周期**，我根据**用处**做了如下整理：
    - **小程序初次页面渲染完成**
        > - 小程序的`componentDidMount`
        > - 从此生命周期开始可以使用 createCanvasContext 或 createSelectorQuery 等 API 访问小程序渲染层的 DOM 节点（**记住哦。否则在其他useEffect中取，刚上来是取不到的**）。

        - **函数组件：useReady**
            ```js
            import { useReady } from '@tarojs/taro' // Taro 专有 Hooks
            ...
            useReady(() => {
                console.log(useReady)
            })
            ```
        - **类组件：onReady**
            ```js
            import { Component } from "react";
            ...
            export default class Index extends Component {
            ...
            onReady(){
                console.log('onReady')
            }
            ...
            }
            ```
    - **获得路由参数**
        > 获得路由信息，比如获取通过变成熟路由跳转后带的参数。
        > 
        > taro变成跳转api：
        >  - `Taro.navigateTo`。
        >  - `Taro.redirectTo`。
        - **函数组件：`useRouter`**
            ```js
            const router = useRouter()
            ```
        - **类组件：`onLoad`**
            ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b761a59aadcd493892c7732f55c35f8a~tplv-k3u1fbpfcp-watermark.image?)

        - **通用方法**：当然也可以不借助生命周期，通过`getCurrentInstance`
            ```js
            import { getCurrentInstance } from '@tarojs/taro'
            ...
            const { router } = getCurrentInstance();
            ```
    - **上拉触底**

        > - 可以在全局配置的 window 选项中或页面配置中设置触发距离 `onReachBottomDistance`。
        > - 在触发距离内滑动期间，本事件只会被触发一次。


        - **函数组件：`useReachBottom`**
            ```js
            import { useReachBottom } from '@tarojs/taro' // Taro 专有 Hooks
            ...
            useReachBottom(() => {
                console.log('onReachBottom')
            })
            ```
        - **类组件：`onReachBottom`**
            ```js
            import { Component } from "react";
            ...
            export default class Index extends Component {
            ...
            onReachBottom(){
                console.log('onReachBottom')
            }
            ...
            }
            ```
    - **下拉动作**

        > -   需要在全局配置的 window 选项中或页面配置中设置 `enablePullDownRefresh: true`。
        > -   可以通过 [Taro.startPullDownRefresh](https://taro-docs.jd.com/taro/docs/apis/ui/pull-down-refresh/startPullDownRefresh)触发下拉刷新，调用后触发下拉刷新动画，效果与用户手动下拉刷新一致。
        > -   当处理完数据刷新后，[Taro.stopPullDownRefresh](https://taro-docs.jd.com/taro/docs/apis/ui/pull-down-refresh/stopPullDownRefresh) 可以停止当前页面的下拉刷新.


        - **函数组件：`usePullDownRefresh`**
            ```js
            import { usePullDownRefresh } from '@tarojs/taro' // Taro 专有 Hooks
            ...
            usePullDownRefresh(() => {
                console.log('onReachBottom')
            })
            ```
        - **类组件：`onPullDownRefresh`**
            ```js
            import { Component } from "react";
            ...
            export default class Index extends Component {
            ...
            onPullDownRefresh(){
                console.log('onPullDownRefresh')
            }
            ...
            }
            ```
    - **滑动页面**
        > 参数是一个对象，其中属性为`scrollTop`,页面在垂直方向已滚动的距离（单位px）。
        - **函数组件：`usePageScroll`**
            ```js
            import { usePageScroll } from '@tarojs/taro' // Taro 专有 Hooks
            ...
            usePageScroll(res => {
                console.log(res.scrollTop)
            })
            ```

        - **类组件：`onPageScroll`**
            ```js
            import { Component } from "react";
            ...
            export default class Index extends Component {
            ...
            onPageScroll(params){
                const { scrollTop } = params; // 页面在垂直方向已滚动的距离（单位px） 
                console.log('onPageScroll')
            }
            ...
            }
            ```
    - **监听页面的显示和隐藏**
        > - 字面意思页面显示时触发，所以要清楚的知道，什么样的操作会触发，比如当调用openLoaction打开地图页面时候，再再回来时候和点击右上角隐藏和再回来的时候。
        > 
        > - 对于类组件需要分清楚，到底是“页面组件”还是其“子组件”，页面组件就是最顶层的组件，子组件。。。就是子组件，这二者用的生命周期不一样。
        - **函数组件：`useDidShow`和`useDidHide`**
            ```js
            import { useDidShow,useDidHide } from '@tarojs/taro' // Taro 专有 Hooks
            ...
            useDidShow(() => {
                console.log('useDidShow')
            })

            useDidHide(() => {
                console.log('useDidHide')
            })
            ```

        - **类组件：`componentDidShow`和`componentDidHide`**
            ```js
            import { Component } from "react";
            ...
            // 子组件
            const class Child  extends Component {
                ...
                onShow = () => {
                    console.log('onShow')
                }
                onHide = () => {
                    console.log('onHide')
                }
                ...
            }

            // 页面组件
            export default class Index extends Component {
                ...
                componentDidShow(){
                    console.log('componentDidShow')
                }

                componentDidHide(){
                    console.log('componentDidHide')
                }
                ...
                render(){
                    return (<div>
                        <Child/>
                    <div>)
                }
            }
            ```
    - **监听用户点击页面内转发**

        > 对于**函数组件**：
        > 
        > - **【Breaking】Taro 3.0.3 开始，使用此 Hook 时必须为页面配置 `enableShareAppMessage: true`。（修改配置文件后请重新编译项目）**
        > 
        > - 监听用户点击页面内转发按钮（Button 组件 openType='share'）或右上角菜单“转发”按钮的行为，并自定义转发内容。等同于 `onShareAppMessage` 页面生命周期钩子。

        > 对于**类组件**：
        > 
        > - 当 `onShareAppMessage` 没有触发时，请在页面配置中设置 `enableShareAppMessage: true`。
        > 
        > - 只有定义了此事件处理函数，右上角菜单才会显示“转发”按钮。

        - **函数组件**
            ```js
            // page.js
            function Index () {
              useShareAppMessage(res => {
                if (res.from === 'button') {
                  // 来自页面内转发按钮
                  console.log(res.target)
                }
                return {
                  title: '自定义转发标题',
                  path: '/page/user?id=123'
                }
              })
            }
            // page.config.js
            export default {
              enableShareAppMessage: true
            }
            ```
        - **类组件**
            ```js
            export default class Index extends Component {
              ...
              onShareAppMessage (res) {
                if (res.from === 'button') {
                  // 来自页面内转发按钮
                  console.log(res.target)
                }
                return {
                  title: '自定义转发标题',
                  path: '/page/user?id=123'
                }
              }
              ...
            }
            ```
    
- 唯一的入口文件
    > 每一个 Taro 应用都需要一个入口组件（React 组件）用来注册应用。入口文件默认是 `src` 目录下的 `app.js`。
    相比上面刚刚介绍完的“**页面组件及子组件**”，入口文件专属的钩子不几个，官方就设定了四个。
    - onLaunch (options)
        > - 在小程序环境中对应 app 的 `onLaunch`。
        > 
        > - 在此生命周期中通过访问 `options` 参数或调用 `getCurrentInstance().router`，可以访问到程序初始化参数。

    - 参数options

        | 属性           | 类型     | 说明                                     |
        | ------------ | ------ | -------------------------------------- |
        | path         | string | 启动小程序的路径                               |
        | scene        | number | 启动小程序的场景值                              |
        | query        | Object | 启动小程序的 query 参数                        |
        | shareTicket  | string | shareTicket，详见获取更多转发信息                 |
        | referrerInfo | Object | 来源信息。从另一个小程序、公众号或 App 进入小程序时返回。否则返回 {}

    - componentDidShow (options)
        > - 程序启动，或切前台时触发。
        >
        > - 参数基本与`onLaunch`一致。
    - componentDidHide ()
        > - 程序切后台时触发。
    - onPageNotFound (Object)

    - 参数Object

        | 属性          | 类型      | 说明                                      |
        | ----------- | ------- | --------------------------------------- |
        | path        | string  | 不存在页面的路径                                |
        | query       | Object  | 打开不存在页面的 query 参数                       |
        | isEntryPage | boolean | 是否本次启动的首个页面（例如从分享等入口进来，首个页面是开发者配置的分享页面）

### 文字走马灯组件
- 为什么写
    
    首先我为什么在taroUi有这个组件的情况下，我还要手写这个组件呢？答案是：


    - 我当时找了一圈没发现有。。。。当我写完了才发现有的，名字叫“通告栏”。
         ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b7ae2ec7d5242aeb43f0aff4ffb3ddb~tplv-k3u1fbpfcp-watermark.image?)
    
    - 然后我试了试taro-ui的“通告栏”组件`Noticebar`，发现真机上有问题，所以还是用不了。。。

- 实现方式

    - 样式实现
        - 性能好，但不好控制
    - js实现
        - 好控制，但性能不好

    控制与性能，我更倾向前者，所以，我选择了js实现的方式，但是一般的js实现无非就是通过api获得节点，再通过定时器，一点一点的修改样式，从而实现循环滚动的效果，但是这种方式开发者工具上看着没问题，但是真机就错问题了，一卡一卡的，完全介绍不了，所以，要像个办法，通过js实现还不卡的方式，那就是：

    使用`ScrollView`组件并运用其api之`scrollTo`来实现，亲测不卡，已经发布到npm上了，可以体验一下。

    ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/625d4a58712946709292cb98b0c03e63~tplv-k3u1fbpfcp-watermark.image?)
    我设计了一些配置项，来实现一些功能点

    ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9fdc8364d6b445c780b55d1efbde5edb~tplv-k3u1fbpfcp-watermark.image?)

### 用taroUi把antd-mobile v5翻译一下
h5我用的组件库是：antd-mobile v5
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f4f0f203d3114fa89a736a0649b2498a~tplv-k3u1fbpfcp-watermark.image?)
那么我就尽可能从taroUi找到对应的组件进行复刻移植。

- 从下方弹出的modal框
    - antd-mobile v5中用`Popup`实现，效果如图：
        ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c888be868db6467dbcb78cd847e3e2fc~tplv-k3u1fbpfcp-watermark.image?)
        
    - taroui用`FloatLayout` 浮动弹层来实现，效果如图：
        ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe26cfca0489493ab24633f4033cb954~tplv-k3u1fbpfcp-watermark.image?)
    
# 小程序开发遇到的坑～
## 仅安卓设备，清除地图上的marker会有残留，清除不干净
这个问题为什么放在第一个，是因为这个问题，在整个开发过程中解决起来耗时最久的，没有之一。这个“几乎”没有方法解决，只能回避。这不妨让我想起那句富有生存哲学的名言：“**逃避虽然可耻，但是真好用，23333～～～**”。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ff8b4c5bb7cd46a08ba0231de77d5d3b~tplv-k3u1fbpfcp-watermark.image?)

[微信小程序社区讨论1](https://developers.weixin.qq.com/community/develop/doc/000e46b7b086c82c47fc567315ac00?highLine=marker)

[微信小程序社区讨论2](https://developers.weixin.qq.com/community/develop/doc/000e46b7b086c82c47fc567315ac00?highLine=marker%2520%25E5%25AE%2589%25E5%258D%2593%2520%25E5%2588%25A0%25E9%2599%25A4%25E4%25B8%258D%25E4%25BA%2586)

[微信小程序社区讨论3](https://developers.weixin.qq.com/community/develop/doc/000e46b7b086c82c47fc567315ac00?highLine=marker%2520%25E6%25B8%2585%25E9%2599%25A4%25E6%259C%2589%25E6%25AE%258B%25E7%2595%2599)

最后我试了几乎所有我能想到的方式。最后都不行，后来我发觉残留的那部分仅仅是最开始的数据，再往后就不会出现残留，于是我看了一下代码，发现了一处再极短时间内，前后连续创建markers的逻辑，我强行让两次创建相隔一段时间，结果问题完美解决了，就不会出现了。

## 地图组件通过样式设置隐藏了，开发工具上ok，但是在真机上就会闪现出来
- **起因**：首先为什么会出现呢，是因为我需要地图不销毁，仅仅是隐藏，这样一些操作能够保存下来，同时节省了平凡创建的性能，所以我就通过样式的`visibility`来切换显隐。
- **现象**：开发者工具上看一点问题都没有，到真机上就会出现贼匪夷所思的问题，就是理论上地图不该显示的时候，居然显示了，完全不符合预期。
- **办法**：我没办法，只好用了一个状态变量，严格的控制最开始的创建，仅仅控制一次，当创建完之后就不管了，直接绕过这个问题，把问题埋起来了。是的，直接回避了问题，还是那句生存哲学：**逃避虽然可耻，但是真好用，23333～～～**
    ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/beced0af1e1e49dc8336ea3e36893c25~tplv-k3u1fbpfcp-watermark.image?)


## 通过taro的query获得节点，上来就获取有可能是空的

这没啥好说的，就是没在正确的时间做事，即没在页面渲染完，你就获取，是获取不到的，比如你在`useEffect`和`useLayoutEffect`中获取是不行的，你得在`useReady`获取就好了，但如果，你就是想想在哪获取就在哪获取，你的代码你掌握，那么就像我一样，写一个轮询就行了。
```js
const getEle = (callF) => {
    Taro.createSelectorQuery()
      .select("#" + scrollviewId)
      .node()
      .exec((res) => {
        if (!scrollEleRef.current) {
          if (res[0]) {
            scrollEleRef.current = res[0].node;
            scrollEleRef.current.scrollEnabled = false;
            callF();
          } else {
            setTimeout(() => {
              getEle(callF);
            }, 10);
          }
        }
      });
  };
```
## 动态设置组件显示信息，有的组件会出现重影
这个问题更绝了，这是我刚用真机测试，遇到的第一个标志性问题，这个我也不知道为啥，我用熟练的react写法写的，我觉得没有任何问题，为啥就不符合我的预期的，而且开发看着一点问题没有，我用我的ios测时才会有，我当时直接懵了，我对自己会不会写react产生了怀疑，我觉得能不能是渲染的时候，没搞清楚组件谁是谁，所以才出现的重影？然后我就手动加了一个随机数作为key。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/092064ade3e8478d8405e65b69e03bc8~tplv-k3u1fbpfcp-watermark.image?)

奇迹般的居然没问题了，玄学啊。。。。。不过刚才我去掉了试一试，复现不了了，不过写出来仅供参考，如果出现类似我秒睡的问题，不妨试一试加个key，也许打败魔法的就是魔法，233333～～～

## 滑动怎么穿透了，点击怎么也穿透了

这个更有意思，居然是穿透的，如果你对touch事件和click时间混用所引起的问题感兴趣，可以上网找一些文章，一堆的，问题很常见的，这里不做赘述了，仅仅贴出解决方法。
- **滑动穿透**
taro提供的办法
```js
// 这个 View 组件会绑定 catchtouchmove 事件而不是 bindtouchmove\
<View catchMove></View>
```

- **点击穿透**
样式解决
```css
pointer-events: none;
```

# 源码
- H5：**马上开源，还在打磨。**
- 小程序：**马上开源，还在打磨。**

肯定发，肯定发，六一之前不开源，我阿强就过儿童节，我说的。
