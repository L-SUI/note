// // 给你一个字符串 s ，请你去除字符串中重复的字母，使得每个字母只出现一次。
// // 需保证 返回结果的字典序最小（要求不能打乱其他字符的相对位置）。

// 注意：该题与 1081 https://leetcode-cn.com/problems/smallest-subsequence-of-distinct-characters 相同

// 示例 1：

// 输入：s = "bcabc"
// 输出："abc"
// 示例 2：

// 输入：s = "cbacdcbc"
// 输出："acdb"
//  

// 提示：

// 1 <= s.length <= 104
// s 由小写英文字母组成

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/remove-duplicate-letters
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function(s) {
    const vis = new Array(26).fill(0);
    const num = _.countBy(s);
    
    const sb = new Array();
    for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        if (!vis[ch.charCodeAt() - 'a'.charCodeAt()]) {
            while (sb.length > 0 && sb[sb.length - 1] > ch) {
                if (num[sb[sb.length - 1]] > 0) {
                    vis[sb[sb.length - 1].charCodeAt() - 'a'.charCodeAt()] = 0;
                    sb.pop();
                } else {
                    break;
                }
            }
            vis[ch.charCodeAt() - 'a'.charCodeAt()] = 1;
            sb.push(ch);
        }
        num[ch]--;
    }
    return sb.join('');
};

// 作者：LeetCode-Solution
// 链接：https://leetcode-cn.com/problems/remove-duplicate-letters/solution/qu-chu-zhong-fu-zi-mu-by-leetcode-soluti-vuso/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。