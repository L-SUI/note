# 面试题小结

 

## 从输入URL到页面加载全过程

![A662317B-EE08-4A15-BF2C-6B725B8CC7EA](/optimization/A662317B-EE08-4A15-BF2C-6B725B8CC7EA.jpg)

![1595736591934_A0A6842B-9DCA-4627-A916-B9BFB093A75A](/optimization/1595736591934_A0A6842B-9DCA-4627-A916-B9BFB093A75A.png)

1. 浏览器根据DNS服务器得到域名的IP地址
2. 获取地址后向这个IP地址发送HTTP请求
3. 服务端收到、处理并返回HTTP请求  （返回HTML格式的字符串）
4. 浏览器得到发挥的内容
5. 根据HTML结构生成DOM树
   * 浏览器拿到返回的HTML内容，开始解析渲染。首先需要结构化成计算机擅长处理的基本数据结构，所以把HTML字符串转化成DOM树。
   * 解析过程中如果遇到   link 和  script  这种外链加载CSS和JS的标签，浏览器会异步下载。
6. 根据CSS生成styleSheet
7. 讲DOM和CSSOM整合形成RenderTree
   - 这就是为什么要将CSS放在HTML头部的原因，可以让浏览器尽早生成CSSOM，然后再解析HTML之后可一次性生成最终的RenderTree，渲染一次即可。如果放在底部，会出现渲染卡顿的情况，影响性能和体验。
8. 遇到 script 时，会执行并阻塞渲染
   - 这块儿就涉及到为什么将JS放在HTML底部，因为放在底部可以保证让浏览器优先渲染完现有的HTML内容，让用户先看到内容，体验好。另外，如果JS要执行DOM操作的话，要等待DOM解析完成才可以，所以放在底部的时候已经解析完成了。

## DOMContentLoaded

当初始的 **HTML** 文档被完全加载和解析完成之后，**`DOMContentLoaded`** 事件被触发，而无需等待样式表、图像和子框架的完全加载。



