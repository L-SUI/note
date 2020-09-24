function Node(value) {
    this.value = value;
    this.left =this.left=null;
    this.show = show
}
function show () {
    return this.value;
}
function BST () {
    this.root = null;
    this.insert = insert;
    this.inOrder = inOrder;
    this.getSmall = getSmall;
    this.getMax = getMax;
    this.find = find;
    this.remove = remove;
}
function insert (value) {
    let n = new Node(value);
    if(this.root==null) {
        this.root = n;
    }else {
        let current = this.root;
        let parent ;
        while(true){
            parent = current;
            if(value<current.value){
                current = current.left;
                if(current==null) {
                    parent.left = n;
                    break;
                }
            }else {
                current = current.right;
                if(current==null) {
                    parent.right = n;
                    break;
                }
            }
        }
    }
}
function inOrder (node) {
    if(node!=null) {
        inOrder(node.left)
        console.log(node.value)
        inOrder(node.right)
    }
}
function levelOrder(node,depth) {
    if (root !== null) {
        if (!res[depth]) {
          res[depth] = []
        }
        levelOrder(root.left, depth + 1)
        res[depth].push(root.val)
        levelOrder(root.right, depth + 1)
    }
}
function getSmall (root) {
    let current = this.root || root;
    while(current.left!=null) {
        current = current.left;
    }
    return current
}
function getMax (root) {
    let current = this.root || root;
    while(current.right!=null) {
        current = current.right;
    }
    return current
}
function find (value) {
    let current = this.root
    while(current!=null) {
        if(current.value === value) {
            return current;
        }else if(value<current.value){
            current = current.left;
        }else {
            current = current.right;
        }
    }
}
function remove (value) {
    removeNode(this.root,value);
}
function removeNode (node,value) {
    if (node==null) return null;
    if (value==node.value) {
        if(node.left==null && node.right==null)  return null;
        if(node.left==null) return node.right;
        if(node.right==null) return node.left;
        let tempNode = getSmall(node.right)
        node.value = tempNode.value;
        node.right = removeNode(node.right,tempNode.value);
        return node;
    }else if(value<current.value) {
        node.left = removeNode(node.left,value);
        return node;
    }else {
        node.right = removeNode(node.right,value);
        return node;
    }
}