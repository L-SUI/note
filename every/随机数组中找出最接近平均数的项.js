// 给定一个随机数组，类似于[1,3,4,9,19]，数组数量不定，找出最接近平均数的数字


/*
* @param {Array} num
* @return {number}
*/
function average(arr){
    arr.sort((a,b) => a - b)
    let mid = arr.reduce((a,b) => a + b)/arr.length
    let pre = Infinity;
    let res = 0;
    let len=arr.length-1,i=0;
    while(i<=len){
        let curr = Math.abs(arr[i]-mid);
        if(curr>pre) return pre;
        res = curr
        pre = arr[i]
        i++
    }
    return pre;
}

console.log(average([1,3,4,9,19]))