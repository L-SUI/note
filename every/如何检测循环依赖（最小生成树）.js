// 如何检测循环依赖（最小生成树）
// https://blog.51cto.com/u_15127650/2784716

// 输入：
// 一组服务依赖关系list，('A', 'B') 表示 A 会调用 B 服务
// service_relations = [('A', 'B'), ('A', 'C'), ('B', 'D'), ('D', 'A')]
// 输出：
// 由于存在 A - B - D - A 故存在循环依赖，返回True；反之如果不存在，返回False

function isRing (arr) {
    const map = {};
    let res = false;
    arr.forEach(item=>{
        const left = item[0],right = item[1];
        if(map[left]) map[left].push(right);
        else map[left] = [right];

        if(map[right]) map[right].push(left);
        if(map[right]&&map[right].indexOf(left)>-1) res = true;
    })
    return res;
}
console.log(isRing([['A', 'B'], ['A', 'C'], ['B', 'D'], ['D', 'A']]))
console.log(isRing([['A', 'B'], ['A', 'C'], ['B', 'D']]))