(function () {
(function () {
    console.log(123);
    debugger;
})();
function test() {
    debugger
}
test();
}()
var a;
if (false) {
    a = 20;
}
console.log(a);

// function test() {
//     console.log(123);
// }
// test();
var a;
console.log(a);
a = 20;
function init() {
    //js private 私有变量
    var a = 20;
}
init();
console.log(a);
var a = 30;
{
    // a = 40;
    // const a;
    const test = function test() { }
}
console.log(test);
function yideng() { }
var yideng;
// yideng = 1;
console.log(yideng);
alert(a);
a();
var a = 3;

function a() {
    alert(10);
}
alert(a);
a = 6;
a();


// function yideng() {
//     console.log(1);
// }
// function init() {
//     // console.log(yideng);
//     if (false) {
//         function yideng() {
//             console.log(2);
//         }
//     }
//     console.log(yideng);
// }
// // yideng();
// init();