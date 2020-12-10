// Web前端笔试题	时间：25分钟

// 实现addBinary函数，要求如下：
// 给定两个长度相等的二进制字符串，返回他们的和（用二进制表示）。
// 输入为非空字符串且只包含数字1和0。
// 不允许使用进制转换函数。
// 只要思路正确即可，不要求代码运行通过。
// 允许适当使用伪代码。
// 示例：addBinary("1010", "1011") === "10101"

function addBinary(str1,str2) {
    let res = '';
    let count = 0;
    for (let i = str1.length-1; i >=0 ;i--){
        let curr1 = str1[i]*1;
        let curr2 = str2[i]*1;
        let sum = curr1+curr2+count;
        count =0;
        if(sum<2){
            res = sum+res
        }else{
            res = sum%2+res
            count++
        }
    }
    if(count>0) res = 1+res
    return res
}
console.log(addBinary("1010","1011"))