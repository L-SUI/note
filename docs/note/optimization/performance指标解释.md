# performance指标解释

## 页面的整个过程如下图

![renderscope3.png](/optimization/renderscope3.png)

![browerrender.jpg](/optimization/browerrender.jpeg)

## performance各个时间点的含义

- navigationStart: 初始化页面，在同一个浏览器上下文中前一个页面unload的时间戳，如果没有前一个页面的unload,则与fetchStart值相等
- redirectStart: 第一个HTTP重定向发生的时间,有跳转且是同域的重定向,否则为0
- redirectEnd: 最后一个重定向完成时的时间,否则为0
- fetchStart: 浏览器准备好使用http请求获取文档的时间,这发生在检查缓存之前
- domainLookupStart: DNS域名开始查询的时间,如果有本地的缓存或keep-alive则时间为0
- domainLookupEnd: DNS域名结束查询的时间
- connectStart: TCP开始建立连接的时间,如果是持久连接,则与fetchStart值相等
- connectEnd: TCP完成握手的时间，如果是持久连接则与fetchStart值相等
- requestStart: HTTP请求读取真实文档开始的时间,包括从本地缓存读取
- requestEnd: HTTP请求读取真实文档结束的时间,包括从本地缓存读取
- responseStart: 返回浏览器从服务器收到（或从本地缓存读取）第一个字节时的Unix毫秒时间戳
- responseEnd: 返回浏览器从服务器收到（或从本地缓存读取，或从本地资源读取）最后一个字节时的Unix毫秒时间戳
- unloadEventStart: 前一个页面的unload的时间戳 如果没有则为0
- unloadEventEnd: 与unloadEventStart相对应，返回的是unload函数执行完成的时间戳
- domLoading: 返回当前网页DOM结构开始解析时的时间戳,此时document.readyState变成loading,并将抛出readyStateChange事件
- domInteractive: 返回当前网页DOM结构结束解析、开始加载内嵌资源时时间戳,document.readyState 变成interactive，并将抛出readyStateChange事件(注意只是DOM树解析完成,这时候并没有开始加载网页内的资源)
- domContentLoadedEventStart: 网页domContentLoaded事件发生的时间
- domContentLoadedEventEnd: 网页domContentLoaded事件脚本执行完毕的时间,domReady的时间
- domComplete: DOM树解析完成,且资源也准备就绪的时间,document.readyState变成complete.并将抛出readystatechange事件
- loadEventStart: load 事件发送给文档，也即load回调函数开始执行的时间
- loadEventEnd: load回调函数执行完成的时间

## lighthouse各个指标的含义

- FCP: First Content Paint(首次内容绘制).是浏览器将第一个 DOM 渲染到屏幕的时间,可能是文本、图像、SVG等.
- LCP: (Largest Contentful Paint)(最大内容绘制),代表在viewport中最大的页面元素加载的时间(视口中可见的最大图像或文本块的渲染时间)。
- 累积偏移量: （Cumulative Layout Shift）测量在页面的整个生命周期内发生的每个意外布局移位的所有单独布局移位的总和。
- 阻塞总时间: 衡量从FCP到TTI之间主线程被阻塞时长的总和
- TTI: (Time to Interactive) 可交互时间。用于标记应用已进行视觉渲染并能可靠响应用户输入的时间点

## 指标计算

1. 时间维度

- DNS耗时: domainLookupEnd - domainLookupStart
- TCP耗时: connectEnd - connectStart
- 首次内容绘制时间: FCP
- 最大内容绘制时间: LCP
- 首次可交互时间: TTI
- 累积偏移量: CLS
- 加载时间: loadEventStart - fetchStart
- 阻塞总时间: Total Blocking Time(lighthouse可以拿到)
- 网络请求耗时: TTFB(Time to First Byte)responseStart – requestStart. TTFB是发出页面请求到接收到应答数据第一个字节所花费的毫秒数
- DOM解析耗时: domInteractive – responseEnd (意义: 观察DOM结构是否合理，是否有JS阻塞页面解析)
- HTML下载耗时: responseEnd - responseStart

2. 页面维度

   2.1 图片优化

- - 图片体积大于500k的，可以通过`performace.getEntries()`方法拿到加载的所有资源进行遍历判断
  - 懒加载，根据dom在页面位置，设置一个基准，判断图片加载时机是否合理

   2.2 重复请求: 判断是否有相同的http链接

3. 参考项

- 页面内存: performance
- dom节点的最大深度: lighthouse中的artifacts可以拿到dom最大深度、和dom节点数量


