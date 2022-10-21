// 给定一个二叉树的 root ，返回 最长的路径的长度 ，这个路径中的 每个节点具有相同值 。 这条路径可以经过也可以不经过根节点。

// 两个节点之间的路径长度 由它们之间的边数表示。

//  

// 示例 1:



// 输入：root = [5,4,5,1,1,5]
// 输出：2
// 示例 2:



// 输入：root = [1,4,5,4,4,5]
// 输出：2
//  

// 提示:

// 树的节点数的范围是 [0, 104] 
// -1000 <= Node.val <= 1000
// 树的深度将不超过 1000 

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/longest-univalue-path
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
 var longestUnivaluePath = function(root) {
    let res = 0;
    const dfs = (root) => {
        if (!root) {
            return 0;
        }
        let left = dfs(root.left), right = dfs(root.right);
        let left1 = 0, right1 = 0;
        if (root.left && root.left.val === root.val) {
            left1 = left + 1;
        }
        if (root.right && root.right.val === root.val) {
            right1 = right + 1;
        }
        res = Math.max(res, left1 + right1);
        return Math.max(left1, right1);
    }
    dfs(root);
    return res;
};
