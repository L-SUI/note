// 对于字符串 S 和 T，只有在 S = T + ... + T（T 自身连接 1 次或多次）时，我们才认定 “T 能除尽 S”。

// 返回最长字符串 X，要求满足 X 能除尽 str1 且 X 能除尽 str2。

//  

// 示例 1：

// 输入：str1 = "ABCABC", str2 = "ABC"
// 输出："ABC"
// 示例 2：

// 输入：str1 = "ABABAB", str2 = "ABAB"
// 输出："AB"
// 示例 3：

// 输入：str1 = "LEET", str2 = "CODE"
// 输出：""

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/greatest-common-divisor-of-strings
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
 var gcdOfStrings = function(str1, str2) {
    if (str1 + str2 !== str2 + str1) return ''
    const gcd = (a, b) => (0 === b ? a : gcd(b, a % b))
    return str1.substring(0, gcd(str1.length, str2.length))
  };
  