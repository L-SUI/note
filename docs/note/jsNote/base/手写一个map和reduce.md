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

    Array.prototype.reduce = function (fn) {
        
    }
```