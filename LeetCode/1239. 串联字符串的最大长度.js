// 给定一个字符串数组 arr，字符串 s 是将 arr 某一子序列字符串连接所得的字符串，如果 s 中的每一个字符都只出现过一次，那么它就是一个可行解。

// 请返回所有可行解 s 中最长长度。

//  

// 示例 1：

// 输入：arr = ["un","iq","ue"]
// 输出：4
// 解释：所有可能的串联组合是 "","un","iq","ue","uniq" 和 "ique"，最大长度为 4。
// 示例 2：

// 输入：arr = ["cha","r","act","ers"]
// 输出：6
// 解释：可能的解答有 "chaers" 和 "acters"。
// 示例 3：

// 输入：arr = ["abcdefghijklmnopqrstuvwxyz"]
// 输出：26
//  

// 提示：

// 1 <= arr.length <= 16
// 1 <= arr[i].length <= 26
// arr[i] 中只含有小写英文字母

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。





/**
 * @param {string[]} arr
 * @return {number}
 */
 var maxLength = function(arr) {
    let ans = 0;
    const masks = [0];
    for (const s of arr) {
        let mask = 0;
        for (let i = 0; i < s.length; ++i) {
            const ch = s[i].charCodeAt() - 'a'.charCodeAt();
            if (((mask >> ch) & 1) !== 0) { // 若 mask 已有 ch，则说明 s 含有重复字母，无法构成可行解
                mask = 0;
                break;
            }
            mask |= 1 << ch; // 将 ch 加入 mask 中
        }
        if (mask === 0) {
            continue;
        }
        const n = masks.length;
        for (let i = 0; i < n; ++i) {
            const m = masks[i];
            if ((m & mask) === 0) { // m 和 mask 无公共元素
                masks.push(m | mask);
                ans = Math.max(ans, (m | mask).toString(2).split('0').join('').length);
            }
        }
    }
    return ans;
};
