# 手写一个map和reduce

> arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])

- callback

执行数组中每个值 (如果没有提供 initialValue则第一个值除外)的函数，包含四个参数：

    accumulator
    累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue（见于下方）。
    currentValue
    数组中正在处理的元素。
    index 可选
    数组中正在处理的当前元素的索引。 如果提供了initialValue，则起始索引号为0，否则从索引1起始。
    array可选
    调用reduce()的数组

- initialValue可选

作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。

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
        let idx = 0;
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