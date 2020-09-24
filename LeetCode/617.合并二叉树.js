// 给定两个二叉树，想象当你将它们中的一个覆盖到另一个上时，两个二叉树的一些节点便会重叠。

// 你需要将他们合并为一个新的二叉树。合并的规则是如果两个节点重叠，那么将他们的值相加作为节点合并后的新值，否则不为 NULL 的节点将直接作为新二叉树的节点。

// 示例 1:

// 输入: 
// 	Tree 1                     Tree 2                  
//           1                         2                             
//          / \                       / \                            
//         3   2                     1   3                        
//        /                           \   \                      
//       5                             4   7                  
// 输出: 
// 合并后的树:
// 	     3
// 	    / \
// 	   4   5
// 	  / \   \ 
// 	 5   4   7
// 注意: 合并必须从两个树的根节点开始。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/merge-two-binary-trees
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */
var mergeTrees = function(t1, t2) {
    if(!t1) return t2 //若t1节点为空，那直接返回t2节点，不管t2是否为空
    if(!t2) return t1 //若t2为空，那肯定t1肯定不为空，返回t1节点
    t1.val = t1.val + t2.val //能执行到这里证明t1与t2节点均不为空，那就两值相加，替换t1原来的值
    t1.left = mergeTrees(t1.left, t2.left ) //递归遍历两者的左子树
    t1.right = mergeTrees(t1.right, t2.right) ////递归遍历两者的右左子树
    return t1 //t1必然是返回的根节点，为啥？因为都拼到t1树上了啊
};