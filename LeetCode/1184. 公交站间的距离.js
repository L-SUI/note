// 环形公交路线上有 n 个站，按次序从 0 到 n - 1 进行编号。我们已知每一对相邻公交站之间的距离，distance[i] 表示编号为 i 的车站和编号为 (i + 1) % n 的车站之间的距离。

// 环线上的公交车都可以按顺时针和逆时针的方向行驶。

// 返回乘客从出发点 start 到目的地 destination 之间的最短距离。

//  

// 示例 1：



// 输入：distance = [1,2,3,4], start = 0, destination = 1
// 输出：1
// 解释：公交站 0 和 1 之间的距离是 1 或 9，最小值是 1。
//  

// 示例 2：



// 输入：distance = [1,2,3,4], start = 0, destination = 2
// 输出：3
// 解释：公交站 0 和 2 之间的距离是 3 或 7，最小值是 3。
//  

// 示例 3：



// 输入：distance = [1,2,3,4], start = 0, destination = 3
// 输出：4
// 解释：公交站 0 和 3 之间的距离是 6 或 4，最小值是 4。
//  

// 提示：

// 1 <= n <= 10^4
// distance.length == n
// 0 <= start, destination < n
// 0 <= distance[i] <= 10^4

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/distance-between-bus-stops
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




/**
 * @param {number[]} distance
 * @param {number} start
 * @param {number} destination
 * @return {number}
 */
 var distanceBetweenBusStops = function(distance, start, destination) {
    let res = Infinity;
    const n = distance.length
    distance.unshift(0);
    // 预处理前缀和
    for(let i = 1 ; i < distance.length ; i++) distance[i] = distance[i-1] + distance[i];
    // 始终让start比destination大就进行交换，利于边界处理
    if(start>destination) [start,destination] = [destination,start];
    /**
     * distance[destination]-distance[start],distance[distance.length-1]正循环的距离
     * distance[destination]-distance[start] 逆循环的距离
     * 取最小值
     */
    return Math.min(distance[destination]-distance[start],distance[distance.length-1]-(distance[destination]-distance[start]))

};
