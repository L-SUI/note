# 手写实现Object.create
```javascript
// 思路：将传入的对象作为原型
function create(obj) {
  if (typeof proto !== 'object' || proto === null) throw new Error('');
  const obj = {};
  obj.__proto__ = proto;
  return obj;
}
```
