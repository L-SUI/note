Object.prototype.a = 'a';
Function.prototype.a = 'a1';
function Person() {}
var yideng = new Person();
// console.log(Person.a);
// console.log(yideng.a);
// console.log((1).a);
console.log(
  yideng.__proto__.__proto__.constructor.constructor.constructor.constructor
);
