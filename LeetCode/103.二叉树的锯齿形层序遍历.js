// 给定一个二叉树，返回其节点值的锯齿形层序遍历。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。

// 例如：
// 给定二叉树 [3,9,20,null,null,15,7],

//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回锯齿形层序遍历如下：

// [
//   [3],
//   [20,9],
//   [15,7]
// ]

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal
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
var zigzagLevelOrder = function(root) {
    let res = [];
    let levelOrder = (node,depth)=>{
        if (node !== null) {
            if (!res[depth]) {
                res[depth] = []
            }
            if(depth%2==0){
                res[depth].push(node.val)
            }else {
                res[depth].unshift(node.val)
            }
            levelOrder(node.left, depth + 1)
            levelOrder(node.right, depth + 1)
        }
    }
    levelOrder(root,0)
    return res
};

var zigzagLevelOrder = function(root) {
    if (!root) {
        return [];
    }
    const ans = [];
    const nodeQueue = [root];
    let isOrderLeft = true;
    while (nodeQueue.length) {
        let levelList = [];
        const size = nodeQueue.length;
        for (let i = 0; i < size; ++i) {
            const node = nodeQueue.shift();
            if (isOrderLeft) {
                levelList.push(node.val);
            } else {
                levelList.unshift(node.val);
            }
            if (node.left !== null) {
                nodeQueue.push(node.left);
            }
            if (node.right !== null) {
                nodeQueue.push(node.right);
            }
        }            
        ans.push(levelList);
        isOrderLeft = !isOrderLeft;
    }
    return ans;
};