# 小程序分析

## 小程序与普通网页开发的区别

小程序的主要开发语言是 JavaScript ，小程序的开发同普通的网页开发相比有很大的相似性。对于前端开发者而言，从网页开发迁移到小程序的开发成本并不高，但是二者还是有些许区别的。

网页开发渲染线程和脚本线程是互斥的，这也是为什么长时间的脚本运行可能会导致页面失去响应，而在小程序中，二者是分开的，分别运行在不同的线程中。网页开发者可以使用到各种浏览器暴露出来的 DOM API，进行 DOM 选中和操作。而如上文所述，小程序的逻辑层和渲染层是分开的，逻辑层运行在 JSCore 中，并没有一个完整浏览器对象，因而缺少相关的DOM API和BOM API。这一区别导致了前端开发非常熟悉的一些库，例如 jQuery、 Zepto 等，在小程序中是无法运行的。同时 JSCore 的环境同 NodeJS 环境也是不尽相同，所以一些 NPM 的包在小程序中也是无法运行的。

网页开发者需要面对的环境是各式各样的浏览器，PC 端需要面对 IE、Chrome、QQ浏览器等，在移动端需要面对Safari、Chrome以及 iOS、Android 系统中的各式 WebView 。而小程序开发过程中需要面对的是两大操作系统 iOS 和 Android 的微信客户端，以及用于辅助开发的小程序开发者工具，小程序中三大运行环境也是有所区别的

| **运行环境**     | **逻辑层**     | **渲染层**       |
| :--------------- | :------------- | :--------------- |
| iOS              | JavaScriptCore | WKWebView        |
| 安卓             | V8             | chromium定制内核 |
| 小程序开发者工具 | NWJS           | Chrome WebView   |

网页开发者在开发网页的时候，只需要使用到浏览器，并且搭配上一些辅助工具或者编辑器即可。小程序的开发则有所不同，需要经过申请小程序帐号、安装小程序开发者工具、配置项目等等过程方可完成。

## 文章分享

- [小程序架构](https://chris118.github.io/2018/04/10/2/)
- [微信小程序架构原理](http://eux.baidu.com/blog/fe/%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F%E6%9E%B6%E6%9E%84%E5%8E%9F%E7%90%86)
- [基于vuejs的小程序引擎底层框架实现](https://zhaomenghuan.js.org/blog/what-is-emp.html#微信小程序架构)
- [小程序原理等文章](https://zhaomenghuan.js.org/note/miniprogram/awesome-miniprogram.html)

## 拓展

Flutter 自己实现了一套渲染机制

小程序是语言层面的

## 思维引导

**首先我们看看小程序代码的组成部分**

js 开发逻辑代码  ==> js   ==>v8

wxss 控制小程序样式  ==>css(浏览器渲染器) ==>  css 

wxml    xml  控制渲染层展示  ==>html(浏览器渲染器)==>dom

**我们需要思考一个问题：**

wxss wxml 自己实现了一套渲染解析器还是使用了预编译技术？？   ===>html css

## 基本架构

原因：是对浏览器部分进行的优化，浏览器解析网页的时候是单线程的阻塞式的。

小程序主要分为**逻辑层**和**视图层**，还有就是他们的原生部分。这样组成了小程序的双线程架构，逻辑层加载js ，渲染层加载wxml、wxss==>iframe。通过JSBridge进行消息通信，只传输字符串类型的数据，例如点击事件会传输事件名。

![structure](/sourceCode/applets/structure.png)

- 视图层主要负责页面的渲染

- 逻辑层负责js的执行。

他们之间通过event和data来通信。通信是有微信客户端（native）做的一层中转；

然后也可以通过jsBridge来调用原生的api，比如什么相机、扫码等功能。

这个视图层，最后我们打包出来的代码，就是html和css，在这里面运行，视图层目前使用 WebView 作为渲染载体。

逻辑层是由独立的 JsCore 作为js的运行环境,所以他和浏览器不一样，只有一些js对应的方法，不能直接操作dom和获取dom，中间都需要通信这一层中转，在架构上，WebView 和 JavascriptCore 都是独立的模块，并不具备数据直接共享的通道。

当前，视图层和逻辑层的数据传输，实际上通过两边提供的 `evaluateJavascript` 所实现。

即用户传输的数据，需要将其转换为字符串形式传递，同时把转换后的数据内容拼接成一份 JS 脚本，再通过执行 JS 脚本的形式传递到两边独立环境。

而 `evaluateJavascript` 的执行会受很多方面的影响，数据到达视图层并不是实时的。

由于这之间他们是彼此独立的，是基于消息驱动来渲染的，所以不会阻塞页面；

所以这就不会造成渲染的阻塞，我的渲染不会影响你的js逻辑，js的执行也不会柱塞渲染的过程；

比如你在发送一些请求的时候，这种一般是经由native转发；

![basicStructure](/sourceCode/applets/basicStructure.png)

## 查看

### 打开调试工具

微信开发者工具 ==> 左上角 调试--》调试微信开发者工具

**查看页面**

```js
document.getElementsByTagName('webview')[0].showDevTools(true,null);
```

**查看逻辑层**

![1603266403016_85AC96F4-C7E1-4F7F-BDAE-191375A9F1FA](/sourceCode/applets/1603266403016_85AC96F4-C7E1-4F7F-BDAE-191375A9F1FA.png)

整个小程序--> 只有一个逻辑层-->装载所有页面逻辑js

视图层（渲染）==>一个页面--->一个webview（wxml、wxss）

### 小程序限制

小程序刚出来时候有限制5个层级，这是因为只维护了5层。现在是10层。

## 基础库

![1603266687632_3CF9F2DB-28DA-49DB-8554-9261F114F86D](/sourceCode/applets/1603266687632_3CF9F2DB-28DA-49DB-8554-9261F114F86D.png)

### 查看

![1603266794627_D5DDEB42-C471-45EB-9195-5229B47CCA27](/sourceCode/applets/1603266794627_D5DDEB42-C471-45EB-9195-5229B47CCA27.png)

### 小程序底层 

小程序开发者工具  openVendor==> 基础库（对于底层运行时的封装、提供事件、数据变更、通信、基础函数）

![1603266951035_76BEFD4C-4205-46F1-9E0D-CF05E6583D2C](/sourceCode/applets/1603266951035_76BEFD4C-4205-46F1-9E0D-CF05E6583D2C.png)

基础库==>wxappUnpacker==>破解.wxvpkg文件，查看源码(比较难读)

![1603267418231_B6E4E86E-17AA-4266-8306-80CCF868E056](/sourceCode/applets/1603267418231_B6E4E86E-17AA-4266-8306-80CCF868E056.png)

## 源码解读

### 视图层引擎

WAWebview.js  ==>视图层引擎

> Foundation 基础模块
>      提供环境变量env isService isWebview  eventEmit  jsbridge ready监听 配置

>  WeixinJSBridge 消息通信机制

![1603268130898_BCC606C0-4253-418F-AF98-E60CA805CE6C](/sourceCode/applets/1603268130898_BCC606C0-4253-418F-AF98-E60CA805CE6C.png)

NativeBuffer 转换数据格式

Reporter 日志系统

**exparser 组件系统** 

1. shadomDOM  （WebComponet规范）例子 wx-element 
2. 提供友好交互的组件  承接原生 
3. video 原生的组件  事件系统 
4. wxml  
5. picker  
6. slider  
7. swiper 

```js
window.exparser.registerBehavior({
  is: "wx-class-prefix",
  created: function () {
    if (this._classPrefix = "", this.ownerShadowRoot) {
      var e = this.classList.getPrefix();
      e && (this._classPrefix = e + "--")
    }
    this._addGlobalClass = this.classList.getAddOriginalClass()
  },
  methods: {
    convertClassListWithPrefix: function (e) {
      for (var t = this.getClassPrefix(), i = this.getAddGlobalClass(), n = [], o = 0; o < e.length; o++) e[o] && (i && n.push(e[o]), n.push(t + e[o]));
      return n
    },
    convertClassWithPrefix: function (e) {
      var t = this.getClassPrefix(),
          i = "";
      return this.getAddGlobalClass() && (i += e + " "), i += t + e
    },
    getClassPrefix: function () {
      return this._classPrefix
    },
    getAddGlobalClass: function () {
      return this._addGlobalClass
    }
  }
})
```

   **__virtualDOM__**

### 逻辑层引擎

WAService.js  ==>

> foundation 基础模块
>      提供环境变量env isService isWebview  eventEmit  jsbridge ready监听 配置

> WeixinJSBridge 消息通信机制

​    路由管理
​    生命周期管理
​    ______subContextEngine________: App、Page、component  getApp\
​    ______virtualDOM____ 

> 逻辑层维护了一套______virtualDOM______ 是为了可以选择节点，createSelectorQuery这个方法，中间还处理了时间的分发等等。

```js
createSelectorQuery: {
  get: function () {
    var e = this;
    return function () {
      return __appServiceSDK__._createSelectorQuery({}, me(we(e))).in(e)
    }
  },
    set: function (e) {
      J(this, "createSelectorQuery", e)
    }
},
```

## 编译

### wcc  

Wechat WXML Compiler ==> wxml编译器==> js

1. 初始化，执行js，生成构建虚拟dom的函数(渲染器)

2. 数据传递给 虚拟dom的函数==>vDOM描述

3. vDOM描述==>exparser==>解析 ==>构建真实dom

4. 数据变更 2-3->diff-->渲染

### wcsc   

WeChat Stylesheet Compiler ==>wxss编译器==>js

1.  wxss ==>js (把rpx单位处理，处理成函数)

2. 获取手机物理及像素分辨力来计算应该多少，

3. 生成新的style 插入

## 初始化

### 渲染层

1. 初始化_webviewId_、wxCode_

2. 加载生成渲染器方法的代码（wxml==>js）

3. 加载执行 wxss==>js ()==>生成css

4. 初始化页面配置 

5. $gwx==>generateFunc(渲染器==>VDOM)，需要数据

[自定义事件](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent/CustomEvent)

6. 

```js
var generateFunc = $gwx(decodeName)
if (generateFunc) {
  var CE = window.CustomEvent;
  document.dispatchEvent(new CE("generateFuncReady", {
    detail: {
      generateFunc: generateFunc
    }
  }))
} else {
  document.body.innerText = decodeName + " not found"
  console.error(decodeName + " not found")
}
```

generateFuncReady  基础库的方法

```js
//基础库源代码
/*
1. 定义generateFuncReady，渲染成已经获取到wxml，通过$gwx编译成生成函数
2. webView渲染层触发dispatch(new Custom('generateFuncReady',detail:$gwx('...')))
*/
generateFuncReady = function () {
  setTimeout(function () {
    ! function () {
      var e = arguments;
      //判断是否WeixinJSBridge准备完成，
      r(function () {
        //触发WeixinJSBridge
        WeixinJSBridge.publish.apply(WeixinJSBridge, o(e))
      })
    }("GenerateFuncReady", {})
  }, 20)
},
document.addEventListener("generateFuncReady", generateFuncReady)
```

7. ??generateFuncReady ==>generateFunc（）==>VDOM

8. 如果，这中间再发生什么变化，触发了setData，这个时候就会重新调用我们刚刚的虚拟dom生成方法，然后在对应的webview层的基础代码来触发dom diff的过程；

### 逻辑层

1. 初始化配置项 页面配置 全局 路由 

2. 加载逻辑层基础库 （Page、App、Component、wx.getSetting.wx.scanCode）

3. 加载所有页面的配置和渲染器方法

**查看方式**

![1603354233179_D854485F-6BD6-4586-BBB7-82550C4FD5A0](/sourceCode/applets/1603354233179_D854485F-6BD6-4586-BBB7-82550C4FD5A0.png)

![1603354423405_EC87D663-4FD6-42FD-B360-15CC8B7A0A4A](/sourceCode/applets/1603354423405_EC87D663-4FD6-42FD-B360-15CC8B7A0A4A.png)

## 流程

![流程图](/sourceCode/applets/流程图.png)

## 小程序框架

### 为什么有小程序框架

一开始小程序才出来的时候，他的定义了一个不论不类的语法、原生开发对于预编译器和webpack都支持不会，对于开发效率和工程构建流程都不方便；还有就是他这个ide确实和专业的ide比起来，实在不好用；

所以就出来了用vue和react相关的语法来开发，这样也没有再去搞个新的写法，还有就是vue和react周边的生态也比较多，有很多相关的工具和第三方库，所以就衍生了一系列框架；

一开始小程序才出来的时候，他的定义了一个不论不类的语法、原生开发对于预编译器和webpack都支持不会，对于开发效率和工程构建流程都不方便；还有就是他这个ide确实和专业的ide比起来，实在不好用；

所以就出来了用vue和react相关的语法来开发，这样也没有再去搞个新的写法，还有就是vue和react周边的生态也比较多，有很多相关的工具和第三方库，所以就衍生了一系列框架；

### 编译时框架

- **wepy**

这个是比较早的框架了，通过一些预编译的手段来开发，他的风格就和vue和写法就和vue差不多，不过他这个还是一种编译的语言，这个是腾讯早起开发的；什么是预编译呢，就是把对应的语法编译成AST抽象语法树，然后通过一些规则来处理成为小程序对应的运行的语言，这个一会儿详细聊一下

- **taro**

 这个也是比较早的框架，它相对来说和wepy大致差不多，一个是类vue的语法，一个是京东自己的类react框架nervjs，所以写法相对来说比较偏react，所以用的比较多，还有就是它的目标是多端、web、小程序、rn，目前rn相对来说，可以支持，但是中间还是需要做很多处理，很多写法上的约束，比如说rn你在写样式的时候，就需要把对应的样式处理到js里面来生成对象，并且只支持flex，所以这个相对而言就玩起来没那么嗨，现在写app，flutter不香么

taro对于你的命令行传递的参数，来编译成对应端的代码；不同端的代码，有不同的编译过程，大致流程和思路就是这样，这个我们下节课会给大家详细分析

### 半编译半运行框架

- **mpvue**

因为taro和wepy这两个框架都是采用的静态编译的方式，把我们写的代码，解析成为抽象语法树，然后通过语法分析把代码转换为可以运行在小程序的代码。比如我们写taro的时候，他就把代码编译成小程序代码，然后把render方法里面的jsx提取出来，编译成小程序的静态模板，js就处理为小程序的页面的一些生命周期，但是对于js这种语言本来就是一种动态语言，编译成为静态的方式，就会有很多的写法和使用限制，毕竟要写对应的解析规则来处理特定的语法；



比如这种语法（大致写一下，可以打开对应的这个模板taro加油项目尝试一下），taro就不认；所以就需要换一种思路来看整个生态，所以就出来了mpvue；

这个就完全是基于vue的语法来开发，它是把vue的库直接给fork过来的，对于我们现在市面上的vue和react的一个大结构，主要就是分成runtime运行时，还有就是compilier编译时，运行时就是真正的框架的运行的流程，但是真正的视图展现还是在端上面（可能是web端、客户端、小程序端），所以mpvue就是保留了vue的运行时的机制，但是对于模板这一层他做的思路和taro的思路大致相同，可以大致[看一下](https://github.com/Meituan-Dianping/mpvue)他的源码结构；增加了端的代码和编译的一下方式，大致看一下packages里面的几个包，这几个就是对应的编译vue的单组件（SFC）到小程序的端代码；

这块主要是vue的模板风格和小程序的模板风格比较相同，那么这块工作量就比较少：



就如同这样编译到对应的模板；

真正运行的时候，我们知道vue的运行过程是什么样子的：



- 我们在本地编译的时候，会把对应的模板生成一段render函数，调用render函数就会生成虚拟的dom；虚拟dom对应到真实的dom，就是VNode。
- 虚拟dom出来了之后，如果发生了更改，内部就会有一个patch diff的过程来比较更新的地方，然后调用修改真实dom的方法
- 在vue实例化的时候，会监听Data数据，如果数据变更，就触发render，最后也来调用patch

在mpVue里面它做了什么呢？就是重写了patch的方法，不去操作对应的dom，因为在小程序中，原生要触发视图更新，就需要调用setData，所以patch的阶段就会重写成为调用setData的方法；

在初始化 new Vue的时候，还会触发调用Page()的方法，来生成小程序的页面实例；所以在patch的时候，拿到对应页面的数据，diff完成了之后，调用setData；

所以这一层是不是就回到了我们昨天聊的优化了，在逻辑层先diff一遍，只把真正修改的数据setData过去

可以看一下大致的文件结构：

**packages/mpvue-template-compiler**    提供了将 vue 的模板语法转换到小程序的 wxml 语法的能力，它只要涉及到模板的预先编译，他这块都会有一些js动态执行模板的过程就不支持，因为编译的语法，一开始没有写定；

**mpvue** 提供了所有的运行时的处理机制；

我们可以看一下build/config.js，这里面有对应的配置；

我们可以找到对应mpvue对应的是结构就是在platforms/mp/runtime;

lifecycle可以看到对应的生命周期的映射

render 可以看到两个点：

- 使用了一个节流的过程来优化setData的评率
- updateDataToMP 在setData之前，触发一个diff的过程；
- 这里面都可以详细看一下

patch这个概念在vue中，你可以暂时理解为定向更新某一个dom，所以这块他就是通过SetData的过程来更新到view层；



### 运行时框架

- **remax**

这个mpvue的思路呢，整体来说算是半编译、半运行时，因为真正的模板还是通过编译的过程得来的，只是在运行的时候，保留了vue的运行时，taro就完全的直接是小程序的运行时了，所以又出来了一种新思路。

​	我们平时在写react的时候，调用渲染的时候，都是调用的reactDOM.render，这个ReactDOM叫做渲染器，它是把虚拟的Dom转换为对应平台的真实元素上去，ReactDOM就是把虚拟dom转换为web的dom，当然针对还有rn的渲染器，社区里面还有一些对于其他平台的渲染器，这个时候如果添加一个小程序的渲染器，是不是就可以实现用react开发了；

但是小程序是没有dom的，所以这块remax引入了一个VNode的抽象层，先把对应的虚拟dom映射到VNode上，然后把VNode转换为小程序页面的data，然后把data转为页面，VNode和dom结构有点像，虚拟dom知识描述节点的样子，但是VNode包含了什么节点的类型呀，属性、子节点，还有什么新增、删除、插入节点等方法，大致的结构就如同这样的：



这个时候，把整个运行时的结构就映射到了VNode上面，就和我们真正拿到Dom节点的结构差不多，这个时候把VNode转化为JSON，设置成为小程序页面的data；现在的问题就是怎么把这个data转化为对应的小程序视图，这个remax会构建这么一个东西基础的模板

```html
<block a:for={{root.children}} a:key={{item.id}}>
  <template is={{'TPL_'+item.type}} data={{item}}  />
</block>

<template name='TPL_view'>
  <view class={{item.props['class']}}>
    <block a:for={{root.children}} a:key={{item.id}}>
      <template is={{'TPL_'+item.type}} data={{item}}  />
    </block>
  </view>  
</template>
```

这样，就会可以处理动态的data数据到视图层的展现了；这样你的什么ts、css预处理是不是都可以很欢乐的用起来，react的hooks是不是也可以很欢快的用起来



- **taro2**

一般呢，前端的世界就和这个江湖一样，**乱烘烘你方唱罢我登场，反认他乡是故乡。甚荒唐，到头来都是为他人作嫁衣裳。**

​	我们上面聊了taro之前的方式是静态编译的一个过程，真正运行时是小程序自己的运行时；但是对于上面的两个mpvue和remax这两个框架的思路，对于taro2就出来了新的改造，既然我们上面聊了，不管是vue和react，都是最后自己的运行时再配上对应的端容器，比如我们的web端的dom；

​	那么对于这种情况，taro的思想就和remax的思想大致相同了，做一个运行时的对接层，taro-next来模拟dom 运行环境，最后通过setData来触发视图的更新；对于Vue和React这种框架，在开发的时候可能比较大差距，渲染最后的操作都大致相同，比较大的区别是声明周期的不同的对齐；

所以在taro-next里面也会有对应的生命周期的一些对齐；

目前整体而言，taro-next的柯力化比较细，事件机制也做的不错，比如直接有document.getElementById();

这个大思路其实就是模拟一个dom的影响环境，最后把dom对应映射到小程序；

- **kbone**

最后还有一个官方出的kbone也是大致的思路，一个致力于微信小程序和 Web 端同构的解决方案。



实现了一个适配器，在适配层里模拟出了浏览器环境，让 Web 端的代码可以不做什么改动便可运行在小程序里。 Vue、React、Preact 等。都可以运行；

适配器提供的也是一个dom运行环境，dom、bom的api，不过他在视图层的组件实现是使用的小程序的自定义组件的方式，通过自定义组件来描述一棵树；可以看一下这个[自定义组件的用法](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/)

## 最后

小程序实际就是一个性能比较好的hybrid









