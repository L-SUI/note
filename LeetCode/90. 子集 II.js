// 给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的子集（幂集）。

// 解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。

//  

// 示例 1：

// 输入：nums = [1,2,2]
// 输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]
// 示例 2：

// 输入：nums = [0]
// 输出：[[],[0]]
//  

// 提示：

// 1 <= nums.length <= 10
// -10 <= nums[i] <= 10

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/subsets-ii
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var subsetsWithDup = function(nums) {
    nums.sort((a, b) => a - b);
    let t = [], ans = [];
    const dfs = (choosePre, cur, nums) => {
        if (cur === nums.length) {
            ans.push(t.slice());
            return;
        }
        dfs(false, cur + 1, nums);
        if (!choosePre && cur > 0 && nums[cur - 1] === nums[cur]) {
            return;
        }
        t.push(nums[cur]);
        dfs(true, cur + 1, nums);
        t = t.slice(0, t.length - 1);
    }
    dfs(false, 0, nums);
    return ans;
};

// 作者：LeetCode-Solution
// 链接：https://leetcode-cn.com/problems/subsets-ii/solution/zi-ji-ii-by-leetcode-solution-7inq/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。