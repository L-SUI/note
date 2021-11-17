// 已有方法 rand7 可生成 1 到 7 范围内的均匀随机整数，试写一个方法 rand10 生成 1 到 10 范围内的均匀随机整数。

// 不要使用系统的 Math.random() 方法。

//  

// 示例 1:

// 输入: 1
// 输出: [7]
// 示例 2:

// 输入: 2
// 输出: [8,4]
// 示例 3:

// 输入: 3
// 输出: [8,1,10]
//  

// 提示:

// rand7 已定义。
// 传入参数: n 表示 rand10 的调用次数。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/implement-rand10-using-rand7
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




/**
 * The rand7() API is already defined for you.
 * var rand7 = function() {}
 * @return {number} a random integer in the range 1 to 7
 */
 var rand10 = function() {
    var a, b, idx;
    while (true) {
        a = rand7();
        b = rand7();
        idx = b + (a - 1) * 7;
        if (idx <= 40) {
            return 1 + (idx - 1) % 10;
        }
        a = idx - 40;
        b = rand7();
        // get uniform dist from 1 - 63
        idx = b + (a - 1) * 7;
        if (idx <= 60) {
            return 1 + (idx - 1) % 10;
        }
        a = idx - 60;
        b = rand7();
        // get uniform dist from 1 - 21
        idx = b + (a - 1) * 7;
        if (idx <= 20) {
            return 1 + (idx - 1) % 10;
        }
    }
};
