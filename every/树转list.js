var tree = {
    id: "0",
    name: "ROOT",
    nodes: [
      {
        id: "1",
        name: "Node-1",
        nodes: null,
      },
      {
        id: "2",
        name: "Node-2",
        nodes: null,
      },
    ],
  }
//   var list=[
//     { id: "0", name: "ROOT", nodes: ["1", "2"] },
//     { id: "1", name: "Node-1", nodes: null, parent: "0" },
//     { id: "2", name: "Node-2", nodes: null, parent: "0" }
//   ];

transformTreeToList(tree);

function transformTreeToList(tree) {
    if(tree.nodes == null) {
        return tree;
    }
    var list = [];
    var queue = [];
    queue.push(tree);
    while(queue.length > 0) {
        var node = queue.shift();
        var listNode = {
            id: node.id,
            name: node.name,
            nodes: []
        }
        if(node.parent) listNode.parent = node.parent;
        list.push(listNode);
        if(node.nodes!=null) {
            node.nodes.forEach(item=>(item.parent=node.id));
            queue.push(...node.nodes);
        }
    }
    console.log(list);
}