// 给你一个整数数组 nums ，请你将数组按照每个值的频率 升序 排序。如果有多个值的频率相同，请你按照数值本身将它们 降序 排序。 

// 请你返回排序后的数组。

//  

// 示例 1：

// 输入：nums = [1,1,2,2,2,3]
// 输出：[3,1,1,2,2,2]
// 解释：'3' 频率为 1，'1' 频率为 2，'2' 频率为 3 。
// 示例 2：

// 输入：nums = [2,3,1,3,2]
// 输出：[1,3,3,2,2]
// 解释：'2' 和 '3' 频率都为 2 ，所以它们之间按照数值本身降序排序。
// 示例 3：

// 输入：nums = [-1,1,-6,4,5,-6,1,4,1]
// 输出：[5,-1,4,4,-6,-6,1,1,1]
//  

// 提示：

// 1 <= nums.length <= 100
// -100 <= nums[i] <= 100

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/sort-array-by-increasing-frequency
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




/**
 * @param {number[]} nums
 * @return {number[]}
 */
/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var frequencySort = function (nums) {
    // 首先统计每个数字出现的此处，用 {数字：次数}的形式存到对象中，然后遍历这个对象并根据次数排序
    const arr = Object.entries(nums.reduce((l, i) => ((l[i] = (l[i] ?? 0) + 1) && l), {})).sort((a, b) => a[1] - b[1])
    // 防止结束标点
    arr.push([])
    // 循环索引
    let i = 0;
    // 当前遍历的次数是几
    let now = 0
    // 当前次数的数字都有哪些
    let nowArr = []
    // 结果是什么
    let tar = []
    // 遍历排序后的 arr
    while (i < arr.length) {
      // 如果当前项出现的次数跟当前正在遍历的次数一致，当前项放在nowArr次数的数字中
      if (arr[i][1] === now) {
        nowArr.push(arr[i][0])
      } else {
        // 如果不一致了，把当前一致的数字排个序，依次遍历now次放到结果中，repeat 也可
        nowArr.sort((a, b) => b - a)
        nowArr.forEach(item => {
          for (let j = 0; j < now; j++) {
            tar.push(item)
          }
        })
        // 重置变量
        now = arr[i][1]
        nowArr = [arr[i][0]]
      }
      i++
    }
    return tar
  };