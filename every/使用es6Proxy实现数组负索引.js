// 手写用 ES6proxy 如何实现负索引数组， arr[-1] 的访问

let arr = [3, 5, 6, 1, 2, 7, 20]
let proxy = new Proxy(arr, {
    get(value, index) {
        if (index < 0) {
            index = value.length + index * 1
        }
        return value[index]
    }
})


const negativeArray = els =>
    new Proxy(els, {
        get: (target, propKey, receiver) =>
            Reflect.get(
                target,
                +propKey < 0 ? String(target.length + +propKey) : propKey,
                receiver
            )
    });
console.log(proxy[-1])
console.log(proxy[-2])
console.log(proxy[4])
