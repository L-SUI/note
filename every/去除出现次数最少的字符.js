// 去除字符串中出现次数最少的字符，不改变原字符串的顺序。
// 例：“ababac” —— “ababa”
// “aaabbbcceeff” —— “aaabbb”

/*
* @param {String}
* @return {String}
*/
function deleteMin (str){
    let i = 0, map= {},res = '';
    while (i < str.length){
        map[str[i]] = map[str[i]]?map[str[i]]+1:1
        i++
    }
    let min = map[str[0]];
    for (const key in map){
        if(map[key]<min) {
            min = map[key];
        }
    }
    i = 0;
    while (i < str.length){
        if(map[str[i]]!=min) res+=str[i]
        i++
    }
    return res;
}
console.log(deleteMin('ababac'))
console.log(deleteMin('aaabbbcceeff'))