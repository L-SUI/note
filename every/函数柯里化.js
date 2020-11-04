// function curry(fn, args) {
//     var length = fn.length;
//     var args = args || [];
//     return function() {
//       newArgs = args.concat(Array.prototype.slice.call(arguments));
//       if (newArgs.length < length) {
//         return curry.call(this, fn, newArgs);
//       } else {
//         return fn.apply(this, newArgs);
//       }
//     };
//   }

//   function multiFn(a, b, c) {
//     return a * b * c;
//   }

//   var multi = curry(multiFn);

//   console.log(multi(2)(3)(4))
//   console.log(multi(2, 3, 4))
//   console.log(multi(2)(3, 4))
//   console.log(multi(2, 3)(4))

//ES6
const curry = (fn, arr = []) => (...args) =>
    (arg => (arg.length === fn.length ? fn(...arg) : curry(fn, arg)))([
        ...arr,
        ...args
    ]);

let curryTest = curry((a, b, c, d) => a + b + c + d);
console.log(curryTest(1, 2, 3)(4)); //返回10
console.log(curryTest(1, 2)(4)(3)); //返回10
console.log(curryTest(1, 2)(3, 4)); //返回10