// 给定一个二叉树，返回所有从根节点到叶子节点的路径。

// 说明: 叶子节点是指没有子节点的节点。

// 示例:

// 输入:

//    1
//  /   \
// 2     3
//  \
//   5

// 输出: ["1->2->5", "1->3"]

// 解释: 所有根节点到叶子节点的路径为: 1->2->5, 1->3

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/binary-tree-paths
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
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
    if(!root) return [];
    let res = [];
    let inorder = (node,str)=>{
        if(str == '') {
            str+=node.val
        }else {
            str+='->'+node.val
        }
        if(!node.left&&!node.right){
            
            res.push(str)
        }
        if(node.left) inorder(node.left,str)
        if(node.right) inorder(node.right,str)
    }
    inorder(root,'')
    return res
};