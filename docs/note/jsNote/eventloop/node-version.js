// timers 阶段的执行时机变化
// setTimeout(()=>{
//     console.log('timer1')
//     Promise.resolve().then(function() {
//         console.log('promise1')
//     })
// }, 0)
// setTimeout(()=>{
//     console.log('timer2')
//     Promise.resolve().then(function() {
//         console.log('promise2')
//     })
// }, 0)

// check 阶段的执行时机变化
// setImmediate(() => console.log('immediate1'));
// setImmediate(() => {
//     console.log('immediate2')
//     Promise.resolve().then(() => console.log('promise resolve'))
// });
// setImmediate(() => console.log('immediate3'));
// setImmediate(() => console.log('immediate4'));

// nextTick 队列的执行时机变化
// setImmediate(() => console.log('timeout1'));
// setImmediate(() => {
//     console.log('timeout2')
//     process.nextTick(() => console.log('next tick'))
// });
// setImmediate(() => console.log('timeout3'));
// setImmediate(() => console.log('timeout4'));