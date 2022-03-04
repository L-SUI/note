// 累加数 是一个字符串，组成它的数字可以形成累加序列。

// 一个有效的 累加序列 必须 至少 包含 3 个数。除了最开始的两个数以外，字符串中的其他数都等于它之前两个数相加的和。

// 给你一个只包含数字 '0'-'9' 的字符串，编写一个算法来判断给定输入是否是 累加数 。如果是，返回 true ；否则，返回 false 。

// 说明：累加序列里的数 不会 以 0 开头，所以不会出现 1, 2, 03 或者 1, 02, 3 的情况。

//  

// 示例 1：

// 输入："112358"
// 输出：true 
// 解释：累加序列为: 1, 1, 2, 3, 5, 8 。1 + 1 = 2, 1 + 2 = 3, 2 + 3 = 5, 3 + 5 = 8
// 示例 2：

// 输入："199100199"
// 输出：true 
// 解释：累加序列为: 1, 99, 100, 199。1 + 99 = 100, 99 + 100 = 199
//  

// 提示：

// 1 <= num.length <= 35
// num 仅由数字（0 - 9）组成
//  

// 进阶：你计划如何处理由过大的整数输入导致的溢出?



// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/additive-number
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。





/**
 * @param {string} num
 * @return {boolean}
 */
 var isAdditiveNumber = function(num) {
    const n = num.length;
    for (let secondStart = 1; secondStart < n - 1; ++secondStart) {
        if (num[0] === '0' && secondStart !== 1) {
            break;
        }
        for (let secondEnd = secondStart; secondEnd < n - 1; ++secondEnd) {
            if (num[secondStart] === '0' && secondStart !== secondEnd) {
                break;
            }
            if (valid(secondStart, secondEnd, num)) {
                return true;
            }
        }
    }
    return false;
};

const valid = (secondStart, secondEnd, num) => {
    const n = num.length;
    let firstStart = 0, firstEnd = secondStart - 1;
    while (secondEnd <= n - 1) {
        const third = stringAdd(num, firstStart, firstEnd, secondStart, secondEnd);
        const thirdStart = secondEnd + 1;
        const thirdEnd = secondEnd + third.length;
        if (thirdEnd >= n || num.slice(thirdStart, thirdEnd + 1) !== third) {
            break;
        }
        if (thirdEnd === n - 1) {
            return true;
        }
        firstStart = secondStart;
        firstEnd = secondEnd;
        secondStart = thirdStart;
        secondEnd = thirdEnd;
    }
    return false;
}

const stringAdd = (s, firstStart, firstEnd, secondStart, secondEnd) => {
    const third = [];
    let carry = 0, cur = 0;
    while (firstEnd >= firstStart || secondEnd >= secondStart || carry !== 0) {
        cur = carry;
        if (firstEnd >= firstStart) {
            cur += s[firstEnd].charCodeAt() - '0'.charCodeAt();
            --firstEnd;
        }
        if (secondEnd >= secondStart) {
            cur += s[secondEnd].charCodeAt() - '0'.charCodeAt();
            --secondEnd;
        }
        carry = Math.floor(cur / 10);
        cur %= 10;
        third.push(String.fromCharCode(cur + '0'.charCodeAt()));
    }
    third.reverse();
    return third.join('');
}
