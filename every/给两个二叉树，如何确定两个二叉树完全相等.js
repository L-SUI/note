// 给两个二叉树，如何确定两个二叉树完全相等



function isEqual(node1, node2) {
    const toEqual = (node1,node2) => {
        if(!node1&&!node2) return true;
        if(!node1||!node2) return false;
        if(node1.value !== node2.value) return false;
        let left = toEqual(node1.left, node2.left);
        let right = toEqual(node1.right, node2.right);
        return  left&& right
    }
    return toEqual(node1,node2)
}