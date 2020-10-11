// 输入有序递增的二维数组，[[1,4,7],[2,5,6],[3,8,9]] => [1,2,3,4,...]

function flat (arr) {
    let result = [];
    let len = arr.length*arr[0].length
    let x = 0;
    let prev = 0;
    while (true) {
        if(result.length==len) return result;
        if(!arr[x].length) {
            arr.splice(x,1)
            continue;
        }
        let pre = arr[prev][0]
        let current = arr[x][0];
        prev = current>pre?prev:x;
        if(x==arr.length-1) {
            result.push(arr[prev].shift());
            prev=0;
            x=0;
        }else{
            x++
        }
    }
}

console.log(flat([[1,4,7],[2,5,6],[3,8,9]]));//==>[1,2,3,4,...]