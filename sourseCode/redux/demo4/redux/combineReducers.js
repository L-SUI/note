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
