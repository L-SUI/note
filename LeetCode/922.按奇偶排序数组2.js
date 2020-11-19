// 给定一个非负整数数组 A， A 中一半整数是奇数，一半整数是偶数。
// 对数组进行排序，以便当 A[i] 为奇数时，i 也是奇数；当 A[i] 为偶数时， i 也是偶数。
// 你可以返回任何满足上述条件的数组作为答案。

// 示例：

// 输入：[4,2,5,7]
// 输出：[4,5,2,7]
// 解释：[4,7,2,5]，[2,5,4,7]，[2,7,4,5] 也会被接受。
//  

// 提示：

// 2 <= A.length <= 20000
// A.length % 2 == 0
// 0 <= A[i] <= 1000

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/sort-array-by-parity-ii
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortArrayByParityII = function(A) {
    let res = [];
    let left = [];
    let right = [];
    A.forEach(item=>{
        if(item%2==0) right.push(item)
        else left.push(item)
    })
    while(left.length) {
        res.push(right.shift(),left.shift())
    }
    return res
};


/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortArrayByParityII = function(A) {
    let i=0;
    while(i<A.length){
        let curr = A[i]
        if(curr%2==i%2){
            i++
        }else {
            let j=i+1
            while(A[j]%2!=i%2) j++
            [A[i],A[j]]=[A[j],A[i]]
            i++
        }
    }
    return A
};


/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortArrayByParityII = function(A) {
    const n  = A.length;
    const ans = new Array(n);
    let i = 0;
    for (const x of A) {
        if (!(x & 1)) {
            ans[i] = x;
            i += 2;
        } 
    }

    i = 1;
    for (const x of A) {
        if (x & 1) {
            ans[i] = x;
            i += 2;
        }
    }

    return ans;
};


/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortArrayByParityII = function(A) {
    const n  = A.length;
    let j = 1;
    for (let i = 0; i < n; i += 2) {
        if (A[i] & 1) {
            while (A[j] & 1) {
                j += 2;
            }
            [A[i],A[j]]=[A[j],A[i]]
        }
    }   
    return A;
};