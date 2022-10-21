async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')//第一个异步任务
}

async function async2() {
    console.log('async2')
}

console.log('script start')

setTimeout(function() {
    console.log('setTimeout')
})

async1()

new Promise(function(resolve) {
    console.log('promise1')
    resolve()//先执行的这里
    Promise.resolve(/*这里同步*/).then(function() {
        console.log('promise3')//第三个异步任务
    })
}).then(function() {
    console.log('promise2')//所以第二个
})
//微任务队列
console.log('script end')


/// 

//  实现一个带并发限制的异步调度器 Scheduler，保持最多同事运行的任务n个。
class Scheduler {
    constructor(limit) {
        this.limit = limit; //最大并发数
        this.schedulerQueue = [];
        this.schedulerCount = 0;
    }
    add(promiseCreator) {
        return new Promise(resolve => {//返回异步结果
            this.schedulerQueue.push([resolve, promiseCreator]);//因为要执行完成打印结果，所以要把resolve传进去
            this.next();// 执行
        })
    }
    next() {
        if (this.schedulerCount < this.limit && this.schedulerQueue.length) {//判断正在执行的数量
            const [resolve, promiseCreator] = this.schedulerQueue.shift();//取出最新的
            this.schedulerCount++;//增加正在执行任务数量
            Promise.resolve(promiseCreator()).then(res => {
                resolve(res);//执行完通知
                this.schedulerCount--;//执行完减少
                this.next()//执行完继续执行下一个
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
addTask(100,'5')

