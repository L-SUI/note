// ES7
// 1.includes

/* const arr = [1, 2, 3];

console.log(arr.indexOf(4) >= 0);
console.log(arr.includes(4));

// **

console.log(Math.pow(2, 3));
console.log(2 ** 3); */

// ES8

// Async/Awiat
// next => Promise

//操作异步代码
// 1.嵌套回调  2.Promise  3.Generators

/* async function fn(){
    await Promise.resolvce();
    console.log(1);
} */
/* 
async function add(num) {
  const a = 1;
  return num + a;
}
console.log(add(2));

add(2).then(res => {
  console.log(res);
}); */

// await 语法
// function promiseFn() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve("result");
//     }, 1500);
//   });
// }
// async function fn() {
//   let res = await promiseFn();
//   console.log("异步代码执行完毕", res);
// }
// fn();

// 错误处理

/* function promiseFn() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("错误信息");
    }, 1500);
  });
}
async function fn() {
  //   try {
  await promiseFn().catch(err => {
    console.log(err);
  });
  console.log("我在错误下边不会执行");
  //   } catch (err) {
  //     console.log(err);
  //   }
}
fn(); */

// 多个await异步命令
/* function promiseFn() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("result");
    }, 1000);
  });
}
function promiseFn1() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("result");
    }, 2000);
  });
}

async function fn1() {
  console.time("fn1");
  let res1 = await promiseFn();
  let res2 = await promiseFn1();
  console.timeEnd("fn1");
}
// promise.all()
async function fn2() {
  console.time("fn2");
  let [res1, res2] = await Promise.all([promiseFn(), promiseFn1()]);
  console.timeEnd("fn2");
}
fn1();
fn2(); */

/* // Object.values()  vs Object.keys()

const obj = { name: "一灯", age: 4 };

// 之前
console.log(Object.keys(obj).map(key => obj[key])); //["一灯", 4]

// ES8
console.log(Object.values(obj)); // ["一灯", 4] */

/* 
    Object.entries()  vs  for...in（会枚举原型链中的属性）  
*/

// const obj = { name: "一灯", age: 4 };

// console.log(Object.entries(obj)); // [["name", "一灯"],["age", 4]]

// console.log(Object.entries("yideng"));

// 需求，遍历对象的键值

// for (const [key, value] of Object.entries(obj)) {
//   console.log(`${key}-${value}`);
// }
// Object.entries(obj).forEach(([key, value]) => {
//   console.log(`${key}-${value}`);
// });

//String Padding

// 1.String.prototype.padStart(targetLength,[padString]);
// targetLength  目标长度
//padString  ''
// 2.String.prototype.padEnd

// console.log("123".padStart(10));//       123  ''

//结尾允许逗号
/* 
function fn(
    para1,
    para,
){
    console.log(para1,para);
}
fn(1,2);

let obj = {
    n:'',
    n:'',
    
} */

// Object.getOwnPropertyDescriptors();

// const obj = {
//   name: "yidneg",
//   get fn() {
//     return "fn";
//   }
// };
// console.log(Object.getOwnPropertyDescriptors(obj));

// SharedArrayBuffer 与 Atomics

//  给js带来了多线程的工功能，高级特性，Js引擎核心改进

// 共享内存主要思想：把多线程引入Js

// 新的全局对象  SharedArrayBuffer

// postMessage()

//多线程 竞争， Atomics

// new SharedArrayBuffer(length); // 缓冲区大小，字节byte为单位  arrayBuffer

// web worker  postMessage

//ES9

// 新增异步迭代器  Asyncchronous Iterator,异步执行语句 for..await...of  ,Async generator

// 特殊对象，
// next() => {value,done}  done:布尔类型，

// 创建一个迭代器

// const createIterator = items => {
//   const keys = Object.keys(items);
//   const len = keys.length;
//   let pointer = 0;
//   return {
//     next() {
//       const done = pointer >= len;
//       const value = !done ? items[keys[pointer++]] : undefined;
//       return {
//         value,
//         done
//       };
//     }
//   };
// };

// const it1 = createIterator([1, 2, 3]);
// console.log(it1.next());
// console.log(it1.next());
// console.log(it1.next());
// console.log(it1.next());

// Symbol.iterator   for...of  S
// 数组原生具有iterator接口
// const arr = [1, 2, 3];
// console.log(typeof arr[Symbol.iterator]);
// for (const val of arr) {
//   console.log(val);
// }

// 对象没有

// const obj = { name: "yideng", age: 4 };

// // iterator接口
// obj[Symbol.iterator] = function() {
//   const me = this;
//   const keys = Object.keys(me);
//   const len = keys.length;
//   let pointer = 0;
//   return {
//     next() {
//       const done = pointer >= len;
//       const value = !done ? me[keys[pointer++]] : undefined;
//       return {
//         value,
//         done
//       };
//     }
//   };
// };

// console.log(typeof obj[Symbol.iterator]);

// for (const val of obj) {
//   console.log(val);
// }

// 什么生成器

// Generator 特殊函数  yield表达式  ，  *

// 执行函数时，并不会执行函数体
// function* fn() {
//   console.log("正常函数我会执行");
//   yield 1;
//   yield 2;
//   yield 3;
//   console.log("执行完了");
// }
// const iteratorFn = fn(); //只是创建了一个iterator

// console.log(iteratorFn.next());
// console.log(iteratorFn.next());
// console.log(iteratorFn.next());
// console.log(iteratorFn.next());

// 异步迭代器

// 区别
//   同步：next() => {value:'',done:false};
//   异步：next() => promise

//

// const createAsyncIterator = items => {
//   const keys = Object.keys(items);
//   const len = keys.length;
//   let pointer = 0;
//   return {
//     next() {
//       const done = pointer >= len;
//       const value = !done ? items[keys[pointer++]] : undefined;
//       return Promise.resolve({
//         value,
//         done
//       });
//     }
//   };
// };
// const asyncI = createAsyncIterator([1, 2, 3]);
// asyncI.next().then(res => {
//   console.log(res);
// });
// asyncI.next().then(res => {
//   console.log(res);
// });
// asyncI.next().then(res => {
//   console.log(res);
// });
// asyncI.next().then(res => {
//   console.log(res);
// });

// for...await...of
// const asyncItems = {
//   name: "yideng",
//   age: 4,
//   [Symbol.asyncIterator]() {
//     const me = this;
//     const keys = Object.keys(me);
//     const len = keys.length;
//     let pointer = 0;
//     return {
//       next() {
//         const done = pointer >= len;
//         const value = !done ? me[keys[pointer++]] : undefined;
//         return new Promise(resolve => {
//           setTimeout(() => {
//             resolve({ value, done });
//           }, 1000);
//         });
//       }
//     };
//   }
// };
// async function fn() {
//   for await (const val of asyncItems) {
//     console.log(val);
//   }
// }
// fn();

// 异步生成器
// async function* fn() {
//   yield await Promise.resolve(1);
//   yield await Promise.resolve(2);
//   yield await Promise.resolve(3);
// }
// const asyncI = fn();
// async function fn1() {
//   for await (const val of asyncI) {
//     console.log(val);
//   }
// }
// fn1();

// 总结：

// ES9
// Promise.finally();

// function fn() {
//   return new Promise((resolve, reject) => {
//     // resolve("value");
//     reject("错误信息");
//   });
// }
// fn()
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err);
//   }).finally(()=>{
//     console.log("我都会执行");
//   });

// Rest/Spread

// function fn(a, b, ...c) {
//   console.log(a, b, c);
// }
// fn(1, 2, 3, 4, 5);

// // 扩展运算符 ... 仅用于数组
// const arr = [1, 2, 3];
// console.log([11, 22, ...arr]);

//
// const obj = {
//   name: "yidneg",
//   age: 4,
//   info: {
//     phone: 188888
//   }
// };
// const { name, ...infos } = obj;
// console.log(name, infos);

// function fn({ name, ...infos }) {
//   console.log(name, infos);
// }
// fn(obj);

// const obj2 = { ...obj, address: "beijing" };
// console.log(obj2);

// 对象浅拷贝
// const objClone = { ...obj };
// objClone.name = "www";
// objClone.info.phone = 10;
// console.log(objClone.info.phone);
// console.log(obj.info.phone);

// 正则表达式
// 需求：YYYY-MM-DD 年/月日解析到数组中
/* const dateStr = "2030-08-01";
const reg = /([0-9]{4})-([0-9]{2})-([0-9]{2})/;
const res = reg.exec(dateStr);
console.log(res[1], res[2], res[3]);

// ES9 ?<name>
const reg1 = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
const res1 = reg1.exec(dateStr);
console.log(res1.groups.year, res1.groups.month, res1.groups.day);

//replace  08-01-2030
const newDate = dateStr.replace(reg1, `$<month>-$<day>-$<year>`);
console.log(newDate); */

// 反向断言

// 先行断言，

// 获取货币符号
/* const str = "$123";

// 先行断言  （?=pattern）
const reg = /\D(?=\d+)/;
const result = reg.exec(str);
console.log(result[0]);

//后行断言 反向断言 (?<=pattren)
const reg1 = /(?<=\D)\d+/;
console.log(reg1.exec(str)[0]); */

// dotAll方式
// .

//
// const str = "yi\ndeng";
// console.log(/yi.deng/.test(str)); //false
// console.log(/yi.deng/s.test(str)); // true

// 汉子匹配
// const oldReg = /[\u4e00-\u9fa5]/; // 繁琐不好记

// const str = "京程一灯";

// const newReg = /\p{Script=Han}/u;

// console.log(newReg.test(str)); // true

// 肺转移序列的模板字符串

// \u unicode转义  \x 十六进制转义

// window的路径  C:\uuu\xxx\1

// String.raw

// ES10  bigInt
// Flat() flatMap()

/* const arr = [1, 2, 3, [4, 5]];
const arr1 = [1, 2, 3, [4, 5, [6, 7, [8, 9, [10, 11]]]]];
// 指定遍历深度
// console.log(arr1.flat(3));

// 指定任意深度
console.log(arr1.flat(Infinity));

// 去除数组的空项
const arr2 = [1, 2, , , , , 3];
console.log(arr2.flat()); */

// const arr1 = [1, 2, 3, 4];
// console.log(arr1.map(x => [x * 2])); //[[2],[4],[6],[8]];
// console.log(arr1.flatMap(x => [x * 2])); //[2, 4, 6, 8]
// console.log(arr1.flatMap(x => [[x * 2]])); //[2, 4, 6, 8]

// Object.fromEntries(); =>对象自身可枚举属性的价值对数组，  for...in
/* const map = new Map([
  ["name", "一灯"],
  ["address", "beijing"]
]);
console.log(Object.fromEntries(map)); //{name: "一灯", address: "beijing"} */

// Object.entries

// String.prototype.matchAll  返回包含所有匹配正则表达式及分组捕获迭代器

// const str = "yideng xuetang xuetang";
// const reg = /xue*/g;
// // 之前
// while ((matches = reg.exec(str)) !== null) {
//   console.log(`${matches[0]}-${reg.lastIndex}`);
//   //xue-10
//   //xue-18
// }
// // 现在
// let matches2 = str.matchAll(reg);
// console.log(matches2);
// // for (const res of matches2) {
// //   console.log(res);
// // }
// console.log(matches2.next());
// console.log(matches2.next());
// console.log(matches2.next());

//
// const reg = /y(i)(deng(\d?))/g;
// const str = "yideng66yideng66";
// console.log(str.match(reg));

// const arr = [...str.matchAll(reg)];
// console.log(arr);

// trimStart() trimEnd()

//Symbol.prototype.description
/* const sym = Symbol("描述");

console.log(String(sym));
console.log(sym.description); */

// Catch 参数可以省略

/* // 之前
try {
} catch (e) {
  console.log(e);
}

//现在
try {
  
} catch {
  
} */

// 行分隔符和段分隔符
// JSON.parse  JSON是ECMAScript一个子集，
// JSON=》可以包含行分隔符和段分隔符

// 草案 解决一个问题
// const json = '{"name":"yidneg\nxuetang"}';
// console.log(json);
// JSON.parse(json);

// 更加友好的JSON.stringify
// 字符U+D800 到U+DFFF处理
// U+2028 行分隔符  U+2029 段分隔符

// JOSN

//
// JSON.stringify("\UDEAD"); // JSON转义序列'"\\UDEAD"'

// Array.prototype.sort();
// 小于10  插入排序   快速排序不稳定的排序  O(n^2)

// 新的v8 TimSort()  O(nlogn)

//v8源码

//
// const arr = [
//   { name: "w", age: 18 },
//   { name: "yideng", age: 4 },
//   { name: "www", age: 4 }
// ];
// arr.sort((a, b) => a.age - b.age);
// console.log(arr);
// //非稳定
// [
//   { name: "www", age: 4 },
//   { name: "yideng", age: 4 },
//   { name: "w", age: 18 }
// ][
//   // 稳定
//   ({ name: "yideng", age: 4 }, { name: "www", age: 4 }, { name: "w", age: 18 })
// ];

// 新的Function.toString()
// Object.prototype.toString();
// 标准化，返回精确字符
// function /*注释*/ foo /*注释*/() {}
// // 之前
// function foo() {}
// // 现在
// console.log(foo.toString()); //function /*注释*/ foo /*注释*/() {}

// BigInt 任意精度整数 第七种基本数据类型

// 2 ^ 53;
console.log(Number.MAX_SAFE_INTEGER); //9007199254740991

let num = 1n;
let num2 = 10n;
const bigIntNum = BigInt(12);
console.log(bigIntNum);
// console.log("类型", typeof num);
// console.log("类型比较", num == 1); // true
// console.log("运算:", num - 1); //-9n

// 标准化globalThis 对象  在任何平台访问全局属性

// const getGlobal = function() {
//   if (typeof self != "unefined") {
//     return self;
//   }
//   if (typeof window != "unefined") {
//     return window;
//   }
//   if (typeof global != "unefined") {
//     return global;
//   }
//   throw new Error();
// };

// console.log(globalThis);

// ES7 includes 2**2
// ES8 异步操作，Object,String 能力上做了进一步增强
// ES9 解决遍历中的异步，异步归一的操做问题等，提升正则表达式处理能力

// ES10  没有大幅改动，bigInt,globalThis 能力增强  JSON，数组，字符串，对象

// 技术动态
// 技术

