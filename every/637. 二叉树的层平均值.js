// 给定一个非空二叉树, 返回一个由每层节点平均值组成的数组。

//  

// 示例 1：

// 输入：
//     3
//    / \
//   9  20
//     /  \
//    15   7
// 输出：[3, 14.5, 11]
// 解释：
// 第 0 层的平均值是 3 ,  第1层是 14.5 , 第2层是 11 。因此返回 [3, 14.5, 11] 。
//  

// 提示：

// 节点值的范围在32位有符号整数范围内。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/average-of-levels-in-binary-tree
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
 const averageOfLevels = (root) => {
    const res = [];
    const queue = [];
    queue.push(root);
    while (queue.length) {
      const levelSize = queue.length;      
      let levelSum = 0;
      for (let i = 0; i < levelSize; i++) {
        const cur = queue.shift();
        levelSum += cur.val;
        if (cur.left) {
          queue.push(cur.left);
        }
        if (cur.right) {
          queue.push(cur.right);
        }
      }
      res.push(levelSum / levelSize);
    }
    return res;
  };