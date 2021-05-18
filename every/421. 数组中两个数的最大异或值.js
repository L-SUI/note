// 给你一个整数数组 nums ，返回 nums[i] XOR nums[j] 的最大运算结果，其中 0 ≤ i ≤ j < n 。

// 进阶：你可以在 O(n) 的时间解决这个问题吗？

//  

// 示例 1：

// 输入：nums = [3,10,5,25,2,8]
// 输出：28
// 解释：最大运算结果是 5 XOR 25 = 28.
// 示例 2：

// 输入：nums = [0]
// 输出：0
// 示例 3：

// 输入：nums = [2,4]
// 输出：6
// 示例 4：

// 输入：nums = [8,10,2]
// 输出：10
// 示例 5：

// 输入：nums = [14,70,53,83,49,91,36,80,92,51,66,70]
// 输出：127
//  

// 提示：

// 1 <= nums.length <= 2 * 104
// 0 <= nums[i] <= 231 - 1

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/maximum-xor-of-two-numbers-in-an-array
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。





/**
 * @param {number[]} nums
 * @return {number}
 */
 var findMaximumXOR = function(nums) {
    const HIGH_BIT = 30;
    let x = 0;
    for (let k = HIGH_BIT; k >= 0; --k) {
        const seen = new Set();
        // 将所有的 pre^k(a_j) 放入哈希表中
        for (const num of nums) {
            // 如果只想保留从最高位开始到第 k 个二进制位为止的部分
            // 只需将其右移 k 位
            seen.add(num >> k);
        }

        // 目前 x 包含从最高位开始到第 k+1 个二进制位为止的部分
        // 我们将 x 的第 k 个二进制位置为 1，即为 x = x*2+1
        const xNext = x * 2 + 1;
        let found = false;
        
        // 枚举 i
        for (const num of nums) {
            if (seen.has(xNext ^ (num >> k))) {
                found = true;
                break;
            }
        }

        if (found) {
            x = xNext;
        } else {
            // 如果没有找到满足等式的 a_i 和 a_j，那么 x 的第 k 个二进制位只能为 0
            // 即为 x = x*2
            x = xNext - 1;
        }
    }
    return x; 
};

// 作者：LeetCode-Solution
// 链接：https://leetcode-cn.com/problems/maximum-xor-of-two-numbers-in-an-array/solution/shu-zu-zhong-liang-ge-shu-de-zui-da-yi-h-n9m9/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。