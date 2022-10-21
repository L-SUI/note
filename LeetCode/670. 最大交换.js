// 给定一个非负整数，你至多可以交换一次数字中的任意两位。返回你能得到的最大值。

// 示例 1 :

// 输入: 2736
// 输出: 7236
// 解释: 交换数字2和数字7。
// 示例 2 :

// 输入: 9973
// 输出: 9973
// 解释: 不需要交换。
// 注意:

// 给定数字的范围是 [0, 108]

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/maximum-swap
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



/**
 * @param {number} num
 * @return {number}
 */
 var maximumSwap = function(num) {
    const charArray = [...'' + num];
    const n = charArray.length;
    let maxIdx = n - 1;
    let idx1 = -1, idx2 = -1;
    for (let i = n - 1; i >= 0; i--) {
        if (charArray[i] > charArray[maxIdx]) {
            maxIdx = i;
        } else if (charArray[i] < charArray[maxIdx]) {
            idx1 = i;
            idx2 = maxIdx;
        }
    }
    if (idx1 >= 0) {
        swap(charArray, idx1, idx2);
        return parseInt(charArray.join(''));
    } else {
        return num;
    }
}

const swap = (charArray, i, j) => {
    const temp = charArray[i];
    charArray[i] = charArray[j];
    charArray[j] = temp;
};
