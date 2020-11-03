function curry(fn, args) {
    var length = fn.length;
    var args = args || [];
    return function() {
      newArgs = args.concat(Array.prototype.slice.call(arguments));
      if (newArgs.length < length) {
        return curry.call(this, fn, newArgs);
      } else {
        return fn.apply(this, newArgs);
      }
    };
  }
  
  function multiFn(a, b, c) {
    return a * b * c;
  }
  
  var multi = curry(multiFn);
  
  console.log(multi(2)(3)(4))
  console.log(multi(2, 3, 4))
  console.log(multi(2)(3, 4))
  console.log(multi(2, 3)(4))