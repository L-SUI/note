// 给你一个二元数组 nums ，和一个整数 goal ，请你统计并返回有多少个和为 goal 的 非空 子数组。

// 子数组 是数组的一段连续部分。

//  

// 示例 1：

// 输入：nums = [1,0,1,0,1], goal = 2
// 输出：4
// 解释：
// 如下面黑体所示，有 4 个满足题目要求的子数组：
// [1,0,1,0,1]
// [1,0,1,0,1]
// [1,0,1,0,1]
// [1,0,1,0,1]
// 示例 2：

// 输入：nums = [0,0,0,0,0], goal = 0
// 输出：15
//  

// 提示：

// 1 <= nums.length <= 3 * 104
// nums[i] 不是 0 就是 1
// 0 <= goal <= nums.length
// 通过次数13,835提交次数27,888

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/binary-subarrays-with-sum
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




/**
 * @param {number[]} nums
 * @param {number} goal
 * @return {number}
 */
 var numSubarraysWithSum = function(nums, goal) {
    let sum = 0;
    const cnt = new Map();
    let ret = 0;
    for (const num of nums) {
        cnt.set(sum, (cnt.get(sum) || 0) + 1);
        sum += num;
        ret += cnt.get(sum - goal) || 0;
    }
    return ret;
};