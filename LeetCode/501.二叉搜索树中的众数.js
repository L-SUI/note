// 给定一个有相同值的二叉搜索树（BST），找出 BST 中的所有众数（出现频率最高的元素）。

// 假定 BST 有如下定义：

// 结点左子树中所含结点的值小于等于当前结点的值
// 结点右子树中所含结点的值大于等于当前结点的值
// 左子树和右子树都是二叉搜索树
// 例如：
// 给定 BST [1,null,2,2],

//    1
//     \
//      2
//     /
//    2
// 返回[2].

// 提示：如果众数超过1个，不需考虑输出顺序

// 进阶：你可以不使用额外的空间吗？（假设由递归产生的隐式调用栈的开销不被计算在内）

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/find-mode-in-binary-search-tree
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
 * @return {number[]}
 */
var findMode = function(root) {
    let obj = {}
    let inOrder = (node)=>{
        if(node==null) return;
        obj[node.val] = obj[node.val]>=1?obj[node.val]+1:1;
        inOrder(node.left)
        inOrder(node.right)
    }
    inOrder(root)
    console.log(obj)
    let res = []
    let max = 0
    for(key in obj){
        max = Math.max(obj[key],max)
    }
    for(key in obj){
        if(obj[key]==max){
            res.push(key)
        }
    }
    return res
};

//进阶
var findMode = function(root) {
    let base = 0, count = 0, maxCount = 0;
    let answer = [];

    const update = (x) => {
        if (x === base) {
            ++count;
        } else {
            count = 1;
            base = x;
        }
        if (count === maxCount) {
            answer.push(base);
        }
        if (count > maxCount) {
            maxCount = count;
            answer = [base];
        }
    }

    let cur = root, pre = null;
    while (cur !== null) {
        if (cur.left === null) {
            update(cur.val);
            cur = cur.right;
            continue;
        }
        pre = cur.left;
        while (pre.right !== null && pre.right !== cur) {
            pre = pre.right;
        }
        if (pre.right === null) {
            pre.right = cur;
            cur = cur.left;
        } else {
            pre.right = null;
            update(cur.val);
            cur = cur.right;
        }
    }
    return answer;
};

// 作者：LeetCode-Solution
// 链接：https://leetcode-cn.com/problems/find-mode-in-binary-search-tree/solution/er-cha-sou-suo-shu-zhong-de-zhong-shu-by-leetcode-/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。