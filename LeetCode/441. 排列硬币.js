// 你总共有 n 枚硬币，你需要将它们摆成一个阶梯形状，第 k 行就必须正好有 k 枚硬币。

// 给定一个数字 n，找出可形成完整阶梯行的总行数。

// n 是一个非负整数，并且在32位有符号整型的范围内。

// 示例 1:

// n = 5

// 硬币可排列成以下几行:
// ¤
// ¤ ¤
// ¤ ¤

// 因为第三行不完整，所以返回2.
// 示例 2:

// n = 8

// 硬币可排列成以下几行:
// ¤
// ¤ ¤
// ¤ ¤ ¤
// ¤ ¤

// 因为第四行不完整，所以返回3.
// 通过次数39,397提交次数93,519


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/arranging-coins
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



/**
 * @param {number} n
 * @return {number}
 */
 var arrangeCoins = function(n) {
    if (n == 0) {
        return 0;
    }
    var left = 0;
    // 只有 n 个硬币的情况下，最大肯定不会超过 n 行，所以这里把搜索的右侧界限定为 n
    var right = n;
    while (left <= right) {
    	var mid = left + ((right - left) >> 1);
        // 形成 mid 行的阶梯一共需要 costToFinishMid 个硬币，这里是数学公式
    	var costToFinishMid = (1 + mid) * mid / 2;
    	if (costToFinishMid == n) {
    		return mid;
    	} else if (costToFinishMid < n) {
    		left = mid + 1;
    	} else if (costToFinishMid > n) {
    		right = mid - 1;
    	}
    }
    // 按照上述这种写法，right 在这里指向距离 target 最近的左侧元素的位置
    return right;
};