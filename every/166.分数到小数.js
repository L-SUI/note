// 给定两个整数，分别表示分数的分子 numerator 和分母 denominator，以字符串形式返回小数。

// 如果小数部分为循环小数，则将循环的部分括在括号内。

// 示例 1:

// 输入: numerator = 1, denominator = 2
// 输出: "0.5"
// 示例 2:

// 输入: numerator = 2, denominator = 1
// 输出: "2"
// 示例 3:

// 输入: numerator = 2, denominator = 3
// 输出: "0.(6)"

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/fraction-to-recurring-decimal
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


/**
 * @param {number} numerator
 * @param {number} denominator
 * @return {string}
 */
var fractionToDecimal = function(numerator, denominator) {
    if(numerator%denominator==0) return String(numerator/denominator)
    let fraction = {}
    let Decimal = []
    let integer = '';
    if(numerator>denominator) {
        integer+=(numerator-numerator%denominator)/denominator
        integer+='.'
        numerator=numerator%denominator
    }else {
        integer = '0.'
    }
    let count = 1;
    while (numerator%denominator!=0){
        numerator*=10
        let current = '';
        while (numerator<denominator) {
            current+=0;
            numerator*=10;
        }
        if(numerator%denominator==0){
            current+=numerator/denominator
            return integer+Decimal.join('')+current
        }else{
            let num = (numerator-numerator%denominator)/denominator
            current+=num
            if(fraction[current] && fraction[current][1]==`${numerator%denominator}-${num}`) {
                let after = Decimal.slice(0,fraction[current][0]-1).join('')
                return integer+after
                +'('+Decimal.slice(fraction[current][0]-1).join('')+')';
            }else{
                Decimal.push(current)
                fraction[current] = [count,`${numerator%denominator}-${num}`];
                count++
            }
            numerator=numerator%denominator
        }
    }
};
console.log(fractionToDecimal(1, 243),1/243);
console.log(fractionToDecimal(1, 253),1/253);
console.log(fractionToDecimal(1, 2),1/2);
console.log(fractionToDecimal(2, 1),2/1);
console.log(fractionToDecimal(1, 3),1/3);
console.log(fractionToDecimal(1, 7),1/7);
console.log(fractionToDecimal(1, 333),1/333); 
console.log(fractionToDecimal(192901232966821, 1562500000000000),192901232966821/1562500000000000); 