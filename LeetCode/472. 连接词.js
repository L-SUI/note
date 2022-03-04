// 给你一个 不含重复 单词的字符串数组 words ，请你找出并返回 words 中的所有 连接词 。

// 连接词 定义为：一个完全由给定数组中的至少两个较短单词组成的字符串。

//  

// 示例 1：

// 输入：words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]
// 输出：["catsdogcats","dogcatsdog","ratcatdogcat"]
// 解释："catsdogcats" 由 "cats", "dog" 和 "cats" 组成; 
//      "dogcatsdog" 由 "dog", "cats" 和 "dog" 组成; 
//      "ratcatdogcat" 由 "rat", "cat", "dog" 和 "cat" 组成。
// 示例 2：

// 输入：words = ["cat","dog","catdog"]
// 输出：["catdog"]
//  

// 提示：

// 1 <= words.length <= 104
// 0 <= words[i].length <= 1000
// words[i] 仅由小写字母组成
// 0 <= sum(words[i].length) <= 105

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/concatenated-words
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




/**
 * @param {string[]} words
 * @return {string[]}
 */
/**
 * @param {string[]} words
 * @return {string[]}
 */
 var findAllConcatenatedWordsInADict = function(words) {
    const root = new Trie(), ans = new Array()
    words.sort((a,b)=>(a.length - b.length))
    for(const word of words){
        if(word.length == 0)
            continue
        if(root.find(root, word))
            ans.push(word)
        else
            root.insert(word)
    }
    return ans
};

class Trie{
    constructor(){
        this.children = new Array(26)
        this.isEnd = false
    }

    insert(word){
        let node = this
        for(let i=0;i<word.length;i++){
            const idx = word.charCodeAt(i) - 'a'.charCodeAt(0)
            if(node.children[idx] === undefined)
                node.children[idx] = new Trie()
            node = node.children[idx]
        }
        node.isEnd = true
    };

    find(root, word){
        let node = root
        for(let i=0;i<word.length;i++){
            if(node.isEnd)
                if(this.find(root, word.substring(i, word.length)))
                    return true
            const idx = word.charCodeAt(i) - 'a'.charCodeAt(0)
            if(node.children[idx] === undefined)
                return false
            node = node.children[idx]
        }
        return node.isEnd
    }
}
