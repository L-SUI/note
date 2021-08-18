// ABC三个字符串,A中包含的B图换成C


const isEqual = (A,start,end,B)=> {
    let curr = '';
    while (start<end) curr+=A[start++]
    return curr==B
}
const slice = (A,start,end) => {
    let curr = '';
    while (start<end) curr+=A[start++]
    return curr;
}
function replace(A,B,C) {
    let i=-1,lenB = B.length;
    while (++i<A.length) {
        A[i]==B[0] && isEqual(A,i,i+lenB,B) && (A=slice(A,0,i)+C+slice(A,i+lenB,A.length),i--);
    }
    return A;
}
console.log(replace('abcdeffhijklmndef','def','de'));