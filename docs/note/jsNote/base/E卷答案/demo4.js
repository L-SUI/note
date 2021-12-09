Object.prototype.a = 'a';
Function.prototype.a = 'a1';
function Person() {}
var memory = new Person();
// console.log(Person.a);
// console.log(memory.a);
// console.log((1).a);
console.log(
  memory.__proto__.__proto__.constructor.constructor.constructor.constructor
);
