// 写一个算法 
// 实现一个字符串的规则解析：
// 例子：a(b)<2>c 输出：abbc，
// a(b(c)<3>de)<2>f 输出abcccdebcccdef；
// ()代表重复内容，<>代表重复的次数

function compareString(str) {
    let result = '';
    function symbol(char) {
        let res = '';
        let index = char.lastIndexOf('<')
        let num = Number(char.slice(index + 1, char.length - 1))
        for (let i = 0; i < num; i++) {
            res += compareString(char.slice(1, index - 1))
        }
        return res
    }
    let i = 0;
    let j = 0;
    let flag = true;
    let count = 0;
    let temp = 0;
    while (j < str.length) {
        if (flag) {
            if (str[j] != '(') {
                result += str[j]
            } else {
                flag = false;
                i = j;
                count++;
            }
        } else {
            if (str[j] == '(') {
                count++;
            } else if (str[j] == ')') {
                count--
            } else if (str[j] == '<') {
                temp++;
            } else if (str[j] == '>') {
                if (--temp == 0 && count == 0) {
                    result += symbol(str.slice(i, j + 1));
                    flag = true;
                }
            }
        }
        j++;
    }
    return result;
}

console.log(compareString('a(b)<2>c'))
console.log(compareString('a(b(c)<3>de)<2>f'))