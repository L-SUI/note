# 手写一个map和reduce
```javascript
    Array.prototype.map = function (fn) {
        //返回一个数组
        let res = []
        let i = 0
        while (i<this.length) {
            //返回调用结果 传入三个参数 item,index,arr
            res.push(fn(this[i],i,this))
        }
        return res
    }

    Array.prototype.reduce = function (callback,accumulator) {
        const self = this
        let idx = null
        if(!accumulator) {
            accumulator = self[0]
            idx = 1
        }
        for(let i = idx; i < self.length; i ++) {
            accumulator = callback(accumulator, self[i], i, self)  
        }
        return accumulator
    }
    var a = [1,2,3,4,5]
    a.reduce((acc, cur) => {
        console.log(cur)
        return acc + cur
    })
```