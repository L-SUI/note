// 给定一个二叉树，它的每个结点都存放一个 0-9 的数字，每条从根到叶子节点的路径都代表一个数字。

// 例如，从根到叶子节点路径 1->2->3 代表数字 123。

// 计算从根到叶子节点生成的所有数字之和。

// 说明: 叶子节点是指没有子节点的节点。

// 示例 1:

// 输入: [1,2,3]
//     1
//    / \
//   2   3
// 输出: 25
// 解释:
// 从根到叶子节点路径 1->2 代表数字 12.
// 从根到叶子节点路径 1->3 代表数字 13.
// 因此，数字总和 = 12 + 13 = 25.
// 示例 2:

// 输入: [4,9,0,5,1]
//     4
//    / \
//   9   0
//  / \
// 5   1
// 输出: 1026
// 解释:
// 从根到叶子节点路径 4->9->5 代表数字 495.
// 从根到叶子节点路径 4->9->1 代表数字 491.
// 从根到叶子节点路径 4->0 代表数字 40.
// 因此，数字总和 = 495 + 491 + 40 = 1026.

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/sum-root-to-leaf-numbers
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
 * @return {number}
 */
var sumNumbers = function(root) {
    let arr=[];
    let source = (root,str)=>{
        if(!root) return
        str+=root.val
        if(!root.left&&!root.right){
            arr.push(str)
        }else{
            source(root.right,str)
            source(root.left,str)
        }
    }
    source(root,'')
    let res = 0;
    arr.forEach(item=>res+=1*item)
    return res
};



// 深度优先
const dfs = (root, prevSum) => {
    if (root === null) {
        return 0;
    }
    const sum = prevSum * 10 + root.val;
    if (root.left == null && root.right == null) {
        return sum;
    } else {
        return dfs(root.left, sum) + dfs(root.right, sum);
    }
}
var sumNumbers = function(root) {
    return dfs(root, 0);
};

// 作者：LeetCode-Solution
// 链接：https://leetcode-cn.com/problems/sum-root-to-leaf-numbers/solution/qiu-gen-dao-xie-zi-jie-dian-shu-zi-zhi-he-by-leetc/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。


// 广度优先

var sumNumbers = function(root) {
    if (root === null) {
        return 0;
    }
    let sum = 0;
    const nodeQueue = [];
    const numQueue = [];
    nodeQueue.push(root);
    numQueue.push(root.val);
    while (nodeQueue.length) {
        const node = nodeQueue.shift();
        const num = numQueue.shift();
        const left = node.left, right = node.right;
        if (left === null && right === null) {
            sum += num;
        } else {
            if (left !== null) {
                nodeQueue.push(left);
                numQueue.push(num * 10 + left.val);
            }
            if (right !== null) {
                nodeQueue.push(right);
                numQueue.push(num * 10 + right.val);
            }
        }
    }
    return sum;
};

// 作者：LeetCode-Solution
// 链接：https://leetcode-cn.com/problems/sum-root-to-leaf-numbers/solution/qiu-gen-dao-xie-zi-jie-dian-shu-zi-zhi-he-by-leetc/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。