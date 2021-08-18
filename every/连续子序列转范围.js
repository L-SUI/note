// 算法题：[1,2,3,4,1,2,3,6,7,8] => ['1-4','1-3','6-8']

function fn (arr) {
    let res = [],i=0,queue = [];
    while (i<=arr.length) {
        if(queue.length==0) {
            queue.push(arr[i]);
            i++
        }else {
            if(arr[i]-arr[i-1]==1){
                queue.push(arr[i]);
                i++
            }else {
                if(queue.length==1){
                    res.push(''+queue.pop());
                }else{
                    res.push(`${queue.shift()}-${queue.pop()}`);
                    queue.length=0;
                }
            }
        }
    }
    return res;
}

console.log(fn([1,2,3,4,1,2,3,6,7,8]));
