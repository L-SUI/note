// 手写一个方法实现请求失败后一定时间后重试，重试时间是上次的两倍

function again(url,timeout){
    let count=0;
    let pre = new Date().getTime()
    function fetch(url){
        console.log(`第${count}次失败`)
        return 1
    }

    function re (){
        setTimeout(async ()=>{
            let res = await fetch(url)
            console.log(new Date().getTime()-pre);
            pre = new Date().getTime();
            if(res==1){
                count++;
                re()
            }
        },timeout*Math.pow(2,count));
    }
    re();
}
again('',200)