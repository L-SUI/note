function fibonacci (n) {
    //递归
    if(n<2) return n;
    return fibonacci(n-2)+fibonacci(n-1);
}

function advanceArray (n) {
    let arr = new Array(n).fill(0);
    arr[1] = arr[2] = 1;
    if(n<=2) return arr[n];
    for(let i=3;i<=n;i++){
        arr[i] = arr[i-1] + arr[i-2];
    }
    return arr[n];
}

function advance (n) {
    let prev = 1;
    let current =1;
    let result =1;
    for (let i = 2; i < n; i++) {
        result = prev + current;
        prev = current;
        current = result;
    }
    return result;
}
// console.log(fibonacci(10));
// console.log(advanceArray(10));
console.log(advance(10));