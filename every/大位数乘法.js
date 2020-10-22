// 函数实现一个大位数乘法，可以计算出诸如1865459497823＊6349526719336的结果

// 力扣（LeetCode）43. 字符串相乘
// https://leetcode-cn.com/problems/multiply-strings
// 同解

function largeMultiplication (a, b) {
    a = String(a)
    b = String(b)
    let result = '';
    let i = a.length-1;
    while (i >= 0){
        let count = 0;
        let current = ''
        for (let index = i; index < a.length-1; index++) current +='0'
        let j = b.length-1;
        while(j>=0){
            let sum = a[i]*b[j];
            current = (sum+count)%10+current
            count = Math.floor((sum+count)/10)
            j--
        }
        current=count+current
        if(result.length==0) {
            result = current
        }else {
            let temp = '';
            let z = 0;
            let x = current.length-1;
            let y = result.length-1;
            while(x>=0 || y>=0){
                let ry = result[y]==undefined?0:result[y];
                let cx = current[x]==undefined?0:current[x];
                let num = cx*1+ry*1;
                temp = (num+z)%10+temp;
                z = Math.floor((num+z)/10)
                x--;
                y--;
            }
            result = z+temp;
        }
        i--;
    }
    while(result[0]==0 && result.length!=1) result = result.slice(1)
    return result;
}
console.log(largeMultiplication(497823,19336))
console.log(largeMultiplication(22,22))
console.log(largeMultiplication(1865459497823,6349526719336))