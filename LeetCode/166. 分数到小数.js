// 给定两个整数，分别表示分数的分子 numerator 和分母 denominator，以 字符串形式返回小数 。

// 如果小数部分为循环小数，则将循环的部分括在括号内。

// 如果存在多个答案，只需返回 任意一个 。

// 对于所有给定的输入，保证 答案字符串的长度小于 104 。

//  

// 示例 1：

// 输入：numerator = 1, denominator = 2
// 输出："0.5"
// 示例 2：

// 输入：numerator = 2, denominator = 1
// 输出："2"
// 示例 3：

// 输入：numerator = 2, denominator = 3
// 输出："0.(6)"
// 示例 4：

// 输入：numerator = 4, denominator = 333
// 输出："0.(012)"
// 示例 5：

// 输入：numerator = 1, denominator = 5
// 输出："0.2"
//  

// 提示：

// -231 <= numerator, denominator <= 231 - 1
// denominator != 0

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/fraction-to-recurring-decimal
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。





/**
 * @param {number} numerator
 * @param {number} denominator
 * @return {string}
 */
 var fractionToDecimal = function(numerator, denominator) {
    if (numerator % denominator == 0) {
        return '' + Math.floor(numerator / denominator);
    }

    const sb = [];
    if (numerator < 0 ^ denominator < 0) {
        sb.push('-');
    }

    // 整数部分
    numerator = Math.abs(numerator);
    denominator = Math.abs(denominator);
    const integerPart = Math.floor(numerator / denominator);
    sb.push(integerPart);
    sb.push('.');

    // 小数部分
    const fractionPart = [];
    const remainderIndexDic = new Map();
    let remainder = numerator % denominator;
    let index = 0;
    while (remainder !== 0 && !remainderIndexDic.has(remainder)) {
        remainderIndexDic.set(remainder, index);
        remainder *= 10;
        fractionPart.push(Math.floor(remainder / denominator));
        remainder %= denominator;
        index++;
    }
    if (remainder !== 0) { // 有循环节
        let insertIndex = remainderIndexDic.get(remainder);
        fractionPart.splice(insertIndex, 0, '(');
        fractionPart.push(')');
    }
    sb.push(fractionPart.join(''));

    return sb.join('');
}