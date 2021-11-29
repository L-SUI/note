// 将非负整数 num 转换为其对应的英文表示。

//  

// 示例 1：

// 输入：num = 123
// 输出："One Hundred Twenty Three"
// 示例 2：

// 输入：num = 12345
// 输出："Twelve Thousand Three Hundred Forty Five"
// 示例 3：

// 输入：num = 1234567
// 输出："One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"
// 示例 4：

// 输入：num = 1234567891
// 输出："One Billion Two Hundred Thirty Four Million Five Hundred Sixty Seven Thousand Eight Hundred Ninety One"
//  

// 提示：

// 0 <= num <= 231 - 1


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/integer-to-english-words
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




/**
 * @param {number} num
 * @return {string}
 */
 var numberToWords = function(num) {
    const singles = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const thousands = ["", "Thousand", "Million", "Billion"];

    const toEnglish = (num) => {
        const curr = [];
        const hundred = Math.floor(num / 100);
        num %= 100;
        if (hundred !== 0) {
            curr.push(singles[hundred] + " Hundred ");
        }
        const ten = Math.floor(num / 10);
        if (ten >= 2) {
            curr.push(tens[ten] + " ");
            num %= 10;
        }
        if (num > 0 && num < 10) {
            curr.push(singles[num] + " ");
        } else if (num >= 10) {
            curr.push(teens[num - 10] + " ");
        }
        return curr.join('');
    }

    if (num === 0) {
        return "Zero";
    }
    const sb = [];
    for (let i = 3, unit = 1000000000; i >= 0; i--, unit = Math.floor(unit / 1000)) {
        const curNum = Math.floor(num / unit);
        if (curNum !== 0) {
            num -= curNum * unit;
            sb.push(toEnglish(curNum) + thousands[i] + " ");
        }
    }
    return sb.join('').trim();
}