// 给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。

// 示例：
// 二叉树：[3,9,20,null,null,15,7],

//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回其层次遍历结果：

// [
//   [3],
//   [9,20],
//   [15,7]
// ]

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/binary-tree-level-order-traversal
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    let res = []
    function inLevelOrder(root,depth) {
        if (root !== null) {
            if (!res[depth]) {
            res[depth] = []
            }
            inLevelOrder(root.left, depth + 1)
            res[depth].push(root.val)
            inLevelOrder(root.right, depth + 1)
        }
    }
    inLevelOrder(root,0)
    return res
};