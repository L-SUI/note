// 给定一个整型数组，在数组中找出由三个数组成的最大乘积，并输出这个乘积。

// 示例 1:

// 输入: [1,2,3]
// 输出: 6
// 示例 2:

// 输入: [1,2,3,4]
// 输出: 24
// 注意:

// 给定的整型数组长度范围是[3,104]，数组中所有的元素范围是[-1000, 1000]。
// 输入的数组中任意三个数的乘积不会超出32位有符号整数的范围。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/maximum-product-of-three-numbers
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumProduct = function(nums) {
    let max=-Infinity,mid=-Infinity,min=-Infinity;
    let min1 = Infinity,min2=Infinity;
    let i =0;
    while (i<nums.length){
        if(nums[i]>max){
            min = mid
            mid = max
            max=nums[i]
        }else if(nums[i]>mid){
            min = mid
            mid = nums[i]
        }else if(nums[i]>min){
            min = nums[i]
        }
        if(nums[i]<min1){
            min2 = min1
            min1 = nums[i]
        }else if(nums[i]<min2){
            min2 = nums[i]
        }
        i++
    }
    return Math.max(max*min*mid,max*min1*min2)
};