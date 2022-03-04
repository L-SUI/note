// 复数 可以用字符串表示，遵循 "实部+虚部i" 的形式，并满足下述条件：

// 实部 是一个整数，取值范围是 [-100, 100]
// 虚部 也是一个整数，取值范围是 [-100, 100]
// i2 == -1
// 给你两个字符串表示的复数 num1 和 num2 ，请你遵循复数表示形式，返回表示它们乘积的字符串。

//  

// 示例 1：

// 输入：num1 = "1+1i", num2 = "1+1i"
// 输出："0+2i"
// 解释：(1 + i) * (1 + i) = 1 + i2 + 2 * i = 2i ，你需要将它转换为 0+2i 的形式。
// 示例 2：

// 输入：num1 = "1+-1i", num2 = "1+-1i"
// 输出："0+-2i"
// 解释：(1 - i) * (1 - i) = 1 + i2 - 2 * i = -2i ，你需要将它转换为 0+-2i 的形式。 
//  

// 提示：

// num1 和 num2 都是有效的复数表示。


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/complex-number-multiplication
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
 var complexNumberMultiply = function(num1, num2) {
    const complex1 = [num1.split("+")[0], num1.split("+")[1].split("i")[0]];
    const complex2 = [num2.split("+")[0], num2.split("+")[1].split("i")[0]];
    const real1 = parseInt(complex1[0]);
    const imag1 = parseInt(complex1[1]);
    const real2 = parseInt(complex2[0]);
    const imag2 = parseInt(complex2[1]);
    return '' + real1 * real2 - imag1 * imag2 + '+' + (real1 * imag2 + imag1 * real2) + 'i';
};
