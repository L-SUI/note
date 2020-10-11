// 给定一个范围在  1 ≤ a[i] ≤ n ( n = 数组大小 ) 的 整型数组，数组中的元素一些出现了两次，另一些只出现一次。

// 找到所有在 [1, n] 范围之间没有出现在数组中的数字。

// 您能在不使用额外空间且时间复杂度为O(n)的情况下完成这个任务吗? 你可以假定返回的数组不算在额外空间内。

// 示例:

// 输入:
// [4,3,2,7,8,2,3,1]

// 输出:
// [5,6]

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/find-all-numbers-disappeared-in-an-array
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function(nums) {
    for(let i = 0;i<nums.length;i++){
        let current = nums[i]
        nums[Math.abs(current)-1]  = nums[Math.abs(current)-1] >0 ? nums[Math.abs(current)-1] *-1 : nums[Math.abs(current)-1] 
    }
    console.log(nums)
    let res = [];
    for(let i =0;i<nums.length;i++){
        if(nums[i]>0) res.push(i+1)
    }
    return res;
};

console.log(findDisappearedNumbers([4,3,2,7,8,2,3,1]))