// Alice 和 Bob 再次设计了一款新的石子游戏。现有一行 n 个石子，每个石子都有一个关联的数字表示它的价值。给你一个整数数组 stones ，其中 stones[i] 是第 i 个石子的价值。

// Alice 和 Bob 轮流进行自己的回合，Alice 先手。每一回合，玩家需要从 stones 中移除任一石子。

// 如果玩家移除石子后，导致 所有已移除石子 的价值 总和 可以被 3 整除，那么该玩家就 输掉游戏 。
// 如果不满足上一条，且移除后没有任何剩余的石子，那么 Bob 将会直接获胜（即便是在 Alice 的回合）。
// 假设两位玩家均采用 最佳 决策。如果 Alice 获胜，返回 true ；如果 Bob 获胜，返回 false 。

//  

// 示例 1：

// 输入：stones = [2,1]
// 输出：true
// 解释：游戏进行如下：
// - 回合 1：Alice 可以移除任意一个石子。
// - 回合 2：Bob 移除剩下的石子。 
// 已移除的石子的值总和为 1 + 2 = 3 且可以被 3 整除。因此，Bob 输，Alice 获胜。
// 示例 2：

// 输入：stones = [2]
// 输出：false
// 解释：Alice 会移除唯一一个石子，已移除石子的值总和为 2 。 
// 由于所有石子都已移除，且值总和无法被 3 整除，Bob 获胜。
// 示例 3：

// 输入：stones = [5,1,2,4,3]
// 输出：false
// 解释：Bob 总会获胜。其中一种可能的游戏进行方式如下：
// - 回合 1：Alice 可以移除值为 1 的第 2 个石子。已移除石子值总和为 1 。
// - 回合 2：Bob 可以移除值为 3 的第 5 个石子。已移除石子值总和为 = 1 + 3 = 4 。
// - 回合 3：Alices 可以移除值为 4 的第 4 个石子。已移除石子值总和为 = 1 + 3 + 4 = 8 。
// - 回合 4：Bob 可以移除值为 2 的第 3 个石子。已移除石子值总和为 = 1 + 3 + 4 + 2 = 10.
// - 回合 5：Alice 可以移除值为 5 的第 1 个石子。已移除石子值总和为 = 1 + 3 + 4 + 2 + 5 = 15.
// Alice 输掉游戏，因为已移除石子值总和（15）可以被 3 整除，Bob 获胜。
//  

// 提示：

// 1 <= stones.length <= 105
// 1 <= stones[i] <= 104
// 通过次数15,789提交次数34,159

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/stone-game-ix
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




/**
 * @param {number[]} stones
 * @return {boolean}
 */
 var stoneGameIX = function(stones) {
    let cnt0 = 0, cnt1 = 0, cnt2 = 0;
    for (const val of stones) {
        const type = val % 3;
        if (type === 0) {
            ++cnt0;
        } else if (type === 1) {
            ++cnt1;
        } else {
            ++cnt2;
        }
    }
    if (cnt0 % 2 === 0) {
        return cnt1 >= 1 && cnt2 >= 1;
    }
    return cnt1 - cnt2 > 2 || cnt2 - cnt1 > 2;
};