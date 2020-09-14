// 给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

// candidates 中的每个数字在每个组合中只能使用一次。

// 说明：

// 所有数字（包括目标数）都是正整数。
// 解集不能包含重复的组合。 
// 示例 1:

// 输入: candidates = [10,1,2,7,6,1,5], target = 8,
// 所求解集为:
// [
//   [1, 7],
//   [1, 2, 5],
//   [2, 6],
//   [1, 1, 6]
// ]
// 示例 2:

// 输入: candidates = [2,5,2,1,2], target = 5,
// 所求解集为:
// [
//   [1,2,2],
//   [5]
// ]

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/combination-sum-ii
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
const combinationSum2 = (candidates, target) => {
    candidates.sort();    // 排序
    const res = [];
  
    const dfs = (start, temp, sum) => { // start是索引 当前选择范围的第一个
      if (sum >= target) {        // 爆掉了，不用继续选了
        if (sum == target) {      // 满足条件，加入解集
          res.push(temp.slice()); // temp是地址引用，后续还要用，所以拷贝一份
        }
        return;                   // 结束当前递归
      }
      for (let i = start; i < candidates.length; i++) {             // 枚举出选择
        if (candidates[i - 1] == candidates[i] && i - 1 >= start) { // 当前选项和隔壁选项一样，跳过
          continue;
        }
        temp.push(candidates[i]);              // 作出选择
        dfs(i + 1, temp, sum + candidates[i]); // 递归，向下选择，并更新sum
        temp.pop();                            // 撤销选择，
      }
    };
  
    dfs(0, [], 0);
    return res;
  };