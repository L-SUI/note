//作用域链是在定义的时候 执行的时候
// js是词法作用域  不是动态作用域名
function bar() {
  console.log(myName);
}
function foo() {
  var myName = '老袁';
  bar();
}
var myName = '京程一灯';
foo();
