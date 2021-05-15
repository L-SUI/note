// 请考虑一棵二叉树上所有的叶子，这些叶子的值按从左到右的顺序排列形成一个 叶值序列 。



// 举个例子，如上图所示，给定一棵叶值序列为 (6, 7, 4, 9, 8) 的树。

// 如果有两棵二叉树的叶值序列是相同，那么我们就认为它们是 叶相似 的。

// 如果给定的两个根结点分别为 root1 和 root2 的树是叶相似的，则返回 true；否则返回 false 。

//  

// 示例 1：



// 输入：root1 = [3,5,1,6,2,9,8,null,null,7,4], root2 = [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]
// 输出：true
// 示例 2：

// 输入：root1 = [1], root2 = [1]
// 输出：true
// 示例 3：

// 输入：root1 = [1], root2 = [2]
// 输出：false
// 示例 4：

// 输入：root1 = [1,2], root2 = [2,2]
// 输出：true
// 示例 5：



// 输入：root1 = [1,2,3], root2 = [1,3,2]
// 输出：false
//  

// 提示：

// 给定的两棵树可能会有 1 到 200 个结点。
// 给定的两棵树上的值介于 0 到 200 之间。


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/leaf-similar-trees
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
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
 var leafSimilar = function(root1, root2) {
    
    const seq1 = [];
    if (root1) {
        dfs(root1, seq1);
    }

    const seq2 = [];
    if (root2) {
        dfs(root2, seq2);
    }
    return seq1.toString() === seq2.toString();
};

const dfs = (node, seq) => {
    if (!node.left && !node.right) {
        seq.push(node.val);
    } else {
        if (node.left) {
            dfs(node.left, seq);
        }
        if (node.right) {
            dfs(node.right, seq);
        }
    }
}
