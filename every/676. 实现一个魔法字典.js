// 设计一个使用单词列表进行初始化的数据结构，单词列表中的单词 互不相同 。 如果给出一个单词，请判定能否只将这个单词中一个字母换成另一个字母，使得所形成的新单词存在于你构建的字典中。

// 实现 MagicDictionary 类：

// MagicDictionary() 初始化对象
// void buildDict(String[] dictionary) 使用字符串数组 dictionary 设定该数据结构，dictionary 中的字符串互不相同
// bool search(String searchWord) 给定一个字符串 searchWord ，判定能否只将字符串中 一个 字母换成另一个字母，使得所形成的新字符串能够与字典中的任一字符串匹配。如果可以，返回 true ；否则，返回 false 。
//  

// 示例：

// 输入
// ["MagicDictionary", "buildDict", "search", "search", "search", "search"]
// [[], [["hello", "leetcode"]], ["hello"], ["hhllo"], ["hell"], ["leetcoded"]]
// 输出
// [null, null, false, true, false, false]

// 解释
// MagicDictionary magicDictionary = new MagicDictionary();
// magicDictionary.buildDict(["hello", "leetcode"]);
// magicDictionary.search("hello"); // 返回 False
// magicDictionary.search("hhllo"); // 将第二个 'h' 替换为 'e' 可以匹配 "hello" ，所以返回 True
// magicDictionary.search("hell"); // 返回 False
// magicDictionary.search("leetcoded"); // 返回 False
//  

// 提示：

// 1 <= dictionary.length <= 100
// 1 <= dictionary[i].length <= 100
// dictionary[i] 仅由小写英文字母组成
// dictionary 中的所有字符串 互不相同
// 1 <= searchWord.length <= 100
// searchWord 仅由小写英文字母组成
// buildDict 仅在 search 之前调用一次
// 最多调用 100 次 search

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/implement-magic-dictionary
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




var MagicDictionary = function() {
    this.root = new Trie();
};

MagicDictionary.prototype.buildDict = function(dictionary) {
    for (const word of dictionary) {
        let cur = this.root;
        for (let i = 0; i < word.length; ++i) {
            const ch = word[i];
            const idx = ch.charCodeAt() - 'a'.charCodeAt();
            if (!cur.child[idx]) {
                cur.child[idx] = new Trie();
            }
            cur = cur.child[idx];
        }
        cur.isFinished = true;
    }
};

MagicDictionary.prototype.search = function(searchWord) {
    return dfs(searchWord, this.root, 0, false);
};

const dfs = (searchWord, node, pos, modified) => {
    if (pos === searchWord.length) {
        return modified && node.isFinished;
    }
    let idx = searchWord[pos].charCodeAt() - 'a'.charCodeAt();
    if (node.child[idx]) {
        if (dfs(searchWord, node.child[idx], pos + 1, modified)) {
            return true;
        }
    }
    if (!modified) {
        for (let i = 0; i < 26; ++i) {
            if (i !== idx && node.child[i]) {
                if (dfs(searchWord, node.child[i], pos + 1, true)) {
                    return true;
                }
            }
        }
    }
    return false;
}

class Trie {
    constructor() {
        this.isFinished = false;
        this.child = new Array(26).fill(0);
    }
}
