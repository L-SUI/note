// 请实现一个print(msg)函数，效果是将MSG打印出来，打印效果每秒
// 最多触发一次，多余的调用将被忽略。例如下面的代码：14打印出来23没有
// print(1)
// print(2)
// print(3)
// setTimeout(() => print(4),2000)


function createPrint() {
    let time;
    return (msg) => {
        let current = new Date().getTime();
        if(!time||current-time>=1000) {
            time=current;
            console.log(msg)
        }
    }
}

const print = createPrint();
print(1)
print(2)
print(3)
setTimeout(() => print(4),2000)