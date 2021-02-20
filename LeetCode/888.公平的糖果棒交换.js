
// 示例 4：

// 输入：A = [1,2,5], B = [2,4]
// 输出：[5,4]
//  

// 提示：

// 1 <= A.length <= 10000
// 1 <= B.length <= 10000
// 1 <= A[i] <= 100000
// 1 <= B[i] <= 100000
// 保证爱丽丝与鲍勃的糖果总量不同。
// 答案肯定存在。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/fair-candy-swap
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number[]}
 */
var fairCandySwap = function(A, B) {
    const sumA = _.sum(A), sumB = _.sum(B);
    const delta = Math.floor((sumA - sumB) / 2);
    const rec = new Set(A);
    var ans;
    for (const y of B) {
        const x = y + delta;
        if (rec.has(x)) {
            ans = [x, y];
            break;
        }
    }
    return ans;
};

// 作者：LeetCode-Solution
// 链接：https://leetcode-cn.com/problems/fair-candy-swap/solution/gong-ping-de-tang-guo-jiao-huan-by-leetc-tlam/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。