// 给定一个二叉树的 根节点 root，请找出该二叉树的 最底层 最左边 节点的值。

// 假设二叉树中至少有一个节点。

//  

// 示例 1:



// 输入: root = [2,1,3]
// 输出: 1
// 示例 2:



// 输入: [1,2,3,4,null,5,6,null,null,7]
// 输出: 7
//  

// 提示:

// 二叉树的节点个数的范围是 [1,104]
// -231 <= Node.val <= 231 - 1 
// 通过次数50,041提交次数68,475


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/find-bottom-left-tree-value
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
 * @return {number}
 */
 var findBottomLeftValue = function (root) {
    const arr = []
    function loop(node, h) {
        if (!node) return
        if (!arr[h]) arr[h] = []
        arr[h].push(node.val)

        loop(node.left,  h + 1)
        loop(node.right, h + 1)
    }

    loop(root, 0)
    return arr[arr.length - 1][0]
}
