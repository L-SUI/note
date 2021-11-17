// js判断一个对象是数组的方式


console.log(Array.isArray([]))
console.log(Object.prototype.toString.call([]).indexOf('Array')>-1)
console.log([] instanceof Array)
console.log([].constructor == Array)
