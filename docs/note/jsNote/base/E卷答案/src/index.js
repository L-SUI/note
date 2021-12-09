function test() {
  var apple = 'memory';
  return function () {};
}
test()();
