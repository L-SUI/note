// 给定一个二叉树（具有根结点 root）， 一个目标结点 target ，和一个整数值 K 。

// 返回到目标结点 target 距离为 K 的所有结点的值的列表。 答案可以以任何顺序返回。

//  

// 示例 1：

// 输入：root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, K = 2
// 输出：[7,4,1]
// 解释：
// 所求结点为与目标结点（值为 5）距离为 2 的结点，
// 值分别为 7，4，以及 1



// 注意，输入的 "root" 和 "target" 实际上是树上的结点。
// 上面的输入仅仅是对这些对象进行了序列化描述。
//  

// 提示：

// 给定的树是非空的。
// 树上的每个结点都具有唯一的值 0 <= node.val <= 500 。
// 目标结点 target 是树上的结点。
// 0 <= K <= 1000.

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/all-nodes-distance-k-in-binary-tree
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
 * @param {TreeNode} target
 * @param {number} k
 * @return {number[]}
 */
 var distanceK = function(root, target, k) {
    const parents = new Map();
    const ans = [];

    const findParents = (node) => {
        if (node.left != null) {
            parents.set(node.left.val, node);
            findParents(node.left);
        }
        if (node.right != null) {
            parents.set(node.right.val, node);
            findParents(node.right);
        }
    }

    // 从 root 出发 DFS，记录每个结点的父结点
    findParents(root);

    const findAns = (node, from, depth, k) => {
        if (node == null) {
            return;
        }
        if (depth === k) {
            ans.push(node.val);
            return;
        }
        if (node.left !== from) {
            findAns(node.left, node, depth + 1, k);
        }
        if (node.right !== from) {
            findAns(node.right, node, depth + 1, k);
        }
        if (parents.get(node.val) !== from) {
            findAns(parents.get(node.val), node, depth + 1, k);
        }
    }
    // 从 target 出发 DFS，寻找所有深度为 k 的结点
    findAns(target, null, 0, k);

    return ans;
};
