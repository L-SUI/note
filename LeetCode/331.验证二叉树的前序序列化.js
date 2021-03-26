// 序列化二叉树的一种方法是使用前序遍历。当我们遇到一个非空节点时，我们可以记录下这个节点的值。如果它是一个空节点，我们可以使用一个标记值记录，例如 #。

//      _9_
//     /   \
//    3     2
//   / \   / \
//  4   1  #  6
// / \ / \   / \
// # # # #   # #
// 例如，上面的二叉树可以被序列化为字符串 "9,3,4,#,#,1,#,#,2,#,6,#,#"，其中 # 代表一个空节点。

// 给定一串以逗号分隔的序列，验证它是否是正确的二叉树的前序序列化。编写一个在不重构树的条件下的可行算法。

// 每个以逗号分隔的字符或为一个整数或为一个表示 null 指针的 '#' 。

// 你可以认为输入格式总是有效的，例如它永远不会包含两个连续的逗号，比如 "1,,3" 。

// 示例 1:

// 输入: "9,3,4,#,#,1,#,#,2,#,6,#,#"
// 输出: true
// 示例 2:

// 输入: "1,#"
// 输出: false
// 示例 3:

// 输入: "9,#,#,1"
// 输出: false

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/verify-preorder-serialization-of-a-binary-tree
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



/**
 * @param {string} preorder
 * @return {boolean}
 */
 var isValidSerialization = function(preorder) {
    const n = preorder.length;
    let i = 0;
    let slots = 1;
    while (i < n) {
        if (slots === 0) {
            return false;
        }
        if (preorder[i] === ',') {
            ++i;
        } else if (preorder[i] === '#') {
            --slots;
            ++i;
        } else {
            // 读一个数字
            while (i < n && preorder[i] !== ',') {
                ++i;
            }
            ++slots; // slots = slots - 1 + 2
        }
    }
    return slots === 0;
};

// 作者：LeetCode-Solution
// 链接：https://leetcode-cn.com/problems/verify-preorder-serialization-of-a-binary-tree/solution/yan-zheng-er-cha-shu-de-qian-xu-xu-lie-h-jghn/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。