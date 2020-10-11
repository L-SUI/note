// 给定一个非空数组，返回此数组中第三大的数。如果不存在，则返回数组中最大的数。要求算法时间复杂度必须是O(n)。

// 示例 1:

// 输入: [3, 2, 1]

// 输出: 1

// 解释: 第三大的数是 1.
// 示例 2:

// 输入: [1, 2]

// 输出: 2

// 解释: 第三大的数不存在, 所以返回最大的数 2 .
// 示例 3:

// 输入: [2, 2, 3, 1]

// 输出: 1

// 解释: 注意，要求返回第三大的数，是指第三大且唯一出现的数。
// 存在两个值为2的数，它们都排第二。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/third-maximum-number
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number[]} nums
 * @return {number}
 */
var thirdMax = function(nums) {
    let obj = {}
    nums.forEach(item=>obj[item]=1)
    nums = Object.keys(obj)
    if(nums.length<3) return Math.max(...nums)
    let max = -Infinity;
    let mid = -Infinity;
    let res = -Infinity;
    let i = 0;
    while(i<nums.length){
        let num = nums[i]*1;
        if(num>max) {
            res = mid;
            mid = max;
            max = num;
        }
        else if( num>mid) {
            res = mid;
            mid = num;
        }
        else if( num >res) res = num;
        i++
    }
    return res
};



