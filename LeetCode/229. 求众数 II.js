// 给定一个大小为 n 的整数数组，找出其中所有出现超过 ⌊ n/3 ⌋ 次的元素。

//  

//  

// 示例 1：

// 输入：[3,2,3]
// 输出：[3]
// 示例 2：

// 输入：nums = [1]
// 输出：[1]
// 示例 3：

// 输入：[1,1,1,3,3,2,2,2]
// 输出：[1,2]
//  

// 提示：

// 1 <= nums.length <= 5 * 104
// -109 <= nums[i] <= 109
//  

// 进阶：尝试设计时间复杂度为 O(n)、空间复杂度为 O(1)的算法解决此问题。



// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/majority-element-ii
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。





/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var majorityElement = function(nums) {
    let element1 = 0,element2 = 0,vote1 = 0,vote2 = 0;
    for (const num of nums) {
        if (vote1 > 0 && num === element1) vote1++;
        else if (vote2 > 0 && num === element2) vote2++;
        else if (vote1 === 0) (element1 = num,vote1++);
        else if (vote2 === 0) (element2 = num,vote2++);
        else (vote1--,vote2--);
    }
    let cnt1 = 0,cnt2 = 0;
    for (const num of nums) {
        if (vote1 > 0 && num === element1) cnt1++;
        if (vote2 > 0 && num === element2) cnt2++;
    }
    // 检测元素出现的次数是否满足要求
    const ans = [];
    if (vote1 > 0 && cnt1 > Math.floor(nums.length / 3)) ans.push(element1);
    if (vote2 > 0 && cnt2 > Math.floor(nums.length / 3)) ans.push(element2);
    return ans;
};
