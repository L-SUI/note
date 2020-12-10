// 实现一个请求函数 function ajax (url, wait, count)，
// 在 wait 时间内无结果则进行重试，最多重试 count 次。要求不可使用 
// xhr 的 timeout 属性。 
// 如果 wait 的时间要尽可能排除掉xhr pending 的时间可以怎么做？

class ajax {
    constructor(url, wait, count) {
        this.url = url;
        this.wait = wait;
        this.count = count;
        this.index = 0;
        this.timer = null;
        this.xhr = null;
        this.res();
    }
    res() {
        this.xhr = this.getData(this.url)
    }
    getData(url) {
        !this.xhr || this.xhr.abort()
        var xhr = new XMLHttpRequest();
        xhr.loadend = () => {
            clearTimeout(this.timer)
            console.log('请求结束，状态未知');
            //判断状态非正常继续请求
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log(xhr.responseText);
                } else {
                    console.error(xhr.statusText);
                }
            }else{
                this.res();
            }
        }
        xhr.onloadstart=()=>{//xhr 的 timeout这里开始计时
            this.timer = setTimeout(() => {
                if (this.index < this.count) {
                    this.index++;
                    this.res();
                } else {
                    console.log('接口出错')
                }
            }, this.wait)
        }
        xhr.open('GET', url, true);
        xhr.send(null);
        return xhr;
    }
}