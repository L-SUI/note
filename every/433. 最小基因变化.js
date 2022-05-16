// 基因序列可以表示为一条由 8 个字符组成的字符串，其中每个字符都是 'A'、'C'、'G' 和 'T' 之一。

// 假设我们需要调查从基因序列 start 变为 end 所发生的基因变化。一次基因变化就意味着这个基因序列中的一个字符发生了变化。

// 例如，"AACCGGTT" --> "AACCGGTA" 就是一次基因变化。
// 另有一个基因库 bank 记录了所有有效的基因变化，只有基因库中的基因才是有效的基因序列。

// 给你两个基因序列 start 和 end ，以及一个基因库 bank ，请你找出并返回能够使 start 变化为 end 所需的最少变化次数。如果无法完成此基因变化，返回 -1 。

// 注意：起始基因序列 start 默认是有效的，但是它并不一定会出现在基因库中。

//  

// 示例 1：

// 输入：start = "AACCGGTT", end = "AACCGGTA", bank = ["AACCGGTA"]
// 输出：1
// 示例 2：

// 输入：start = "AACCGGTT", end = "AAACGGTA", bank = ["AACCGGTA","AACCGCTA","AAACGGTA"]
// 输出：2
// 示例 3：

// 输入：start = "AAAAACCC", end = "AACCCCCC", bank = ["AAAACCCC","AAACCCCC","AACCCCCC"]
// 输出：3
//  

// 提示：

// start.length == 8
// end.length == 8
// 0 <= bank.length <= 10
// bank[i].length == 8
// start、end 和 bank[i] 仅由字符 ['A', 'C', 'G', 'T'] 组成


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/minimum-genetic-mutation
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。





/**
 * @param {string} start
 * @param {string} end
 * @param {string[]} bank
 * @return {number}
 */
 var minMutation = function(start, end, bank) {
    const cnt = new Set();
    const visited = new Set();
    const keys = ['A', 'C', 'G', 'T'];
    for (const w of bank) {
        cnt.add(w);
    }
    if (start === end) {
        return 0;
    }
    if (!cnt.has(end)) {
        return -1;
    }
    const queue = [start];
    visited.add(start);
    let step = 1;
    while (queue.length) {
        const sz = queue.length;
        for (let i = 0; i < sz; i++) {
            const curr = queue.shift();
            for (let j = 0; j < 8; j++) {
                for (let k = 0; k < 4; k++) {
                    if (keys[k] !== curr[j]) {
                        const sb = [...curr];
                        sb[j] = keys[k];
                        const next = sb.join('');
                        if (!visited.has(next) && cnt.has(next)) {
                            if (next === end) {
                                return step;
                            }
                            queue.push(next);
                            visited.add(next);
                        }
                    }
                }
            }
        }
        step++;
    }
    return -1;
};
