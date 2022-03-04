// 给你一个整数 n 。请你先求出从 1 到 n 的每个整数 10 进制表示下的数位和（每一位上的数字相加），然后把数位和相等的数字放到同一个组中。

// 请你统计每个组中的数字数目，并返回数字数目并列最多的组有多少个。

//  

// 示例 1：

// 输入：n = 13
// 输出：4
// 解释：总共有 9 个组，将 1 到 13 按数位求和后这些组分别是：
// [1,10]，[2,11]，[3,12]，[4,13]，[5]，[6]，[7]，[8]，[9]。总共有 4 个组拥有的数字并列最多。
// 示例 2：

// 输入：n = 2
// 输出：2
// 解释：总共有 2 个大小为 1 的组 [1]，[2]。
// 示例 3：

// 输入：n = 15
// 输出：6
// 示例 4：

// 输入：n = 24
// 输出：5
//  

// 提示：

// 1 <= n <= 10^4


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/count-largest-group
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



/**
 * @param {number} n
 * @return {number}
 */
 var countLargestGroup = function (n) {
    var map = new Map();
    let max = 0;
    // 1-n位数累加，和作为key存在map中
    for (var i = 1; i <= n; i++) {
      var key = [...String(i)].reduce((prev, cur) => Number(prev) + Number(cur));
      map.set(Number(key), map.has(key) ? map.get(key) + 1 : 1);
      max=Math.max(max,map.get(Number(key)))
    }
    // 返回map值数组中位数最多的数组的个数
    return [...map.values()].filter(item => item === max).length;
  };
  

