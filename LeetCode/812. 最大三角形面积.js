// 给定包含多个点的集合，从其中取三个点组成三角形，返回能组成的最大三角形的面积。

// 示例:
// 输入: points = [[0,0],[0,1],[1,0],[0,2],[2,0]]
// 输出: 2
// 解释: 
// 这五个点如下图所示。组成的橙色三角形是最大的，面积为2。


// 注意:

// 3 <= points.length <= 50.
// 不存在重复的点。
//  -50 <= points[i][j] <= 50.
// 结果误差值在 10^-6 以内都认为是正确答案。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/largest-triangle-area
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



/**
 * @param {number[][]} points
 * @return {number}
 */
/**
 * @param {number[][]} points
 * @return {number}
 */
 var largestTriangleArea = function(points) {
    let number = -1;
    for(let i of points)
        for(let j of points)
            for(let k of points)
                number = Math.max(number,(i[0]*j[1] + j[0]*k[1] + k[0]*i[1] - (i[1]*j[0] + j[1]*k[0] + k[1]*i[0]))/2);
    return number;
};
