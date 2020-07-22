1. 请解释弹出值并解释为什么(6分)
```javascript
    alert(a)   
    a(); 
    var a=3; 
    function a(){ 
        alert(10) 
    } 
    alert(a) 
    a=6; 
    a(); 
```
--- 
```javascript
undefind                fn a
a is not function       10  
3                       3
a is not function       a is not function 
```
---
```javascript
    var x = 1, 
    y = 0, 
    z = 0; 
    function add(x) { 
    return (x = x + 1); 
    } 
    y = add(x); 
    console.log(y) 
    function add(x) { 
    return (x = x + 3);
    } 
    z = add(x); 
    console.log(z)
```
---
```javascript
    4     4
    4     4
```
2. 
```javascript
    this.a = 20; 
    function go() { 
        console.log(this.a); 
        this.a = 30; 
    } 
    go.prototype.a = 40; 
    var test = { 
        a: 50, 
        init: function(fn) { 
            fn(); 
            console.log(this.a); 
            return fn; 
        } 
    }; 
    console.log((new go()).a); 
    test.init(go); 
    var p = test.init(go); 
    p();
```
---
```javascript
    40  40
    30  30
    20  20
    50  50
    20  30
    50  50
    20  30
```
---
```javascript
    var num = 1;
    function yideng() {
        "use strict";
        console.log(this.num++);
    }
    function yideng2() {
        console.log(++this.num);
    }
    (function() {
        "use strict";
        yideng2();
    })();
    yideng();
```
---
```javascript
    let reportErrors = Uncaught TypeError: Cannot read property 'num' of undefined
    reportErrors  2
    1             reportErrors
``` 
---
3.  
```javascript
    function C1(name) { 
        if (name) this.name = name; 
    } 
    function C2(name) { 
        this.name = name; 
    } 
    function C3(name) { 
        this.name = name || 'fe'; 
    } 
    C1.prototype.name = "yideng"; 
    C2.prototype.name = "lao"; 
    C3.prototype.name = "yuan"; 
    console.log((new C1().name) + (new C2().name) + (new C3().name));
```
---
```javascript
    yidengundefinedfe  yidengundefinedfe
```
---
3. 写出li的输出值，并且写出三种正确输出的方式
```javascript
    <ul> 
        <li>1</li> 
        <li>2</li> 
        <li>3</li> 
        <li>4</li> 
        <li>5</li> 
        <li>6</li> 
    </ul> 
    <script type="text/javascript"> 
        var list_li = document.getElementsByTagName("li"); 
        for (var i = 0; i < list_li.length; i++) { 
            list_li[i].onclick = function() { 
                console.log(i); 
            } 
        } 
    </script>
```
---
```javascript
    6
    //1
    var list_li = document.getElementsByTagName("li"); 
    for (let i = 0; i < list_li.length; i++) { 
        list_li[i].onclick = function() { 
            console.log(i+1); 
        } 
    } 
    //2
    var list_li = document.getElementsByTagName("li"); 
    for (let i = 0; i < list_li.length; i++) { 
        (function (index) {
            list_li[index].onclick = function() { 
                console.log(index); 
            } 
        })(i+1)
    } 
    //3
    var list_li = document.getElementsByTagName("li"); 
    for (var i = 0; i < list_li.length; i++) { 
        list_li[i].onclick = function() { 
            console.log(this.innerHTML); 
        } 
    } 
```
4. 写出输出值，并解释为什么
```javascript
    function test(m) { 
        m = {v:5} 
    } 
    var m = {k: 30}; 
    test(m); 
    alert(m.v);
```
---
```javascript
    5   undefind   
```
5. 请写出代码的执行结果，并解释为什么
```javascript
    function yideng() { 
        console.log(1); 
    } 
    (function () { 
        if (false) { 
            function yideng() { 
                console.log(2); 
            } 
        } 
        yideng(); 
    })();
```
---
```javascript
    yideng is not a function   yideng is not a function
```
6. 请用一句话算出0-100之间学生的学生等级，如90-100输出一等生，80-90二等生以此类推，不允许使用if，switch
```javascript
    Math.floor(11-num/10)
```
7. 请用一句话遍历变量a。（禁止用for，已知var a = 'abc'）
```javascript
   slice = Array.prototype.slice
   args = slice.apply('abc')
```
8. 请写出javascript面向对象编程的混合式继承。并写出Es6版本的继承。要求：car是父类，Cruze是子类。父类有颜色，价格属性，有售卖的方法。Cruze子类实现父类颜色是红色，价格是140000，实现方法输出如下语句：将红色的Cruze卖给了小王价格是14万。
```javascript
   class Car {
       constructor(color,price,name) {
           this.color = color
           this.price = price
           this.name = name
       }
       sell () {
           return `将${this.color}的${this.name}卖给了小王价格是${this.price}.`
       }
   }
   class Cruze extends Car {
       constructor (...arg) {
           super(...arg)
       }
   }
   let xiaowang = new Cruze('红色','140000','Cruze')
   console.log(xiaowang.sell())
```
9. 请你们写出如何利用ES6/7（小Demo）优化多步异步代码
```javascript
    let promise = new Promise()
    async function fn() {
        await
    } 
```
10. 考考你的基础怎么样
```javascript
    var regex = /yideng/g; 
    console.log(regex.test('yideng')); 
    console.log(regex.test('yideng')); 
    console.log(regex.test('yideng')); 
    console.log(regex.test('yideng')); 
```
---
```javascript
    true    true
    true    false
    true    true
    true    false
```
11. 考考你的基础怎么样
```javascript
var yideng = function yideng(){ 
    yideng = 1; 
    console.log(typeof yideng); 
} 
yideng(); 
yideng = 1; 
console.log(typeof yideng);
```
---
```javascript
    function    function
    number      number
```
12. 写出如下代码的执行结果
```javascript
    var length = 10; 
    function fn() { 
        console.log(this.length); 
    } 
    var yideng = { 
        length: 5, 
        method: function(fn) { 
            fn(); 
            arguments[0](); 
        } 
    }; 
    yideng.method(fn, 1);
```
---
```javascript
    10      10 
    5       2
```