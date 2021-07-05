# 单例模式

## 定义

**单例模式**，也叫**单子模式**，是一种常用的[软件设计模式](https://zh.wikipedia.org/wiki/软件设计模式)，属于创建型模式的一种。在应用这个模式时，单例对象的[类](https://zh.wikipedia.org/wiki/类_(计算机科学))必须保证只有一个实例存在。许多时候整个系统只需要拥有一个的全局[对象](https://zh.wikipedia.org/wiki/对象)，这样有利于我们协调系统整体的行为。比如在某个[服务器](https://zh.wikipedia.org/wiki/服务器)程序中，该服务器的配置信息存放在一个[文件](https://zh.wikipedia.org/wiki/文件)中，这些配置数据由一个单例对象统一读取，然后服务[进程](https://zh.wikipedia.org/wiki/进程)中的其他对象再通过这个单例对象获取这些配置信息。这种方式简化了在复杂环境下的配置管理。 

实现单例模式的思路是：一个类能返回对象一个引用(永远是同一个)和一个获得该实例的方法（必须是静态方法，通常使用getInstance这个名称）；当我们调用这个方法时，如果类持有的引用不为空就返回这个引用，如果类保持的引用为空就创建该类的实例并将实例的引用赋予该类保持的引用；同时我们还将该类的[构造函数](https://zh.wikipedia.org/wiki/构造函数)定义为私有方法，这样其他处的代码就无法通过调用该类的构造函数来实例化该类的对象，只有通过该类提供的静态方法来得到该类的唯一实例。	

上述摘自`维基百科`

## 上代码

```js
// 斐波那契数列指的是这样一个数列：1、1、2、3、5、8、13、21、34、……在数学上，
// 斐波纳契数列以如下被以递归的方法定义：F(0)=1，F(1)=1, F(n)=F(n-1)+F(n-2)（n>2，n∈N*）
// 。请用JavaScript/typescript实现函数F, 参数是斐波那契数列的序号(从0开始)，返回值是当前序号的值


var fib = (function () {
    var instance = [1, 1];
    var fib = function (n) {
        if (n<instance.length) {
            return instance[n];
        }
        for(let i=instance.length;i<=n+1; i++){
            instance[i]=instance[i-1]+instance[i-2]
        }
        return instance[n];
    }
    return fib
})()

console.log(fib(0))
console.log(fib(10))
console.log(fib(2))
console.log(fib(1))
console.log(fib(11))
console.log(fib(3))
```



```typescript
/*
 * @Descripttion: 
 * @version: 
 * @Author: memory
 * @Date: 2020-10-23 20:50:48
 * @LastEditors: memory
 * @LastEditTime: 2021-05-31 23:13:46
 */
class Singleton {
  private static instance: Singleton = null;
  constructor() { }
  public static getInstance(): Singleton {
    if (this.instance == null) {
      this.instance = new Singleton();
    }
    return this.instance;
  }
  public test() {
    console.log('单例');
  }
}

const xx = Singleton.getInstance();
const xx2 = Singleton.getInstance();
// xx.test();
console.log(xx == xx2);
```

