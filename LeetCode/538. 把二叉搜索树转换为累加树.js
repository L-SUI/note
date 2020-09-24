// 给定一个二叉搜索树（Binary Search Tree），把它转换成为累加树（Greater Tree)，
// 使得每个节点的值是原来的节点值加上所有大于它的节点值之和。
// 例如：

// 输入: 原始二叉搜索树:
//               5
//             /   \
//            2     13

// 输出: 转换为累加树:
//              18
//             /   \
//           20     13

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/convert-bst-to-greater-tree
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
 * @return {TreeNode}
 */
var convertBST = function(root) {
    let arr = []
    let middlePreface = (root)=>{
        if(root == null) return;
        middlePreface(root.left)
        arr.push(root.val)
        middlePreface(root.right)
    }
    middlePreface(root)
    let changeRoot = (root)=>{
        if(root==null) return;
        let index = arr.indexOf(root.val)
        for(let i=index+1;i<arr.length;i++){
            root.val+=arr[i]
        }
        changeRoot(root.left)
        changeRoot(root.right)
    }
    changeRoot(root)
    return root
};


var convertBST = function(root) {
    function convert(node) {
      if (node === null) return 0;
      
      convert(node.right);
      sum += node.val;
      node.val = sum;
      convert(node.left);
    }
    
    let sum = 0;
    
    convert(root);
    
    return root;
  }
