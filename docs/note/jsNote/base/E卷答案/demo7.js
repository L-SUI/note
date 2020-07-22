let a = 0;
let yideng = async () => {
  console.log('init');
  a = a + (await 10);
  console.log(a);
};
yideng();
console.log(++a);

// function* genDemo() {
//   console.log('第一段执行逻辑');
//   yield 'Generator2 ';
//   console.log('第二段执行逻辑');
//   yield 'Generator2 ';
//   console.log('第三段执行逻辑');
//   yield 'Generator2 ';
//   console.log('执行完毕');
//   return 'Generator2';
// }
// console.log('main 0');
// let gen = genDemo();
// console.log(gen.next().value);
// console.log('main 1');

// console.log('--------------');

// console.log(gen.next().value);
// console.log('main 2');
// console.log(gen.next().value);
// console.log('main 3');
// console.log(gen.next().value);
// console.log('main 4');

// 1.不是一次性执行完的 全局代码交替执行。可以暂停 恢复
// 2.协程 比线程更轻量。跑在线程上而且一个线程可以存在多个协程
// 3.线程上同时只执行一个协程。A -> B 控制权 A暂停了⏸ A打开了B协程。 A就是B的父协程
// 4.协程不受操作系统管理 程序保存。 gen.next() 引擎会保存父协程调用栈信息

// async function async1() {
//   console.log(1);
//   await async2();
//   console.log(3);
// }
// async function async2() {
//   console.log(2);
// }
// async1();
// console.log(4);
