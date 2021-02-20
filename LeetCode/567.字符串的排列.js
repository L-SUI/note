// 给定两个字符串 s1 和 s2，写一个函数来判断 s2 是否包含 s1 的排列。

// 换句话说，第一个字符串的排列之一是第二个字符串的子串。

// 示例1:

// 输入: s1 = "ab" s2 = "eidbaooo"
// 输出: True
// 解释: s2 包含 s1 的排列之一 ("ba").
//  

// 示例2:

// 输入: s1= "ab" s2 = "eidboaoo"
// 输出: False
//  

// 注意：

// 输入的字符串只包含小写字母
// 两个字符串的长度都在 [1, 10,000] 之间

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/permutation-in-string
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
    const n = s1.length, m = s2.length;
    if (n > m) {
        return false;
    }
    const cnt = new Array(26).fill(0);
    for (let i = 0; i < n; ++i) {
        --cnt[s1[i].charCodeAt() - 'a'.charCodeAt()];
    }
    let left = 0;
    for (let right = 0; right < m; ++right) {
        const x = s2[right].charCodeAt() - 'a'.charCodeAt();
        ++cnt[x];
        while (cnt[x] > 0) {
            --cnt[s2[left].charCodeAt() - 'a'.charCodeAt()];
            ++left;
        }
        if (right - left + 1 === n) {
            return true;
        }
    }
    return false;
};

// 作者：LeetCode-Solution
// 链接：https://leetcode-cn.com/problems/permutation-in-string/solution/zi-fu-chuan-de-pai-lie-by-leetcode-solut-7k7u/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。