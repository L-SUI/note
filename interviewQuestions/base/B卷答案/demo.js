const obj = {
  test: {
    a: 2
  },
  arr: [],
  fn: function() {
    console.log("clone function");
  }
};
function clone(target) {
    let cloneTarget = {};
    for (const key in target) {
        cloneTarget[key] = target[key];
    }
    return cloneTarget;
};
const obj2 = clone(obj);
console.log("无法克隆函数体",obj2.fn);
