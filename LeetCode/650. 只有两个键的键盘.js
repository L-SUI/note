// 最初记事本上只有一个字符 'A' 。你每次可以对这个记事本进行两种操作：

// Copy All（复制全部）：复制这个记事本中的所有字符（不允许仅复制部分字符）。
// Paste（粘贴）：粘贴 上一次 复制的字符。
// 给你一个数字 n ，你需要使用最少的操作次数，在记事本上输出 恰好 n 个 'A' 。返回能够打印出 n 个 'A' 的最少操作次数。

//  

// 示例 1：

// 输入：3
// 输出：3
// 解释：
// 最初, 只有一个字符 'A'。
// 第 1 步, 使用 Copy All 操作。
// 第 2 步, 使用 Paste 操作来获得 'AA'。
// 第 3 步, 使用 Paste 操作来获得 'AAA'。
// 示例 2：

// 输入：n = 1
// 输出：0
//  

// 提示：

// 1 <= n <= 1000
// 通过次数44,026提交次数78,383


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/2-keys-keyboard
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




/**
 * @param {number} n
 * @return {number}
 */
 var minSteps = function(n) {
    let ans = 0;
    for (let i = 2; i * i <= n; ++i) {
        while (n % i === 0) {
            n = Math.floor(n / i);
            ans += i;
        }
    }
    if (n > 1) {
        ans += n;
    }
    return ans;
};
