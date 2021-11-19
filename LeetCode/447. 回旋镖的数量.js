// 给定平面上 n 对 互不相同 的点 points ，其中 points[i] = [xi, yi] 。回旋镖 是由点 (i, j, k) 表示的元组 ，其中 i 和 j 之间的距离和 i 和 k 之间的距离相等（需要考虑元组的顺序）。

// 返回平面上所有回旋镖的数量。

//  
// 示例 1：

// 输入：points = [[0,0],[1,0],[2,0]]
// 输出：2
// 解释：两个回旋镖为 [[1,0],[0,0],[2,0]] 和 [[1,0],[2,0],[0,0]]
// 示例 2：

// 输入：points = [[1,1],[2,2],[3,3]]
// 输出：2
// 示例 3：

// 输入：points = [[1,1]]
// 输出：0
//  

// 提示：

// n == points.length
// 1 <= n <= 500
// points[i].length == 2
// -104 <= xi, yi <= 104
// 所有点都 互不相同


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/number-of-boomerangs
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



/**
 * @param {number[][]} points
 * @return {number}
 */
 var numberOfBoomerangs = function (points) {
    const maps = Array(points.length)
        .fill(0)
        .map(() => ({}));
    let count = 0;

    points.forEach((a, i) => {
        const map = maps[i];

        points.forEach((b, j) => {
            if (a !== b) {
                const dist = calcDistOf2Points(a, b);
                map[dist] = (map[dist] || 0) + 1;
            }
        });

        for (const dist in map) {
            const num = map[dist];
            if (num > 1) count += num * (num - 1);
        }
    });

    return count;

    // ******************************
    function calcDistOf2Points([x1, y1], [x2, y2]) {
        return (x1 - x2) ** 2 + (y1 - y2) ** 2;
    }
};