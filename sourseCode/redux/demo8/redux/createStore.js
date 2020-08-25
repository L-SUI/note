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
