// 大餐 是指 恰好包含两道不同餐品 的一餐，其美味程度之和等于 2 的幂。

// 你可以搭配 任意 两道餐品做一顿大餐。

// 给你一个整数数组 deliciousness ，其中 deliciousness[i] 是第 i​​​​​​​​​​​​​​ 道餐品的美味程度，返回你可以用数组中的餐品做出的不同 大餐 的数量。结果需要对 109 + 7 取余。

// 注意，只要餐品下标不同，就可以认为是不同的餐品，即便它们的美味程度相同。

//  

// 示例 1：

// 输入：deliciousness = [1,3,5,7,9]
// 输出：4
// 解释：大餐的美味程度组合为 (1,3) 、(1,7) 、(3,5) 和 (7,9) 。
// 它们各自的美味程度之和分别为 4 、8 、8 和 16 ，都是 2 的幂。
// 示例 2：

// 输入：deliciousness = [1,1,1,3,3,3,7]
// 输出：15
// 解释：大餐的美味程度组合为 3 种 (1,1) ，9 种 (1,3) ，和 3 种 (1,7) 。
//  

// 提示：

// 1 <= deliciousness.length <= 105
// 0 <= deliciousness[i] <= 220

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/count-good-meals
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




/**
 * @param {number[]} deliciousness
 * @return {number}
 */
 var countPairs = function(deliciousness) {
    const MOD = 1000000007;
    let maxVal = 0;
    for (const val of deliciousness) {
        maxVal = Math.max(maxVal, val);
    }
    const maxSum = maxVal * 2;
    let pairs = 0;
    const map = new Map();
    const n = deliciousness.length;
    for (let i = 0; i < n; i++) {
        const val = deliciousness[i];
        for (let sum = 1; sum <= maxSum; sum <<= 1) {
            const count = map.get(sum - val) || 0;
            pairs = (pairs + count) % MOD;
        }
        map.set(val, (map.get(val) || 0) + 1);
    }
    return pairs;
};
