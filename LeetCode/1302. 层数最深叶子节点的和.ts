// 给你一棵二叉树的根节点 root ，请你返回 层数最深的叶子节点的和 。

//  

// 示例 1：



// 输入：root = [1,2,3,4,5,null,6,7,null,null,null,null,8]
// 输出：15
// 示例 2：

// 输入：root = [6,7,8,2,7,1,3,9,null,1,4,null,null,null,5]
// 输出：19
//  

// 提示：

// 树中节点数目在范围 [1, 104] 之间。
// 1 <= Node.val <= 100
// 通过次数46,321提交次数54,148

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/deepest-leaves-sum
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

 function deepestLeavesSum(root: TreeNode | null): number {
    if(!root) return 0;
    let stack:TreeNode[] = [root];
    const values:number[]=[];
    let i=0;
    while(stack.length){
        let arr:TreeNode[] = [];
        let sum = 0;
        while(stack.length){
            let curr = stack.shift();
            sum+=curr.val;
            if(curr.left) arr.push(curr.left)
            if(curr.right) arr.push(curr.right)
        }
        values[i]=sum
        i++
        stack=arr
    }
    return values.pop()!
};