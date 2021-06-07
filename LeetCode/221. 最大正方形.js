// 在一个由 '0' 和 '1' 组成的二维矩阵内，找到只包含 '1' 的最大正方形，并返回其面积。

//  

// 示例 1：


// 输入：matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
// 输出：4
// 示例 2：


// 输入：matrix = [["0","1"],["1","0"]]
// 输出：1
// 示例 3：

// 输入：matrix = [["0"]]
// 输出：0
//  

// 提示：

// m == matrix.length
// n == matrix[i].length
// 1 <= m, n <= 300
// matrix[i][j] 为 '0' 或 '1'

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/maximal-square
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



/**
 * @param {character[][]} matrix
 * @return {number}
 */
 var maximalSquare = function(matrix) {
    if (matrix.length === 0) return 0;
    const dp = [];
    const rows = matrix.length;
    const cols = matrix[0].length;
    let max = Number.MIN_VALUE;
  
    for (let i = 0; i < rows + 1; i++) {
      if (i === 0) {
        dp[i] = Array(cols + 1).fill(0);
      } else {
        dp[i] = [0];
      }
    }
  
    for (let i = 1; i < rows + 1; i++) {
      for (let j = 1; j < cols + 1; j++) {
        if (matrix[i - 1][j - 1] === "1") {
          dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;
          max = Math.max(max, dp[i][j]);
        } else {
          dp[i][j] = 0;
        }
      }
    }
  
    return max * max;
  };
  