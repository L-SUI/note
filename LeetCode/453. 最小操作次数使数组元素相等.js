// 给定一个长度为 n 的 非空 整数数组，每次操作将会使 n - 1 个元素增加 1。找出让数组所有元素相等的最小操作次数。

//  

// 示例：

// 输入：
// [1,2,3]
// 输出：
// 3
// 解释：
// 只需要3次操作（注意每次操作会增加两个元素的值）：
// [1,2,3]  =>  [2,3,3]  =>  [3,4,3]  =>  [4,4,4]


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/minimum-moves-to-equal-array-elements
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




/**
 * @param {number[]} nums
 * @return {number}
 */
 var minMoves = function(nums) {
    let min=nums[0];
    for(let i=0;i<nums.length;i++){
        min=Math.min(nums[i],min);
    }

    let number=0;
    for(let i=0;i<nums.length;i++){
        number+=(nums[i]-min);
    }

    return number;
};