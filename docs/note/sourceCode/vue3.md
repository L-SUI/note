# VUE3源码解析

**版本3.0.0-alpha.1**  (与最新版本差距不大)

## 回顾

首先先回顾一下vue2

```bash
 $set ==>object.definproperty

    1. Observer==>object.definproperty==>Object(key),array(重写) 

       get     dep.depend==>Watcher.addSub==>Dep[watcher]

       set     Dep.notify==>watcher.update==>render==>get()==>Vnode==>dom diff(修改diff 对应的component！！并不是整个页面的dom diff)

       react （diff 整个页面的Vnode）

   2. Dep 收集依赖  订阅发布模式  (大爷电话本)  EventEmit (node)

   3. Watcher  连接对应的render函数 -->  component(teamplate)  

       dep.target=Watcher

   4. render  ==>

   with(this){

       ...(name)

   }
   https://vue-template-explorer.netlify.app/      vue2在线解析
   vue编译完成之后是用的with==>提升作用域链
   vue2 使用 正则匹配 进行编译 ==>with(this){
   		a
   }
   正则匹配的性能瓶颈较高。
```

## 基础

Vue3 发布之后，说到了性能比之前提升了十倍。基本上是两个点的改变最大：

1. 模板解析，使用AST(抽象语法树)替代了正则匹配
2. vue3 内部的数据监听发生了变换 object.definproperty==>Proxy

所以我们需要先了解一下：

[Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

[抽象语法书在线解析](https://astexplorer.net/)

[抽象语法树规则](https://github.com/antlr)

[vue3在线解析](https://vue-next-template-explorer.netlify.app/)

vue最大的优点就是可以进行编译时优化 ，而不必全部放在运行时

## 整体流程

![all](/sourceCode/vue3/all.png)

## 目录结构

接下来我们进入正题，首先看看VUE3的代码结构([源代码地址](https://github.com/vuejs/vue-next))

![1598496593241_4A74F3AE-7D4F-4350-9E65-7664B1D6D610](/sourceCode/vue3/1598496593241_4A74F3AE-7D4F-4350-9E65-7664B1D6D610.png)

其中有个叫`lerna.json`的文件，使用了[lerna](https://github.com/lerna/lerna)作为项目管理工具。

Lerna:一个用于管理具有多个包的JavaScript项目的工具。

具体的源代码文件在`packages`文件夹下，先来看一下结构：

> reactivity    数据响应式系统 
>
> compiler-core   编译器 AST 
>
> compiler-dom    AST==>render
>
> compiler-sfc   解析.vue
>
> compiler-ssr  服务端渲染的处理
>
> runtime-core  与平台无关的运行时 
>
> runtime-dom   document  setSate 与端接触的运行时（浏览器端）  暴露了端口 接入平台相关操作的端口
>
> template-explorer vue3 模板在线编译代码
>
> ...

接下来我们来看看`reactivity`

## reactivity

首先看一下目录结构

```
├── LICENSE 
├── README.md
├── __tests__
├── api-extractor.json
├── dist
├── index.js
├── package.json
└── src
```

主要功能文件在src下，这边想先说的是tests文件夹。vue3源码中每个文件夹下面都有tests文件夹，保存了一些测试例子，可以用jest直接跑一下试试搭配源码去理解。

`jest runner`插件可以右键直接执行某个单侧

### 数据响应架构

先看一下数据响应架构图，然后留个印象，接着继续往下看

![dataResponseArchitecture](/sourceCode/vue3/dataResponseArchitecture.png)

### src

```
.
├── baseHandlers.ts
├── collectionHandlers.ts
├── computed.ts
├── effect.ts
├── index.ts
├── lock.ts
├── operations.ts
├── reactive.ts
└── ref.ts
```

写一个简单的例子

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src='./reactivity.global.js'></script>
</head>
<body>
    <script>
        const {reactive,effect}=VueObserver;

        const obj={count:0};
        const state=reactive(obj);//返回一个监听的新数据
        const fn=()=>{
            const count=state.count;
            console.log('当前的count是个啥？',count);
        };
       effect(fn);
    </script>
</body>
</html>
```

上面state已经变成了响应式数据，当state发生了变化是，`effect(fn)`会调用,看一下执行结果

![1598510425821_67688896-0B51-4CB2-9CD7-3BE1EADB44B4](/sourceCode/vue3/1598510425821_67688896-0B51-4CB2-9CD7-3BE1EADB44B4.png)

可以看出来，`proxy`是对目标对象进行了代理（劫持），跟之前的object.definproperty区别是他可以监听新增的，他是代理了对这个对象的操作。当然，他也有缺点，他只能代理一层的。层级深了就处理不了了。所以我们看看源码里是怎么处理的。

### reactive.ts

reactive: 本库的核心方法，传递一个object类型的原始数据，

通过Proxy，返回一个代理数据。在这过程中，劫持了原始数据的任何读写操作。

进而实现改变代理数据时，能触发依赖其的监听函数effect。

我们先来看一下他的单测文件

```ts
import { ref, isRef } from '../src/ref'
import { reactive, isReactive, toRaw, markNonReactive } from '../src/reactive'
import { mockWarn } from '@vue/runtime-test'
import { computed } from '../src/computed'
/**
 * 它能接受一个对象或数组，返回新的响应数据。
 * 响应数据跟原始数据就跟影子一样，
 * 对任何一方的任何操作都能同步到对方身上。
 */
describe('reactivity/reactive', () => {
  mockWarn()

  test('Object', () => {
    const original = { foo: 1 }

    const observed = reactive(original)
    expect(observed).not.toBe(original)
    expect(isReactive(observed)).toBe(true)
    expect(isReactive(original)).toBe(false)
    // get
    expect(observed.foo).toBe(1)
    // has
    expect('foo' in observed).toBe(true)
    // ownKeys
    expect(Object.keys(observed)).toEqual(['foo'])
  })

  test('Array', () => {
    const original = [{ foo: 1 }]
    const observed = reactive(original)
    expect(observed).not.toBe(original)
    expect(isReactive(observed)).toBe(true)
    expect(isReactive(original)).toBe(false)
    expect(isReactive(observed[0])).toBe(true)
    // get
    expect(observed[0].foo).toBe(1)
    // has
    expect(0 in observed).toBe(true)
    // ownKeys
    expect(Object.keys(observed)).toEqual(['0'])
  })

  test('Array long', () => {
    const original = [1]
    const observed = reactive(original)
    observed.unshift(0)
    // ownKeys
  })
  test('cloned reactive Array should point to observed values', () => {
    const original = [{ foo: 1 }]
    const observed = reactive(original)
    const clone = observed.slice() //原数组不会改变，调用每一个key ，拿到数据后，如果是对象，就处理迭代
    expect(isReactive(clone[0])).toBe(true)
    expect(clone[0]).not.toBe(original[0])
    expect(clone[0]).toBe(observed[0])
  })

  test('nested reactives', () => {
    const original = {
      nested: {
        foo: 1
      },
      array: [{ bar: 2 }]
    }
    const observed = reactive(original)
    expect(isReactive(observed.nested)).toBe(true)
    expect(isReactive(observed.array)).toBe(true)
    expect(isReactive(observed.array[0])).toBe(true)
  })

  test('observed value should proxy mutations to original (Object)', () => {
    const original: any = { foo: 1 }
    const observed = reactive(original)
    // set
    observed.bar = 1
    expect(observed.bar).toBe(1)
    expect(original.bar).toBe(1)
    // delete
    delete original.foo
    console.log(observed.foo)
    expect('foo' in observed).toBe(false)
    expect('foo' in original).toBe(false)
  })

  test('observed value should proxy mutations to original (Array)', () => {
    const original: any[] = [{ foo: 1 }, { bar: 2 }]
    const observed = reactive(original)
    // set
    const value = { baz: 3 }
    const reactiveValue = reactive(value)
    observed[0] = value
    expect(observed[0]).toBe(reactiveValue)
    expect(original[0]).toBe(value)
    // delete
    delete observed[0]
    expect(observed[0]).toBeUndefined()
    expect(original[0]).toBeUndefined()
    // mutating methods
    observed.push(value)
    expect(observed[2]).toBe(reactiveValue)
    expect(original[2]).toBe(value)
  })

  /**
   * vue2中相应数据需要一开始就声明好key，vue3，可以随时添加
   */
  test('setting a property with an unobserved value should wrap with reactive', () => {
    const observed = reactive<{ foo?: object }>({})
    const raw = {}
    observed.foo = raw
    expect(observed.foo).not.toBe(raw)
    expect(isReactive(observed.foo)).toBe(true)
  })
  /**
   * 重复处理
   */
  test('observing already observed value should return same Proxy', () => {
    const original = { foo: 1 }
    const observed = reactive(original)
    const observed2 = reactive(observed)
    expect(observed2).toBe(observed)
  })
  /**
   * 同样的数据处理
   */
  test('observing the same value multiple times should return same Proxy', () => {
    const original = { foo: 1 }
    const observed = reactive(original)
    const observed2 = reactive(original)
    expect(observed2).toBe(observed)
  })

  test('should not pollute original object with Proxies', () => {
    const original: any = { foo: 1 }
    const original2 = { bar: 2 }
    const observed = reactive(original)
    const observed2 = reactive(original2)
    observed.bar = observed2
    expect(observed.bar).toBe(observed2)
    expect(original.bar).toBe(original2)
  })

  /**
   * get row data
   */
  test('unwrap', () => {
    const original = { foo: 1 }
    const observed = reactive(original)
    expect(toRaw(observed)).toBe(original)
    expect(toRaw(original)).toBe(original)
  })

  test('should not unwrap Ref<T>', () => {
    const observedNumberRef = reactive(ref(1))
    const observedObjectRef = reactive(ref({ foo: 1 }))

    expect(isRef(observedNumberRef)).toBe(true)
    expect(isRef(observedObjectRef)).toBe(true)
  })

  test('should unwrap computed refs', () => {
    // readonly
    const a = computed(() => 1)
    // writable
    const b = computed({
      get: () => 1,
      set: () => {}
    })
    const obj = reactive({ a, b })
    // check type
    obj.a + 1
    obj.b + 1
    expect(typeof obj.a).toBe(`number`)
    expect(typeof obj.b).toBe(`number`)
  })

  /**
   * 不能被代理，基础类型，promise、Date、RegExp返回本身
   */
  test('non-observable values', () => {
    const assertValue = (value: any) => {
      reactive(value)
      expect(
        `value cannot be made reactive: ${String(value)}`
      ).toHaveBeenWarnedLast()
    }

    // number
    assertValue(1)
    // string
    assertValue('foo')
    // boolean
    assertValue(false)
    // null
    assertValue(null)
    // undefined
    assertValue(undefined)
    // symbol
    const s = Symbol()
    assertValue(s)

    // built-ins should work and return same value
    const p = Promise.resolve()
    expect(reactive(p)).toBe(p)
    const r = new RegExp('')
    expect(reactive(r)).toBe(r)
    const d = new Date()
    expect(reactive(d)).toBe(d)
  })
  /**
   * 标记不能被代理的数据
   */
  test('markNonReactive', () => {
    const obj = reactive({
      foo: { a: 1 },
      bar: markNonReactive({ b: 2 })
    })
    expect(isReactive(obj.foo)).toBe(true)
    expect(isReactive(obj.bar)).toBe(false)
  })
})
```

上面单测文件中可以反推出一些功能。(vue3单测文件写得还不错，建议看源码的时候一起看)

`reactive.ts`

```ts
import { isObject, toRawType } from '@vue/shared'
import { mutableHandlers, readonlyHandlers } from './baseHandlers'
import {
  mutableCollectionHandlers,
  readonlyCollectionHandlers
} from './collectionHandlers'
import { ReactiveEffect } from './effect'
import { UnwrapRef, Ref } from './ref'
import { makeMap } from '@vue/shared'

//这个WeakMap储存着（target-> key->dep）,在概念上，把依赖看着Dep 类维护了一组订阅，更好理解，
//我们只是把它储存为原始set 可以减少内存开销

export type Dep = Set<ReactiveEffect>
export type KeyToDepMap = Map<any, Dep>
export const targetMap = new WeakMap<any, KeyToDepMap>()

// WeakMaps that store {raw <-> observed} pairs.
//原始数据到响应数据之间的映射
const rawToReactive = new WeakMap<any, any>()
const reactiveToRaw = new WeakMap<any, any>()
const rawToReadonly = new WeakMap<any, any>()
const readonlyToRaw = new WeakMap<any, any>()

const readonlyValues = new WeakSet<any>()
const nonReactiveValues = new WeakSet<any>()

const collectionTypes = new Set<Function>([Set, Map, WeakMap, WeakSet])
const isObservableType = /*#__PURE__*/ makeMap(
  'Object,Array,Map,Set,WeakMap,WeakSet'
)

/**
 * 判断是否可以observable
 * @param value
 */
const canObserve = (value: any): boolean => {
  return (
    //不是Vue对象
    !value._isVue &&
    //不是VNode
    !value._isVNode &&
    //是Object、Array、Map、Set、WeakMap、WeakSet
    isObservableType(toRawType(value)) &&
    //没有被代理过
    !nonReactiveValues.has(value)
  )
}

// only unwrap nested ref
type UnwrapNestedRefs<T> = T extends Ref ? T : UnwrapRef<T>

export function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
export function reactive(target: object) {
  // if trying to observe a readonly proxy, return the readonly version.
  //如果target是只读，返回这个target
  if (readonlyToRaw.has(target)) {
    return target
  }
  // target is explicitly marked as readonly by user
  //target被用户标记成了只读，那么就让他变成只读，并返回
  if (readonlyValues.has(target)) {
    return readonly(target)
  }

  /*
    { {a:1}:Proxy }
  */
  //创建响应式数据
  return createReactiveObject(
    target, //原始值
    rawToReactive, //原始值到响应数据的映射  { {a:1}:Proxy }
    reactiveToRaw, //响应数据到原始值的映射 { Proxy:{a:1} }
    mutableHandlers,
    mutableCollectionHandlers
  )
}

export function readonly<T extends object>(
  target: T
): Readonly<UnwrapNestedRefs<T>> {
  // value is a mutable observable, retrieve its original and return
  // a readonly version.
  //如果值已经是响应类型的值了，那么就取出他的原始值
  if (reactiveToRaw.has(target)) {
    target = reactiveToRaw.get(target)
  }
  //创建响应对象
  return createReactiveObject(
    target, //原始值
    rawToReadonly, //原始值到只读数据的映射
    readonlyToRaw, //只读数据到原始值的映射
    readonlyHandlers,
    readonlyCollectionHandlers
  )
}
/**
 * 创建响应类型
 * @param target
 * @param toProxy
 * @param toRaw
 * @param baseHandlers
 * @param collectionHandlers
 */
function createReactiveObject(
  target: unknown,
  toProxy: WeakMap<any, any>,
  toRaw: WeakMap<any, any>,
  baseHandlers: ProxyHandler<any>,
  collectionHandlers: ProxyHandler<any>
) {
  //判断是否是基本元素（数字、字符串、布尔），如果是基本元素，就直接返回
  if (!isObject(target)) {
    if (__DEV__) {
      console.warn(`value cannot be made reactive: ${String(target)}`)
    }
    return target
  }
  // target already has corresponding Proxy
  //获取已经处理过的对象（可相应的、只读的）
  let observed = toProxy.get(target) ///原始值到响应数据的映射  { {a:1}:Proxy }
  //如果已经有了处理过的对象（可相应的、只读的），直接返回此对象
  if (observed !== void 0) {
    return observed
  }
  // target is already a Proxy
  //数据已经是一个处理过的对象（可相应的、只读的），返回
  if (toRaw.has(target)) {
    //响应数据到原始值的映射 { Proxy:{a:1} }
    return target
  }
  // only a whitelist of value types can be observed.
  //只有白名单的对象才可以被代理
  if (!canObserve(target)) {
    return target
  }
  //collectionTypes表示Set, Map, WeakMap, WeakSet的集合，判断对象是否是这几种类型，来使用不同的处理函数
  const handlers = collectionTypes.has(target.constructor)
    ? collectionHandlers
    : baseHandlers

  //数据处理
  observed = new Proxy(target, handlers)//{get(){},set(){}}

  toProxy.set(target, observed) //设置原始数据到处理后的数据的弱引用
  toRaw.set(observed, target) //设置处理后的数据到原始数据的弱引用

  //如果之前数据没有处理过，那么就设置target到key到Dep的引用关系
  if (!targetMap.has(target)) {
    targetMap.set(target, new Map())
  }

  return observed
}

export function isReactive(value: unknown): boolean {
  return reactiveToRaw.has(value) || readonlyToRaw.has(value)
}

export function isReadonly(value: unknown): boolean {
  return readonlyToRaw.has(value)
}

/**
 * 获取原始数据
 * @param observed
 */
export function toRaw<T>(observed: T): T {
  return reactiveToRaw.get(observed) || readonlyToRaw.get(observed) || observed
}

/**
 * 标记数据为只读数据
 * @param value
 */
export function markReadonly<T>(value: T): T {
  readonlyValues.add(value)
  return value
}

//标记没有被处理过的数据
export function markNonReactive<T>(value: T): T {
  nonReactiveValues.add(value)
  return value
}
```

这个文件输出了`reactive`方法，可以把数据处理，然后返回一个被代理过的数据。然后处理了一些小细节和容错。处理完成之后，当改变数据是，便可触发其监听函数`effect`。

### effect.ts

这块儿我们先看一个简单的测试用例

```ts
it('should observe basic properties', () => {
  let dummy
  const counter = reactive({ num: 0 })
  effect(() => (dummy = counter.num))

  expect(dummy).toBe(0)
  counter.num = 7
  expect(dummy).toBe(7)
})
```

基本能力：传递给effect的方法，会立即执行一次

先简单的说一下`effect.js`流程：



-  effect：接受一个函数，返回一个新的监听函数 reactiveEffect 。

- 若监听函数内部依赖了reactive数据，当这些数据变更时会触发监听函数。

- 绑定阶段：effect 函数会包装传入的 方法，

- 将其变成一个 effect 对象，并在绑定阶段的最后执行一遍传入的 方法（初始化）。 
-  收集阶段：effect 传入的方法内部，有响应式对象参与了计算，

- 将触发 get 操作，会执行 track 方法，track 方法的重点是

- 将响应式对象改变的target 与 绑定阶段的 effect 对象一一对应起来。

- 这两个阶段是同步执行的（activeReactiveEffectStack 协调），值会存在全局的 targetMap。
-  触发阶段：当 响应式对象 set 时，

-  会触发 trigger 方法，它会从 targetMap 中拿到

-  target 对应的 effects，并遍历执行。

```ts
import { OperationTypes } from './operations'
import { Dep, targetMap } from './reactive'
import { EMPTY_OBJ, extend } from '@vue/shared'

export const effectSymbol = Symbol(__DEV__ ? 'effect' : void 0)

export interface ReactiveEffect<T = any> {
  (): T
  _isEffect: true
  active: boolean
  raw: () => T
  deps: Array<Dep>
  options: ReactiveEffectOptions
}

export interface ReactiveEffectOptions {
  lazy?: boolean
  computed?: boolean
  scheduler?: (run: Function) => void
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void
  onStop?: () => void
}

export type DebuggerEvent = {
  effect: ReactiveEffect
  target: object
  type: OperationTypes
  key: any
} & DebuggerEventExtraInfo

export interface DebuggerEventExtraInfo {
  newValue?: any
  oldValue?: any
  oldTarget?: Map<any, any> | Set<any>
}

export const effectStack: ReactiveEffect[] = []

export const ITERATE_KEY = Symbol('iterate')

export function isEffect(fn: any): fn is ReactiveEffect {
  return fn != null && fn._isEffect === true
}

//() => (dummy = counter.num)入口功能
export function effect<T = any>(
  fn: () => T,
  options: ReactiveEffectOptions = EMPTY_OBJ
): ReactiveEffect<T> {
  //判断是否为Effect处理过的
  if (isEffect(fn)) {
    fn = fn.raw
  }
  //() => (dummy = counter.num) 处理流程函数，返回来一个函数---往下看函数的处理流程
  const effect = createReactiveEffect(fn, options)
  //第一次执行，不会懒加载
  if (!options.lazy) {
    //执行的run
    effect()
  }
  return effect
}

export function stop(effect: ReactiveEffect) {
  if (effect.active) {
    cleanup(effect)
    if (effect.options.onStop) {
      effect.options.onStop()
    }
    effect.active = false
  }
}

//() => (dummy = counter.num) 这块儿是重点
function createReactiveEffect<T = any>(
  fn: () => T,
  options: ReactiveEffectOptions
): ReactiveEffect<T> {
  const effect = function reactiveEffect(...args: unknown[]): unknown {
    return run(effect, fn, args)
  } as ReactiveEffect

  effect._isEffect = true
  effect.active = true
  effect.raw = fn
  effect.deps = []//在执行对应监听函数时，收集函数内部的其他依赖
  effect.options = options

  return effect
}

function run(effect: ReactiveEffect, fn: Function, args: unknown[]): unknown {
  if (!effect.active) {
    return fn(...args)
  }
  //在监听函数中，又改变了依赖数据，按正常逻辑是会不断的触发监听函数的。
  //但通过effectStack.includes(effect)这么一个判断逻辑，自然而然就避免了递归循环。
  if (!effectStack.includes(effect)) {
    //effectStack中没有包含effect时，才走这一步
    cleanup(effect) //处理监听函数中可能有逻辑判断，导致有的数据不需要获取，所以可以避免每次更新

    /**
    执行effect-->把effect放入到栈中-->
    执行fn，触发get-->触发track-->
    触发effectStack[effectStack.length-1]，收集依赖-->
    添加dep（[effect]）到effect.deps-->执行完fn，effectStack出栈
    */
    try {
      //将本effect推到effect栈中

      /*[effect = function reactiveEffect(...args: unknown[]): unknown {
        return run(effect, fn, args)
      } ]*/
      effectStack.push(effect)
      //调用传进来的函数，触发get，具体逻辑往下看baseHandlers.ts
      return fn(...args)
      //执行原始函数并返回
    } finally {
      // console.log('effectStack出栈')
      effectStack.pop()
    }
  }
}
/**
 * 清除effect.deps的依赖，就可以更新targetMap{
   targetMap{
     key:{
       set([effect]);//这其中的依赖
     }
   }
 }，就可以避免不必要的重复更新
 * @param effect 
 */
function cleanup(effect: ReactiveEffect) {
  const { deps } = effect
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect)
    }
    deps.length = 0
  }
}

let shouldTrack = true

export function pauseTracking() {
  shouldTrack = false
}

export function resumeTracking() {
  shouldTrack = true
}

//{a:1}  

export function track(target: object, type: OperationTypes, key?: unknown) {
  if (!shouldTrack || effectStack.length === 0) {
    return
  }
  const effect = effectStack[effectStack.length - 1]

  /**
    //render逻辑
    effect = function reactiveEffect(...args: unknown[]): unknown {
      return run(effect, fn, args)
      ==>fn-->render
    }
  */
  if (type === OperationTypes.ITERATE) {
    key = ITERATE_KEY
  }
  /**
   * targetMap 存储着原始数据到操作类型到具体操作的东西
   * target->depsMap{key->dep{->effect}}
   {
     a:1
   }
   * {
   *  target:{
   *    key(对象对应的某一个key)):Set([effect])
   *  }
   * }
   */
  let depsMap = targetMap.get(target)
  if (depsMap === void 0) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key!)
  if (dep === void 0) {
    depsMap.set(key!, (dep = new Set()))
  }
  if (!dep.has(effect)) {
    dep.add(effect)
    effect.deps.push(dep)
    if (__DEV__ && effect.options.onTrack) {
      effect.options.onTrack({
        effect,
        target,
        type,
        key
      })
    }
  }
}

export function trigger(
  target: object,
  type: OperationTypes,
  key?: unknown,
  extraInfo?: DebuggerEventExtraInfo
) {
  /**
   * targetMap 存储着原始数据到操作类型到具体操作的东西
   * target->depsMap{key->dep{->effect}}
   * {
   *  target:{
   *    key(get、set):Set([effect])
   *  }
   * }
   */
  const depsMap = targetMap.get(target)
  if (depsMap === void 0) {
    // never been tracked
    return
  }
  const effects = new Set<ReactiveEffect>()
  const computedRunners = new Set<ReactiveEffect>()
  if (type === OperationTypes.CLEAR) {
    // collection being cleared, trigger all effects for target
    depsMap.forEach(dep => {
      addRunners(effects, computedRunners, dep)
    })
  } else {
    // schedule runs for SET | ADD | DELETE
    if (key !== void 0) {
      addRunners(effects, computedRunners, depsMap.get(key))
    }
    // also run for iteration key on ADD | DELETE
    if (type === OperationTypes.ADD || type === OperationTypes.DELETE) {
      //对于push操作，length已经会变得相同，不会触发两次trigger，所以新增需要特殊处理
      const iterationKey = Array.isArray(target) ? 'length' : ITERATE_KEY
      addRunners(effects, computedRunners, depsMap.get(iterationKey))
    }
  }
  const run = (effect: ReactiveEffect) => {
    scheduleRun(effect, target, type, key, extraInfo)
  }
  // Important: computed effects must be run first so that computed getters
  // can be invalidated before any normal effects that depend on them are run.
  computedRunners.forEach(run)
  //[effect]
  effects.forEach(run)
}

function addRunners(
  effects: Set<ReactiveEffect>,
  computedRunners: Set<ReactiveEffect>,
  effectsToAdd: Set<ReactiveEffect> | undefined
) {
  if (effectsToAdd !== void 0) {
    effectsToAdd.forEach(effect => {
      if (effect.options.computed) {
        computedRunners.add(effect)
      } else {
        effects.add(effect)
      }
    })
  }
}

function scheduleRun(
  effect: ReactiveEffect,
  target: object,
  type: OperationTypes,
  key: unknown,
  extraInfo?: DebuggerEventExtraInfo
) {
  if (__DEV__ && effect.options.onTrigger) {
    const event: DebuggerEvent = {
      effect,
      target,
      key,
      type
    }
    effect.options.onTrigger(extraInfo ? extend(event, extraInfo) : event)
  }
  if (effect.options.scheduler !== void 0) {
    effect.options.scheduler(effect)
  } else {
    effect()
  }
}
```

### baseHandlers.ts

effect.run函数中调用，触发get 

```ts
import { reactive, readonly, toRaw } from './reactive'
import { OperationTypes } from './operations'
import { track, trigger } from './effect'
import { LOCKED } from './lock'
import { isObject, hasOwn, isSymbol, hasChanged } from '@vue/shared'
import { isRef } from './ref'

const builtInSymbols = new Set(
  Object.getOwnPropertyNames(Symbol)
    .map(key => (Symbol as any)[key])
    .filter(isSymbol)
)

/**
 * 创建proxy里面的get处理函数
 * @param isReadonly 否是是处理只读
 */
function createGetter(isReadonly: boolean) {
  /**
   * get函数
   */
  return function get(target: object, key: string | symbol, receiver: object) {
    //获取到Reflect执行的结果

    // yi={a:
    //   {
    //   b:1
    // }}
    //yi.a
    const res = Reflect.get(target, key, receiver)
    //防止key为Symbol的内置对象，比如 Symbol.iterator
    if (isSymbol(key) && builtInSymbols.has(key)) {
      return res
    }
    //如果是ref包装过的数据，直接调用Value触发get，获取值之后，再返回
    if (isRef(res)) {
      return res.value
    }
    //TODO:看着像跟踪，依赖收集，后面再看
    track(target, OperationTypes.GET, key)
    //{a:1}  `get` a
    /**
     * 对深层对象再次包装，
     * 判断内层是否是对象，不是就直接返回
     * 如果是对象，判断是否是要做只读处理，
     * 如果是只读，就调用只读
     * 不是的话，就调用
     */
    return isObject(res)
      ? isReadonly
        ? // need to lazy access readonly and reactive here to avoid
        // circular dependency
        readonly(res)
        : reactive(res)
      : res
  }
	//嵌套数据没有递归，当用到了再去处理。
  /**
    c={
      a:{
        b{

        }
      }
    }
  */

  /**
  
    obj={
      a:{
        b:{
          c:1
        }
      }
    }
  */
}

/**
 * proxy中set方法的优化,包含只读数据的处理和响应式数据的处理
 * @param target
 * @param key
 * @param value
 * @param receiver
 */
function set(
  target: object,
  key: string | symbol,
  value: unknown,
  receiver: object
): boolean {
  //获取原始的数据
  value = toRaw(value)
  //拿到之前的老值
  const oldValue = (target as any)[key]
  //判断老数据是否是已经被ref处理过的，并且新数据没有没ref处理过
  if (isRef(oldValue) && !isRef(value)) {
    //更新老数据，并且返回
    // 如果 value 不是响应式数据，则需要将其赋值给 oldValue，调用set value，
    //如果 isObject(value) ，则会经过 reactive 再包装一次，将其变成响应式数据
    oldValue.value = value
    return true
  }
  /**
   *   key是target自己的属性
   *
   *   这个方法是解决 数组push时，会调用两次 set 的情况，比如 arr.push(1)
   *   第一次set，在数组尾部添加1
   *   第二次set，给数组添加length属性
   *   hasOwnProperty 方法用来判断目标对象是否含有指定属性。数组本身就有length的属性，所以这里是 true
   */
  const hadKey = hasOwn(target, key)
  //执行返回结果
  const result = Reflect.set(target, key, value, receiver)
  // don't trigger if target is something up in the prototype chain of original
  //target 如果只读 或者 存在于 reactiveToRaw 则不进入条件，reactiveToRaw 储存着代理后的对象
  //已经是代理之后的值了
  if (target === toRaw(receiver)) {
    //如果是原始数据原型链上自己的操作，就不触发
    /* istanbul ignore else */
    if (__DEV__) {
      const extraInfo = { oldValue, newValue: value }
      if (!hadKey) {
        trigger(target, OperationTypes.ADD, key, extraInfo)
      } else if (hasChanged(value, oldValue)) {
        trigger(target, OperationTypes.SET, key, extraInfo)
      }
    } else {
      //属性新增，触发 ADD 枚举
      if (!hadKey) {
        trigger(target, OperationTypes.ADD, key)
      } else if (hasChanged(value, oldValue)) {
        //当新值与旧值不相等时
        // 属性修改，触发 SET 枚举
        trigger(target, OperationTypes.SET, key)
      }
    }
  }
  return result
}

//删除属性处理
function deleteProperty(target: object, key: string | symbol): boolean {
  const hadKey = hasOwn(target, key)
  const oldValue = (target as any)[key]
  const result = Reflect.deleteProperty(target, key)
  if (result && hadKey) {
    /* istanbul ignore else */
    if (__DEV__) {
      trigger(target, OperationTypes.DELETE, key, { oldValue })
    } else {
      trigger(target, OperationTypes.DELETE, key)
    }
  }
  return result
}
//查询属性处理
function has(target: object, key: string | symbol): boolean {
  const result = Reflect.has(target, key)
  track(target, OperationTypes.HAS, key)
  return result
}
//获取key的属性处理
function ownKeys(target: object): (string | number | symbol)[] {
  track(target, OperationTypes.ITERATE)
  return Reflect.ownKeys(target)
}

//可变数据处理handler
export const mutableHandlers: ProxyHandler<object> = {
  get: createGetter(false),
  set,
  deleteProperty,
  has,
  ownKeys
}

//只读数据handler
export const readonlyHandlers: ProxyHandler<any> = {
  //创建get
  get: createGetter(true),
  //创建set
  set(
    target: object,
    key: string | symbol,
    value: unknown,
    receiver: object
  ): boolean {
    //判断是否已经锁住
    if (LOCKED) {
      if (__DEV__) {
        console.warn(
          `Set operation on key "${String(key)}" failed: target is readonly.`,
          target
        )
      }
      return true
    } else {
      return set(target, key, value, receiver)
    }
  },

  deleteProperty(target: object, key: string | symbol): boolean {
    if (LOCKED) {
      if (__DEV__) {
        console.warn(
          `Delete operation on key "${String(
            key
          )}" failed: target is readonly.`,
          target
        )
      }
      return true
    } else {
      return deleteProperty(target, key)
    }
  },

  has,
  ownKeys
}
```

### 小结

梳理一下上面的流程

![dataResponseArchitecture2](/sourceCode/vue3/dataResponseArchitecture2.png)

```
reactive ==>把数据处理成为响应式数据
    proxy
    targetMap---对应下面
    {
        {a:1} :{
            a:[effect()]
        }
    }

effect==>   
1.首先会执行一次对应监听的函数
2.修改对应监听函数内使用的响应式数据，对应的监听函数就会重新执行，重新执行的过程就会获取到新的数据

effect(fn)

    ==>  createReactiveEffect==warpFn==>lazy ==Effect()==> run(effect, fn, args)
    ==> effectStack(维护一个堆栈)
    ==> effectStack.push (Effect)
    ==> fn()
    ==> get==>track(target,get,'key')==> {
        target:{
            key:[Effect]
        }
    }
    基本数据类型不能处理成为 reactive 数据,基本数据类型能不能被监听，所以有了 Ref 
```

### ref

处理基本数据

```ts
import { track, trigger } from './effect'
import { OperationTypes } from './operations'
import { isObject } from '@vue/shared'
import { reactive } from './reactive'
import { ComputedRef } from './computed'
import { CollectionTypes } from './collectionHandlers'

/**
 * Ref存在的原因是对基本数据的处理
 */
export interface Ref<T = any> {
  _isRef: true
  value: UnwrapRef<T>
}

const convert = <T extends unknown>(val: T): T =>
  isObject(val) ? reactive(val) : val

export function ref<T extends Ref>(raw: T): T
export function ref<T>(raw: T): Ref<T>
export function ref<T = any>(): Ref<T>
export function ref(raw?: unknown) {
  if (isRef(raw)) {
    return raw
  }
  /**
   * 如果是对象，则用 reactive 方法 包装 raw,不是就返回原始值
   * const convert = (val: any): any => (isObject(val) ? reactive(val) : val)
   */
  raw = convert(raw)

  /**
   * 返回v，Ref类型，获取value值的时候，调用track方法，存value值时，调用 trigger方法
   * v.value触发get，v.value=2触发set
   */
  const r = {
    _isRef: true,
    get value() {
      //TODO:why track
      track(r, OperationTypes.GET, '')
      return raw
    },
    set value(newVal) {
      //对数据包装
      raw = convert(newVal)
      //TODO:why trigger
      trigger(r, OperationTypes.SET, '')
    }
  }
  return r as Ref
}

//判断是否是ref
export function isRef(r: any): r is Ref {
  return r ? r._isRef === true : false
}
/**
 * 把代理对象转换为ref
 * @param object
 */
export function toRefs<T extends object>(
  object: T
): { [K in keyof T]: Ref<T[K]> } {
  const ret: any = {}
  for (const key in object) {
    ret[key] = toProxyRef(object, key)
  }
  return ret
}
/**
 * 转换ref数据
 * @param object
 * @param key
 */
function toProxyRef<T extends object, K extends keyof T>(
  object: T,
  key: K
): Ref<T[K]> {
  return {
    _isRef: true,
    get value(): any {
      return object[key]
    },
    set value(newVal) {
      object[key] = newVal
    }
  }
}

// Recursively unwraps nested value bindings.
export type UnwrapRef<T> = {
  cRef: T extends ComputedRef<infer V> ? UnwrapRef<V> : T
  ref: T extends Ref<infer V> ? UnwrapRef<V> : T
  array: T extends Array<infer V> ? Array<UnwrapRef<V>> : T
  object: { [K in keyof T]: UnwrapRef<T[K]> }
}[T extends ComputedRef<any>
  ? 'cRef'
  : T extends Ref
    ? 'ref'
    : T extends Array<any>
      ? 'array'
      : T extends Function | CollectionTypes
        ? 'ref' // bail out on types that shouldn't be unwrapped
        : T extends object ? 'object' : 'ref']
import { track, trigger } from './effect'
import { OperationTypes } from './operations'
import { isObject } from '@vue/shared'
import { reactive } from './reactive'
import { ComputedRef } from './computed'
import { CollectionTypes } from './collectionHandlers'

/**
 * Ref存在的原因是对基本数据的处理
 */
export interface Ref<T = any> {
  _isRef: true
  value: UnwrapRef<T>
}

const convert = <T extends unknown>(val: T): T =>
  isObject(val) ? reactive(val) : val

export function ref<T extends Ref>(raw: T): T
export function ref<T>(raw: T): Ref<T>
export function ref<T = any>(): Ref<T>
export function ref(raw?: unknown) {
  if (isRef(raw)) {
    return raw
  }
  /**
   * 如果是对象，则用 reactive 方法 包装 raw,不是就返回原始值
   * const convert = (val: any): any => (isObject(val) ? reactive(val) : val)
   */
  raw = convert(raw)

  /**
   * 返回v，Ref类型，获取value值的时候，调用track方法，存value值时，调用 trigger方法
   * v.value触发get，v.value=2触发set
   */
  const r = {
    _isRef: true,
    get value() {
      //TODO:why track
      track(r, OperationTypes.GET, '')
      return raw
    },
    set value(newVal) {
      //对数据包装
      raw = convert(newVal)
      //TODO:why trigger
      trigger(r, OperationTypes.SET, '')
    }
  }
  return r as Ref
}

//判断是否是ref
export function isRef(r: any): r is Ref {
  return r ? r._isRef === true : false
}
/**
 * 把代理对象转换为ref
 * @param object
 */
export function toRefs<T extends object>(
  object: T
): { [K in keyof T]: Ref<T[K]> } {
  const ret: any = {}
  for (const key in object) {
    ret[key] = toProxyRef(object, key)
  }
  return ret
}
/**
 * 转换ref数据
 * @param object
 * @param key
 */
function toProxyRef<T extends object, K extends keyof T>(
  object: T,
  key: K
): Ref<T[K]> {
  return {
    _isRef: true,
    get value(): any {
      return object[key]
    },
    set value(newVal) {
      object[key] = newVal
    }
  }
}

// Recursively unwraps nested value bindings.
export type UnwrapRef<T> = {
  cRef: T extends ComputedRef<infer V> ? UnwrapRef<V> : T
  ref: T extends Ref<infer V> ? UnwrapRef<V> : T
  array: T extends Array<infer V> ? Array<UnwrapRef<V>> : T
  object: { [K in keyof T]: UnwrapRef<T[K]> }
}[T extends ComputedRef<any>
  ? 'cRef'
  : T extends Ref
    ? 'ref'
    : T extends Array<any>
      ? 'array'
      : T extends Function | CollectionTypes
        ? 'ref' // bail out on types that shouldn't be unwrapped
        : T extends object ? 'object' : 'ref']

```

用法

![ref](/sourceCode/vue3/ref.png)

## vnode

![1598540303402_ECEB2EA2-E1E6-4426-A0BD-F07543713AC6](/sourceCode/vue3/1598540303402_ECEB2EA2-E1E6-4426-A0BD-F07543713AC6.png)

```js
<div>
    <p>foo</p>
    <p>{{ bar }}</p>
</div>




const vnode = {
    tag: 'div',
    children: [
        { tag: 'p', children: 'foo' },
        { tag: 'div', children: [
            { tag: 'p', children: ctx.bar }
        ] 
        }, 
    ],
    //v3会增加一个，动态节点添加到dynamicChildren，之后diff直接对比这里
    dynamicChildren:[
        { tag: 'p', children: ctx.bar }, 
    ]
}
//使用到了BlockTree   上图中_createBlock
```

```js
import { createVNode as _createVNode, toDisplayString as _toDisplayString, Fragment as _Fragment, openBlock as _openBlock, createBlock as _createBlock } from "vue"

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock(_Fragment, null, [
    _createVNode("div", { onClick: _ctx.go }, "Hello World!", 8 /* PROPS */, ["onClick"]),
    _createVNode("div", { onClick: _ctx.go }, _toDisplayString(_ctx.msg), 9 /* TEXT, PROPS */, ["onClick"])
  ], 64 /* STABLE_FRAGMENT */))
}

// Check the console for the AST
//对比完成靶向更新
```

