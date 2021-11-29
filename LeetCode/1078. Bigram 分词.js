// 给出第一个词 first 和第二个词 second，考虑在某些文本 text 中可能以 "first second third" 形式出现的情况，其中 second 紧随 first 出现，third 紧随 second 出现。

// 对于每种这样的情况，将第三个词 "third" 添加到答案中，并返回答案。

//  

// 示例 1：

// 输入：text = "alice is a good girl she is a good student", first = "a", second = "good"
// 输出：["girl","student"]
// 示例 2：

// 输入：text = "we will we will rock you", first = "we", second = "will"
// 输出：["we","rock"]
//  

// 提示：

// 1 <= text.length <= 1000
// text 由一些用空格分隔的单词组成，每个单词都由小写英文字母组成
// 1 <= first.length, second.length <= 10
// first 和 second 由小写英文字母组成


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/occurrences-after-bigram
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




/**
 * @param {string} text
 * @param {string} first
 * @param {string} second
 * @return {string[]}
 */
/**
 * @param {string} text
 * @param {string} first
 * @param {string} second
 * @return {string[]}
 */
 var findOcurrences = function (text, first, second) {
    let ans = [];
    let arr = text.split(' ');
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === first && arr[i + 1] && arr[i + 1] === second && arr[i + 2]) {
            ans.push(arr[i + 2])
        }
    }
    return ans
};