// 字符串解析，要求
// 相同key的多个值用数组封装
// 如果能用JSON解析则作为json对象
// 没有value，赋值false的boolean值
// 需要转义
// input: name=adam&name=bob&obj={a:1,b:2}&use&encodeStr=%20
// output:
// {
//   name: ['adam', 'bob'],
//   obj: {a:1, b:2},
//   use: false,
//   encodeStr: ' '
// }


function args(str) {
    let arr = str.split('&');
    let map = {}
    arr.forEach(item=>{
        let curr = item.split('=');
        if(map[curr[0]]) map[curr[0]] = Array.isArray(map[curr[0]])?map[curr[0]].push(curr[1]) :[map[curr[0]],curr[1]]
        else map[curr[0]]=JSON.parse(curr[1])
    })
    return map
}
console.log('name=adam&name=bob&obj={a:1,b:2}&use&encodeStr=%20')