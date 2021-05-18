// 给定一颗二叉树，以及其中的两个node（地址均非空），
// 要求给出这两个node的最近的公共父节点。请实现函数
// FindSParent，函数输入输出请参考如下：

const root = {
    val: 1,
    left: {
      val: 2,
      left: {
        val: 4,
        left: {
          val: 6
        },
        right: {
          val: 7
        }
      },
      right: {
        val: 5,
        left: {
          val: 8
        },
        right: {
          val: 9
        }
      }
    },
    right: {
      val: 3
    }
}

/*
*
* @param {Tree}
* @return {Tree} 
*/

function findParent(tree,x,y) {
    const dfs = (node) => {
        if(!node) return null;
        if(node.val==x||node.val==y) return node;
        let left = dfs(node.left);
        let right = dfs(node.right);
        return left && right?node:left||right||null;
    }
    return dfs(tree).val;
}
  
console.log(findParent(root, 6, 9));
// console.log(findParent(root, 6, 7));
// console.log(findParent(root, 6, 5));
// console.log(findParent(root, 6, 3));