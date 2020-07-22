// 创建一个worker进程
const worker = new Worker("./worker.js");

// 新建1kb内存
const sharedBuffer = new SharedArrayBuffer(1024);

//  建视图
const intArrBuffer = new Int32Array(sharedBuffer);

for (let i = 0; i < intArrBuffer.length; i++) {
  intArrBuffer[i] = i;
}
// console.log(sharedBuffer);
//postMessage  发送的共享内存地址

worker.postMessage(intArrBuffer);
setTimeout(() => {
  // 三个参数
  // 共享内存的视图数组
  // index:视图数据位置
  // count 唤醒的worker进程数，默认Infinity
  Atomics.notify(intArrBuffer, 12, 1);
}, 3000);

worker.onmessage = function(e) {
  //   console.log(e.data);
  console.log("更改后的数据", Atomics.load(intArrBuffer, 20));
};

// 数据量大 通信效率

// 运算方法
Atomics.add(intArrBuffer,index,value);
        sub(intArrBuffer,index,value);
        and,or,xor  // 位运算
        compareExchange(intArrBuffer,12,13,33);  //