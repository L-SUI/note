// 输入一个正整数数组，如果这个数组可以通过以下两种操作中的一种，使整个数组变
// 成单调递增或递减，则返回最终的单调序列，否则返回 -1。这两种操作分别是：
//     - 交换数组中某两个元素的值
//     - 指定数组中的某个严格子区间，将该区间进行递增或递减排序


function handle(arr){
    let i =0,len =arr.length-1;
    let sortArray = arr.slice().sort((a,b)=> a - b);
    while(i < len){
        
    }

}
console.log(handle([1,3,2,5,4,6,7,8,9]))
console.log(handle([1,3,7,6,4,8,9]))