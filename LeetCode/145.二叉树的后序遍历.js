// 给定一个二叉树，返回它的 后序 遍历。

// 示例:

// 输入: [1,null,2,3]  
//    1
//     \
//      2
//     /
//    3 

// 输出: [3,2,1]
// 进阶: 递归算法很简单，你可以通过迭代算法完成吗？

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/binary-tree-postorder-traversal
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
var postorderTraversal = function(root) {
    let res = [];
    let afterOrder = (root)=>{
        if(root==null) return
        afterOrder(root.left)
        afterOrder(root.right)
        res.push(root.val)
    }
    afterOrder(root)
    return res
};


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
var postorderTraversal = function(root) {
    let res = [];
    if(root == null) return res;
    let queue = [{isErgodic:false,node:root}]
    while(queue.length){
        let {isErgodic,node} = queue.pop()
        if(isErgodic){
            res.push(node.val)
        }else{
            queue.push({isErgodic:true,node:node})
            if(node.right) queue.push({isErgodic:false,node:node.right})
            if(node.left) queue.push({isErgodic:false,node:node.left})
        }
    }
    return res
};