# 手写一个Function.bind

## 概念

`bind()`方法创建了一个新的函数，在bind被调用时，这个新的函数的this被指定为bind的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

通俗一点，bind与apply、call一样都能改变函数this指向，但是bind并不会立即执行函数，而是返回了一个绑定了this的新函数，你需要再次调用此函数才能达到最终执行。

## 特点

- 可以修改函数的this指向。
- bind返回一个绑定this的新函数
- 支持函数柯里化
- 新的函数的this无法再被修改，使用call或者apply都不可以

## 实现

```javascript
Function.prototype.bind = function (context) {
  let me = this;
  let args = Array.prototype.slice.apply(arguments,[1]);
  let F = function (){};
  F.prototype = me.prototype
  let bound = function () {
    let innerArgs = Array.prototype.slice.call(arguments);
    let finalArgs = args.concat(innerArgs)
    return me.apply(this instanceof F?this:context||this,finalArgs)
  }
  bound.prototype = new F();
  return bound;
}
```