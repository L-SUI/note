// var memory = 1; 元编程
var memory = {
  [Symbol.toPrimitive]: ((i) => () => ++i)(0),
};
if (memory == 1 && memory == 2 && memory == 3) {
  console.log('京程一灯');
}
