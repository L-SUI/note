// 完成一个转换函数，将数字转成对应的大写字母，满足下面的对应关系
// 1 => A
// 2 => B
// 3 => C
// ...
// 26 => Z
// 27 => AA
// 28 => AB
// 29 => AC
// ...
// 52 => AZ
// 53 => BA
// 54 => BB
// 实现下方函数
function convert(num) {
    // TODO
    //1-26直接返回
    if(num-1<26) {
        return String.fromCharCode(65+(num-1)%26)
    }
    let res = ''
    //循环处理
    while (num>0) {
        //  -1为了处理26%26
        var codeNum = (num-1)%26
        //  27 codeNum=>1
        var c = String.fromCharCode(65+codeNum)
        res = c+res
        //  27num=1
        num=parseInt((num-1)/26)
    }
    return res
}

// 测试代码：
const output1 = convert(1);
console.log(output1); // A

const output2 = convert(26);
console.log(output2); // Z

const output3 = convert(53);
console.log(output3); // BA

