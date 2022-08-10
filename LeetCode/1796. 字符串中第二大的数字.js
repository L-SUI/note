// 给你一个混合字符串 s ，请你返回 s 中 第二大 的数字，如果不存在第二大的数字，请你返回 -1 。

// 混合字符串 由小写英文字母和数字组成。

//  

// 示例 1：

// 输入：s = "dfa12321afd"
// 输出：2
// 解释：出现在 s 中的数字包括 [1, 2, 3] 。第二大的数字是 2 。
// 示例 2：

// 输入：s = "abc1111"
// 输出：-1
// 解释：出现在 s 中的数字只包含 [1] 。没有第二大的数字。
//  

// 提示：

// 1 <= s.length <= 500
// s 只包含小写英文字母和（或）数字。


// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/second-largest-digit-in-a-string
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



/**
 * @param {string} s
 * @return {number}
 */
 var secondHighest = function (s) {
    let map = { '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9 };
    let fir = -1
    let sec = -1
    for (let i = 0; i < s.length; i++) {
      const item = s[i]
      if (map[item] !== undefined) {
        if (map[item] > fir) {
          sec = fir
          fir = map[item]
        } if (map[item] > sec && map[item] !== fir) {
          sec = map[item]
        }
      }
    }
    return sec
  };