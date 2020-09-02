# ReactHooks16.13分析

## 为什么会有hooks？解决了什么样的问题

react组件中，function组件只能作为UI组件，没有生命周期等功能。没有[`Component`](https://zh-hans.reactjs.org/docs/react-api.html#reactcomponent)

的功能全面，所以出现了hooks。

> *Hook* 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

**Hook 使你在非 class 的情况下可以使用更多的 React 特性。** 从概念上讲，React 组件一直更像是函数。而 Hook 则拥抱了函数，同时也没有牺牲 React 的精神原则。Hook 提供了问题的解决方案，无需学习复杂的函数式或响应式编程技术。

## Hooks的基本用法

```js
import React, { 
  useState, // 定义state
  useEffect, // 生命周期
  useCallback, // 对你的函数做一个缓存
  useMemo, // 对值缓存
  useRef,  // ref功能
  useContext, // context api
  useReducer, // redux把它内置了
} from 'react'
```

### useState

`useState` 就是一个 *Hook* （等下我们会讲到这是什么意思）。通过在函数组件里调用它来给组件添加一些内部 state。React 会在重复渲染时保留这个 state。`useState` 会返回一对值：**当前**状态和一个让你更新它的函数，你可以在事件处理函数中或其他一些地方调用这个函数。它类似 class 组件的 `this.setState`，但是它不会把新的 state 和旧的 state 进行合并。（我们会在[使用 State Hook](https://zh-hans.reactjs.org/docs/hooks-state.html) 里展示一个对比 `useState` 和 `this.state` 的例子）。

**可以在一个组件中多次使用 State Hook:**

```js
function ExampleWithManyStates() {
  // 声明多个 state 变量！
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  // ...
}
```

[数组解构](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring)的语法让我们在调用 `useState` 时可以给 state 变量取不同的名字。当然，这些名字并不是 `useState` API 的一部分。React 假设当你多次调用 `useState` 的时候，你能保证每次渲染时它们的调用顺序是不变的。后面我们会再次解释它是如何工作的以及在什么场景下使用。

#### useState的3个阶段：

- mountState

- dispatchAction

- updateState

#### mountState

第一次执行函数体的时候，调用useState会执行mountState，它主要做了以下几件事情：

1. 默认值是function，执行function，
    得到初始state

2. state是存放在memoizedState属性中

3. 新建一个quene

4. 把queue传递给dispatch

5. 返回默认值和dispatch

![1599015103659_26FDC7F7-864A-4822-B79D-B5A271DD6169](/sourceCode/reactHooks/1599015103659_26FDC7F7-864A-4822-B79D-B5A271DD6169.png)

#### 调用dispatch

1. 创建一个update

2. update添加到quene里

3. 如果当前有时间，提前计算出最新的state， 保存在eagerState

4. 调用一次scheduleWork

![1599015195278_7F137358-D3DA-46A6-A6AC-2D717F437365](/sourceCode/reactHooks/1599015195278_7F137358-D3DA-46A6-A6AC-2D717F437365.png)

调用一次scheduleWork，执行render

![1599015201853_E4A8CDB2-819B-4C0E-AC15-8DFEDC7AC9B6](/sourceCode/reactHooks/1599015201853_E4A8CDB2-819B-4C0E-AC15-8DFEDC7AC9B6.png)

#### updateState

1. 递归执行quene里的update

2. 计算最新的state，赋值给memoizedState

![1599015303487_BDCB348F-C494-4130-A570-1C27B8CDDEA3](/sourceCode/reactHooks/1599015303487_BDCB348F-C494-4130-A570-1C27B8CDDEA3.png)

### useEffect

你之前可能已经在 React 组件中执行过数据获取、订阅或者手动修改过 DOM。我们统一把这些操作称为“副作用”，或者简称为“作用”。

`useEffect` 就是一个 Effect Hook，给函数组件增加了操作副作用的能力。它跟 class 组件中的 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 具有相同的用途，只不过被合并成了一个 API。（我们会在[使用 Effect Hook](https://zh-hans.reactjs.org/docs/hooks-effect.html) 里展示对比 `useEffect` 和这些方法的例子。）

```js
// didMount + didUpdate + willUnMount 3个生命周期的结合
	useEffect(() => {
    // 只有第一次执行App()函数的时候才会执行
    // didMount
    const onScroll = () => {}
    window.addEventListener('scroll', onScroll)
    // return一个函数==>willUnMount
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, []);
  useEffect(() => {
    // 每次重新render的时候都会执行
    // 不建议这么写
  });
  useEffect(() => {
    // didMount + name变化，didUpdate
    // 只有第一次执行App()函数的时候才会执行
    // age变化的时候，回调才会执行
    // didUpdate
  }, [name]);

  useEffect(() => {
    // 只有第一次执行App()函数的时候才会执行
    // age变化的时候，回调才会执行
    // didUpdate
  }, [age]);
```

#### useEffect的2个阶段

- MountEffect

- UpdateEffect

#### MountEffect

1. 处理依赖数组

2. 设置effectTag

3. 新增一个Effect到currentlyRenderingFiber .updateQueue 中参与到 compleleRoot中

![1599016353014_11EC65D1-CA96-4A83-A77A-40519A5A749D](/sourceCode/reactHooks/1599016353014_11EC65D1-CA96-4A83-A77A-40519A5A749D.png)

deps传值null，或者不传，每次都会调用。一定要写依赖数组。

#### MountEffect执行时机

在commitRoot =>commitLayoutEffects => commitLifeCycles =>commitHookEffectListMount里执行MountEffect

![1599030681636_00AB68AD-1F33-4B3F-81E1-C9995B501408](/sourceCode/reactHooks/1599030681636_00AB68AD-1F33-4B3F-81E1-C9995B501408.png)

#### UpdateEffect

1. 设置EffectTag
2. 对比依赖是否发生变化， 如不一样，则重新push一个新的Effect

![1599030758962_63054D50-089A-45FA-A6A3-F39647392454](/sourceCode/reactHooks/1599030758962_63054D50-089A-45FA-A6A3-F39647392454.png)

#### distory

在commitUnmount阶段卸载组件，这时distory方法会被调用

![1599030851066_EAFE4139-0460-4B3E-B82F-B9B4234D4DED](/sourceCode/reactHooks/1599030851066_EAFE4139-0460-4B3E-B82F-B9B4234D4DED.png)

## hooks遇到的坑

1. capture value。

```js
const [age, setAge] = useState(20);
<button onClick={() => {
      setAge(30);
      setTimeout(() => {
        console.log(ageRef.current)
      }, 2000)
    }}>改变age</button>
```

`output`==>20。是js的闭包导致的，不是react hooks产生的问题

2. 死循环  

```js
const [count, setCount] = useState(1);
const addCount = useCallback(() => {
      setCount(count+1)
 }, [])
useEffect(() =>{
  addCount()
}, [addCount])
```

解决方法==>get,断掉多重依赖

```js
const addCount = useCallback(() => {
		// 既可以传值，也可以传函数
    setCount((c)=>{c+1})
 }, [])
```

3. 怎么避免子组件无意义的渲染

function没有shouldComponentUpdate方法子组件 

React.memo + useCallback包裹传递的function

```js
const Child = React.memo(({name}) => {
  return <div>{name}</div>
})
```

4. 同时调setName， setAge，会render两次，怎么解决这个问题

```js
import { unstable_batchedUpdates as batchedUpdates } from 'react-dom';
const addCount = useCallback(() => {
  	//强制批处理
    batchedUpdates(() => {
      setCount(4545)
      setName('ddd')
    })
 }, [])
```

5. 怎么完全分离 didMount 和 didUpdate?

```js
const isUpdate = useRef(false)
useEffect(() =>{
    if (!isUpdate.current) {
      isUpdate.current=true;
    } else {
      // ******
    }
}, [count])
```

