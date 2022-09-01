// 给你一棵二叉树的根节点 root ，请你构造一个下标从 0 开始、大小为 m x n 的字符串矩阵 res ，用以表示树的 格式化布局 。构造此格式化布局矩阵需要遵循以下规则：

// 树的 高度 为 height ，矩阵的行数 m 应该等于 height + 1 。
// 矩阵的列数 n 应该等于 2height+1 - 1 。
// 根节点 需要放置在 顶行 的 正中间 ，对应位置为 res[0][(n-1)/2] 。
// 对于放置在矩阵中的每个节点，设对应位置为 res[r][c] ，将其左子节点放置在 res[r+1][c-2height-r-1] ，右子节点放置在 res[r+1][c+2height-r-1] 。
// 继续这一过程，直到树中的所有节点都妥善放置。
// 任意空单元格都应该包含空字符串 "" 。
// 返回构造得到的矩阵 res 。

//  

//  

// 示例 1：


// 输入：root = [1,2]
// 输出：
// [["","1",""],
//  ["2","",""]]
// 示例 2：


// 输入：root = [1,2,3,null,4]
// 输出：
// [["","","","1","","",""],
//  ["","2","","","","3",""],
//  ["","","4","","","",""]]
//  

// 提示：

// 树中节点数在范围 [1, 210] 内
// -99 <= Node.val <= 99
// 树的深度在范围 [1, 10] 内


// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/print-binary-tree
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
 * @return {string[][]}
 */
 var printTree = function(root) {
    let height=0;
    function getHeight(node,curr){
        if(!node) return;
        height = Math.max(height,curr+1)
        if(node.left) getHeight(node.left,curr+1)
        if(node.right) getHeight(node.right,curr+1)
    }
    getHeight(root,0);
    const len=Math.pow(2,height)-1
    const res = new Array(height).fill('').map(item=>new Array(len).fill(''))
    function bfs(node,y,left,right){
        if(!node) return
        let x=left+ Math.floor((right-left)/2);
        res[y][x]=node.val+''
        if(node.left) bfs(node.left,y+1,left,x)
        if(node.right) bfs(node.right,y+1,x+1,right)
    }
    bfs(root,0,0,len-1)
    return res
};
