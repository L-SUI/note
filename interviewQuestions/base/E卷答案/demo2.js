function test() {
  var a = 'memory';
  debugger;
  return function () {
    debugger;
    // return a;
    // eval('');
  };
}
test()();
