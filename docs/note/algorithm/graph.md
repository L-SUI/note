# 图

```js

function Graph(v) {
    this.vertices = v;
    this.edges = 0;
    this.obj = [];
    this.marked = [];
    this.edgeTo = [];
    for(let i = 0;i<this.vertices;i++){
        this.obj[i] = [];
        this.marked[i] = false;
    }
    this.addEdge = addEdge;
    this.showGraph = showGraph;
    this.dfs = dfs;
    this.bfs = bfs;
    this.hasPathTo = hasPathTo;
    this.pathTo = pathTo;
}
function addEdge(v,w) {
    this.obj[v].push(w);
    this.obj[w].push(v);
    this.edges++;
}
function showGraph () {
    for(let i = 0; i < this.vertices;i++){
        let edges = '';
        for(let j = 0; j < this.vertices;j++) {
            if(this.obj[i][j]) {
                edges += this.obj[i][j]+' ';
            }
        }
        console.log(i+'--->'+edges)
    }
}
function dfs(v) {
    this.marked[v] = true;
    if(this.obj[v]!=undefined){
        console.log(v+'节点已经被访问')
    }
    for(let w in this.obj[v]) {
        let current = this.obj[v][w];
        if(!this.marked[current]) {
            this.dfs(current)
        }
    }
}
function bfs(s) {
    let queue = [];
    this.marked[s] = true;
    queue.push(s);
    while(queue.length>0){
        let v = queue.shift();
        if(v!=undefined) {
            console.log('bfs-->'+v+'节点已经被访问')
        }
        for (let w in this.obj[v]) {
            let current = this.obj[v][w];
            if(!this.marked[current]){
                this.marked[current] = true;
                this.edgeTo[current] = v
                queue.push(current)
            }
        }
    }
}
function hasPathTo (v) {
    return this.marked[v];
}
function pathTo (v) {
    let source = 0;
    if(!this.hasPathTo(v)) return null;
    let path = [];
    for(let i =v;i!=source;i=this.edgeTo[i]) {
        path.push(i);
    }
    path.push(source);
    return path;
}
let g = new Graph(5);
g.addEdge(0,1);
g.addEdge(0,2);
g.addEdge(1,3);
g.addEdge(2,4);
g.showGraph();
// g.dfs(0)
g.bfs(0)
let paths =g.pathTo(4);
let str = '';
while(paths.length>0) {
    if(paths.length>1) {
        str += paths.pop()+'->';
    }else{
        str += paths.pop();
    }
}
console.log(str,g.edgeTo);
```