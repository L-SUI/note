// ['12a','3b','4c','15d','15e','2a'] 统计这个数组中出现次
// 数最多的字母前的数字和，这个数组就是a, 12+2 = 14

function maxSum(arr) {
    let max = 0;
    const map = {};
    arr.forEach(item=>{
        let num = parseFloat(item);
        let word = item.split(num.toString()).pop();
        if(map[word]) map[word].push(num)
        else map[word]=[num]
        max = Math.max(max,map[word].length);
    })
    let res = 0;
    let resArr = Object.values(map);
    resArr.forEach(item=>{
        if(item.length==max){
            res+=item.reduce((a,b)=>a+b,0)
        }
    })
    return res;
}
console.log(maxSum(['12a','3b','4c','15d','15e','2a']))
console.log(maxSum(['12a','3b','4c','15d','15e','2a','6b']))
console.log(maxSum(['12ac','3b','4ac','15d','15e','2ac','6b']))