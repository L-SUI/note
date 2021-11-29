// 给你一个整数数组 nums 和一个整数 x 。每一次操作时，你应当移除数组 nums 最左边或最右边的元素，然后从 x 中减去该元素的值。请注意，需要 修改 数组以供接下来的操作使用。

// 如果可以将 x 恰好 减到 0 ，返回 最小操作数 ；否则，返回 -1 。

//  

// 示例 1：

// 输入：nums = [1,1,4,2,3], x = 5
// 输出：2
// 解释：最佳解决方案是移除后两个元素，将 x 减到 0 。
// 示例 2：

// 输入：nums = [5,6,7,8,9], x = 4
// 输出：-1
// 示例 3：

// 输入：nums = [3,2,20,1,1,3], x = 10
// 输出：5
// 解释：最佳解决方案是移除后三个元素和前两个元素（总共 5 次操作），将 x 减到 0 。
//  

// 提示：

// 1 <= nums.length <= 105
// 1 <= nums[i] <= 104
// 1 <= x <= 109

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/minimum-operations-to-reduce-x-to-zero
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




/**
 * @param {number[]} nums
 * @param {number} x
 * @return {number}
 */
 var minOperations = function(nums, x) {
    const len = nums.length
    const total = nums.reduce((prev,cur) => prev+cur,0)
    if(total<x) return -1 //边界，如果总和都不达 x, 那就直接跑路吧
    let ret = Infinity //最少的操作数
    let sum = 0
    let l =r =0
    while(r<len){
        sum+=nums[r]
        while(total-sum<x){
            // 外面的值已经小于 x 了，所以需要收缩窗口
            sum-=nums[l]
            l++
        }
        if(total-sum === x){
            // 符合要求
            ret= Math.min(ret,len-(r-l+1))
        }
        r++
    }
    return ret=== Infinity?-1:ret
};
