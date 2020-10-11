// 给定一个非负整数 numRows，生成杨辉三角的前 numRows 行。

// 在杨辉三角中，每个数是它左上方和右上方的数的和。

// 示例:

// 输入: 5
// 输出:
// [
//      [1],
//     [1,1],
//    [1,2,1],
//   [1,3,3,1],
//  [1,4,6,4,1]
// ]

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/pascals-triangle
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
    let res = [];
    let add = (num,prev)=>{
        if(num>numRows) return;
        let arr = new Array(num)
        arr[0] = arr[arr.length-1] = 1;
        if(num>2){
            for(let i =1;i<arr.length-1;i++){
                arr[i] = prev[i]+prev[i-1]
            }
        }
        res.push(arr)
        add(++num,arr)
    }
    add(1,null)
    return res;
};


var generate = function(numRows) {
    let res = [];
    for(let i = 0; i < numRows; i++){
        let row = [];
        row[0] = 1;
        row[i] = 1;
        if(i > 1){
            for(let j = 1; j < i; j++){
                row[j] = res[i - 1][j - 1] + res[i - 1][j];
            }
        }
        res.push(row);
    }
    return res;
};
