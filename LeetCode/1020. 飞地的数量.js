// 给你一个大小为 m x n 的二进制矩阵 grid ，其中 0 表示一个海洋单元格、1 表示一个陆地单元格。

// 一次 移动 是指从一个陆地单元格走到另一个相邻（上、下、左、右）的陆地单元格或跨过 grid 的边界。

// 返回网格中 无法 在任意次数的移动中离开网格边界的陆地单元格的数量。

//  

// 示例 1：


// 输入：grid = [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]
// 输出：3
// 解释：有三个 1 被 0 包围。一个 1 没有被包围，因为它在边界上。
// 示例 2：


// 输入：grid = [[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]
// 输出：0
// 解释：所有 1 都在边界上或可以到达边界。
//  

// 提示：

// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 500
// grid[i][j] 的值为 0 或 1


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/number-of-enclaves
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




/**
 * @param {number[][]} grid
 * @return {number}
 */
 var numEnclaves = function(grid) {
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    const m = grid.length, n = grid[0].length;
    const visited = new Array(m).fill(0).map(() => new Array(n).fill(false));
    const queue = [];
    for (let i = 0; i < m; i++) {
        if (grid[i][0] === 1) {
            visited[i][0] = true;
            queue.push([i, 0]);
        }
        if (grid[i][n - 1] === 1) {
            visited[i][n - 1] = true;
            queue.push([i, n - 1]);
        }
    }
    for (let j = 1; j < n - 1; j++) {
        if (grid[0][j] === 1) {
            visited[0][j] = true;
            queue.push([0, j]);
        }
        if (grid[m - 1][j] === 1) {
            visited[m - 1][j] = true;
            queue.push([m - 1, j]);
        }
    }
    while (queue.length) {
        const cell = queue.shift();
        const currRow = cell[0], currCol = cell[1];
        for (const dir of dirs) {
            const nextRow = currRow + dir[0], nextCol = currCol + dir[1];
            if (nextRow >= 0 && nextRow < m && nextCol >= 0 && nextCol < n && grid[nextRow][nextCol] == 1 && !visited[nextRow][nextCol]) {
                visited[nextRow][nextCol] = true;
                queue.push([nextRow, nextCol]);
            }
        }
    }
    let enclaves = 0;
    for (let i = 1; i < m - 1; i++) {
        for (let j = 1; j < n - 1; j++) {
            if (grid[i][j] === 1 && !visited[i][j]) {
                enclaves++;
            }
        }
    }
    return enclaves;
};
