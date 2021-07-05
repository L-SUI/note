// 斐波那契数列指的是这样一个数列：1、1、2、3、5、8、13、21、34、……在数学上，
// 斐波纳契数列以如下被以递归的方法定义：F(0)=1，F(1)=1, F(n)=F(n-1)+F(n-2)（n>2，n∈N*）
// 。请用JavaScript/typescript实现函数F, 参数是斐波那契数列的序号(从0开始)，返回值是当前序号的值


var fib = (function () {
    var instance = [1, 1];
    var fib = function (n) {
        if (n<instance.length) {
            return instance[n];
        }
        for(let i=instance.length;i<=n+1; i++){
            instance[i]=instance[i-1]+instance[i-2]
        }
        return instance[n];
    }
    return fib
})()

console.log(fib(0))
console.log(fib(10))
console.log(fib(2))
console.log(fib(1))
console.log(fib(11))
console.log(fib(3))