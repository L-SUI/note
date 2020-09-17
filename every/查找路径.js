// 深度不定的树形数据，给一个节点，输出从根节点到当前节点的路径
class Tree {
    constructor(root) {
        this.root = root;
        this.paths = [];
        this.toPath(this.root,null);
    }
    toPath (root,prev) {
        this.paths[root.value] = prev?prev.value:null;
        if(root.left){
            this.toPath(root.left,root)
        }
        if(root.right){
            this.toPath(root.right,root)
        }
    }
    findPath (value) {
        let path = ''+value;
        while(true){
            if(this.paths[value]==null) return path;
            path = this.paths[value]+'-->'+path;
            value = this.paths[value]
        }
    }
}
let tree = new Tree({
    value:1,
    left:{
        value:2,
        left:{
            value:4,
            left:null,
            right:{
                value:7,
                left:null,
                right:null
            }
        },
        right:null
    },
    right:{
        value:3,
        left:{
            value:6,
            left:null,
            right:null
        },
        right:null
    }
});
console.log(tree.findPath(6))
console.log(tree.findPath(7))
