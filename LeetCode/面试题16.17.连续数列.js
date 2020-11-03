// 给定一个整数数组，找出总和最大的连续数列，并返回总和。

// 示例：

// 输入： [-2,1,-3,4,-1,2,1,-5,4]
// 输出： 6
// 解释： 连续子数组 [4,-1,2,1] 的和最大，为 6。
// 进阶：

// 如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的分治法求解。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/contiguous-sequence-lcci
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let sum = 0
    let i=0;
    let res = nums[0];
    while(i<nums.length){
        if(sum>0){
            sum+=nums[i]
        }else{
            sum = nums[i]
        }
        res = Math.max(res,sum)
        i++
    }
    return res
};