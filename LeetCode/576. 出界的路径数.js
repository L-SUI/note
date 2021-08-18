// 给你一个大小为 m x n 的网格和一个球。球的起始坐标为 [startRow, startColumn] 。你可以将球移到在四个方向上相邻的单元格内（可以穿过网格边界到达网格之外）。你 最多 可以移动 maxMove 次球。

// 给你五个整数 m、n、maxMove、startRow 以及 startColumn ，找出并返回可以将球移出边界的路径数量。因为答案可能非常大，返回对 109 + 7 取余 后的结果。

//  

// 示例 1：


// 输入：m = 2, n = 2, maxMove = 2, startRow = 0, startColumn = 0
// 输出：6
// 示例 2：


// 输入：m = 1, n = 3, maxMove = 3, startRow = 0, startColumn = 1
// 输出：12
//  

// 提示：

// 1 <= m, n <= 50
// 0 <= maxMove <= 50
// 0 <= startRow < m
// 0 <= startColumn < n


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/out-of-boundary-paths
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



/**
 * @param {number} m
 * @param {number} n
 * @param {number} maxMove
 * @param {number} startRow
 * @param {number} startColumn
 * @return {number}
 */
 var findPaths = function(m, n, maxMove, startRow, startColumn) {
    const MOD = 1000000007;
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    let outCounts = 0;
    let dp = new Array(m).fill(0).map(() => new Array(n).fill(0));
    dp[startRow][startColumn] = 1;
    for (let i = 0; i < maxMove; i++) {
        const dpNew = new Array(m).fill(0).map(() => new Array(n).fill(0));
        for (let j = 0; j < m; j++) {
            for (let k = 0; k < n; k++) {
                const count = dp[j][k];
                if (count > 0) {
                    for (const direction of directions) {
                        let j1 = j + direction[0], k1 = k + direction[1];
                        if (j1 >= 0 && j1 < m && k1 >= 0 && k1 < n) {
                            dpNew[j1][k1] = (dpNew[j1][k1] + count) % MOD;
                        } else {
                            outCounts = (outCounts + count) % MOD;
                        }
                    }
                }
            }
        }
        dp = dpNew;
    }
    return outCounts;
};