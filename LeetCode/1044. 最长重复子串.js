// 给你一个字符串 s ，考虑其所有 重复子串 ：即，s 的连续子串，在 s 中出现 2 次或更多次。这些出现之间可能存在重叠。

// 返回 任意一个 可能具有最长长度的重复子串。如果 s 不含重复子串，那么答案为 "" 。

//  

// 示例 1：

// 输入：s = "banana"
// 输出："ana"
// 示例 2：

// 输入：s = "abcd"
// 输出：""
//  

// 提示：

// 2 <= s.length <= 3 * 104
// s 由小写英文字母组成

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/longest-duplicate-substring
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



/**
 * @param {string} s
 * @return {string}
 */
//  var longestDupSubstring = function(s) {
//     const map = {};
//     for (let i = 0; i < s.length; i++) {
//         const item = map[s[i]] || [[],{}];
//         item[0].push(i);
//         item[1][i] = item[0].length;
//         map[s[i]] = item;
//     }

//     let max = 0;
//     let maxString = '';
//     for (let i = 0; i < s.length; i++) {
//         if (max > s.length - i) break;
//         const item = map[s[i]];
//         const index = item[1][i];
//         if (index >= item[0].length) continue;
//         let n = item[0][index];
//         for (let j = index; j < item[0].length;j++) {
//              let m = i;
//              if (item[0][j] < n) continue;
//              n = item[0][j];
//              while(n < s.length) {
//                  if (s[m] === s[n]) {
//                      m++;
//                      n++;
//                  } else {
//                      break;
//                  }
//              }
//              if (m-i > max) {
//                max = m-i;
//                maxString = s.substring(i,m);
//              }
//         }
//     }
//     return maxString;
// };

var longestDupSubstring = function(s) {
    const map = {};
    for (let i = 0; i < s.length; i++) {
        const item = map[s[i]] || [[],{}];
        item[0].push(i);
        item[1][i] = item[0].length;
        map[s[i]] = item;
    }

    let max = 0;
    let maxString = '';
    
    return maxString;
};
console.log(longestDupSubstring("banana"));