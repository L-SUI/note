# redux源码解析

## flux架构

首先来看一张flux的架构图

![1598318235188_2AB4D188-9619-46EF-917E-A539C98F9A4F](/sourceCode/redux/1598318235188_2AB4D188-9619-46EF-917E-A539C98F9A4F.png)

## redux

然后先了解一下redux，这里推荐两个文档，按顺序了解一下。

1. [阮一峰的网络日志Redux 入门教程](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)

2. [Redux 中文文档](https://www.redux.org.cn/)

redux是什么？这方面上面两篇文档其实已经说的很清楚，那么来说点别的，换一个切入点。

redux其实是一个比较典型的函数式编程的应用实例：

1. store -> container

2. currentState -> \_value

3. action -> f 变形关系

4. reducer -> map

5. middleware -> IO functor （解决异步和脏操作）

[点击查看函数式编程](/note/typescript/functional_programming)

那么，接下来我们去一步一步实现一个redux，首先看一下目录结构：

- applyMiddleware.js

- bindActionCreators.js

- combineReducers.js

- compose.js

- createStore.js

- index.js

- utils（工具文件夹，存放一些工具性的文件）

### 第一步

首先我们先建立一个简单demo模型：

index.js入口文件

```js
import createStore from './createStore.js';
export { createStore };
```

createStore.js创建store

```js
export default function createStore(initState) {
  let state = initState;
  let listeners = [];
  function subscribe(listener) {
    listeners.push(listener);
  }
  function getState() {
    return state;
  }
  function changeState(newState) {
    state = newState;
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }
  return {
    subscribe,
    getState,
    changeState,
  };
}

```

index.html  使用

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>redux</title>
  </head>
  <body>
    <script type="module">
      import { createStore } from './redux/index.js';
      let initState = {
        counter: {
          count: 0,
        },
        info: {
          name: '',
          description: '',
        },
      };
      const store = createStore(initState);
      store.subscribe(() => {
        const state = store.getState();
        console.log(`${state.info.name} -- ${state.info.description} `);
      });
      store.subscribe(() => {
        const state = store.getState();
        console.log(state.counter.count);
      });
      store.changeState({
        ...store.getState(),
        info: {
          name: 'redux',
          description: '第一步',
        },
      });
      store.changeState({
        ...store.getState(),
        counter: {
          count: 1,
        },
      });
    </script>
  </body>
</html>
```

输出结果：

```bash
redux 第一步
0
redux 第一步
1
```

### 第二步

demo中加入reducer

`createStore.js`

```js
export default function createStore(reducer, initState) {
  let state = initState;
  let listeners = [];
  function subscribe(listener) {
    listeners.push(listener);
  }
  function getState() {
    return state;
  }
  function dispatch(action) {
    //reducer负责更新数据
    state = reducer(state, action);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }
  return {
    subscribe,
    getState,
    dispatch,
  };
}
```

`reducer.js`

```js
export default function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
}
```

`index.html`

```html
<script type="module">
  import { createStore } from './redux/index.js';
  import reducer from './reducer.js';
  let initState = {
    count: 0,
  };
  const store = createStore(reducer, initState);
  store.subscribe(() => {
    const state = store.getState();
    console.log(state.count);
  });
  store.dispatch({
    type: 'INCREMENT',
  });
  store.dispatch({
    type: 'DECREMENT',
  });
</script>
```

输出

```bash
1
0
```

### 第三步

整合，拉平reducer==>`combineReducers.js`

`combineReducers.js`

```js
export default function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);
  return function combinaction(state = {}, action) {
    const nextState = {};
    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i];
      const reducer = reducers[key];
      //现有 的状态
      const previousStateForkey = state[key];
      const nextStateForkey = reducer(previousStateForkey, action);
      nextState[key] = nextStateForkey;
    }
    return nextState;
  };
}
```

`reducer/counter.js`

```js
let initState = {
  count: 0,
};
export default function counterReducer(state, action) {
  if (!state) {
    state = initState;
  }
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
}
```

`reducer/info.js`

```js
let initState = {
  name: 'redux',
  description: '第三步',
};
export default function infoReducer(state, action) {
  if (!state) {
    state = initState;
  }
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.name,
      };
    case 'SET_DECREMENT':
      return {
        ...state,
        description: action.description,
      };
    default:
      return state;
  }
}
```

`index.html`

```html
<script type="module">
  import { createStore, combineReducers } from './redux/index.js';
  import counterReducer from './reducers/counter.js';
  import infoReducer from './reducers/info.js';
  const reducer = combineReducers({
    counter: counterReducer,
    info: infoReducer,
  });
  let initState = {
    counter: {
      count: 0,
    },
    info: {
      name: '',
      description: '',
    },
  };
  const store = createStore(reducer, initState);
  store.subscribe(() => {
    const state = store.getState();
    console.log(state.counter.count);
    console.log(state.info.name);
  });
  store.dispatch({
    type: 'INCREMENT',
  });
  store.dispatch({
    type: 'SET_NAME',
    name: 'redux🏮',
  });
</script>
```

输出

```
1

1
redux🏮
```

### 第四步

处理无状态，参数可选

`createStore.js`

```js
export default function createStore(reducer, initState) {
  let state = initState;
  let listeners = [];
  function subscribe(listener) {
    listeners.push(listener);
  }
  function getState() {
    return state;
  }
  function dispatch(action) {
    //reducer负责更新数据
    state = reducer(state, action);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }
  //返回之前调用dispatch，传递独一无二的数据
  dispatch({ type: Symbol() });
  return {
    subscribe,
    getState,
    dispatch,
  };
}
```

### 第五步

替换reducer

`createStore.js`

```js
export default function createStore(reducer, initState) {
  let state = initState;
  let listeners = [];
  function subscribe(listener) {
    listeners.push(listener);
  }
  function getState() {
    return state;
  }
  function dispatch(action) {
    //reducer负责更新数据
    state = reducer(state, action);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }
  function replaceReducer(nextReucer) {//替换reducer
    reducer = nextReucer;
    dispatch({ type: Symbol() });
  }
  dispatch({ type: Symbol() });
  return {
    subscribe,
    getState,
    dispatch,
    replaceReducer,
  };
}
```

`index.html`

```js
<script type="module">
  import { createStore, combineReducers } from './redux/index.js';
  import counterReducer from './reducers/counter.js';
  import infoReducer from './reducers/info.js';
  const reducer = combineReducers({
    counter: counterReducer,
  });
  const store = createStore(reducer);
  const nextReducer = combineReducers({
    counter: counterReducer,
    info: infoReducer,
  });
  store.replaceReducer(nextReducer);
  store.subscribe(() => {
    const state = store.getState();
    console.log(state.counter.count);
    console.log(state.info.name);
  });
  store.dispatch({
    type: 'INCREMENT',
  });
  store.dispatch({
    type: 'SET_NAME',
    name: '京程一灯🏮',
  });
</script>
```

### 第六步

添加`middlewares`,劫持了`dispach`

`middlewares/exceptiontimeMiddleware.js`

```js
const exceptiontimeMiddleware = (store) => (next) => (action) => {
  try {
    next(action);
  } catch (e) {
    console.error('错误报告', e);
  }
};
export default exceptiontimeMiddleware;
```

`middlewares/loggerMiddleware.js`

```js
const loggerMiddleware = (store) => (next) => (action) => {
  console.log('this state', store.getState());
  console.log('action', action);
  next(action);
  console.log('next state', store.getState());
};
export default loggerMiddleware;
```

`middlewares/timeMiddleware.js`

```js
const timeMiddleware = (store) => (next) => (action) => {
  console.log('⏰', new Date().getTime());
  next(action);
};
export default timeMiddleware;
```

`index.html`

```html
<script type="module">
  import exceptiontimeMiddleware from './middlewares/exceptiontimeMiddleware.js';
  import loggerMiddleware from './middlewares/loggerMiddleware.js';
  import timeMiddleware from './middlewares/timeMiddleware.js';
  //如上是中间件
  import { createStore, combineReducers } from './redux/index.js';
  import counterReducer from './reducers/counter.js';
  import infoReducer from './reducers/info.js';
  const reducer = combineReducers({
    counter: counterReducer,
    info: infoReducer,
  });
  const store = createStore(reducer);
  //初始化中间件
  const next = store.dispatch;
  const logger = loggerMiddleware(store);
  const exception = exceptiontimeMiddleware(store);
  const time = timeMiddleware(store);
  store.dispatch = exception(time(logger(next)));

  store.subscribe(() => {
    const state = store.getState();
    console.log(state.counter.count);
    console.log(state.info.name);
  });
  store.dispatch({
    type: 'INCREMENT',
  });
  store.dispatch({
    type: 'SET_NAME',
    name: 'redux六🏮',
  });
</script>
```

输出

![1598348484399_F859DD55-A1A7-411B-9937-D23A5CC31795](/sourceCode/redux/1598348484399_F859DD55-A1A7-411B-9937-D23A5CC31795.png)

### 第七步

拉平`middlewares`

`compose.js`

```js
export default function compose(...funcs) {//函数组合
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
```

`applyMiddleware.js`

```js
import compose from './compose.js';

const applyMiddleware = function (...middlewares) {
  return function (oldCreateStore) {
    return function (reducer, initState) {
      const store = oldCreateStore(reducer, initState);
      const simpleStore = { getState: store.getState };
      const chain = middlewares.map((middleware) => middleware(simpleStore));
      const dispatch = compose(...chain)(store.dispatch);
      return {
        ...store,
        dispatch,
      };
    };
  };
};
export default applyMiddleware;
```

`createStore.js`

```js
export default function createStore(
  reducer,
  initState,
  rewriteCreateStoreFunc
) {
  if (rewriteCreateStoreFunc) {
    const newCreateStore = rewriteCreateStoreFunc(createStore);
    return newCreateStore(reducer, initState);
  }
  let state = initState;
  let listeners = [];
  function subscribe(listener) {
    listeners.push(listener);
  }
  function getState() {
    return state;
  }
  function dispatch(action) {
    //reducer负责更新数据
    state = reducer(state, action);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }
  function replaceReducer(nextReucer) {
    reducer = nextReucer;
    dispatch({ type: Symbol() });
  }
  dispatch({ type: Symbol() });
  return {
    subscribe,
    getState,
    dispatch,
    replaceReducer,
  };
}
```

`index.html`

```html
<script type="module">
  import exceptiontimeMiddleware from './middlewares/exceptiontimeMiddleware.js';
  import loggerMiddleware from './middlewares/loggerMiddleware.js';
  import timeMiddleware from './middlewares/timeMiddleware.js';
  //如上是中间件
  import {
    createStore,
    combineReducers,
    applyMiddleware,
  } from './redux/index.js';
  import counterReducer from './reducers/counter.js';
  import infoReducer from './reducers/info.js';
  const reducer = combineReducers({
    counter: counterReducer,
    info: infoReducer,
  });
  //初始化中间件
  const rewriteCreateStoreFunc = applyMiddleware(
    exceptiontimeMiddleware,
    timeMiddleware,
    loggerMiddleware
  );
  const store = createStore(reducer, {}, rewriteCreateStoreFunc);

  store.subscribe(() => {
    const state = store.getState();
    console.log(state.counter.count);
    console.log(state.info.name);
  });
  console.log('✨', store);
  store.dispatch({
    type: 'INCREMENT',
  });
  store.dispatch({
    type: 'SET_NAME',
    name: '京程一灯🏮',
  });
</script>
```

### 第八步

整合action

`actions/counter.js`

```js
function increment() {
  return {
    type: 'INCREMENT',
  };
}
export { increment };
```

`actions/info.js`

```js
function setName() {
  return {
    type: 'SET_NAME',
    name: 'redux🏮',
  };
}
export { setName };
```

`bindActionCreators.js`

```js
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}

export default function bindActionCreators(actionCreators, dispatch) {
  const boundActionCreators = {};
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}
```

`index.html`

```html
<script type="module">
  import exceptiontimeMiddleware from './middlewares/exceptiontimeMiddleware.js';
  import loggerMiddleware from './middlewares/loggerMiddleware.js';
  import timeMiddleware from './middlewares/timeMiddleware.js';
  //如上是中间件
  import {
    createStore,
    combineReducers,
    applyMiddleware,
    bindActionCreators,
  } from './redux/index.js';
  import counterReducer from './reducers/counter.js';
  import infoReducer from './reducers/info.js';
  import { increment } from './actions/counter.js';
  import { setName } from './actions/info.js';
  const reducer = combineReducers({
    counter: counterReducer,
    info: infoReducer,
  });
  //初始化中间件
  const rewriteCreateStoreFunc = applyMiddleware(
    exceptiontimeMiddleware,
    timeMiddleware,
    loggerMiddleware
  );
  const store = createStore(reducer, {}, rewriteCreateStoreFunc);

  store.subscribe(() => {
    const state = store.getState();
    console.log(state.counter.count);
    console.log(state.info.name);
  });
  console.log('✨', store);

  // store.dispatch();
  const actions = bindActionCreators(
    { increment, setName },
    store.dispatch
  );

  actions.increment();
  actions.setName();
</script>
```

输出

![1598367283904_86EC1EF8-9225-4F83-9B9C-9E3AC984EF6F](/sourceCode/redux/1598367283904_86EC1EF8-9225-4F83-9B9C-9E3AC984EF6F.png)

### 第九步

卸载

`createStore.js`

```js
function subscribe(listener) {
  listeners.push(listener);
  return function unsubscribe() {
    const index = listeners.indexOf(listener);
    listeners.splice(index, 1);
  };
}
```

### [源代码](https://github.com/L-SUI/note/tree/master/sourseCode/redux)

