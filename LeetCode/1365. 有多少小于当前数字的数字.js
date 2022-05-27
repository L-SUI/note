// 给你一个数组 nums，对于其中每个元素 nums[i]，请你统计数组中比它小的所有数字的数目。

// 换而言之，对于每个 nums[i] 你必须计算出有效的 j 的数量，其中 j 满足 j != i 且 nums[j] < nums[i] 。

// 以数组形式返回答案。

//  

// 示例 1：

// 输入：nums = [8,1,2,2,3]
// 输出：[4,0,1,1,3]
// 解释： 
// 对于 nums[0]=8 存在四个比它小的数字：（1，2，2 和 3）。 
// 对于 nums[1]=1 不存在比它小的数字。
// 对于 nums[2]=2 存在一个比它小的数字：（1）。 
// 对于 nums[3]=2 存在一个比它小的数字：（1）。 
// 对于 nums[4]=3 存在三个比它小的数字：（1，2 和 2）。
// 示例 2：

// 输入：nums = [6,5,4,8]
// 输出：[2,1,0,3]
// 示例 3：

// 输入：nums = [7,7,7,7]
// 输出：[0,0,0,0]
//  

// 提示：

// 2 <= nums.length <= 500
// 0 <= nums[i] <= 100
// 通过次数90,591提交次数109,952

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/how-many-numbers-are-smaller-than-the-current-number
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var smallerNumbersThanCurrent = function(nums) {
    const map={};
    for(let i=0;i<nums.length;i++){
        if(map[nums[i]]) map[nums[i]].push(i)
        else map[nums[i]]=[i]
    }
    const arr = Object.keys(map)
    let count=0;
    for(let i=0;i<arr.length;i++){
        const value = map[arr[i]]
        value.count=count;
        count+=value.length;
    }
    const res = [];
    for(let i=0;i<nums.length;i++){
        res.push(map[nums[i]].count)
    }
    return res
};



/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var smallerNumbersThanCurrent = function(nums) {
    const cnt = new Array(101).fill(0);
    const n = nums.length;
    for (let i = 0; i < n; ++i) {
        cnt[nums[i]] += 1;
    }
    for (let i = 1; i <= 100; ++i) {
        cnt[i] += cnt[i - 1];
    }
    const ret = [];
    for (let i = 0; i < n; ++i) {
        ret.push(nums[i] ? cnt[nums[i] - 1] : 0);
    }
    return ret;
};
