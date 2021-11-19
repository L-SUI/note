// 如果二叉树每个节点都具有相同的值，那么该二叉树就是单值二叉树。

// 只有给定的树是单值二叉树时，才返回 true；否则返回 false。

//  

// 示例 1：



// 输入：[1,1,1,1,1,null,1]
// 输出：true
// 示例 2：



// 输入：[2,2,2,5,2]
// 输出：false
//  

// 提示：

// 给定树的节点数范围是 [1, 100]。
// 每个节点的值都是整数，范围为 [0, 99] 。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/univalued-binary-tree
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
 * @return {boolean}
 */
 const isUnivalTree = root => {
    // 定义一个递归函数，判断当前节点是否和给定值相等
    const check = (node, val) => {
        // 递归出口：节点空，返回true
        if (!node) return true;
        // 不相等返回false
        if (node.val !== val) return false;
        // 返回上一级的内容：左子树和右子树是否都相等
        return check(node.left, val) && check(node.right, val);
    };
    // 将根节点放入函数，根节点的值作为给定值
    return check(root, root.val);
};