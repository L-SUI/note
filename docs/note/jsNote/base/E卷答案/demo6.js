// 开启尾递归调用优化
// 元编程：拦截并定义基本语言操作的自定义行为
// let handler = {
//   get: function (target, name) {
//     return name in target ? target[name] : 42;
//   },
//   set: function (target, name) {
//     target[name] = 30;
//     // Reflect.set()
//   },
// };

// let p = new Proxy({}, handler);
// p.a = 1;
// console.log(p.a, p.b); // 1, 42

const negativeArray = (els) =>
  new Proxy(els, {
    get: (target, propKey, receiver) =>
      Reflect.get(
        target,
        +propKey < 0 ? String(target.length + +propKey) : propKey,
        receiver
      ),
  });
const unicorn = negativeArray(['京', '程', '一', '灯']);
console.log(unicorn[-1]);
