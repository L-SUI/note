function test() {
  var a = 'yideng';
  debugger;
  return function () {
    debugger;
    // return a;
    // eval('');
  };
}
test()();
