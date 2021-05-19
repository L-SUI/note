
// 给你一个整数数组 nums ，请你找出数组中乘积最大的连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。

// 示例 1:

// 输入: [2,3,-2,4]
// 输出: 6
// 解释: 子数组 [2,3] 有最大乘积 6。

// 示例 2:

// 输入: [-2,0,-1]
// 输出: 0
// 解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/maximum-product-subarray
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number[]} nums
 * @return {number}
 */
 var maxProduct = function(nums) {
    if (nums.length==1) return nums[0]
    let max = nums[0]
    let ride = nums[0]
    let count = 1
    let i = 1
    while(i<nums.length) {
        ride*=nums[i]
        max = Math.max(max,ride)
        console.log(ride)
        if (i==nums.length-1) {
            ride = nums[count]
            max = Math.max(max,ride)
            count++
            i=count
        }else {
            i++
        }
    }
    return max
};
// console.log(maxProduct([2,3,-2,4]))
// console.log(maxProduct([0,2]))
// console.log(maxProduct([2,-1,1,1]))

var maxProduct = function(nums) {
    let max = min = res = nums.shift();
    for (let i = 0; i < nums.length; i++) {
        let tmp = min,curr = nums[i];
        min = Math.min(curr, Math.min(max * curr, min * curr)); 
        max = Math.max(curr, Math.max(max * curr, tmp * curr));
        res = Math.max(res, max);
    }
    return res;
};


console.log(maxProduct([2,3,-2,4,5]))
// console.log(maxProduct([0,2]))
// console.log(maxProduct([2,-1,1,1]))
