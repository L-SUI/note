# E卷

1. 请写出如下代码的输出值(6分)

```javascript
console.log({}+[]); 
{}+[]; 
[]+{}; 
{} + {}; 
console.log([] == false) 
console.log({} == false) 
if([]){ 
 console.log([] == false) 
} 
("b" + "a" + + "a" + "a").toLocaleLowerCase(); 
0 == "0"
Boolean("0") == Boolean(0) 
NaN == 0; 
NaN <= 0;
```
***
```javascript
2   [object Object]
2   0
2   "[object Object]"
2   NaN
false   true
false   false
false   true  
--     
true    false
false   false
false   false
false   false
```

2. 写出如下输出值，并做了附加题

```javascript
function fn(){ 
 console.log(this.length); 
} 
var yideng = { 
 length:5, 
 method:function(){ 
 "use strict"; 
 fn(); 
 arguments[0]() 
 } 
} 
const result = yideng.method.bind(null); 
result(fn,1);
```
***
```javascript
0   0
2   2
```
* 附加题

```javascript
function bar() { 
 console.log(myName) 
} 
function foo() { 
 var myName = "老袁" 
 bar() 
} 
var myName = "京程⼀灯" 
foo()
```
---
```javascript
"老袁"  "京程⼀灯" 
```

3. 请问变量a会被GC回收吗
```javascript
function test(){ 
    var a = "yideng"; 
    return function(){ 
        eval(""); 
    } 
} 
test()();
```
***
```javascript
//会，函数内没有别的地方会用到

不会，eval下不会回收
```

4. 请写出如下代码的输出值
```javascript
Object.prototype.a = 'a'; 
Function.prototype.a = 'a1'; 
function Person(){}; 
var yideng = new Person(); 
console.log(Person.a); 
console.log(yideng.a); 
console.log(1..a); 
console.log(1.a); 
console.log(yideng.__proto__.__proto__.constructor.constructor.constructor);
Object.prototype 和 Function.prototype 打印的差距很大的原因什么
```
---
```javascript
'a1'    a1
'a1'    a
--      a
a       --
Function    Function
```

5. 请写出下面代码的输出结果
```javascript
var a={}, 
 b={key:'b'}, 
 c={key:'c'}; 
a[b]=123; 
a[c]=456; 
console.log(a[b]); 
console.log(Symbol(b) == Symbol(b))
```
---
```javascript
456         456
false       false
```

6. 请写出你了解的ES6元编程
```javascript

```
---
```javascript

```

7. 请按照下方要求作答，并解释原理？请解释下babel编译后的async原理
```javascript
let a = 0; 
let yideng = async () => { 
    a = a + await 10; 
    console.log(a) 
} 
yideng(); 
console.log(++a);
```
---
```javascript
10      1     
11      10
```
- 加强一下
```javascript
async function async1(){ 
    console.log(1) 
    await async2(); 
    console.log(3) 
} 
async function async2(){ 
    console.log(2) 
} 
async1(); 
console.log(4)
```
---
```javascript
1   1
2   2
4   4
3   3
```

8. 请问点击'<button id="test"></button>'会有反应吗?为什么？能解决吗？
```javascript
$('#test').click(function(argument) { 
    console.log(1); 
}); 
setTimeout(function() { 
    console.log(2); 
}, 0); 
while (true) { 
    console.log(Math.random()); 
}
```
---
```javascript
// 不会，死循环了

能。。。worker开个线程
```

9. 请先写出如下代码的执行结果，并用Es5实现ES6A+规范的代码，同事你能解释下如何使用promise完成事物的操作码
```javascript
const pro = new Promise((resolve, reject) => {
    const innerpro = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1);
        })
        console.log(2);
        resolve(3);
    })
    innerpro.then(res => console.log(res));
    resolve(4);
    console.log("yideng");
})
pro.then(res => console.log(res));
console.log("end");
```
---
```javascript
2         2
yideng    yideng
end       end
3         3
4         4
```

10. 请写出如下输出值，并写出为什么
```javascript
var s = []; 
var arr = s; 
for (var i = 0; i < 3; i++) { 
    var pusher = { 
        value: "item"+i 
    },tmp; 
    if (i !== 2) { 
        tmp = [] 
        pusher.children = tmp 
    } 
    arr.push(pusher); 
    arr = tmp; 
} 
console.log(s[0]);
```
---
```javascript
{value: "item0", children: [{value: "item1", children: [{value: "item2"}]}]}

{value: "item0", children: [{value: "item1", children: [{value: "item2"}]}]}
```
---
附加题：请描述你理解的函数式编程，并书写如下代码结果。那么你能使用Zone+RX 写出一段FRP的代码吗？
```javascript
var Container = function(x) { 
    this.__value = x; 
} 
Container.of = x => new Container(x); 
Container.prototype.map = function(f){ 
    return Container.of(f(this.__value)) 
} 
Container.of(3) 
    .map(x => x + 1) 
    .map(x => 'Result is ' + x);
```
---
```javascript
Result is 4     Container {__value: "Result is 4"}
```
