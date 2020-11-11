// 一条包含字母 A-Z 的消息通过以下方式进行了编码：

// 'A' -> 1
// 'B' -> 2
// ...
// 'Z' -> 26
// 给定一个只包含数字的非空字符串，请计算解码方法的总数。

// 题目数据保证答案肯定是一个 32 位的整数。


// 示例 1：

// 输入："12"
// 输出：2
// 解释：它可以解码为 "AB"（1 2）或者 "L"（12）。
// 示例 2：

// 输入："226"
// 输出：3
// 解释：它可以解码为 "BZ" (2 26), "VF" (22 6), 或者 "BBF" (2 2 6) 。
// 示例 3：

// 输入：s = "0"
// 输出：0
// 示例 4：

// 输入：s = "1"
// 输出：1
// 示例 5：

// 输入：s = "2"
// 输出：1
//  

// 提示：

// 1 <= s.length <= 100
// s 只包含数字，并且可以包含前导零。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/decode-ways
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
    /**
     * CC : Core Code
     * cur += valid lastOne (0 ~ 10) + valid lastTwo (10 ~ 26)
     */

    // 异常处理
    if(s[0] === '0') return 0

    // 边界处理：多填充一位辅助位（前两位为1）因为后续需要用到
    const len = s.length, dp = [1, 1, ...new Array(len - 1).fill(0)]

    // DP 方程 CC的具体实现
    for (let i = 2; i <= len; i++) {
        let lastOne = s.slice(i - 1, i), lastTwo = s.slice(i - 2, i)

        if(lastOne > 0 && lastOne < 10) dp[i] += dp[i - 1]

        if(lastTwo >= 10 && lastTwo <= 26) dp[i] += dp[i - 2]
    }

    return dp[len]
};
