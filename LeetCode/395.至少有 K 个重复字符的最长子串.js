// 给你一个字符串 s 和一个整数 k ，请你找出 s 中的最长子串， 要求该子串中的每一字符出现次数都不少于 k 。返回这一子串的长度。

//  

// 示例 1：

// 输入：s = "aaabb", k = 3
// 输出：3
// 解释：最长子串为 "aaa" ，其中 'a' 重复了 3 次。
// 示例 2：

// 输入：s = "ababbc", k = 2
// 输出：5
// 解释：最长子串为 "ababb" ，其中 'a' 重复了 2 次， 'b' 重复了 3 次。
//  

// 提示：

// 1 <= s.length <= 104
// s 仅由小写英文字母组成
// 1 <= k <= 105

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/longest-substring-with-at-least-k-repeating-characters
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var longestSubstring = function(s, k) {
    let ret = 0;
        const n = s.length;
        for (let t = 1; t <= 26; t++) {
            let l = 0, r = 0;
            const cnt = new Array(26).fill(0);
            let tot = 0;
            let less = 0;
            while (r < n) {
                cnt[s[r].charCodeAt() - 'a'.charCodeAt()]++;
                if (cnt[s[r].charCodeAt() - 'a'.charCodeAt()] === 1) {
                    tot++;
                    less++;
                }
                if (cnt[s[r].charCodeAt() - 'a'.charCodeAt()] === k) {
                    less--;
                }
    
                while (tot > t) {
                    cnt[s[l].charCodeAt() - 'a'.charCodeAt()]--;
                    if (cnt[s[l].charCodeAt() - 'a'.charCodeAt()] === k - 1) {
                        less++;
                    }
                    if (cnt[s[l].charCodeAt() - 'a'.charCodeAt()] === 0) {
                        tot--;
                        less--;
                    }
                    l++;
                }
                if (less == 0) {
                    ret = Math.max(ret, r - l + 1);
                }
                r++;
            }
        }
        return ret;
    
    // 作者：LeetCode-Solution
    // 链接：https://leetcode-cn.com/problems/longest-substring-with-at-least-k-repeating-characters/solution/zhi-shao-you-kge-zhong-fu-zi-fu-de-zui-c-o6ww/
    // 来源：力扣（LeetCode）
    // 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
    };