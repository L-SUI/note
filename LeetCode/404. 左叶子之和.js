// 计算给定二叉树的所有左叶子之和。

// 示例：

//     3
//    / \
//   9  20
//     /  \
//    15   7

// 在这个二叉树中，有两个左叶子，分别是 9 和 15，所以返回 24
//  



// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/sum-of-left-leaves
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
 * @return {number}
 */
 var sumOfLeftLeaves = function(root) {
    let sum = 0
    function inner(root) {
        if(root) {
            if(isSimpleNode(root.left)) {
                sum += root.left.val
                inner(root.right)
            } else {
                inner(root.left)
                inner(root.right)
            }
        }
    }

    inner(root)

    return sum
};

function isSimpleNode(node) {
    return node && node.left === null && node.right === null
}