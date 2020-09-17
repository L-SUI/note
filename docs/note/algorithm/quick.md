# 快速排序

```js
function quick (array) {
    if (array.length==0) return [];
    let pivot = array[0];
    let lesser = [];
    let greater = [];
    for (let i=1;i<array.length;i++) {
        if(array[i]<pivot){
            lesser.push(array[i])
        }else {
            greater.push(array[i])
        }
    }
    return quick(lesser).concat(pivot,quick(greater))
}

console.log(quick([9,3,25,4,1,47,6,8,5,10,25]))
```