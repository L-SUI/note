// function Yideng(name) {
//   this.name = name;
// }
// let student1 = new Yideng();
// let student2 = new Yideng();
// student1 = null;
// student2 = null;

// let YidengFactory = function (name) {
//   let student = new Yideng(name);
//   return function () {
//     console.log(student);
//   };
// };

// let p1 = YidengFactory('老袁');
// p1();
// p1 = null;
function test() {
  var apple = 'yideng';
  return function () {
    debugger;
    window.eval('');
  };
}
// test()();
// var obj = { a: 30 };
// with (obj) {
//   b = 30;
// }
// console.log(b);

// try {
// } catch {}
