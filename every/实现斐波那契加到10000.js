// 实现斐波那契加到10000，注意报栈和超过数字范围限制的问题(普通数字想加为infinity)

function add(str1,str2) {
    let res = '';
    let count = 0;
    if(str1.length!=str2.length){
        str1= str1.padStart(str2.length,'0');
    }
    for (let i=str2.length-1;i>=0;i--){
        let sum = str1[i]*1+str2[i]*1+count;
        count=0
        if(sum < 10){
            res =sum+ res;
        }else{
            res =(sum-10)+ res;
            count++;
        }
    }
    if(count>0) res = count+ res;
    return res;
}

function fibonacci(num) {
    let prev = '1';
    let curr = '1';
    for(let i =2;i<=num;i++) {
        let temp = curr;
        curr = add(prev,curr)
        prev=temp
    }
    return curr
}

console.log(fibonacci(7))
console.log(fibonacci(20))
console.log(fibonacci(10000))
