// message时间

onmessage = function(e) {
  let arrBuffer = e.data;
  // 满足
  Atomics.wait(arrBuffer, 11, 11);
  console.log("我已经进入休眠了，不会被执行");
};
