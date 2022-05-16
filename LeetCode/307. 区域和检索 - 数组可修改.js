// 给你一个数组 nums ，请你完成两类查询。

// 其中一类查询要求 更新 数组 nums 下标对应的值
// 另一类查询要求返回数组 nums 中索引 left 和索引 right 之间（ 包含 ）的nums元素的 和 ，其中 left <= right
// 实现 NumArray 类：

// NumArray(int[] nums) 用整数数组 nums 初始化对象
// void update(int index, int val) 将 nums[index] 的值 更新 为 val
// int sumRange(int left, int right) 返回数组 nums 中索引 left 和索引 right 之间（ 包含 ）的nums元素的 和 （即，nums[left] + nums[left + 1], ..., nums[right]）
//  

// 示例 1：

// 输入：
// ["NumArray", "sumRange", "update", "sumRange"]
// [[[1, 3, 5]], [0, 2], [1, 2], [0, 2]]
// 输出：
// [null, 9, null, 8]

// 解释：
// NumArray numArray = new NumArray([1, 3, 5]);
// numArray.sumRange(0, 2); // 返回 1 + 3 + 5 = 9
// numArray.update(1, 2);   // nums = [1,2,5]
// numArray.sumRange(0, 2); // 返回 1 + 2 + 5 = 8
//  

// 提示：

// 1 <= nums.length <= 3 * 104
// -100 <= nums[i] <= 100
// 0 <= index < nums.length
// -100 <= val <= 100
// 0 <= left <= right < nums.length
// 调用 update 和 sumRange 方法次数不大于 3 * 104 

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/range-sum-query-mutable
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




var NumArray = function(nums) {
    this.nums = nums;
    const n = nums.length;
    size = Math.floor(Math.sqrt(n));
    this.sum = new Array(Math.floor((n + size - 1) / size)).fill(0); // n/size 向上取整
    for (let i = 0; i < n; i++) {
        this.sum[Math.floor(i / size)] += nums[i];
    }
};

NumArray.prototype.update = function(index, val) {
    this.sum[Math.floor(index / size)] += val - this.nums[index];
    this.nums[index] = val;
};

NumArray.prototype.sumRange = function(left, right) {
    const b1 = Math.floor(left / size), i1 = left % size, b2 = Math.floor(right / size), i2 = right % size;
    if (b1 === b2) { // 区间 [left, right] 在同一块中
        let sum = 0;
        for (let j = i1; j <= i2; j++) {
            sum += this.nums[b1 * size + j];
        }
        return sum;
    }
    let sum1 = 0;
    for (let j = i1; j < size; j++) {
        sum1 += this.nums[b1 * size + j];
    }
    let sum2 = 0;
    for (let j = 0; j <= i2; j++) {
        sum2 += this.nums[b2 * size + j];
    }
    let sum3 = 0;
    for (let j = b1 + 1; j < b2; j++) {
        sum3 += this.sum[j];
    }
    return sum1 + sum2 + sum3;
};
