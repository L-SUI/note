// 在无限的整数序列 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...中找到第 n 个数字。
// 注意:
// n 是正数且在32位整数范围内 ( n < 231)。

// 示例 1:

// 输入:
// 3

// 输出:
// 3
// 示例 2:

// 输入:
// 11

// 输出:
// 0

// 说明:
// 第11个数字在序列 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ... 里是0，它是10的一部分。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/nth-digit
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number} n
 * @return {number}
 */
var findNthDigit = function(n) {
    if(n<10) return n;
    let i =1
    let sum = 9
    n-=sum
    let max = (Math.pow(10, i+1)-Math.pow(10, i))*(i+1)
    while(n>=max){
        i++
        sum = Math.pow(10, i)-1
        n-=max
        max = (Math.pow(10, i+1)-Math.pow(10, i))*(i+1)
    }
    let num = Math.floor((n-1)/(i+1))
    let res = sum+num+1
    if(n%(i+1)==0) return String(res)[String(res).length-1]
    return String(res)[n%(i+1)-1]
};

// console.log(findNthDigit(10))
// console.log(findNthDigit(11))
// console.log(findNthDigit(12))
console.log(findNthDigit(1000))