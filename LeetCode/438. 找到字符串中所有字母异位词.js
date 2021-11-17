// 给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。

// 异位词 指由相同字母重排列形成的字符串（包括相同的字符串）。

//  

// 示例 1:

// 输入: s = "cbaebabacd", p = "abc"
// 输出: [0,6]
// 解释:
// 起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
// 起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。
//  示例 2:

// 输入: s = "abab", p = "ab"
// 输出: [0,1,2]
// 解释:
// 起始索引等于 0 的子串是 "ab", 它是 "ab" 的异位词。
// 起始索引等于 1 的子串是 "ba", 它是 "ab" 的异位词。
// 起始索引等于 2 的子串是 "ab", 它是 "ab" 的异位词。
//  

// 提示:

// 1 <= s.length, p.length <= 3 * 104
// s 和 p 仅包含小写字母

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/find-all-anagrams-in-a-string
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。





/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
 var findAnagrams = function(s, t) {
    // 需要的
    let need = {};
    // 窗口中的字符
    let window = {};
    for (let a of t) {
      // 统计需要的字符
      need[a] = (need[a] || 0) + 1;
    }
    // 左右指针
    let left = 0,
      right = 0;
    let valid = 0;
    let res = [];
    while (right < s.length) {
      // 即将移入窗口的字符
      let c = s[right];
      // 右移窗口
      right++;
      if (need[c]) {
        // 当前字符在需要的字符中，则更新当前窗口统计
        window[c] = (window[c] || 0) + 1;
        if (window[c] == need[c]) {
          // 当前窗口和需要的字符匹配时，验证数量增加1
          valid++;
        }
      }
      while (right - left >= t.length) {
        if (valid == Object.keys(need).length) {
          res.push(left);
        }
        let d = s[left];
        left++;
        if (need[d]) {
          if (window[d] == need[d]) {
            valid--;
          }
          window[d]--;
        }
      }
    }
    return res;
  };
  