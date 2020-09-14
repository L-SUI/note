//  实现一个带并发限制的异步调度器 Scheduler，保持最多同事运行的任务n个。
class Scheduler {
    constructor(limit) {
        this.limit = limit; //最大并发数
        this.schedulerQueue = [];
        this.schedulerCount = 0;
    }
    add(promiseCreator) {
        return new Promise(resolve => {
            this.schedulerQueue.push([resolve, promiseCreator]);
            this.exec();
        })
    }
    exec() {
        if (this.schedulerCount < this.limit && this.schedulerQueue.length) {
            const [resolve, promiseCreator] = this.schedulerQueue.shift();
            this.schedulerCount++;
            Promise.resolve(promiseCreator()).then(res => {
                resolve(res);
                this.schedulerCount--;
                this.exec()
            })
        }
    }
}

const timeout = time => new Promise((resolve, reject) =>{
    setTimeout(resolve,time)
})
const scheduler = new Scheduler(2)

const addTask = (time,order) => {
    scheduler.add(()=>timeout(time)).then(()=>{console.log(order)})
}
addTask(1000,'1')
addTask(500,'2')
addTask(300,'3')
addTask(400,'4')

// 补充代码 
function repeat(func, times, wait){
    return function (str){
        recursion(func, times, wait,0)
        function recursion (func,times,wait,num) {
            func(str)
            if (num<times) {
                setTimeout(()=>{
                    recursion(func, times, wait,num+1)
                },wait)
            }
        }
    }
} //实现打印4次，每次间隔 3000ms 
const repeatFun = repeat(console.log, 4, 3000)
repeatFun('Hello World')



// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// const subFlow = createFlow([() => delay(1000).then(() => log("c"))]);

// createFlow([
//     () => log("a"),
//     () => log("b"),
//     subFlow,
//     [() => delay(1000).then(() => log("d")), () => log("e")],
// ]).run(() => {
//     console.log("done");
// });

// // 并行改串行 a,b,延迟1秒,c,延迟1秒,d,e, done 的顺序打印

// const createFlow = (effect = []) => {

// }