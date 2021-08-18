// 算法题：
// a、自定义多叉树节点node结构（只需要定义节点结构即可，无需构建树）
// b、按照广度优先查找符合要求的节点（没有符合要求的节点返回null），比如查找电话号码为 phone的用户信息，调用如下：
// let node = wideTraversal(node,(e)=>e.phone===phone)


function wideTraversal(root,fn) {
    let res = null;
    const bfs =(root) =>{
        let queue = [];
        queue.push(root)
        while(queue.length){
            const current = queue.shift();
            if(fn(current)) return res=current;
            queue.push(...current.children)
        }
    }
    bfs(root)
    return res;
}
const root = { 
    phone:'123456789',
    children: [{
        phone:'123456788',
        children: [{
            phone:'123456785',
            children: []
        }]
    },{
        phone:'123456787',
        children: [{
            phone:'123456784',
            children: []
        }]
    },{
        phone:'123456786',
        children: [{
            phone:'123456783',
            children: []
        }]
    }],
}
console.log(wideTraversal(root,(e)=>e.phone==='123456785'))
console.log(wideTraversal(root,(e)=>e.phone==='123456781'))
console.log(wideTraversal(root,(e)=>e.phone==='123456780'))