// 给定一个二叉搜索树和一个目标结果，如果 BST 中存在两个元素且它们的和等于给定的目标结果，则返回 true。

// 案例 1:

// 输入: 
//     5
//    / \
//   3   6
//  / \   \
// 2   4   7

// Target = 9

// 输出: True
//  

// 案例 2:

// 输入: 
//     5
//    / \
//   3   6
//  / \   \
// 2   4   7

// Target = 28

// 输出: False
//  

// 通过次数31,747提交次数54,253

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/two-sum-iv-input-is-a-bst
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
 * @param {number} k
 * @return {boolean}
 */
 var findTarget = function(root, k) {
    let set = new Set()
    var diff = function(node) {
        if (node === null) {
            return false
        }
        if (set.has(k - node.val)) { // 判断是否存在满足条件的值
            return true
        }
        set.add(node.val) // 将节点值存入 set 中
        return diff(node.left) || diff(node.right) // 只要存在 true 即可
    }
    return diff(root)
};