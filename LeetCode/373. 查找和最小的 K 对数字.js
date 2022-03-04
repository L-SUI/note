// 给定两个以 升序排列 的整数数组 nums1 和 nums2 , 以及一个整数 k 。

// 定义一对值 (u,v)，其中第一个元素来自 nums1，第二个元素来自 nums2 。

// 请找到和最小的 k 个数对 (u1,v1),  (u2,v2)  ...  (uk,vk) 。

//  

// 示例 1:

// 输入: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
// 输出: [1,2],[1,4],[1,6]
// 解释: 返回序列中的前 3 对数：
//      [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]
// 示例 2:

// 输入: nums1 = [1,1,2], nums2 = [1,2,3], k = 2
// 输出: [1,1],[1,1]
// 解释: 返回序列中的前 2 对数：
//      [1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]
// 示例 3:

// 输入: nums1 = [1,2], nums2 = [3], k = 3 
// 输出: [1,3],[2,3]
// 解释: 也可能序列中所有的数对都被返回:[1,3],[2,3]
//  

// 提示:

// 1 <= nums1.length, nums2.length <= 105
// -109 <= nums1[i], nums2[i] <= 109
// nums1 和 nums2 均为升序排列
// 1 <= k <= 1000


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/find-k-pairs-with-smallest-sums
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[][]}
 */
 var kSmallestPairs = function(nums1, nums2, k) {
    m = nums1.length
    n = nums2.length
    /*二分查找第 k 小的数对和的大小*/
    let left = nums1[0] + nums2[0];
    let right = nums1[m - 1] + nums2[n - 1];
    let pairSum = right;
    while (left <= right) {
        const mid = left + ((right - left) >> 1);
        let cnt = 0;
        let start = 0;
        let end = n - 1;
        while (start < m && end >= 0) {
            if (nums1[start] + nums2[end] > mid) {
                end--;
            } else {
                cnt += end + 1;
                start++;
            }
        }
        if (cnt < k) {
            left = mid + 1;
        } else {
            pairSum = mid;
            right = mid - 1;
        }
    }

    const ans = [];
    let pos = n - 1;
    /*找到小于目标值 pairSum 的数对*/
    for (let i = 0; i < m; i++) {
        while (pos >= 0 && nums1[i] + nums2[pos] >= pairSum) {
            pos--;
        }
        for (let j = 0; j <= pos && k > 0; j++, k--) {
            const list = [];
            list.push(nums1[i]);
            list.push(nums2[j]);
            ans.push(list);
        }
    }

    /*找到等于目标值 pairSum 的数对*/
    pos = n - 1;
    for (let i = 0; i < m && k > 0; i++) {
        while (pos >= 0 && nums1[i] + nums2[pos] > pairSum) {
            pos--;
        }
        for (let j = i; k > 0 && j >= 0 && nums1[j] + nums2[pos] == pairSum; j--, k--) {
            const list = [];
            list.push(nums1[i]);
            list.push(nums2[pos]);
            ans.push(list);
        }
    }
    return ans;
}