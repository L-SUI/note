// 请你设计一个数据结构，支持 添加新单词 和 查找字符串是否与任何先前添加的字符串匹配 。

// 实现词典类 WordDictionary ：

// WordDictionary() 初始化词典对象
// void addWord(word) 将 word 添加到数据结构中，之后可以对它进行匹配
// bool search(word) 如果数据结构中存在字符串与 word 匹配，则返回 true ；否则，返回  false 。word 中可能包含一些 '.' ，每个 . 都可以表示任何一个字母。
//  

// 示例：

// 输入：
// ["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
// [[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
// 输出：
// [null,null,null,null,false,true,true,true]

// 解释：
// WordDictionary wordDictionary = new WordDictionary();
// wordDictionary.addWord("bad");
// wordDictionary.addWord("dad");
// wordDictionary.addWord("mad");
// wordDictionary.search("pad"); // return False
// wordDictionary.search("bad"); // return True
// wordDictionary.search(".ad"); // return True
// wordDictionary.search("b.."); // return True
//  

// 提示：

// 1 <= word.length <= 500
// addWord 中的 word 由小写英文字母组成
// search 中的 word 由 '.' 或小写英文字母组成
// 最多调用 50000 次 addWord 和 search

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/design-add-and-search-words-data-structure
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。





var WordDictionary = function() {
    this.trieRoot = new TrieNode();
};

WordDictionary.prototype.addWord = function(word) {
    this.trieRoot.insert(word);
};

WordDictionary.prototype.search = function(word) {
    const dfs = (index, node) => {
        if (index === word.length) {
            return node.isEnd;
        }
        const ch = word[index];
        if (ch !== '.') {
            const child = node.children[ch.charCodeAt() - 'a'.charCodeAt()]
            if (child && dfs(index + 1, child)) {
                return true;
            }
        } else {
            for (const child of node.children) {
                if (child && dfs(index + 1, child)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    return dfs(0, this.trieRoot);
};

class TrieNode {
    constructor() {
        this.children = new Array(26).fill(0);
        this.isEnd = false;
    }

    insert(word) {
        let node = this;
        for (let i = 0; i < word.length; i++) {
            const ch = word[i];
            const index = ch.charCodeAt() - 'a'.charCodeAt();
            if (node.children[index] === 0) {
                node.children[index] = new TrieNode();
            }
            node = node.children[index];
        }
        node.isEnd = true;
    }

    getChildren() {
        return this.children;
    }

    isEnd() {
        return this.isEnd;
    }
}
