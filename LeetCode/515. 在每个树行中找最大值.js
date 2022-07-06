// 给定一棵二叉树的根节点 root ，请找出该二叉树中每一层的最大值。

//  

// 示例1：



// 输入: root = [1,3,2,5,3,null,9]
// 输出: [1,3,9]
// 示例2：

// 输入: root = [1,2,3]
// 输出: [1,3]
//  

// 提示：

// 二叉树的节点个数的范围是 [0,104]
// -231 <= Node.val <= 231 - 1
//  

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/find-largest-value-in-each-tree-row
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
 var largestValues = function(root) {
    if (!root) {
        return [];
    }
    const res = [];
    const queue = [root];
    while (queue.length) {
        let len = queue.length;
        let maxVal = -Number.MAX_VALUE;
        while (len > 0) {
            len--;
            const t = queue.shift();
            maxVal = Math.max(maxVal, t.val);
            if (t.left) {
                queue.push(t.left);
            }
            if (t.right) {
                queue.push(t.right);
            }
        }
        res.push(maxVal);
    }
    return res;
};
