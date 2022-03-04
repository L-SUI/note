// 如果你写过单元测试的话，一定很熟悉Spy的用法。

// 请自己实现一个spyOn(object, methodName) ，类似于 jest.spyOn()。

// 以下是spyOn需要完成的内容。

// spy被调用的时候，原来的method也需要被调用。
// spy需要又一个calls数组，数组中含有所有调用的参数
// 以下代码说明了一切。

// const obj = {
//    data: 1, 
//    increment(num) {
//       this.data += num
//    }
// }

// const spy = spyOn(obj, 'increment')

// obj.increment(1)

// console.log(obj.data) // 2

// obj.increment(2)

// console.log(obj.data) // 4

// console.log(spy.calls)
// // [ [1], [2] ]






/**
 * @param {object} obj
 * @param {string} methodName
 */
 function spyOn(obj, methodName) {

    if (!(methodName in obj)) throw Error();
    
    const calls = [];
    const originalMethod = obj[methodName];
  
    obj[methodName] = function (...args) {
      originalMethod.apply(this, args);
      calls.push(args);
    }
  
    return { calls }
  }