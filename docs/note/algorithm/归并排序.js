function merge (arr) {
    if(arr.length<2) return ;
    let step = 1;
    let left,right;
    while(step<arr.length){
        left=0;
        right=step;
        while(right+step<=arr.length){
            mergeArray(arr,left,left+step,right,right+step);
            left=right+step;
            right=left+step;
        }
        if(right<arr.length){
            mergeArray(arr,left,left+step,right,arr.length);
        }
        step*=2
    }
    return arr;
}
function mergeArray (arr,startLeft,stopLeft,startRight,stopRight) {
    let leftArr = new Array(stopLeft - startLeft+1)
    let rightArr = new Array(stopRight - startRight+1)
    k = startLeft;
    for(let i=0;i<leftArr.length-1;i++) {
        leftArr[i]=arr[k]
        ++k
    }
    k = startRight;
    for(let i=0;i<rightArr.length-1;i++) {
        rightArr[i]=arr[k]
        ++k
    }
    leftArr[leftArr.length-1]=Infinity;
    rightArr[rightArr.length-1]=Infinity;
    let m =0;
    let n = 0;
    for(let k=startLeft;k<stopRight;k++){
        if(leftArr[m]<=rightArr[n]){
            arr[k] = leftArr[m];
            m++
        }else{
            arr[k] = rightArr[n];
            n++
        }
    }
    console.log(arr);
}

console.log(merge([9,3,25,4,1,47,6,8,5,10,25]))