// 设计一个算法，找出数组中最小的k个数。以任意顺序返回这k个数均可。

// 示例：

// 输入： arr = [1,3,5,7,2,4,6,8], k = 4
// 输出： [1,2,3,4]
// 提示：

// 0 <= len(arr) <= 100000
// 0 <= k <= min(100000, len(arr))

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/smallest-k-lcci
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
 var smallestK = function(arr, k) {
    randomizedSelected(arr, 0, arr.length - 1, k);
    return arr.slice(0, k);
}

const randomizedSelected = (arr, l, r, k) => {
    if (l >= r) {
        return;
    }
    const pos = randomizedPartition(arr, l, r);
    const num = pos - l + 1;
    if (k === num) {
        return;
    } else if (k < num) {
        randomizedSelected(arr, l, pos - 1, k);
    } else {
        randomizedSelected(arr, pos + 1, r, k - num);
    }
}

// 基于随机的划分
const randomizedPartition = (nums, l, r) => {
    const i = parseInt(Math.random() * (r - l + 1)) + l;
    swap(nums, r, i);
    return partition(nums, l, r);
}

const partition = (nums, l, r) => {
    const pivot = nums[r];
    let i = l - 1;
    for (let j = l; j <= r - 1; ++j) {
        if (nums[j] <= pivot) {
            i = i + 1;
            swap(nums, i, j);
        }
    }
    swap(nums, i + 1, r);
    return i + 1;
}

const swap = (nums, i, j) => {
    [nums[i], nums[j]] = [nums[j], nums[i]];
}
