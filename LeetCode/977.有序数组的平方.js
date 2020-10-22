// 给定一个按非递减顺序排序的整数数组 A，返回每个数字的平方组成的新数组，要求也按非递减顺序排序。

// 示例 1：

// 输入：[-4,-1,0,3,10]
// 输出：[0,1,9,16,100]
// 示例 2：

// 输入：[-7,-3,2,3,11]
// 输出：[4,9,9,49,121]
//  

// 提示：

// 1 <= A.length <= 10000
// -10000 <= A[i] <= 10000
// A 已按非递减顺序排序。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/squares-of-a-sorted-array
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


/**
 * @param {number[]} A
 * @return {number[]}
 */
// var sortedSquares = function(A) {
//     A.sort((a,b)=>Math.abs(a)-Math.abs(b))
//     return A.map(item=>item*item)
// };

var sortedSquares = function(A) {
    if(A[0]>=0) return A.map(item=>item*item)
    if(A[A.length-1]<=0) return A.map(item=>item*item).reverse();
    let left=0,right=0;
    while(true){
        if(A[left+1]>=0) {
            right=left+1;
            break
        }else{
            left++
        }
    }
    let res = [];
    while(left>=0||right<A.length){
        if(left==-1){
            res.push(A[right]*A[right])
            right++
            continue
        }
        if(right ==A.length ){
            res.push(A[left]*A[left])
            left--
            continue
        }
        let leftSum = A[left]*A[left]
        let rightSum = A[right]*A[right]
        if(leftSum>rightSum) {
            res.push(A[right]*A[right])
            right++
        }else{
            res.push(A[left]*A[left])
            left--
        }
    }
    return res
};