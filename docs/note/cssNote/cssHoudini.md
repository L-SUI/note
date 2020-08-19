CSS魔术师Houdini

## Houdini API介绍

![1597053160429_F13918A6-6A09-4648-B191-9F7AB6BF5826](/cssNote/1597053160429_F13918A6-6A09-4648-B191-9F7AB6BF5826.png)

在现今的 Web 开发中，JavaScript 几乎占据所有版面，除了控制页面逻辑与操作 DOM 对象以 外，连 CSS 都直接写在 JavaScript 里面了，就算浏览器都还沒有实现的特性，总会有人做出对应 的 Polyfills，让你快速的将新 Feature 应用到 Production 环境中，更別提我们还有 Babel 等工具 帮忙转译。

而 CSS 就不同了，除了制定 CSS 标准规范所需的时间外，各家浏览器的版本、实战进度差异更是 旷日持久，顶多利用 PostCSS、Sass 等工具來帮我們转译出浏览器能接受的 CSS。开发者们能操 作的就是通过 JS 去控制 DOM 与 CSSOM来影响页面的变化，但是对于接下來的 Layout、Paint 与 Composite 就几乎沒有控制权了。

为了解決上述问题，为了让 CSS 的魔力不再浏览器把持，Houdini 就诞生了!( Houdini 是美国的 伟大魔术师，擅长逃脱术，很适合想将 CSS 从浏览器中解放的概念)
 CSS Houdini 是由一群來自 Mozilla, Apple, Opera, Microsoft, HP, Intel, IBM, Adobe 与 Google 的工程 师所组成的工作小组，志在建立一系列的 API，让开发者能够介入浏览器的 CSS engine

## Parser、Paint、Layout API (扩展CSS词法分析器)

### 新增Api

- [CSS Parser API ](https://drafts.css-houdini.org/css-parser-api/)还没有被写入 规范，所以下面我要说的内容 随时都会有变化，但是它的基 本思想不会变:允许开发者自 由扩展 CSS 词法分析器，引 入新的结构(constructs)， 比如新的媒体规则、新的伪 类、嵌套、@extends、 @apply 等等。只要新的词法分析器知道如何 解析这些新结构，CSSOM 就 不会直接忽略它们，而是把这 些结构放到正确的地方。
- [CSS Layout API](https://drafts.css-houdini.org/css-layout-api/)允许开发 者可以通过 CSS Layout API 实现自己的布局模块 (layout module)，这里 的“布局模块”指的是 display 的属性值。也就是 说，这个 API 实现以后， 开发者首次拥有了像 CSS 原生代码(比如 display:flex、 display:table)那样的布 局能力。
- [CSS Paint API](https://drafts.css-houdini.org/css-paint-api/) 和 Layout API 非常相似。它提供了一个 registerPaint 方法，操作方式和 registerLayout 方法也很相似。当想要构建一个CSS 图像的时候，开发者 随时可以调用paint() 函 数，也可以使用刚刚注册好的名字。

## 未完待续

