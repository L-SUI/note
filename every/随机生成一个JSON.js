// 随机生成一段json
/**
 * @param {number,number} 
 * level目标层级，maxChildren属性最大数目（每个层级不定）
 * @return {JSON}
 */
function generateJson(level,maxChildren) {
    const res = {};
    let queue = [];
    for(let i =random(maxChildren);i>=0;i--){
        res[`${level}_${i}`]={}
        queue.push(res[`${level}_${i}`])
    }
    level--
    while(level>0&&queue.length>0){
        const arr = [];
        while(queue.length){
            const curr = queue.pop();
            for(let i =random(maxChildren);i>=0;i--){
                curr[`${level}_${i}`] ={}
                arr.push(curr[`${level}_${i}`])
            }
        }
        queue.push(...arr)
        level--
    }
    return res;
}
function random(n) {
    return 1+Math.floor(Math.random()*n)
}
console.log(generateJson(3,3))