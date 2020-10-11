// 给定一个整数数组和一个整数 k，你需要在数组里找到不同的 k-diff 数对。这里将 k-diff 数对定义为一个整数对 (i, j)，其中 i 和 j 都是数组中的数字，且两数之差的绝对值是 k 。

//  

// 示例 1：

// 输入：[3, 1, 4, 1, 5], k = 2
// 输出：2
// 解释：数组中有两个 2-diff 数对, (1, 3) 和 (3, 5)。
// 尽管数组中有两个1，但我们只应返回不同的数对的数量。
// 示例 2：

// 输入：[1, 2, 3, 4, 5], k = 1
// 输出：4
// 解释：数组中有四个 1-diff 数对, (1, 2), (2, 3), (3, 4) 和 (4, 5)。
// 示例 3：

// 输入：[1, 3, 1, 5, 4], k = 0
// 输出：1
// 解释：数组中只有一个 0-diff 数对，(1, 1)。
// 示例 4：

// 输入：nums = [1,2,4,4,3,3,0,9,2,3], k = 3
// 输出：2
// 示例 5：

// 输入：nums = [-1,-2,-3], k = 1
// 输出：2
//  

// 提示：

// 1 <= nums.length <= 104
// -107 <= nums[i] <= 107
// 0 <= k <= 107

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/k-diff-pairs-in-an-array
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findPairs = function(nums, k) {
    if(k < 0) return 0;
    let obj = {}, count = 0;
    for(let i = 0; i < nums.length; i++){
        if(obj[nums[i]]) {
            if(k === 0 && obj[nums[i]] === 1) count++;//k等于0时，只有第一次出现相同时count加1。
            obj[nums[i]]++;//用于判断是否第一次出现相同。
            continue;//k不等于0时，相同数无论是否出现k-diff对，直接跳过。
        }
        obj[nums[i]] = 1;
        if(k !== 0){//k不等0时判断之前是否有出现满足k-diff对。
            if(obj[nums[i] + k]) count++;
            if(obj[nums[i] - k]) count++;
        }
    }
    return count;
};

