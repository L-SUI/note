class Car {
  static color = 1;
  constructor(price) {
    this.price = price;
  }
  test() {
    console.log(this.price);
  }
}
class Cruze extends Car {
  constructor(price) {
    super(price);
  }
}
console.log(Cruze.color);
const cruze = new Cruze(3000);
cruze.test();
