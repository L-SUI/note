// Promise.allSettled()方法返回一个在所有给定的promise都已经fulfilled或rejected后的promise，并带有一个对象数组，每个对象表示对应的promise结果。

// from MDN
// 和Promise.all()不同，Promise.allSettled() 会等待所有的promise直到fulfill或者reject。

// 你能实现自己的Promise.allSettled() 吗?


// https://bigfrontend.dev/zh/problem/implement-Promise-allSettled

/**
 * @param {Array<any>} promises - notice that input might contains non-promises
 * @return {Promise<Array<{status: 'fulfilled', value: any} | {status: 'rejected', reason: any}>>}
 */
 function allSettled(promises) {
    console.log(promises)
    return Promise.all(promises.map(item=>{
      if(!item.then) return {status:'fulfilled',value:item}
      return item.then(res=>({status:'fulfilled',value:res}),
                      fail=>({status:'rejected',reason:fail}))
    }))
  }
  
  