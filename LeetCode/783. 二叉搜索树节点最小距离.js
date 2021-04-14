// 给你一个二叉搜索树的根节点 root ，返回 树中任意两不同节点值之间的最小差值 。

// 注意：本题与 530：https://leetcode-cn.com/problems/minimum-absolute-difference-in-bst/ 相同

//  

// 示例 1：


// 输入：root = [4,2,6,1,3]
// 输出：1
// 示例 2：


// 输入：root = [1,0,48,null,null,12,49]
// 输出：1
//  

// 提示：

// 树中节点数目在范围 [2, 100] 内
// 0 <= Node.val <= 105

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/minimum-distance-between-bst-nodes
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
 var minDiffInBST = function(root) {
    let res = Infinity;pre = -1;
    const diff = (root)=>{
        if(!root) return;
        diff(root.left)
        if(pre==-1){
            pre = root.val
        }else {
            res = Math.min(res,root.val-pre)
            pre = root.val
        }
        diff(root.right)
        return;
    }
    diff(root)
    return res
};