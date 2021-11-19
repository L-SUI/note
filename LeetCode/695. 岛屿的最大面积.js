// 给你一个大小为 m x n 的二进制矩阵 grid 。

// 岛屿 是由一些相邻的 1 (代表土地) 构成的组合，这里的「相邻」要求两个 1 必须在 水平或者竖直的四个方向上 相邻。你可以假设 grid 的四个边缘都被 0（代表水）包围着。

// 岛屿的面积是岛上值为 1 的单元格的数目。

// 计算并返回 grid 中最大的岛屿面积。如果没有岛屿，则返回面积为 0 。

//  

// 示例 1：


// 输入：grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
// 输出：6
// 解释：答案不应该是 11 ，因为岛屿只能包含水平或垂直这四个方向上的 1 。
// 示例 2：

// 输入：grid = [[0,0,0,0,0,0,0,0]]
// 输出：0
//  

// 提示：

// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 50
// grid[i][j] 为 0 或 1


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/max-area-of-island
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。







/**
 * @param {number[][]} grid
 * @return {number}
 */
/**
 * @param {number[][]} grid
 * @return {number}
 */
 var maxAreaOfIsland = function(grid) {
    const row = grid.length, col = grid[0].length
    let res = 0
    const DFS = (i, j) => {
      // 下标越界返回0
      if (i < 0 || i >= row || j < 0 || j >= col) {
        return 0
      }
      // 值为0返回0
      if(grid[i][j] == 0) {return 0}
      // 访问过后置为0，防止重复访问
      grid[i][j] = 0
      // 递归计算岛屿面积
      return 1 + DFS(i, j-1) + DFS(i-1, j) + DFS(i, j+1) + DFS(i+1, j)
    }
    // 遍历二维数组
    for(let i=0; i<row; i++) {
      for(let j=0; j<col; j++) {
        if (grid[i][j] == 1) {
          res = Math.max(res, DFS(i,j))
        } else {
          continue
        }
      }
    }
    return res
  };