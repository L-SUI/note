// 给定一个二叉树和一个目标和，找到所有从根节点到叶子节点路径总和等于给定目标和的路径。

// 说明: 叶子节点是指没有子节点的节点。

// 示例:
// 给定如下二叉树，以及目标和 sum = 22，

//               5
//              / \
//             4   8
//            /   / \
//           11  13  4
//          /  \    / \
//         7    2  5   1
// 返回:

// [
//    [5,4,11,2],
//    [5,8,4,5]
// ]

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/path-sum-ii
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
 * @param {number} sum
 * @return {number[][]}
 */
var pathSum = function(root, sum) {
    let res = [];
    let inorder = (root,arr,current)=> {
        if(root==null) return;
        current+=root.val;
        arr.push(root.val);
        if(current==sum && root.left== null && root.right== null){
            res.push(arr.slice())
        }
        inorder(root.left,arr.slice(),current)
        inorder(root.right,arr.slice(),current)
    }
    inorder(root,[],0)
    return res
};


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
var pathSum = function(root, sum) {
    let res = [];
    let inorder = (root,arr,sum)=> {
        if(root==null) return;
        arr.push(root.val);
        if(root.val==sum && root.left== null && root.right== null){
            res.push(arr.slice())
        }
        inorder(root.left,arr,sum-root.val)
        inorder(root.right,arr,sum-root.val)
        arr.pop();
    }
    inorder(root,[],sum)
    return res
};
