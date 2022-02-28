// class Car {
//     static color = 1;
//     constructor(price) {
//         this.price = price;
//     }
//     test() {
//         console.log(this.price);
//     }
// }
// class Cruze extends Car {
//     constructor(price) {
//         super(price)
//     }
// }
// console.log(Cruze.color);
// const cruze = new Cruze(3000);
// cruze.test();
'use strict';
function Car(price) {
  this.price = price;
}
Car.color = 'red';
Car.prototype.test = function () {
  console.log(this.price);
};

function Cruze(price) {
  Car.call(this, price);
}
var staticKeys = Object.entries(Car);
for (var i = 0; i < staticKeys.length; i++) {
  var key = staticKeys[i][0];
  var value = staticKeys[i][1];
  Cruze[key] = value;
}
// Cruze.prototype = Car.prototype; ❌
// Cruze.prototype = new Car(); ❌ 构造函数
// 不值钱了 ✔
// var _proto = Object.create(Car.prototype);
// _proto.constructor = Cruze;
Cruze.prototype = Object.create(Car.prototype, {
  constructor: {
    value: Cruze,
    writable: false,
  },
  test: {
    value: function () {},
  },
});
// Cruze.prototype.constructor = function () { };
// Cruze.prototype = _proto;
console.log(Cruze['color']);
var cruze = new Cruze('3000');
cruze.test();
console.log(cruze);
