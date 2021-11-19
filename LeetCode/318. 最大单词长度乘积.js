// 给定一个字符串数组 words，找到 length(word[i]) * length(word[j]) 的最大值，并且这两个单词不含有公共字母。你可以认为每个单词只包含小写字母。如果不存在这样的两个单词，返回 0。

//  

// 示例 1:

// 输入: ["abcw","baz","foo","bar","xtfn","abcdef"]
// 输出: 16 
// 解释: 这两个单词为 "abcw", "xtfn"。
// 示例 2:

// 输入: ["a","ab","abc","d","cd","bcd","abcd"]
// 输出: 4 
// 解释: 这两个单词为 "ab", "cd"。
// 示例 3:

// 输入: ["a","aa","aaa","aaaa"]
// 输出: 0 
// 解释: 不存在这样的两个单词。
//  

// 提示：

// 2 <= words.length <= 1000
// 1 <= words[i].length <= 1000
// words[i] 仅包含小写字母

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/maximum-product-of-word-lengths
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



/**
 * @param {string[]} words
 * @return {number}
 */
 var maxProduct = function(words) {
    const length = words.length;
    const masks = new Array(length).fill(0);
    for (let i = 0; i < length; i++) {
        const word = words[i];
        const wordLength = word.length;
        for (let j = 0; j < wordLength; j++) {
            masks[i] |= 1 << (word[j].charCodeAt() - 'a'.charCodeAt());
        }
    }
    let maxProd = 0;
    for (let i = 0; i < length; i++) {
        for (let j = i + 1; j < length; j++) {
            if ((masks[i] & masks[j]) === 0) {
                maxProd = Math.max(maxProd, words[i].length * words[j].length);
            }
        }
    }
    return maxProd;
};
