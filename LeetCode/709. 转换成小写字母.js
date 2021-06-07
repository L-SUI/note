// 给你一个字符串 s ，将该字符串中的大写字母转换成相同的小写字母，返回新的字符串。

//  

// 示例 1：

// 输入：s = "Hello"
// 输出："hello"
// 示例 2：

// 输入：s = "here"
// 输出："here"
// 示例 3：

// 输入：s = "LOVELY"
// 输出："lovely"
//  

// 提示：

// 1 <= s.length <= 100
// s 由 ASCII 字符集中的可打印字符组成

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/to-lower-case
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



/**
 * @param {string} s
 * @return {string}
 */
 var toLowerCase = function(s) {
    let res = '';
    let i=0;
    while(i<s.length){
        res+=s[i].toLowerCase()
        i++
    }
    return res;
};