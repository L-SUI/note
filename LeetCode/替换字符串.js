// 替换字符串 空格替换成%20

replaceSpaces = function (str) {
    let res = '';
    for (let i = 0; i < str.length;i++){
        if(str[i] === ' '){
            res += '%20'  
        }else{
            res += str[i]
        }
    }
    return res;
}
console.log(replaceSpaces('we Are you sure you want to'))