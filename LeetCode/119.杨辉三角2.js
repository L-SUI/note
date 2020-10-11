// 给定一个非负索引 k，其中 k ≤ 33，返回杨辉三角的第 k 行。

// 在杨辉三角中，每个数是它左上方和右上方的数的和。

// 示例:

// 输入: 3
// 输出: [1,3,3,1]
// 进阶：

// 你可以优化你的算法到 O(k) 空间复杂度吗？

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/pascals-triangle-ii
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
    let res ;
    let add = (num,prev)=>{
        if(num>rowIndex+1) return;
        let arr = new Array(num)
        arr[0] = arr[arr.length-1] = 1;
        if(num>2){
            for(let i =1;i<arr.length-1;i++){
                arr[i] = prev[i]+prev[i-1]
            }
        }
        res = arr;
        add(++num,arr)
    }
    add(1,null)
    return res;
};

/** 进阶
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
    let res = new Array(rowIndex);
    let add = (num)=>{
        if(num>rowIndex) return;
        res[0] = res[num] = 1;
        if(num>1){
            for(let i =num-1;i>0;i--){
                res[i] = res[i]+res[i-1]
            }
        }
        add(++num)
    }
    add(0)
    return res;
};
console.log(getRow(3))