// 有 n 个城市，其中一些彼此相连，另一些没有相连。如果城市 a 与城市 b 直接相连，且城市 b 与城市 c 直接相连，那么城市 a 与城市 c 间接相连。

// 省份 是一组直接或间接相连的城市，组内不含其他没有相连的城市。

// 给你一个 n x n 的矩阵 isConnected ，其中 isConnected[i][j] = 1 表示第 i 个城市和第 j 个城市直接相连，而 isConnected[i][j] = 0 表示二者不直接相连。

// 返回矩阵中 省份 的数量。

//  

// 示例 1：


// 输入：isConnected = [[1,1,0],[1,1,0],[0,0,1]]
// 输出：2
// 示例 2：


// 输入：isConnected = [[1,0,0],[0,1,0],[0,0,1]]
// 输出：3
//  

// 提示：

// 1 <= n <= 200
// n == isConnected.length
// n == isConnected[i].length
// isConnected[i][j] 为 1 或 0
// isConnected[i][i] == 1
// isConnected[i][j] == isConnected[j][i]

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/number-of-provinces
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function(isConnected) {
    const provinces = isConnected.length;
    const visited = new Set();
    let circles = 0;
    for (let i = 0; i < provinces; i++) {
        if (!visited.has(i)) {
            dfs(isConnected, visited, provinces, i);
            circles++;
        }
    }
    return circles;
};

const dfs = (isConnected, visited, provinces, i) => {
    for (let j = 0; j < provinces; j++) {
        if (isConnected[i][j] == 1 && !visited.has(j)) {
            visited.add(j);
            dfs(isConnected, visited, provinces, j);
        }
    }
};

// 作者：LeetCode-Solution
// 链接：https://leetcode-cn.com/problems/number-of-provinces/solution/sheng-fen-shu-liang-by-leetcode-solution-eyk0/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。s