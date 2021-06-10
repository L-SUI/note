// 编写一种算法，若M × N矩阵中某个元素为0，则将其所在的行与列清零。

//  

// 示例 1：

// 输入：
// [
//   [1,1,1],
//   [1,0,1],
//   [1,1,1]
// ]
// 输出：
// [
//   [1,0,1],
//   [0,0,0],
//   [1,0,1]
// ]
// 示例 2：

// 输入：
// [
//   [0,1,2,0],
//   [3,4,5,2],
//   [1,3,1,5]
// ]
// 输出：
// [
//   [0,0,0,0],
//   [0,4,5,0],
//   [0,3,1,0]
// ]
// 通过次数35,193提交次数56,583


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/zero-matrix-lcci
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
 var setZeroes = function(matrix) {
    const m = matrix.length, n = matrix[0].length;
    const row = new Array(m).fill(false);
    const col = new Array(n).fill(false);
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 0) {
                row[i] = col[j] = true;
            }
        }
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (row[i] || col[j]) {
                matrix[i][j] = 0;
            }
        }
    }
};