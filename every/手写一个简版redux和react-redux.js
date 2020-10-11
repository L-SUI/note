// 手写一个简版redux 和react-redux
class CreateStore {
    constructor(initState,reducer) {
        this.state = initState;
        this.listeners = [];
        this.reducer = reducer;
    }
    subscribe(fn) {
        this.listeners.push(fn);
    }
    getState(){
        return this.state;
    }
    dispatch(action) {
        this.state = this.reducer(this.state,action)
        for (let i = 0; i <this.listeners.length; i++){
            this.listeners[i]()
        }
    }   
}
function reducer(state, action) {
    switch (action.type) {
        case 'increase':
          return {
            ...state,
            count: state.count + 1,
          };
        case 'reduce':
          return {
            ...state,
            count: state.count - 1,
          };
        default:
          return state;
    }
}
let store = new CreateStore({name: 'js高级编程第四版',count:10},reducer)
store.subscribe(()=>{
    state = store.getState()
    console.log(`${state.name}还有${state.count}本`)
})
store.dispatch({type:'increase'})
store.dispatch({type:'reduce'})
store.dispatch({type:''})
