// 找出所有相加之和为 n 的 k 个数的组合。组合中只允许含有 1 - 9 的正整数，并且每种组合中不存在重复的数字。

// 说明：

// 所有数字都是正整数。
// 解集不能包含重复的组合。 
// 示例 1:

// 输入: k = 3, n = 7
// 输出: [[1,2,4]]
// 示例 2:

// 输入: k = 3, n = 9
// 输出: [[1,2,6], [1,3,5], [2,3,4]]

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/combination-sum-iii
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

// https://leetcode-cn.com/problems/combination-sum-iii/solution/shou-hua-tu-jie-216-zu-he-zong-he-iii-by-xiao_ben_/

/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
const combinationSum3 = (k, n) => {
    const res = [];

    const dfs = (start, temp, sum) => {
        if (temp.length == k) {     // You've selected k numbers. End recursion
            if (sum == n) {           // The sum of numbers in a combination equals n
                res.push(temp.slice()); // Add its copy to the solution set
            }
            return;
        }
        for (let i = start; i <= 9; i++) { // Enumerate the options
            temp.push(i);                    // Make a choice
            dfs(i + 1, temp, sum + i);       // Explore
            temp.pop();                      // Undo the choice
        }
    };

    dfs(1, [], 0);  // press the search button
    return res;
};

// 作者：xiao_ben_zhu
// 链接：https://leetcode-cn.com/problems/combination-sum-iii/solution/shou-hua-tu-jie-216-zu-he-zong-he-iii-by-xiao_ben_/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
console.log(combinationSum3(3, 7))
console.log(combinationSum3(3, 9))
