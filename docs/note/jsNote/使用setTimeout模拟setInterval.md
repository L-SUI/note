# 使用setTimeout模拟setInterval
```javascript
// 可避免setInterval因执行时间导致的间隔执行时间不一致
// 写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b 的时间，然后写一个 myClear，停止上面的 mySetInterVal
class MySetInterVal {
    constructor(fn, a, b){
        this.fn = fn;
        this.a = a;
        this.b = b;
        this.count = 0;
        this.timer = null;
        this.start()
    }
    start () {
        let time = this.a+this.count*this.b;
        this.timer = setTimeout(()=>{
            this.fn(time)
            this.count++
            this.start();
        },time);
    }
    myClear () {
        clearTimeout(this.timer)
        this.timer = null;
        this.count = 0;
    }
}
const mySetInterVal = new MySetInterVal((time) =>{console.log('mySetInterVal-->'+time)},1000,1000)
// setTimeout(()=>{mySetInterVal.myClear()},5000)
// setTimeout(()=>{mySetInterVal.myClear()},9000)
setTimeout(()=>{mySetInterVal.myClear()},11000)
```