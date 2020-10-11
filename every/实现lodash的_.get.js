// 实现lodash的_.get

function get (obj,value,end) {
    let flag = Array.isArray(value)
    if(!flag) {
        value = value.replace(/\[/,'.').replace(/\]\./,'.').split('.')
    }
    let result =obj;
    for (let i = 0; i <value.length; i++){
        result = result[value[i]]
        if (result == undefined) return end
    }
    return result
}
const object = { 'a': [{ 'b': { 'c': 3 } }] };
 
console.log(get(object, 'a[0].b.c'));               // => 3
console.log(get(object, ['a', '0', 'b', 'c']));     // => 3
console.log(get(object, 'a.b.c', 'default'));       // => 'default'
