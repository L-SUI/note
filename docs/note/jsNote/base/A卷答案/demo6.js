function test(m) {
  // m = { v: 5 }
  m.v = 5;
}
var m = { k: 30 };
test(m);
alert(m.v);
//值 、址
// var a = 1;
// b = a;
// b = 2;
// console.log(a);
// var a = { x: 1 };
// var b = { x: 2 }
// b.x = 3;
// console.log(a.x);
