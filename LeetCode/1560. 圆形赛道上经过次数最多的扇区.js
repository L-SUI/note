// 给你一个整数 n 和一个整数数组 rounds 。有一条圆形赛道由 n 个扇区组成，扇区编号从 1 到 n 。现将在这条赛道上举办一场马拉松比赛，该马拉松全程由 m 个阶段组成。其中，第 i 个阶段将会从扇区 rounds[i - 1] 开始，到扇区 rounds[i] 结束。举例来说，第 1 阶段从 rounds[0] 开始，到 rounds[1] 结束。

// 请你以数组形式返回经过次数最多的那几个扇区，按扇区编号 升序 排列。

// 注意，赛道按扇区编号升序逆时针形成一个圆（请参见第一个示例）。

//  

// 示例 1：



// 输入：n = 4, rounds = [1,3,1,2]
// 输出：[1,2]
// 解释：本场马拉松比赛从扇区 1 开始。经过各个扇区的次序如下所示：
// 1 --> 2 --> 3（阶段 1 结束）--> 4 --> 1（阶段 2 结束）--> 2（阶段 3 结束，即本场马拉松结束）
// 其中，扇区 1 和 2 都经过了两次，它们是经过次数最多的两个扇区。扇区 3 和 4 都只经过了一次。
// 示例 2：

// 输入：n = 2, rounds = [2,1,2,1,2,1,2,1,2]
// 输出：[2]
// 示例 3：

// 输入：n = 7, rounds = [1,3,5,7]
// 输出：[1,2,3,4,5,6,7]
//  

// 提示：

// 2 <= n <= 100
// 1 <= m <= 100
// rounds.length == m + 1
// 1 <= rounds[i] <= n
// rounds[i] != rounds[i + 1] ，其中 0 <= i < m

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/most-visited-sector-in-a-circular-track
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。





/**
 * @param {number} n
 * @param {number[]} rounds
 * @return {number[]}
 */
 var mostVisited = function(n, rounds) {
    const ret = [];
    const size = rounds.length;
    const start = rounds[0], end = rounds[size - 1];
    if (start <= end) {
        for (let i = start; i <= end; i++) {
            ret.push(i);
        }
    } else { // 由于题目要求按扇区大小排序，因此我们要将区间分成两部分
        for (let i = 1; i <= end; i++) {
            ret.push(i);
        }
        for (let i = start; i <= n; i++) {
            ret.push(i);
        }
    }
    return ret;
};