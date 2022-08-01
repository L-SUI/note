// 给你一个字符串 sequence ，如果字符串 word 连续重复 k 次形成的字符串是 sequence 的一个子字符串，那么单词 word 的 重复值为 k 。单词 word 的 最大重复值 是单词 word 在 sequence 中最大的重复值。如果 word 不是 sequence 的子串，那么重复值 k 为 0 。

// 给你一个字符串 sequence 和 word ，请你返回 最大重复值 k 。

//  

// 示例 1：

// 输入：sequence = "ababc", word = "ab"
// 输出：2
// 解释："abab" 是 "ababc" 的子字符串。
// 示例 2：

// 输入：sequence = "ababc", word = "ba"
// 输出：1
// 解释："ba" 是 "ababc" 的子字符串，但 "baba" 不是 "ababc" 的子字符串。
// 示例 3：

// 输入：sequence = "ababc", word = "ac"
// 输出：0
// 解释："ac" 不是 "ababc" 的子字符串。
//  

// 提示：

// 1 <= sequence.length <= 100
// 1 <= word.length <= 100
// sequence 和 word 都只包含小写英文字母。


// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/maximum-repeating-substring
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




/**
 * @param {string} sequence
 * @param {string} word
 * @return {number}
 */
 var maxRepeating = function (sequence, word) {
    let max = 1
    let maxStr = word
    while (sequence.indexOf(maxStr) !== -1) {
      max++
      maxStr = word.repeat(max)
    }
    return max - 1
  };
  