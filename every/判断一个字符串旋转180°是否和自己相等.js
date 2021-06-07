// 算法：给你一个纯数字字符串，判断旋转180度之后是否和自己相等，
// ‘121‘ 输出 false，因为2旋转之后不是数字，'1691' => true 
// 因为1691选装180度还是1691， 1991 => false 因为1991旋转
// 之后是1661

function isEqual(str){
    const map = {
        0:0,1:1,8:8,9:6,6:9
    };
    let i=0,len = str.length-1;
    while(i<=len){
        if(i==len) return true;
        if(map[str[i]]==str[len]&&map[str[len--]]==str[i++]) continue
        else return false;
    }
    return true;
}
console.log(isEqual('10201'))
console.log(isEqual('102201'))
console.log(isEqual('106901'))
console.log(isEqual('1062901'))