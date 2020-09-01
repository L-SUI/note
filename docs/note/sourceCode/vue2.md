# VUE2源码解析

## 资料分享

1. 基本vue的api使用，用vue实战一个spa  [https://cn.vuejs.org/index.html](https://cn.vuejs.org/index.html)

2. 熟悉浏览器history的api  [https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions/API/history](https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions/API/history)

3. 熟悉发布订阅的设计模式    [https://blog.csdn.net/ZZB_Bin/article/details/80229456]( https://blog.csdn.net/ZZB_Bin/article/details/80229456)（争取自己用js实现一个）

4. 熟悉什么是AST抽象语法树 [https://zhuanlan.zhihu.com/p/32189701]( https://zhuanlan.zhihu.com/p/32189701)

5. 熟悉js的事件循环 微任务宏任务  [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop]( https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)

   [https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_DOM_API/Microtask_guide](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_DOM_API/Microtask_guide)

##  Vue2架构概览

![1597906014654_857E4D6E-91D3-4AC5-BD38-492601174C7F](/sourceCode/vue2/1597906014654_857E4D6E-91D3-4AC5-BD38-492601174C7F.png)

1. /compiler ⽬目录是编译模版;

2. /core ⽬目录是 Vue.js 的核⼼心;

   1. compents 模板编译的代码

   2. global-api 最上层的⽂文件接⼝口 
   3. instance ⽣生命周期->init.js 
   4. observer 数据收集与订阅 
   5. util 常⽤用⼯工具⽅方法类

   6. vdom 虚拟dom

3. /entries ⽬目录是⽣生产打包的⼊入⼝口;
4. /platforms ⽬目录是针对核⼼心模块的 ‘平台’ 模块，
5. platforms ⽬目录下暂时只有 web ⽬目录(在最新的开发⽬目录⾥里里⾯面已 经有 weex ⽬目录了了)。web ⽬目录下有对应的 /compiler、/runtime、 /server、/util⽬目录;
6. /server ⽬目录是处理理服务端渲染;
7. /sfc ⽬目录处理理单⽂文件 .vue;
8. /shared ⽬目录提供全局⽤用到的⼯工具函数。

![1597971930703_3D9E6905-A842-4DD4-ABA0-FF0E5EBF5E4B](/sourceCode/vue2/1597971930703_3D9E6905-A842-4DD4-ABA0-FF0E5EBF5E4B.png)

### 相关知识

[with：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/with](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/with)

### vue简单的一个优化

Runtime   当前程序运行过程中，保留的状态和数据  （正解）

Runtime+compiler  当前程序运行过程中，保留的状态和数据（错解）

vue 在线编译 离线编译

compiler  -->在线解析vue模板

```js
//compiler  -->在线解析vue模板
new Vue({
  data:{
    a:1, b:2, c:3, d:4
  },
  teamplate:'<div>{a}</div>'
});
```

写`.vue`文件，不要写上述代码。

.vue ==>打包编译（词法分析、语法分析、构建AST、转义js）==>输出  render()

[vue2在线编译](https://vue-template-explorer.netlify.app/#%3Cdiv%20id%3D%22app%22%3E%7B%7B%20msg%20%7D%7D%3C%2Fdiv%3E)

```js
<div id="app">{{ msg }}</div>
///编译后
function render() {
  with(this) {
    return _c('div', {
      attrs: {
        "id": "app"
      }
    }, [_v(_s(msg))])
  }
}
```



### 双向绑定(响应式原理)

- [Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties) 

- Observer
- Watcher
- Dep
- Directive

#### 观察者模式

观察者模式是软件设计模式的一种。在此种模式中，一个目标对象管理所有相依于它的观 察者对象，并且在它本身的状态改变时主动发出通知。这通常透过呼叫各观察者所提供的 方法来实现。此种模式通常被用来实时事件处理系统。  订阅者模式涉及三个对象:发布者、主题对象、订阅者，三个对象间的是一对多的关系， 每当主题对象状态发生改变时，其相关依赖对象都会得到通知，并被自动更新。看一个简 单的示例:

![1597978288057_11F5DC66-FF5B-4EBD-B681-F9276C259301](/sourceCode/vue2/1597978288057_11F5DC66-FF5B-4EBD-B681-F9276C259301.png)

**底层原理：** Object.defineProperty   

**缺点：** 不能监听新增的key    (不管是对象、还是数组)

![1597976497312_37BC8185-5C41-411D-AB79-AC8E49732102](/sourceCode/vue2/1597976497312_37BC8185-5C41-411D-AB79-AC8E49732102.png)

![1597988354909_EE40CACD-7A4F-48B9-8229-C6CFD79E9514](/sourceCode/vue2/1597988354909_EE40CACD-7A4F-48B9-8229-C6CFD79E9514.png)

### 流程

![1597973632926_59AB2BAB-FAB4-427F-A7DD-15B485257189](/sourceCode/vue2/1597973632926_59AB2BAB-FAB4-427F-A7DD-15B485257189.png)

初始化==>获取数据==>触发get==>存watcher==>更新视图

数据变化==>触发set==>触发存的watcher==>触发get==>(对比是否存)调用watcher==>更新视图

Observer ==>监听数据

Dep ==>收集依赖

Watcher ==> 连接数据和指令(动作)

![1597976576924_78382AF4-53EA-4BCB-921C-2CC71E589AFB](/sourceCode/vue2/1597976576924_78382AF4-53EA-4BCB-921C-2CC71E589AFB.png)

setter 触发消息到 Watcher， Watcher帮忙告诉 Directive 更新DOM，DOM中修改了数据 也会通知给 Watcher，watcher 帮忙修改数据。



模板渲染的时候 -->触发get
input 双向改变数据 -->触发set

get with --> get  addDep  -->watcher
set 触发 notify，通知 wathcer，watcher 通知指令 更新 dom

## OBSERVER

Observer会观察两种类型的数据，Object 与 Array

对于Array类型的数据，由于 JavaScript 的限制， Vue 不能检测变化,会先重写操作数组 的原型方法，重写后能达到两个目的，

当数组发生变化时，触发 notify

如果是 push，unshift，splice 这些添加新元素的操作，则会使用observer观察新添加的 数据

重写完原型方法后，遍历拿到数组中的每个数据 使用observer观察它

而对于Object类型的数据，则遍历它的每个key，使用 defineProperty 设置 getter 和 setter，当触发getter的时候，observer则开始收集依赖，而触发setter的时候，observe 则触发notify。

### 数组

vue重写了数组的方法，数组的变更会导致频繁的移动位置==>频繁的触发set，get  ==>视图频繁的更新

![1597976161691_17A60910-06D7-4108-AC95-59EDCDE04333](/sourceCode/vue2/1597976161691_17A60910-06D7-4108-AC95-59EDCDE04333.png)

下面是源码里array.js的代码，重写了数组中改变数组的方法：

```js
/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'

const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator (...args) {
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted)
    // notify change
    ob.dep.notify()
    return result
  })
})

```

**入口文件**

![1597990178723_3BD1CABE-A08E-464D-97CE-E5E801A6A08C](/sourceCode/vue2/1597990178723_3BD1CABE-A08E-464D-97CE-E5E801A6A08C.png)

observer 对象的标志就是 __ob__ 这个属性，这个属性保 存了 Observer 对象自己本身。 对象在转化为 Observer 对象的 过程中是一个递归的过程，对 象的子元素如果是对象或数组 的话，也会转化为 Observer 对 象。

其实 observeArray 方法就是对 数组进行遍历，递归调用 observe 方法，最终都会走入 walk 方监控单个元素。而

walk 方法就是遍历对象，结合 defineReactive 方法递归将属 性转化为 getter 和

**array.js源码流程**

1. 重写原型链 重写数组集成的对象
2. 获取到数组的原型对象
3. 基于原型对对象构建新对象
4. 定义要重写的方法（修改数组序号排序的方法）
5. 遍历方法
     a. 获取该方法的原始方
     b.重新定义基于原型对对象构建新对象的方法
     c.执行最原始的方法

### index.js

首先我们先看一下源码的入口类

```js
export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that have this object as root $data
	//上面我们已经说过了数组的情况，接下来分析一下不是数组的时候怎么处理的
  constructor (value: any) {
    this.value = value
    this.dep = new Dep()//这块儿先留意一下，后面有讲到
    this.vmCount = 0
    def(value, '__ob__', this)
    if (Array.isArray(value)) {//是数组
      if (hasProto) {
        protoAugment(value, arrayMethods)
      } else {
        copyAugment(value, arrayMethods, arrayKeys)
      }
      this.observeArray(value)
    } else {//不是数组
      this.walk(value)//不是数组的时候调用了这个方法
    }
  }
	//下面找到这个方法
  walk (obj: Object) {//传过来的是个对象
    const keys = Object.keys(obj)//拿到对象的所有key
    for (let i = 0; i < keys.length; i++) {//循环处理对象的每一个
      defineReactive(obj, keys[i])//调用的封装的方法
    }
  }
  observeArray (items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}
```

上面我们可以看到当不是数组时候调用了一个叫`defineReactive`的方法，接下来我们来看一下这个方法

![1598233440356_898A7D11-F0EE-4123-A729-C09947ECCC3B](/sourceCode/vue2/1598233440356_898A7D11-F0EE-4123-A729-C09947ECCC3B.png)

```js
function dependArray (value: Array<any>) {
  for (let e, i = 0, l = value.length; i < l; i++) {
    e = value[i]
    e && e.__ob__ && e.__ob__.dep.depend()
    if (Array.isArray(e)) {
      dependArray(e)
    }
  }
}
```

那么我们可以知道(Observer==>object.defineProperty)处理了两种情况：

1. array ==> [{},{a:{}}] ==> arr[1].a==> 是否对象 继续Observer
2. object ==>object.keys==>object.defineProperty(get\set)

这样，就可以保证可以为每一个需要的添加监听。上面代码中我们有看到`Dep`，并且还室友多次使用到他，那么他是什么呢，我们接下来看看

### Dep

首先看一下`dep.js`---src/core/observer/dep.js

```js
/* @flow */

import type Watcher from './watcher'
import { remove } from '../util/index'
import config from '../config'

let uid = 0

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
//这个方法是在响应式的过程中调用 的，用户修改数据触发 setter 函数，函 数的最  后一行就是调用 dep.notify 去通 知订阅者更新视图。
export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;
  constructor () {
    this.id = uid++
    //储存Watcher实例的数组
    this.subs = []
  }
	//添加方法，添加Watcher到实例上
  addSub (sub: Watcher) {
    this.subs.push(sub)
  }
	//移除方法，移除某个Watcher
  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }
	//上述方法中有调用这个方法Dep.target这时候的状态是Watcher
  depend () {//留意一下，稍后下面👇讲
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }
	//去通 知订阅者更新视图。
  notify () {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    if (process.env.NODE_ENV !== 'production' && !config.async) {
      // subs aren't sorted in scheduler if not running async
      // we need to sort them now to make sure they fire in correct
      // order
      subs.sort((a, b) => a.id - b.id)
    }
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

//重置Dep.target，这个有用到，会判断留意一下
Dep.target = null  
const targetStack = []

export function pushTarget (target: ?Watcher) {
  targetStack.push(target)
  Dep.target = target
}

export function popTarget () {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}

```

`depend`这个方法是调用的传过来的Watcher

### Watcher

src/core/observer/watcher.js

首先我们先按着上面用到的`Dep.target.addDep(this)`这部分源码

```js
addDep (dep: Dep) {
    const id = dep.id//唯一标识
    if (!this.newDepIds.has(id)) {//查看是否存在，不存在则继续
      this.newDepIds.add(id)//添加id
      this.newDeps.push(dep)//添加依赖
      if (!this.depIds.has(id)) {
        dep.addSub(this)//添加依赖
      }
    }
  }
```

Watcher 是将模板和 Observer 对象结合在一起的纽带。Watcher 是订阅者模式中的订阅者。Watcher 的两 个参数: expOrFn 最终会被转换为 getter 函数， cb 是更新时执行的回调。依赖收集的入口就是get函数。

![1598250212816_BD0F53D5-1C50-4366-981B-C792A162F9B4](/sourceCode/vue2/1598250212816_BD0F53D5-1C50-4366-981B-C792A162F9B4.png)

getter 函数是用来连接监控属性与 Watcher 的关键。

![1598250682415_9F68E7C8-0BB5-4328-991F-BB2FD3195BF5](/sourceCode/vue2/1598250682415_9F68E7C8-0BB5-4328-991F-BB2FD3195BF5.png)

只有通过watcher 触发的 getter 会收集依赖，而所谓 的被收集的依赖就是当前 watcher.初始化时传入的参 数 expOrFn 中涉及到的每一 项数据，然后触发该数据项 的 getter 函数;getter 函数 中就是通过判断 Dep.target 的有无来判断是 Watcher 初 始化时调用的还是普通数据 读取，如果有则进行依赖收 集。

剩下的update，cleanupDeps等一些方法就不细说了，一些状况处理，有需要的可以看一下，我贴一下代码：

```js
export default class Watcher {
  vm: Component;
  expression: string;
  cb: Function;
  id: number;
  deep: boolean;
  user: boolean;
  lazy: boolean;
  sync: boolean;
  dirty: boolean;
  active: boolean;
  deps: Array<Dep>;
  newDeps: Array<Dep>;
  depIds: SimpleSet;
  newDepIds: SimpleSet;
  before: ?Function;
  getter: Function;
  value: any;

  constructor (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    this.vm = vm
    if (isRenderWatcher) {
      vm._watcher = this
    }
    vm._watchers.push(this)
    // options
    if (options) {
      this.deep = !!options.deep
      this.user = !!options.user
      this.lazy = !!options.lazy
      this.sync = !!options.sync
      this.before = options.before
    } else {
      this.deep = this.user = this.lazy = this.sync = false
    }
    this.cb = cb
    this.id = ++uid // uid for batching
    this.active = true
    this.dirty = this.lazy // for lazy watchers
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.expression = process.env.NODE_ENV !== 'production'
      ? expOrFn.toString()
      : ''
    // parse expression for getter
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)
      if (!this.getter) {
        this.getter = noop
        process.env.NODE_ENV !== 'production' && warn(
          `Failed watching path: "${expOrFn}" ` +
          'Watcher only accepts simple dot-delimited paths. ' +
          'For full control, use a function instead.',
          vm
        )
      }
    }
    this.value = this.lazy
      ? undefined
      : this.get()
  }

  /**
   * Evaluate the getter, and re-collect dependencies.
   */
  get () {
    pushTarget(this)
    let value
    const vm = this.vm
    try {
      value = this.getter.call(vm, vm)
    } catch (e) {
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`)
      } else {
        throw e
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value)
      }
      popTarget()
      this.cleanupDeps()
    }
    return value
  }

  /**
   * Add a dependency to this directive.
   */
  addDep (dep: Dep) {
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }

  /**
   * Clean up for dependency collection.
   */
  cleanupDeps () {
    let i = this.deps.length
    while (i--) {
      const dep = this.deps[i]
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this)
      }
    }
    let tmp = this.depIds
    this.depIds = this.newDepIds
    this.newDepIds = tmp
    this.newDepIds.clear()
    tmp = this.deps
    this.deps = this.newDeps
    this.newDeps = tmp
    this.newDeps.length = 0
  }

  /**
   * Subscriber interface.
   * Will be called when a dependency changes.
   */
  update () {
    /* istanbul ignore else */
    if (this.lazy) {
      this.dirty = true
    } else if (this.sync) {
      this.run()
    } else {
      queueWatcher(this)
    }
  }

  /**
   * Scheduler job interface.
   * Will be called by the scheduler.
   */
  run () {
    if (this.active) {
      const value = this.get()
      if (
        value !== this.value ||
        // Deep watchers and watchers on Object/Arrays should fire even
        // when the value is the same, because the value may
        // have mutated.
        isObject(value) ||
        this.deep
      ) {
        // set new value
        const oldValue = this.value
        this.value = value
        if (this.user) {
          try {
            this.cb.call(this.vm, value, oldValue)
          } catch (e) {
            handleError(e, this.vm, `callback for watcher "${this.expression}"`)
          }
        } else {
          this.cb.call(this.vm, value, oldValue)
        }
      }
    }
  }

  /**
   * Evaluate the value of the watcher.
   * This only gets called for lazy watchers.
   */
  evaluate () {
    this.value = this.get()
    this.dirty = false
  }

  /**
   * Depend on all deps collected by this watcher.
   */
  depend () {
    let i = this.deps.length
    while (i--) {
      this.deps[i].depend()
    }
  }

  /**
   * Remove self from all dependencies' subscriber list.
   */
  teardown () {
    if (this.active) {
      // remove self from vm's watcher list
      // this is a somewhat expensive operation so we skip it
      // if the vm is being destroyed.
      if (!this.vm._isBeingDestroyed) {
        remove(this.vm._watchers, this)
      }
      let i = this.deps.length
      while (i--) {
        this.deps[i].removeSub(this)
      }
      this.active = false
    }
  }
}

```

这块儿逻辑梳理一下dep
  get ==>把watcher（具体要做的事情）添加到依赖 添加到数组
  set  (修改数据)==>  notify  ==>循环所有times电话，通知干事情（wctaher）

### Directive

上面有说到指令这块儿，那么我们先看看他是干啥的

![1598252010061_9B44C562-2C51-4D6F-B5DC-F74D43AC58FE](/sourceCode/vue2/1598252010061_9B44C562-2C51-4D6F-B5DC-F74D43AC58FE.png)

observe -> 触发setter -> watcher -> 触发update -> Directive -> 触发update -> 指令

vue内置了这么多的指令， 这些指令都会抛出两个接口 bind 和 update，这两个接口 的作用是，编译的最后一步是 执行所有用到的指令的bind方 法，而 update 方法则是当 watcher 触发 update 时， Directive会触发指令的update 方法

关于编译这块vue分了两种类型，一种是文本节点，一种是元素节点.

![1598252285913_19F452C1-AB95-4C97-BD83-6AC6FA47EC25](/sourceCode/vue2/1598252285913_19F452C1-AB95-4C97-BD83-6AC6FA47EC25.png)

```js
this._directives.push(
		new Directive(descriptor,this,node,host,scope,frag)
)
```

1. 所有 tag 为 true 的数据中的扩展对象拿出来生成一个Directive实例并添加到 _directives 中(_directives是当前vm中存储所有directive实例的地方)。

2. 调用所有已绑定的指令的 bind 方法

3. 实例化一个Watcher，将指令的update与watcher绑定在一起(这样就实现了 watcher接收到消息后触发的update方法，指令可以做出对应的更新视图操作)

4. 调用指令的update，首次初始化视图

5. 这里有一个点需要注意一下，实例化 Watcher 的时候，Watcher会将自己主动的推 入Dep依赖中

### 小结

我们继续来看一下之前看过的图

![1597973632926_59AB2BAB-FAB4-427F-A7DD-15B485257189](/sourceCode/vue2/1597973632926_59AB2BAB-FAB4-427F-A7DD-15B485257189.png)

细化一下：

![1598252748426_26271249-7918-4CA7-891B-8C3ACD56E7C2](/sourceCode/vue2/1598252748426_26271249-7918-4CA7-891B-8C3ACD56E7C2.png)

1. new vue  ==>observe
2. object.defineProperty  ==》监听数据  但是还没有触发setter||getter
    (什么时候出发set get)
    set  ==> dep.notify (通知watcher)
    get   ==>Dep.target  ==?watcher  ？？？
3. 初始化收集依赖的东西
      addSub
      notify
4. Compile  ==>对原始模板做了处理
    编译节点 （with）
    dep.target=watcher
    执行with  ==> get  ==>dep.target ==>收集起来watcher
    返回获取到的数据 更新don

**dep**

![1598253021962_4E0C07DD-452C-4FBF-ACC7-D0B409910044](/sourceCode/vue2/1598253021962_4E0C07DD-452C-4FBF-ACC7-D0B409910044.png)

**watcher**

![1598253142574_8DC78981-7CA5-4526-8B69-D3FACA71FE2C](/sourceCode/vue2/1598253142574_8DC78981-7CA5-4526-8B69-D3FACA71FE2C.png)

watcher==>vue component，一。个watcher对应一个组件

**关于事件**

![1598253336521_47B56FA2-44A5-4800-AD86-B684A7E810E8](/sourceCode/vue2/1598253336521_47B56FA2-44A5-4800-AD86-B684A7E810E8.png)

基本上都在用代理。

**v-on**

数据Observer(如果触发了数据的修改和数据的获取，都可以监听到)
指令（根据不同的数据渲染视图、改变数据）--》wathcer （衔接数据和指令===>视图）链接

## 手动实现一个简单的vue

具体实现的代码，请点击下面链接查看，比较简化版的，便于理解。

[查看源代码](https://github.com/L-SUI/note/tree/master/sourseCode/vue-dome)

## Batch Update

首先看一下我们简单的实现

```js
/**
 * 批处理构造函数
 * @constructor
 */
function Batcher() {
    this.reset();
}


Batcher.prototype.reset = function () {
    this.has = {};
    this.queue = [];
    this.waiting = false;
};


Batcher.prototype.push = function (job) {
    let id = job.id;//watcher
    if (!this.has[id]) {
        console.log(batcher);
        this.queue.push(job);
        this.has[id] = true;
        if (!this.waiting) {
            this.waiting = true;
            if ("Promise" in window) {
                Promise.resolve().then(() => {
                    this.flush();
                })
            } else {
                setTimeout(() => {
                    this.flush();
                }, 0);
            }
        }
    }
};


Batcher.prototype.flush = function () {
    //所有维护的watcher队列，
    //watcher
    this.queue.forEach((job) => {
        job.cb();
    });
    this.reset();
};
```

### vue中的批处理介绍

1. Transaction对一个函数进行包装，让React有机会在一个函数执行前和执行后运行特定的逻辑，从 而完成对整个Batch Update流程的控制。

   简单的说就是在要执行的函数中用事务包裹起来，在函数执行前加入initialize阶段，函数执行，最后 执行close阶段。那么Batch Update中

   在事件initialize阶段，一个update queue被创建。在事件中调用setState方法时，状态不会被立即调 用，而是被push进Update queue中。

   函数执行结束调用事件的close阶段，Update queue会被flush，这事新的状态才会被应用到组件上并开 始后续的Virtual DOM更新，biff算法来对model更新。

2. 当model被修改时，对应的watcher会被推入Update queue， 与此同时还会在异步队列中添加一个task用于flush 当前的Update queue。

   这样一来，当前的task中的其他watcher会被推进同一个Update queue中。当前task执行结束后，异步队列下一个 task执行，update queue

   会被 flush，并进行后续的更新操作。

   为了让 flush 动作能在当前 Task 结束后尽可能早的开始，Vue 会优先尝试将任务 micro-task 队列，具体来说， 在浏览器环境中 Vue 会优

   先尝试使用 MutationObserver API 或 Promise，如果两者都不可用，则 fallback 到 setTimeout。

   对比两个框架可以发现 React 基于 Transition 实现的 Batch Query 是一个不依赖语言特性的通用模式，因此有 更稳定可控的表现，但缺点

   是无法完全覆盖所有情况，

**Watcher.js**

```js
// Watcher.js 
Watcher.prototype.update = function(){
  if(this.sync || !config.async){ // 同步的情况 
    this.run()
  }else{// 推⼊入异步执⾏行行队列列，该⽅方法由队列列管理理员batcher.js对外暴暴露露 
    pushWatcher(this)
  } 
}

pushWatcher(watcher){
  const id = watcher.id
  // 当前Watcher在队列列中，则直接返回 
  if(has[id] == null){ // 可能为0，所以你懂得
  // 如果当前Watcher是⽤用户触发，添加到⽤用户Wachers队列列，否则添加到指令Watchers队列列 
    const q = watcher.user ? userQueue : queue // 为啥要分两个队列列呢?下⾯面给出解释 
  has[id] = q.length
  q.push(watcher)
  // 可以保证被推⼊入队列列的Watcher被执⾏行行到，继续往下看吧 
  if(!waiting){
  waiting = true
  nexTick(flushBatcherQueue) 
  }
}
```

**batcher.js**

```js
// batcher.js
let queue = [] // 存放指令Watchers队列列
let userQueue = [] // 存放⽤用户Watchers队列列 
...
flushBatcherQueue(){
  runBatcherQueue(queue) // 先执⾏行行指令Watchers队列列
  runBatcherQueue(userQueue) // 再执⾏行行⽤用户Watchers队列列
  // 当执⾏行行⽤用户Watchers队列列的时候，可能指令Watchers队列列⼜又有新的任务了了，因此需要再次执⾏行行上线的两个队 列列，直到两个队列列的任务都被执⾏行行完。
  if (queue.length) {
  	return flushBatcherQueue()
  } 
}

// 根据传⼊入不不同的队列列，从⽽而触发不不同队列列的执⾏行行 
runBatcherQueue(queue){
  // 这⾥里里不不能缓存队列列的⻓长度，因为在队列列中的任务执⾏行行的过程中，可能会有新的Wacthers被添加进来，从⽽而保 即waiting为true的时候，不不触发nextTick的情况下，依然可以触发不不断被添加进来的Watchers
  for(let i = 0; i < queue.length; i++){ 
    var watcher = queue[i]
    var id = watcher.id
    has[id] = null
    wacther.run() 
  }
  queue.length = 0 
}
```

## Virtual-dom

### 起源

DOM操作很慢是两个原因，一个是本身操作就不快，第 二是我们(还有很多框架)处理dom的方式很慢，Virtual Dom解决了我们这些愚蠢的程序员对Dom的低劣操作，它让我 们不需要进行Dom操作，而是将希望展现的最终结果告诉 Vue，Vue通过一个简化的Dom即Virtual dom进行 render，当你试图改变显示内容时，新生成的Virtual Dom会 与现在的Virtual dom对比，通过diff算法找到区别，这些操作 都是在快速的js中完成的，最后对实际Dom进行最小的Dom操 作来完成效果，这就是Virtual Dom的概念。 rective(descriptor, this, node, host, scope, frag)

### 对比

首先我们先看看正常的dom

![1598261819801_085277B9-9428-431F-9392-96AF93EA7ADC](/sourceCode/vue2/1598261819801_085277B9-9428-431F-9392-96AF93EA7ADC.png)

这仅仅是第一层。真正的 DOM 元素非常庞大，这是因为标准就是这么设计的。而且操作它们的时候 你要小心翼翼，轻微的触碰可能就会导致页面重排，这可是杀死性能的罪魁祸首。



‘Virtual-dom’是一系列的模块集合，用来提供声明式的DOM渲染。来看一个简单的 DOM 片段. 本质上就是在 JS 和 DOM 之间做了一个缓存。可以类比 CPU 和硬盘，既然硬盘这么慢，我 们就在它们之间加个缓存:既然 DOM 这么慢，我们就在它们 JS 和 DOM 之间加个缓存。 CPU(JS)只操作内存(Virtual DOM)，最后的时候再把变更写入硬盘(DOM)。

![1598261968067_7AA97445-FC86-484E-B7A0-51A529AD8BDA](/sourceCode/vue2/1598261968067_7AA97445-FC86-484E-B7A0-51A529AD8BDA.png)

### VIRTUAL-DOM->CORE/VDOM/CREATE-ELEMENT.JS

![1598262072574_68FB3672-866D-4656-ACE0-B331D233E271](/Users/liuxiaodong/Desktop/blog/note/docs/.vuepress/public/sourceCode/vue2/1598262072574_68FB3672-866D-4656-ACE0-B331D233E271.png)

### 基于VUE组件的虚拟DOM

![1598262122279_4DDC4DA9-8CF1-4800-A714-67A8F947BCF3](/sourceCode/vue2/1598262122279_4DDC4DA9-8CF1-4800-A714-67A8F947BCF3.png)

![1598262131211_419CCBEE-8D0A-41AA-9F37-D8B6ACDCC068](/sourceCode/vue2/1598262131211_419CCBEE-8D0A-41AA-9F37-D8B6ACDCC068.png)

### 生成的虚拟DOM

![1598262206547_B7AF5692-0609-46A2-A2B1-65C1CA7C1DB2](/sourceCode/vue2/1598262206547_B7AF5692-0609-46A2-A2B1-65C1CA7C1DB2.png)

### 虚拟**DOM PARSE->OPTIMIZE->CODEGEN**

parse 的⽬目标是把 template 模板字符串串 转换成 AST 树，它是⼀一种⽤用 JavaScript 对象的形式来描述整个模板。那么整个 parse 的过程是利利⽤用正则表达式顺序解析 模板，当解析到开始标签、闭合标签、 ⽂文本的时候都会分别执⾏行行对应的回调函 数，来达到构造 AST 树的⽬目的。

AST 元素节点总共有 3 种类型，type 为 1 表示是普通元素，为 2 表示是表达式， 为 3 表示是纯⽂文本.

optimize 的过程，就是深度遍历这个 AST 树，去检测它的每⼀一颗⼦子树是不不是 静态节点，如果是静态节点则它们⽣生成 DOM 永远不不需要改变，这对运⾏行行时对模 板的更更新起到极⼤大的优化作⽤用。通过 optimize 我们把整个 AST 树中的每⼀一个 AST 元素节点标记了了 static 和 staticRoot，它会影响我们接下来执⾏行行代 码⽣生成的过程。

![1598262331043_96588029-FDBA-418D-B71F-24D451BF9409](/sourceCode/vue2/1598262331043_96588029-FDBA-418D-B71F-24D451BF9409.png)

生成之后，会有标记静态的和动态的。然后每个组件的的更新都是由自己的watcher去维护，不用从头到尾，从上到下的去遍历，这部分相比react而言，vue做的更好。

