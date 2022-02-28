// 给你一个正整数数组 nums，请你移除 最短 子数组（可以为 空），使得剩余元素的 和 能被 p 整除。 不允许 将整个数组都移除。

// 请你返回你需要移除的最短子数组的长度，如果无法满足题目要求，返回 -1 。

// 子数组 定义为原数组中连续的一组元素。

//  

// 示例 1：

// 输入：nums = [3,1,4,2], p = 6
// 输出：1
// 解释：nums 中元素和为 10，不能被 p 整除。我们可以移除子数组 [4] ，剩余元素的和为 6 。
// 示例 2：

// 输入：nums = [6,3,5,2], p = 9
// 输出：2
// 解释：我们无法移除任何一个元素使得和被 9 整除，最优方案是移除子数组 [5,2] ，剩余元素为 [6,3]，和为 9 。
// 示例 3：

// 输入：nums = [1,2,3], p = 3
// 输出：0
// 解释：和恰好为 6 ，已经能被 3 整除了。所以我们不需要移除任何元素。
// 示例  4：

// 输入：nums = [1,2,3], p = 7
// 输出：-1
// 解释：没有任何方案使得移除子数组后剩余元素的和被 7 整除。
// 示例 5：

// 输入：nums = [1000000000,1000000000,1000000000], p = 3
// 输出：0
//  

// 提示：

// 1 <= nums.length <= 105
// 1 <= nums[i] <= 109
// 1 <= p <= 109


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/make-sum-divisible-by-p
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




/**
 * @param {number[]} nums
 * @param {number} p
 * @return {number}
 */
/**
 * @param {number[]} nums
 * @param {number} p
 * @return {number}
 */
var minSubarray = function(nums, p) {
    const L = nums.length;
    let count = nums.reduce((a, b) => a + b, 0)% p;
    if (count == 0) return 0;
    const map = new Map;
    let curCount = 0,res = Infinity;
    map.set(0,-1);
    for( let i = 0 ; i < L ; i++ ){
        curCount += nums[i];
        const curPos = (curCount - count + p) % p;
        if( map.has(curPos) ){
            res = Math.min(res, i - map.get(curPos));
            if( res == 1 && L > 1 ) return res; 
        }
        map.set(curCount % p,i);
    }
    res >= L && (res = Infinity);
    return res === Infinity ? -1 : res;
}
console.log(minSubarray([1,8,6,4,5],7))