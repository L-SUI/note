// 算法题：Semantic Versioning 是一个前端通用的版本规范。
// 格式为“{MAJOR}.{MINOR}.{PATCH}-{alpha|beta|rc}.{number}”，
// 要求实现 compare(a, b) 方法，比较 a, b 两个版本大小，
//   1. 当 a > b 是返回 1；
//   2. 当 a = b 是返回 0；
//   3. 当 a < b 是返回 -1；
//   4. 其中，rc > beta > alpha，major > minor > patch；
//   5. 例子，1.2.3 < 1.2.4 < 1.3.0-alpha.1 < 1.3.0-alpha.2 < 1.3.0-beta.1 < 1.3.0-rc.1 < 1.3.0
function compare (a,b) {
    a = a.split('-')
    b = b.split('-')
    let leftA = a[0].split('.').join('')*1;
    let leftB = b[0].split('.').join('')*1;
    if(leftA>leftB) return 1;
    if(leftA<leftB) return -1;
    if(!a[1] && b[1]) return 1;
    if(a[1] && !b[1]) return -1;
    if(!a[1] && !b[1]) return 0;
    let map = {
        rc:3,
        beta:2,
        alpha:1,
    };
    let rightA = a[1].split('.');
    let rightB = b[1].split('.');
    rightA=map[rightA[0]]+rightA[1]*1
    rightB=map[rightB[0]]+rightB[1]*1
    if(rightA>rightB) return 1;
    if(rightA<rightB) return 1;
    return 0;
}
function compare (a,b) {
    a=a.replace(/rc/,2).replace(/beta/,1).replace(/alpha/,0).replace(/-/,'.');
    b=b.replace(/rc/,2).replace(/beta/,1).replace(/alpha/,0).replace(/-/,'.');
    let left = a.split('.')
    let right = b.split('.')
    if(left.length==3) left.push('3')
    if(right.length==3) right.push('3')
    while(left.length && right.length) {
        let x = left.shift()*1
        let y = right.shift()*1
        if(x>y) return 1;
        if(x<y) return -1;
    }
    return 0
}
console.log(compare('1.3.0-alpha.1','1.3.0'))
console.log(compare('1.3.0-alpha.1','1.3.0-beta.1'))
console.log(compare('1.3.0','1.3.1'))
console.log(compare('1.3.0','1.3.0'))