// 对于一个 正整数，如果它和除了它自身以外的所有 正因子 之和相等，我们称它为 「完美数」。

// 给定一个 整数 n， 如果是完美数，返回 true，否则返回 false

//  

// 示例 1：

// 输入：28
// 输出：True
// 解释：28 = 1 + 2 + 4 + 7 + 14
// 1, 2, 4, 7, 和 14 是 28 的所有正因子。
// 示例 2：

// 输入：num = 6
// 输出：true
// 示例 3：

// 输入：num = 496
// 输出：true
// 示例 4：

// 输入：num = 8128
// 输出：true
// 示例 5：

// 输入：num = 2
// 输出：false
//  

// 提示：

// 1 <= num <= 108

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/perfect-number
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



/**
 * @param {number} num
 * @return {boolean}
 */
 var checkPerfectNumber = function(num) {
    if(num == 1) {
        return false;
    }
    let sum = 1; // 正整数一定会有一个1，同时不用考虑自身，所以单独处理
    let i = 2;
    const sqrt = Math.sqrt(num);
    for(;i < sqrt;i++) {
        if(num % i == 0) {
            sum += i;
            sum += num / i;
        }
    }
    // 此处单独处理的原因在于只需要加1次i值，如果在循环中会加2次
    if(i * i == num) {
        sum += i;
    }
    return sum == num;
};