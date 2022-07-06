// 有个内含单词的超大文本文件，给定任意两个不同的单词，找出在这个文件中这两个单词的最短距离(相隔单词数)。如果寻找过程在这个文件中会重复多次，而每次寻找的单词不同，你能对此优化吗?

// 示例：

// 输入：words = ["I","am","a","student","from","a","university","in","a","city"], word1 = "a", word2 = "student"
// 输出：1
// 提示：

// words.length <= 100000


// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/find-closest-lcci
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



/**
 * @param {string[]} words
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
 var findClosest = function(words, word1, word2) {
    const length = words.length;
    let ans = length;
    let index1 = -1, index2 = -1;
    for (let i = 0; i < length; i++) {
        const word = words[i];
        if (word === word1) {
            index1 = i;
        } else if (word === word2) {
            index2 = i;
        }
        if (index1 >= 0 && index2 >= 0) {
            ans = Math.min(ans, Math.abs(index1 - index2));
        }
    }
    return ans;
};
