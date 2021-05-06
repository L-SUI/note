// 给你一个字符串数组 words ，只返回可以使用在 美式键盘 同一行的字母打印出来的单词。键盘如下图所示。

// 美式键盘 中：

// 第一行由字符 "qwertyuiop" 组成。
// 第二行由字符 "asdfghjkl" 组成。
// 第三行由字符 "zxcvbnm" 组成。


//  

// 示例 1：

// 输入：words = ["Hello","Alaska","Dad","Peace"]
// 输出：["Alaska","Dad"]
// 示例 2：

// 输入：words = ["omk"]
// 输出：[]
// 示例 3：

// 输入：words = ["adsdf","sfd"]
// 输出：["adsdf","sfd"]
//  

// 提示：

// 1 <= words.length <= 20
// 1 <= words[i].length <= 100
// words[i] 由英文字母（小写和大写字母）组成

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/keyboard-row
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



/**
 * @param {string[]} words
 * @return {string[]}
 */
 var findWords = function(words) {
    let map = {
        q:1,
        w:1,
        e:1,
        r:1,
        t:1,
        y:1,
        u:1,
        i:1,
        o:1,
        p:1,
        a:2,
        s:2,
        d:2,
        f:2,
        g:2,
        h:2,
        j:2,
        k:2,
        l:2,
        z:3,
        x:3,
        c:3,
        v:3,
        b:3,
        n:3,
        m:3,
    }
    let res = [];
    words.forEach(item=>{
        let i=1;
        let pre=map[item[0].toLowerCase()];
        res.push(item)
        while(i<item.length){
            if(pre!=map[item[i].toLowerCase()]){
                res.pop(item)
                break;
            }
            i++
        }
    })
    return res
};