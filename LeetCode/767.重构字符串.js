// 给定一个字符串S，检查是否能重新排布其中的字母，使得两相邻的字符不同。

// 若可行，输出任意可行的结果。若不可行，返回空字符串。

// 示例 1:

// 输入: S = "aab"
// 输出: "aba"
// 示例 2:

// 输入: S = "aaab"
// 输出: ""
// 注意:

// S 只包含小写字母并且长度在[1, 500]区间内。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/reorganize-string
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


/**
 * @param {string} S
 * @return {string}
 */
const getIdx = (c) => c.charCodeAt() - 'a'.charCodeAt();
const getAlpha = (c) => String.fromCharCode(c);
var reorganizeString = function(S) {
    if (S.length < 2) {
        return S;
    }
    const counts = new Array(26).fill(0);
    let maxCount = 0;
    const length = S.length;
    for (let i = 0; i < length; i++) {
        const c = S.charAt(i);
        counts[getIdx(c)]++;
        maxCount = Math.max(maxCount, counts[getIdx(c)]);
    }
    if (maxCount > Math.floor((length + 1) / 2)) {
        return "";
    }
    const reorganizeArray = new Array(length);
    let evenIndex = 0, oddIndex = 1;
    const halfLength = Math.floor(length / 2);
    for (let i = 0; i < 26; i++) {
        const c = getAlpha('a'.charCodeAt() + i);
        while (counts[i] > 0 && counts[i] <= halfLength && oddIndex < length) {
            reorganizeArray[oddIndex] = c;
            counts[i]--;
            oddIndex += 2;
        }
        while (counts[i] > 0) {
            reorganizeArray[evenIndex] = c;
            counts[i]--;
            evenIndex += 2;
        }
    }
    return reorganizeArray.join('');
};
