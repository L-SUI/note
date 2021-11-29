// 有 n 个城市通过一些航班连接。给你一个数组 flights ，其中 flights[i] = [fromi, toi, pricei] ，表示该航班都从城市 fromi 开始，以价格 pricei 抵达 toi。

// 现在给定所有的城市和航班，以及出发城市 src 和目的地 dst，你的任务是找到出一条最多经过 k 站中转的路线，使得从 src 到 dst 的 价格最便宜 ，并返回该价格。 如果不存在这样的路线，则输出 -1。

//  

// 示例 1：

// 输入: 
// n = 3, edges = [[0,1,100],[1,2,100],[0,2,500]]
// src = 0, dst = 2, k = 1
// 输出: 200
// 解释: 
// 城市航班图如下


// 从城市 0 到城市 2 在 1 站中转以内的最便宜价格是 200，如图中红色所示。
// 示例 2：

// 输入: 
// n = 3, edges = [[0,1,100],[1,2,100],[0,2,500]]
// src = 0, dst = 2, k = 0
// 输出: 500
// 解释: 
// 城市航班图如下


// 从城市 0 到城市 2 在 0 站中转以内的最便宜价格是 500，如图中蓝色所示。
//  

// 提示：

// 1 <= n <= 100
// 0 <= flights.length <= (n * (n - 1) / 2)
// flights[i].length == 3
// 0 <= fromi, toi < n
// fromi != toi
// 1 <= pricei <= 104
// 航班没有重复，且不存在自环
// 0 <= src, dst, k < n
// src != dst


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/cheapest-flights-within-k-stops
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
 var findCheapestPrice = function(n, flights, src, dst, k) {
    const INF = 10000 * 101 + 1;
    let f = new Array(n).fill(INF);
    f[src] = 0;
    let ans = INF;
    for (let t = 1; t <= k + 1; ++t) {
        const g = new Array(n).fill(INF);
        for (const flight of flights) {
            const j = flight[0], i = flight[1], cost = flight[2];
            g[i] = Math.min(g[i], f[j] + cost);
        }
        f = g;
        ans = Math.min(ans, f[dst]);
    }
    return ans == INF ? -1 : ans;
};
