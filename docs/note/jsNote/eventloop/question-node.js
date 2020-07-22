// 比较 setImmediate 和 setTimeout 的执行顺序
// setTimeout(_ => console.log('setTimeout'))
// setImmediate(_ => console.log('setImmediate'))

// 如果两者都在一个 poll 阶段注册，那么执行顺序就能确定。
// const fs = require('fs')
// fs.readFile('./index.html',()=>{
//     setTimeout(_ => console.log("setTimeout"));
//     setImmediate(_ => console.log("setImmediate"));
// })

// 理解 process.nextTick
// 每一个阶段执行完成之后，在当前阶段尾部触发 nextTick
// 案例：常见的 nodejs 回调函数第一个参数，都是抛出的错误
// function apiCall(arg, callback) {
//   if (typeof arg !== "string")
//     return process.nextTick(
//       callback,
//       new TypeError("argument should be string")
//     );
// }
// fs.readFile('./index.html',(err,data)=>{
//     setTimeout(_ => console.log("setTimeout"));
//     setImmediate(_ => console.log("setImmediate"));
// })

// 比较 process.nextTick 和 setImmediate
// process.nextTick() 在同一个阶段尾部立即执行。
// setImmediate() 在事件循环的 check 阶段触发。
// setImmediate(()=>{
//     console.log('setImmediate')
// })
// process.nextTick(()=>{
//     console.log('nextTick')
// })
