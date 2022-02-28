// 给定两个字符串 a 和 b，寻找重复叠加字符串 a 的最小次数，使得字符串 b 成为叠加后的字符串 a 的子串，如果不存在则返回 -1。

// 注意：字符串 "abc" 重复叠加 0 次是 ""，重复叠加 1 次是 "abc"，重复叠加 2 次是 "abcabc"。

//  

// 示例 1：

// 输入：a = "abcd", b = "cdabcdab"
// 输出：3
// 解释：a 重复叠加三遍后为 "abcdabcdabcd", 此时 b 是其子串。
// 示例 2：

// 输入：a = "a", b = "aa"
// 输出：2
// 示例 3：

// 输入：a = "a", b = "a"
// 输出：1
// 示例 4：

// 输入：a = "abc", b = "wxyz"
// 输出：-1
//  

// 提示：

// 1 <= a.length <= 104
// 1 <= b.length <= 104
// a 和 b 由小写英文字母组成


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/repeated-string-match
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



/**
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
const repeatedStringMatch = (a, b) => {
    const an = a.length, bn = b.length;
    const index = strStr(a, b);
    if (index === -1) {
        return -1;
    }
    if (an - index >= bn) {
        return 1;
    }
    return Math.floor((bn + index - an - 1) / an) + 2;
}

const strStr = (haystack, needle) => {
    const n = haystack.length, m = needle.length;
    if (m === 0) {
        return 0;
    }

    let k1 = 1000000009;
    let k2 = 1337;
    let kMod1 = Math.floor(Math.random() * k1) + k1;
    let kMod2 = Math.floor(Math.random() * k2) + k2;

    let hashNeedle = 0;
    for (let i = 0; i < m; i++) {
        const c = needle[i].charCodeAt();
        hashNeedle = (hashNeedle * kMod2 + c) % kMod1;
    }
    let hashHaystack = 0, extra = 1;
    for (let i = 0; i < m - 1; i++) {
        hashHaystack = (hashHaystack * kMod2 + haystack[i % n].charCodeAt()) % kMod1;
        extra = (extra * kMod2) % kMod1;
    }
    for (let i = m - 1; (i - m + 1) < n; i++) {
        hashHaystack = (hashHaystack * kMod2 + haystack[i % n].charCodeAt()) % kMod1;
        if (hashHaystack === hashNeedle) {
            return i - m + 1;
        }
        hashHaystack = (hashHaystack - extra * haystack[(i - m + 1) % n].charCodeAt()) % kMod1;
        hashHaystack = (hashHaystack + kMod1) % kMod1;
    }
    return -1;
}
