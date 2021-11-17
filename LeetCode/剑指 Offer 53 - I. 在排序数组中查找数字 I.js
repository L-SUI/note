// 统计一个数字在排序数组中出现的次数。

//  

// 示例 1:

// 输入: nums = [5,7,7,8,8,10], target = 8
// 输出: 2
// 示例 2:

// 输入: nums = [5,7,7,8,8,10], target = 6
// 输出: 0
//  

// 限制：

// 0 <= 数组长度 <= 50000



// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
 var search = function(nums, target) {
    let count=0;
    let i=0,len=nums.length-1;
    while(i<=len){
        let mid = (i+len)>>1;
        if(nums[mid]>target){
            len = mid-1
        }else if(nums[mid]<target){
            i=mid+1
        }else{
            count++
            let left = mid;
            while(nums[++left]==target) count++
            let right = mid;
            while(nums[--right]==target) count++
            return count
        }
    }
    return count
};