// 给你一个 n * n 的网格 grid ，上面放置着一些 1 x 1 x 1 的正方体。

// 每个值 v = grid[i][j] 表示 v 个正方体叠放在对应单元格 (i, j) 上。

// 放置好正方体后，任何直接相邻的正方体都会互相粘在一起，形成一些不规则的三维形体。

// 请你返回最终这些形体的总表面积。

// 注意：每个形体的底面也需要计入表面积中。

//  

// 示例 1：


// 输入：grid = [[2]]
// 输出：10
// 示例 2：


// 输入：grid = [[1,2],[3,4]]
// 输出：34
// 示例 3：


// 输入：grid = [[1,0],[0,2]]
// 输出：16
// 示例 4：


// 输入：grid = [[1,1,1],[1,0,1],[1,1,1]]
// 输出：32
// 示例 5：


// 输入：grid = [[2,2,2],[2,1,2],[2,2,2]]
// 输出：46
//  

// 提示：

// n == grid.length
// n == grid[i].length
// 1 <= n <= 50
// 0 <= grid[i][j] <= 50

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/surface-area-of-3d-shapes
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



/**
 * @param {number[][]} grid
 * @return {number}
 */
 var surfaceArea = function(grid) {
    const dr = [0, 1, 0, -1];
    const dc = [1, 0, -1, 0];

    const N = grid.length;
    let ans = 0;

    for (let r = 0; r < N; ++r) {
        for (let c = 0; c < N; ++c) {
            if (grid[r][c] > 0) {
                ans += 2;
                for (let k = 0; k < 4; ++k) {
                    const nr = r + dr[k];
                    const nc = c + dc[k];
                    let nv = 0;
                    if (0 <= nr && nr < N && 0 <= nc && nc < N) {
                        nv = grid[nr][nc];
                    }

                    ans += Math.max(grid[r][c] - nv, 0);
                }
            }
        }
    }
    
    return ans;
};