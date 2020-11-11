// 给定一个包含非负整数的 m x n 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

// 说明：每次只能向下或者向右移动一步。

// 示例:

// 输入:
// [
//   [1,3,1],
//   [1,5,1],
//   [4,2,1]
// ]
// 输出: 7
// 解释: 因为路径 1→3→1→1→1 的总和最小。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/minimum-path-sum
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    let m=grid.length,n=grid[0].length;
    let dp = new Array(m).fill(new Array(n))
    for(let i =grid.length-1;i>=0;i-- ){
        for(let j=grid[0].length-1;j>=0;j--){
            if(i==m-1&&j==n-1){
                dp[i][j]=grid[i][j]
            }else if(i==m-1){
                dp[i][j] = grid[i][j]+dp[i][j+1]
            }else if(j==n-1){
                dp[i][j] = grid[i][j]+dp[i+1][j]
            }else{
                dp[i][j] = Math.min(grid[i][j]+dp[i+1][j],grid[i][j]+dp[i][j+1])
            }
        }
    }
    console.log(dp)
    return dp[0][0]
};