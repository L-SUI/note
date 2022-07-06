// 给你一个 严格升序排列 的正整数数组 arr 和一个整数 k 。

// 请你找到这个数组里第 k 个缺失的正整数。

//  

// 示例 1：

// 输入：arr = [2,3,4,7,11], k = 5
// 输出：9
// 解释：缺失的正整数包括 [1,5,6,8,9,10,12,13,...] 。第 5 个缺失的正整数为 9 。
// 示例 2：

// 输入：arr = [1,2,3,4], k = 2
// 输出：6
// 解释：缺失的正整数包括 [5,6,7,...] 。第 2 个缺失的正整数为 6 。
//  

// 提示：

// 1 <= arr.length <= 1000
// 1 <= arr[i] <= 1000
// 1 <= k <= 1000
// 对于所有 1 <= i < j <= arr.length 的 i 和 j 满足 arr[i] < arr[j] 
//  

// 进阶：

// 你可以设计一个时间复杂度小于 O(n) 的算法解决此问题吗？



// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/kth-missing-positive-number
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
 var findKthPositive = function(arr, k) {
    let missCount = 0, lastMiss = -1, current = 1, ptr = 0; 
    for (missCount = 0; missCount < k; ++current) {
        if (current == arr[ptr]) {
            ptr = (ptr + 1 < arr.length) ? ptr + 1 : ptr;
        } else {
            ++missCount;
            lastMiss = current;
        }
    }
    return lastMiss;
};
