// 编写一个程序判断给定的数是否为丑数。

// 丑数就是只包含质因数 2, 3, 5 的正整数。

// 示例 1:

// 输入: 6
// 输出: true
// 解释: 6 = 2 × 3
// 示例 2:

// 输入: 8
// 输出: true
// 解释: 8 = 2 × 2 × 2
// 示例 3:

// 输入: 14
// 输出: false 
// 解释: 14 不是丑数，因为它包含了另外一个质因数 7。
// 说明：

// 1 是丑数。
// 输入不会超过 32 位有符号整数的范围: [−231,  231 − 1]。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/ugly-number
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


/**
 * @param {number} num
 * @return {boolean}
 */
var isUgly = function(num) {
    // 排除负数
    if (num < 1) return false
    let divisor2 = 2
    while(num % divisor2 === 0) {
        divisor2 = divisor2 << 1
    }
    divisor2 = divisor2 >> 1
    let divisor3 = 3
    while(num % divisor3 === 0) {
        divisor3 = divisor3 * 3
    }
    divisor3 = divisor3 / 3
    let divisor5 = 5
    while(num % divisor5 === 0) {
        divisor5 = divisor5 * 5
    }
    divisor5 = divisor5 / 5
    num = num / divisor2 / divisor3 / divisor5
    if (num === 1) return true
    else return false
};
