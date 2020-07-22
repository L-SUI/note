// 1、宏任务和微任务的执行顺序
// 宏任务队列：setTimeout
// 微任务队列：Promise
// 同步：promise init ，promise end，微任务：promise result:1，宏任务：timeout
// setTimeout(() => {
//   console.log("timeout");
// }, 0);

// const promise = new Promise(resolve => {
//   console.log("promise init");
//   resolve(1);
//   console.log("promise end");
// });

// promise.then(res => {
//   console.log("promise result:", res);
// });



// 2、宏任务微任务交错执行
// promise2 timeout1 promise1 timeout2
// setTimeout(() => {
//   console.log("timeout1");
//   Promise.resolve().then(() => {
//     console.log("promise1");
//   });
// }, 0);

// Promise.resolve().then(() => {
//   console.log("promise2");
//   setTimeout(() => {
//     console.log("timeout2");
//   }, 0);
// });


// 3、 async await 拆解
// 如果 await 后是一个简单类型，则进行 Promsie 包裹
// 如果 await 后是一个 thenable 对象，则不用进行 Promsie 包裹（chrome 的优化）
// async function fn() {
//   return await 1234;
// //   return Promise.resolve(1234)
// }
// fn().then(res => console.log(res));

// await thenable
// async function fn() {
//   return await ({
//     then(resolve) {
//         resolve(1234);
//     }
//   });
// }
// fn().then(res => console.log(res));

// 4、使用 async await 顺序判断（将 async await 转换成我们熟悉的 Promise）
// async function async1() {
//   console.log("async1 start");
//   // 可转换
//   await async2();
//   console.log("async1 end");
//   //   new Promise(resolve => {
//   //     console.log("async2")
//   //     resolve()
//   //   }).then(res => console.log("async1 end"))
// }
// async function async2() {
//   console.log("async2");
// }
// async1();
// console.log('script')

// 5、如果 promise 没有 resolve 或 reject。
//   async function async1 () {
//     console.log('async1 start');
//     await new Promise(resolve => {
//       console.log('promise1')
//     })
//     console.log('async1 success');
//     return 'async1 end'
//   }
//   console.log('srcipt start')
//   async1().then(res => console.log(res))
//   console.log('srcipt end')

// 6、某大厂真实面试题
// async function async1() {
//   console.log("async1 start");
//   await async2();
//   console.log("async1 end");
// }

// async function async2() {
//   console.log("async2");
// }

// console.log("script start");

// setTimeout(function() {
//   console.log("setTimeout");
// }, 0);

// async1();

// new Promise(function(resolve) {
//   console.log("promise1");
//   resolve();
// })
//   .then(function() {
//     console.log("promise2");
//   })
//   .then(function() {
//     console.log("promise3");
//   })
//   .then(function() {
//     console.log("promise4");
//   });
// console.log("script end");

//  7、resolve 处理 thenable ，也会包裹一层 promise。
// 普通的 function async2
// return thenable 的 async2
// async 的 async2
async function async1() {
  console.log("async1 start");
  return new Promise(resolve => {
    resolve(async2());
  }).then(() => {
    console.log("async1 end");
  });
}
 function async2() {
  console.log("async2");
}
setTimeout(function() {
  console.log("setTimeout");
}, 0);
async1();
new Promise(function(resolve) {
  console.log("promise1");
  resolve();
})
  .then(function() {
    console.log("promise2");
  })
  .then(function() {
    console.log("promise3");
  })
  .then(function() {
    console.log("promise4");
  });
