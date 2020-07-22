// "use strict";
this.a = 20;
function go() {
  console.log(this.a);
  this.a = 30;
}
go.prototype.a = 40;
var test = {
  a: 50,
  init: function (fn) {
    fn();
    return fn;
  },
};
// console.log("实例", (new go()).a);
test.init(go);
var p = test.init(go);
p();

var num = 1;
function yideng() {
  'use strict';
  console.log(this.num++);
}
function yideng2() {
  console.log(++this.num);
}
(function () {
  'use strict';
  yideng2();
})();
yideng();

this.a = 20;
var test = {
  a: 50,
  init: () => {
    function go() {
      console.log(this.a);
    }
    go();
  },
};
test.init();
