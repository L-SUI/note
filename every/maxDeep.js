// 实现maxDeep()

// maxDeep([1,2,3,4,5]) // 1

// maxDeep([1,[2,3],4,[5,6],[7]]) // 2

// maxDeep([1,[2,[3],4],[5,6],[7]]) // 3

/**
 * 
 * @param {*} arr 
 * return num Number
 */
function maxDeep(arr){
    let res = 0;
    const dfs = (arr,num)=>{
        res = Math.max(res,num+1)
        arr.forEach(item=>{
            if(item instanceof Array){
                dfs(item,num+1)
            }
        })
    }
    dfs(arr,res)
    return res;
}


console.log(maxDeep([1,2,3,4,5])) // 1

console.log(maxDeep([1,[2,3],4,[5,6],[7]])) // 2

console.log(maxDeep([1,[2,[3],4],[5,6],[7]])) // 3