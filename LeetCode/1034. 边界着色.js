// 给你一个大小为 m x n 的整数矩阵 grid ，表示一个网格。另给你三个整数 row、col 和 color 。网格中的每个值表示该位置处的网格块的颜色。

// 两个网格块属于同一 连通分量 需满足下述全部条件：

// 两个网格块颜色相同
// 在上、下、左、右任意一个方向上相邻
// 连通分量的边界 是指连通分量中满足下述条件之一的所有网格块：

// 在上、下、左、右四个方向上与不属于同一连通分量的网格块相邻
// 在网格的边界上（第一行/列或最后一行/列）
// 请你使用指定颜色 color 为所有包含网格块 grid[row][col] 的 连通分量的边界 进行着色，并返回最终的网格 grid 。

//  

// 示例 1：

// 输入：grid = [[1,1],[1,2]], row = 0, col = 0, color = 3
// 输出：[[3,3],[3,2]]
// 示例 2：

// 输入：grid = [[1,2,2],[2,3,2]], row = 0, col = 1, color = 3
// 输出：[[1,3,3],[2,3,3]]
// 示例 3：

// 输入：grid = [[1,1,1],[1,1,1],[1,1,1]], row = 1, col = 1, color = 2
// 输出：[[2,2,2],[2,1,2],[2,2,2]]
//  

// 提示：

// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 50
// 1 <= grid[i][j], color <= 1000
// 0 <= row < m
// 0 <= col < n


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/coloring-a-border
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




/**
 * @param {number[][]} grid
 * @param {number} row
 * @param {number} col
 * @param {number} color
 * @return {number[][]}
 */
 var colorBorder = function(grid, row, col, color) {
    const m = grid.length, n = grid[0].length;
    const visited = new Array(m).fill(0).map(() => new Array(n).fill(0));
    const borders = [];
    const originalColor = grid[row][col];
    const direc = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    const q = [];
    q.push([row, col]);
    visited[row][col] = true;
    while (q.length) {
        const node = q.pop();
        const x = node[0], y = node[1];

        let isBorder = false;
        for (let i = 0; i < 4; i++) {
            const nx = direc[i][0] + x, ny = direc[i][1] + y;
            if (!(nx >= 0 && nx < m && ny >= 0 && ny < n && grid[nx][ny] === originalColor)) {
                isBorder = true;
            } else if (!visited[nx][ny]) {
                visited[nx][ny] = true;
                q.push([nx, ny]);
            }         
        }
        if (isBorder) {
            borders.push([x, y]);
        }
    }
    for (let i = 0; i < borders.length; i++) {
        const x = borders[i][0], y = borders[i][1];
        grid[x][y] = color;
    }
    return grid;
};