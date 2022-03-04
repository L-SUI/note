// 给定一个表示整数的字符串 n ，返回与它最近的回文整数（不包括自身）。如果不止一个，返回较小的那个。

// “最近的”定义为两个整数差的绝对值最小。

//  

// 示例 1:

// 输入: n = "123"
// 输出: "121"
// 示例 2:

// 输入: n = "1"
// 输出: "0"
// 解释: 0 和 2是最近的回文，但我们返回最小的，也就是 0。
//  

// 提示:

// 1 <= n.length <= 18
// n 只由数字组成
// n 不含前导 0
// n 代表在 [1, 1018 - 1] 范围内的整数

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/find-the-closest-palindrome
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




/**
 * @param {string} n
 * @return {string}
 */
/**
 * @param {string} n
 * @return {string}
 */
 var nearestPalindromic = function(n) {
    getBigInt = function(orignal, v) {
        for(;orignal > 0; orignal /= 10n)
            v = 10n * v + orignal % 10n
        return v
    }

    const len = n.length, nVal = BigInt(n)
    if(len == 1)
        return nVal - 1n + ''
    const half = BigInt(n.substr(0, (len + 1) >> 1)), ans = new Set()
    ans.add(BigInt(Math.pow(10, len - 1) - 1))
    ans.add(BigInt(Math.pow(10, len) + 1))
    if(len & 1 == 1) {
        ans.add(getBigInt((half+1n)/10n, half + 1n))
        ans.add(getBigInt(half/10n, half))
        ans.add(getBigInt((half-1n)/10n, half - 1n))
    } else {
        ans.add(getBigInt(half + 1n, half + 1n))
        ans.add(getBigInt(half, half))
        ans.add(getBigInt(half - 1n, half - 1n))
    }
    let res = -1
    for(const other of ans) {
        if(other != nVal) {
            if(res == -1)
                res = other
            let o = other - nVal, r = res - nVal
            if(o < 0)
                o *= -1n
            if(r < 0)
                r *= -1n
            if(o < r || (other < res && o == r))
                res = other
        }
    }
    return res + ''
};
