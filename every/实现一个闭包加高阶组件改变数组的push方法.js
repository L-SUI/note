// 实现一个闭包加高阶组件改变数组的push方法，判断参数是否是number，
// 如果是把number转换成字符串，并且封装内部方法可以恢复，一切的前提
// 都是不影响原来数组方法的前提下


function newPush(arr) {
    const push = Array.prototype.push;
    let flag = true;
    const isNumber = (v)=> Object.prototype.toString.call(v).includes("Number")
    const newArr = Object.defineProperty(arr,'push',{
        value: function(target){
            if(flag&&isNumber(target)) push.call(this,target.toString())
            else push.call(this,target)
        }
    });
    const recovery = function(){
        flag=false;
    }
    return {
        recovery
    };
}
const arr = [];
const instance = newPush(arr);
arr.push(2);
console.log(arr);
instance.recovery();
arr.push(2);
console.log(arr);
