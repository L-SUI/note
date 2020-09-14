// 多叉树广度优先遍历，实现输入一个 node，查找 node.phone === ‘phone'。找到了返回 node，反之返回false

function searchNode (node) {
    let keys = Object.keys(node)
    for(let i = 0; i < keys.length;i++){
        if(node[keys[i]]==='phone'&&keys[i]==='phone'){
            return node
        }
    }
    return false;
}

console.log(searchNode({
    x: 1,
    y: 1
}))
console.log(searchNode({
    x: 1,
    phone: 'phone'
}))