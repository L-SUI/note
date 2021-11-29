// 请你设计一个迭代器，除了支持 hasNext 和 next 操作外，还支持 peek 操作。

// 实现 PeekingIterator 类：

// PeekingIterator(int[] nums) 使用指定整数数组 nums 初始化迭代器。
// int next() 返回数组中的下一个元素，并将指针移动到下个元素处。
// bool hasNext() 如果数组中存在下一个元素，返回 true ；否则，返回 false 。
// int peek() 返回数组中的下一个元素，但 不 移动指针。
//  

// 示例：

// 输入：
// ["PeekingIterator", "next", "peek", "next", "next", "hasNext"]
// [[[1, 2, 3]], [], [], [], [], []]
// 输出：
// [null, 1, 2, 2, 3, false]

// 解释：
// PeekingIterator peekingIterator = new PeekingIterator([1, 2, 3]); // [1,2,3]
// peekingIterator.next();    // 返回 1 ，指针移动到下一个元素 [1,2,3]
// peekingIterator.peek();    // 返回 2 ，指针未发生移动 [1,2,3]
// peekingIterator.next();    // 返回 2 ，指针移动到下一个元素 [1,2,3]
// peekingIterator.next();    // 返回 3 ，指针移动到下一个元素 [1,2,3]
// peekingIterator.hasNext(); // 返回 False

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/peeking-iterator
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




/**
 * // This is the Iterator's API interface.
 * // You should not implement it, or speculate about its implementation.
 * function Iterator() {
 *    @ return {number}
 *    this.next = function() { // return the next number of the iterator
 *       ...
 *    }; 
 *
 *    @return {boolean}
 *    this.hasNext = function() { // return true if it still has numbers
 *       ...
 *    };
 * };
 */

 var PeekingIterator = function(iterator) {
    this.iterator = iterator;
    this.nextElement = this.iterator.next();
};

PeekingIterator.prototype.peek = function() {
    return this.nextElement;
    
};

PeekingIterator.prototype.next = function() {
    const ret = this.nextElement;
    this.nextElement = this.iterator.hasNext() ? this.iterator.next() : null;
    return ret;
};

PeekingIterator.prototype.hasNext = function() {
    return this.nextElement != null;
};

/** 
 * Your PeekingIterator object will be instantiated and called as such:
 * var obj = new PeekingIterator(arr)
 * var param_1 = obj.peek()
 * var param_2 = obj.next()
 * var param_3 = obj.hasNext()
 */