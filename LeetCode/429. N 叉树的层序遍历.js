// 给定一个 N 叉树，返回其节点值的层序遍历。（即从左到右，逐层遍历）。

// 树的序列化输入是用层序遍历，每组子节点都由 null 值分隔（参见示例）。

//  

// 示例 1：



// 输入：root = [1,null,3,2,4,null,5,6]
// 输出：[[1],[3,2,4],[5,6]]
// 示例 2：



// 输入：root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
// 输出：[[1],[2,3,4,5],[6,7,8,9,10],[11,12,13],[14]]
//  

// 提示：

// 树的高度不会超过 1000
// 树的节点总数在 [0, 10^4] 之间


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[][]}
 */
 var levelOrder = function(root) {
    const res = [];
    dfs(root,0,res)
    return res;
};

const dfs = (root,index,arr)=>{
    if(!root) return;
    if(arr[index]){
        arr[index].push(root.val);
    }else {
        arr[index]=[root.val]
    }
    if(root.children&&root.children.length) {
        root.children.forEach(item=>{
            dfs(item,index+1,arr)
        })
    }
}




var levelOrder = function(root) {
    if (!root) {
        return [];
    }

    const ans = [];
    const queue = [root];

    while (queue.length) {
        const cnt = queue.length;
        const level = [];
        for (let i = 0; i < cnt; ++i) {
            const cur = queue.shift();
            level.push(cur.val);
            for (const child of cur.children) {
                queue.push(child);
            }
        }
        ans.push(level);
    }

    return ans;
};
