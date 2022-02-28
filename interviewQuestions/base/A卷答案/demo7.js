var a = 'abc';
// var b = Array.from(a);
// var b = [...new Set(a)];
var slice = Array.prototype.slice;
//call
var args = slice.apply('abc');
console.log(args);
