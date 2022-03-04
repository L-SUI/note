// 给你一个整数数组 arr ，请使用 煎饼翻转 完成对数组的排序。

// 一次煎饼翻转的执行过程如下：

// 选择一个整数 k ，1 <= k <= arr.length
// 反转子数组 arr[0...k-1]（下标从 0 开始）
// 例如，arr = [3,2,1,4] ，选择 k = 3 进行一次煎饼翻转，反转子数组 [3,2,1] ，得到 arr = [1,2,3,4] 。

// 以数组形式返回能使 arr 有序的煎饼翻转操作所对应的 k 值序列。任何将数组排序且翻转次数在 10 * arr.length 范围内的有效答案都将被判断为正确。

//  

// 示例 1：

// 输入：[3,2,4,1]
// 输出：[4,2,4,3]
// 解释：
// 我们执行 4 次煎饼翻转，k 值分别为 4，2，4，和 3。
// 初始状态 arr = [3, 2, 4, 1]
// 第一次翻转后（k = 4）：arr = [1, 4, 2, 3]
// 第二次翻转后（k = 2）：arr = [4, 1, 2, 3]
// 第三次翻转后（k = 4）：arr = [3, 2, 1, 4]
// 第四次翻转后（k = 3）：arr = [1, 2, 3, 4]，此时已完成排序。 
// 示例 2：

// 输入：[1,2,3]
// 输出：[]
// 解释：
// 输入已经排序，因此不需要翻转任何内容。
// 请注意，其他可能的答案，如 [3，3] ，也将被判断为正确。
//  

// 提示：

// 1 <= arr.length <= 100
// 1 <= arr[i] <= arr.length
// arr 中的所有整数互不相同（即，arr 是从 1 到 arr.length 整数的一个排列）
// 通过次数37,358提交次数54,808

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/pancake-sorting
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



/**
 * @param {number[]} arr
 * @return {number[]}
 */
 var pancakeSort = function(arr) {
    const ret = [];
    for (let n = arr.length; n > 1; n--) {
        let index = 0;
        for (let i = 1; i < n; i++) {
            if (arr[i] >= arr[index]) {
                index = i;
            }
        }
        if (index === n - 1) {
            continue;
        }
        reverse(arr, index);
        reverse(arr, n - 1);
        ret.push(index + 1);
        ret.push(n);
    }
    return ret;
}

const reverse = (arr, end) => {
    for (let i = 0, j = end; i < j; i++, j--) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
};