// 算法题：获取数字的质数组合数组
// input: 10 output: [2,5]
// input: 20 output: [2,2,5]

function getPrimeNumber(input){
    const res = [];
    const mid = input/2;
    const dfs = (num,base)=> {
        if(base>mid) return;
        if(num%base==0&&isPrimeNumber(base)){
            res.push(base);
            dfs(num/base,2)
        }else{
            dfs(num,base+1)
        }
    }
    dfs(input,2)
    return res;
}

function isPrimeNumber(num){
    if(num<=3) return true;
    for(let i=2;i<num;i++){
        if(num%i==0) return false;
    }
    return true;
}
console.log(getPrimeNumber(10))
console.log(getPrimeNumber(20))