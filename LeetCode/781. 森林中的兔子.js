// 森林中，每个兔子都有颜色。其中一些兔子（可能是全部）告诉你还有多少其他的兔子和自己有相同的颜色。我们将这些回答放在 answers 数组里。

// 返回森林中兔子的最少数量。

// 示例:
// 输入: answers = [1, 1, 2]
// 输出: 5
// 解释:
// 两只回答了 "1" 的兔子可能有相同的颜色，设为红色。
// 之后回答了 "2" 的兔子不会是红色，否则他们的回答会相互矛盾。
// 设回答了 "2" 的兔子为蓝色。
// 此外，森林中还应有另外 2 只蓝色兔子的回答没有包含在数组中。
// 因此森林中兔子的最少数量是 5: 3 只回答的和 2 只没有回答的。

// 输入: answers = [10, 10, 10]
// 输出: 11

// 输入: answers = []
// 输出: 0
// 说明:

// answers 的长度最大为1000。
// answers[i] 是在 [0, 999] 范围内的整数。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/rabbits-in-forest
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


/**
 * @param {number[]} answers
 * @return {number}
 */
 var numRabbits = function(answers) {
    const count = new Map();
    for (const y of answers) {
        count.set(y, (count.get(y) || 0) + 1);
    }
    let ans = 0;
    for (const [y, x] of count.entries()) {
        ans += Math.floor((x + y) / (y + 1)) * (y + 1);
    }
    return ans;
};

// 作者：LeetCode-Solution
// 链接：https://leetcode-cn.com/problems/rabbits-in-forest/solution/sen-lin-zhong-de-tu-zi-by-leetcode-solut-kvla/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。