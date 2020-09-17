//  将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。本题中，一个高度平衡
//  二叉树是指一个二叉树每个节点的左右两个子树的高度差的绝对值不超过 1。
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
function sortedArrayToBST(nums) {
    let makeTree = (start, end) => {
        if (start > end) return null;

        let mid = Math.floor((start + end) / 2)
        let currentTree = new TreeNode(nums[mid]);

        currentTree.left = makeTree(start, mid - 1)
        currentTree.right = makeTree(mid + 1, end)

        return currentTree //做好的小树
    }
    return makeTree(0, nums.length - 1);
}
// console.log(sortedArrayToBST([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]))
console.log(sortedArrayToBST([-10, -3, 0, 5, 9]))
