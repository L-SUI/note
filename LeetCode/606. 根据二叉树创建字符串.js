// 你需要采用前序遍历的方式，将一个二叉树转换成一个由括号和整数组成的字符串。

// 空节点则用一对空括号 "()" 表示。而且你需要省略所有不影响字符串与原始二叉树之间的一对一映射关系的空括号对。

// 示例 1:

// 输入: 二叉树: [1,2,3,4]
//        1
//      /   \
//     2     3
//    /    
//   4     

// 输出: "1(2(4))(3)"

// 解释: 原本将是“1(2(4)())(3())”，
// 在你省略所有不必要的空括号对之后，
// 它将是“1(2(4))(3)”。
// 示例 2:

// 输入: 二叉树: [1,2,3,null,4]
//        1
//      /   \
//     2     3
//      \  
//       4 

// 输出: "1(2()(4))(3)"

// 解释: 和第一个示例相似，
// 除了我们不能省略第一个对括号来中断输入和输出之间的一对一映射关系。


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/construct-string-from-binary-tree
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} t
 * @return {string}
 */
 var tree2str = function(t) {
    let str = ''
    dfs(t)
    return str

    function dfs(node){
        if (!node) return
        let {val, left, right} = node
        str += val
        if (left) {
            str += '('
            dfs(left)
            str += ')'
        } else if(right) { // 没有左子树 但有右子树 要保留()
           str += '()' 
        }
        if (right) {
            str += '('
            dfs(right)
            str += ')'
        }
    }
};

// 作者：shetia
// 链接：https://leetcode-cn.com/problems/construct-string-from-binary-tree/solution/gen-ju-er-cha-shu-chuang-jian-zi-fu-chua-ebgg/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

