// 1000个6位长度的纯数字验证码，数组形式输出（最简单的方法来做）

let arr = new Array(1000).fill(0).map(item =>(''+Math.floor(Math.random()*1000000)).padStart(6,'0'))
console.log(arr);