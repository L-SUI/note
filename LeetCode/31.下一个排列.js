// 实现获取下一个排列的函数，算法需要将给定数字序列重新排列成字典序中下一个更大的排列。

// 如果不存在下一个更大的排列，则将数字重新排列成最小的排列（即升序排列）。

// 必须原地修改，只允许使用额外常数空间。

// 以下是一些例子，输入位于左侧列，其相应输出位于右侧列。
// 1,2,3 → 1,3,2
// 3,2,1 → 1,2,3
// 1,1,5 → 1,5,1

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/next-permutation
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
function nextPermutation(nums) {
    let i = nums.length - 2;  // 从倒数第二个，向左遍历
    while (i >= 0 && nums[i] >= nums[i + 1]) { // 寻找第一个小于右邻居的数
      i--;
    }
    if (i >= 0) { // 这个数在数组中存在
      let j = nums.length - 1; // 从最后一项，向左遍历
      while (j >= 0 && nums[j] <= nums[i]) { // 寻找第一个小于 nums[i] 的数
        j--;
      }
      [nums[i], nums[j]] = [nums[j], nums[i]]; // 两数交换，实现变大
    }
    // 如果i=-1，说明是递减排列，如 321，则直接翻转为最小排列：123
    let l = i + 1;            // i 右边的数进行翻转，使得变大的幅度小一些
    let r = nums.length - 1;
    while (l < r) {
      [nums[l], nums[r]] = [nums[r], nums[l]];
      l++;
      r--;
    }
  }