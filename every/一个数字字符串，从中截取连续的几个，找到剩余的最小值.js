// 一个数字字符串，从中截取连续的几个，找到剩余的最小值
/*
例子： str = '12345', n = 2, 最小值为123
例子： str = '105000' n = 1, 最小值位500
*/

function spliceToMin (str, n) {
    let min = Infinity,i=-1,len = str.length;
    while (++i<=len-n) (min = Math.min(min,(str.slice(0,i)+str.slice(i+n))))
    return min;
}
console.log(spliceToMin('12345',2))
console.log(spliceToMin('10500',1))