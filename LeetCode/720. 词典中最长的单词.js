// 给出一个字符串数组words组成的一本英语词典。从中找出最长的一个单词，该单词是由words词典中其他单词逐步添加一个字母组成。若其中有多个可行的答案，则返回答案中字典序最小的单词。

// 若无答案，则返回空字符串。

//  

// 示例 1：

// 输入：
// words = ["w","wo","wor","worl", "world"]
// 输出："world"
// 解释： 
// 单词"world"可由"w", "wo", "wor", 和 "worl"添加一个字母组成。
// 示例 2：

// 输入：
// words = ["a", "banana", "app", "appl", "ap", "apply", "apple"]
// 输出："apple"
// 解释：
// "apply"和"apple"都能由词典中的单词组成。但是"apple"的字典序小于"apply"。
//  

// 提示：

// 所有输入的字符串都只包含小写字母。
// words数组长度范围为[1,1000]。
// words[i]的长度范围为[1,30]。


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/longest-word-in-dictionary
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




/**
 * @param {string[]} words
 * @return {string}
 */
 var longestWord = function(words) {
    let res = ''
    let set = new Set(words)
    for(let w of words){
      if (w.length < res.length || w.length === res.length && w > res) continue
      let flag = true
      for(let i = 1; i < w.length; i++){  // 判断每个前缀是否在words中
        if (!set.has( w.slice(0, i) )) {
          flag = false
          break
        }
      }
      if (flag) res = w
    }
    return res
  };