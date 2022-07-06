// 对于某些固定的 N，如果数组 A 是整数 1, 2, ..., N 组成的排列，使得：

// 对于每个 i < j，都不存在 k 满足 i < k < j 使得 A[k] * 2 = A[i] + A[j]。

// 那么数组 A 是漂亮数组。

//  

// 给定 N，返回任意漂亮数组 A（保证存在一个）。

//  

// 示例 1：

// 输入：4
// 输出：[2,1,4,3]
// 示例 2：

// 输入：5
// 输出：[3,1,2,5,4]
//  

// 提示：

// 1 <= N <= 1000

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/beautiful-array
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



/**
 * @param {number} n
 * @return {number[]}
 */
/**
 * @param {number} N
 * @return {number[]}
 */
 var beautifulArray = function(N) {

    let memo=new Map()
    const f=(n)=>{
         if (memo.has(n)) {
             return memo.get(n)
         }
         let ans=new Array(n)
         if (n==1) {
             ans[0]=1
         }else{
             let t=0
             let l=f(Math.ceil(n/2))  //奇数个数，，
             l.forEach((v)=>ans[t++]=2*v-1)
             let r=f(Math.floor(n/2))  //偶数
             r.forEach((v)=>ans[t++]=2*v)
         }
         memo.set(n,ans)
         return ans
    }
    return f(N)
};