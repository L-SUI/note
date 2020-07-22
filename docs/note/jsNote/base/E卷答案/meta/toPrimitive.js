// var yideng = 1; 元编程
var yideng = {
  [Symbol.toPrimitive]: ((i) => () => ++i)(0),
};
if (yideng == 1 && yideng == 2 && yideng == 3) {
  console.log('京程一灯');
}
