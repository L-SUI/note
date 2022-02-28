// function memory(name) {
//   this.name = name;
// }
// let student1 = new memory();
// let student2 = new memory();
// student1 = null;
// student2 = null;

// let memoryFactory = function (name) {
//   let student = new memory(name);
//   return function () {
//     console.log(student);
//   };
// };

// let p1 = memoryFactory('老袁');
// p1();
// p1 = null;
function test() {
  var apple = 'memory';
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
