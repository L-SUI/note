// 用户下载文件，你已知
//     下载的百分比，percentage，非负整数
//     已用的时间（毫秒），timeSpent，非负整数
//     想估算还剩多少时间（毫秒完成）。假设下载速度不变

function estimateRemaining(percentage,timeSpent) {
    if(percentage==0) return 'NaN';
    let onePercent = Math.floor(timeSpent/percentage*100)
    return (onePercent-timeSpent).toFixed(0)
}

console.log(estimateRemaining(25,30))