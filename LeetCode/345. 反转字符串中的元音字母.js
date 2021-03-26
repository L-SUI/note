// 编写一个函数，以字符串作为输入，反转该字符串中的元音字母。

//  

// 示例 1：

// 输入："hello"
// 输出："holle"
// 示例 2：

// 输入："leetcode"
// 输出："leotcede"
//  

// 提示：

// 元音字母不包含字母 "y" 。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/reverse-vowels-of-a-string
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function(s) {
    let i=0,len=s.length-1;
    let obj={a:1,e:1,i:1,o:1,u:1,A:1,E:1,I:1,O:1,U:1}
    s=s.split('')
    while(i<len){
        if(obj[s[i]]&&obj[s[len]]){
            [s[i],s[len]] = [s[len],s[i]]
            i++
            len--
        }else if(obj[s[i]]&&!obj[s[len]]){
            len--
        }else {
            i++
        }
    }
    return s.join('')
};
