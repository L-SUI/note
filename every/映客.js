var obj = {
    name: 'baidu',
    arr: ['a', 'b', 'c']
}

var obj2 = obj
var arr = obj.arr

obj2.arr = ['a', 'b', 'c', 'd']
obj2.name = 'inke'

console.log(arr)//['a', 'b', 'c']
console.log(obj.name)//'inke'
console.log(obj === obj2)//true
console.log(obj.arr === obj2.arr)//true
console.log(obj.arr === arr)//false



var MAP = {
    onclick: function () {

    },
    curry: function (val) {
        return function (z) {
            return val++ + z
        }
    }
}

var getInfo = function (val) {
    return MAP[val]
}
var fn = getInfo('curry')

var a = fn(100)

console.log(a(200))//100+200=300
console.log(a(300))//101+300=401
console.log(fn(100)(200))//100+200=300
console.log(getInfo('curry')(100)(300))//100+300=400


var x = 10;
if (true) {
    x = 20;
    console.log(x)//
    let x;
}


// 字符串长度为N，判断有没有重复的字符，有重复的返回true

function isRepeat(str) {
    let map = {};
    for (let i = 0; i < str.length; i++) {
        if(map[str[i]]) return true;
        map[str[i]] = true;
    }
    return false;
}
