# JS | 装箱和拆箱

为什么?

```js
console.log(1 === Number(1)) // true
```

## 面向对象的妥协

JavaScript中存在两套类型系统，其一是基础类型系统（Basetypes），是由typeof运算来检测的，按照约定，该类型系统包括7种类型（undefined、number、boolean、string、symbol、function和object）；其二是对象类型系统（Objecttypes），对象类型系统是“对象基础类型（object）”中的一个分支。

面向对象的语言通常认为“一切都是对象”。于是在“对象类型系统”中就出现了一个问题：如果是这样，那么number基础类型与Number对象类型，以及其他基础类型与相应的对象类型是如何被统一的呢？

为了实现“一切都是对象”的目标，JavaScript在类型系统上做出了一些妥协，

其结果是∶  <HighLightInline>为部分基础类型系统中的“值类型”设定对应的包装类；然后通过包装类，将“值类型数据”作为对象来处理。</HighLightInline>

|分类|基础类型|字面量|包装类|说明|
|:-:|:-:|:-:|:-:|:-:|
|值类型|undefined|undefined|无|不需要包装类型 **引用1**|
|值类型|boolean|true,false|Boolean|可以被包装的 "值类型数据"|
|值类型|number|数值|Number|可以被包装的 "值类型数据"|
|值类型|string|'...','...'|String|可以被包装的 "值类型数据"|
|值类型|symbol|(无)|Symbol|可以被包装的 "值类型数据"|
|引用类型|function|function(){...}|无|**引用2**|
|引用类型|object|{...}|无|**引用2**|


**引用1**: <HighLightInline>undefined无论如何都不是对象—它在概念上处于“一切都是对象”之外 </HighLightInline>

**引用2**: <HighLightInline>基础类型function与object的数据都是对象，因此看起来“似乎”都有各自的包装类，但它们与其对应的类更多的是映射关系而并非做值转换。</HighLightInline>

这样一来，基础类型数据通过包装类转换而来的结果，和对象类型系统中的每一个实例一样，都成了理论上的“对象”。

- `typeof（obj）`的值为 `'object'`或 `'function'`

- `obj instanceof Object` 的值为 `true`。

所以在值类型数据经过 “包装类” 包装后得到的是对象和原来的值类型数据不再是同一数据，只是二者同等的价值而已

### 显示创建

JavaScript支持一种特殊语法，可基于包装类显式地创建“值类型数据”所对应的对象。这种语法是将类构造器当成普通函数使用，该函数能将参数值进行包装，并以该类构造器的一个实例传出。这种语法看起来类似一些通用语言中的类型强制转换：

```js
// 显示创建 “值类型数据” 的包装对象
// F: String | Number | Boolean
var a = new FConstructor(value)

console.log(new Number(3)) // Number{3}

var items = [ 100, 'hellojs', true]

var types = {
  number: Number,
  string: String,
  boolean: Boolean
}

items.map( it => {
  return new types[typeof it](it)
}).forEach( obj => {
  console.log(typeof obj, obj)
})

// 最终会得到如下结果
// object Number{ 3 }
// object String{ "hellojs" }
// object Boolean{ true }
```

从语言的实现来说，这与传统语言中的“类型强制转换”完全不同：强制转换是在同一数据（相同内存地址的不同引用）的基础上进行的，但上述语法将创建一个新的数据。

尽管值类型中的“符号类型（symbol）”存在对应的包装类，但是它不能通过这种显式创建的语法来得到对象实例。

### 显示包装

JavaScript内建的Object()类支持显式地将boolean、number、string和symbol四种值类型数据包装成对应的对象，这一语法在语义上解释为“基于值来创建等同的对象“。

```js
// 显式将“值类型数据”转换为对象
var a = new Object(v)

// Q & A
console.log(new Object(3)) // Number{3}

var items = [ 100, 'hellojs', true, Symbol()]
items.map(it => new Object(it)).forEach( obj => console.log(typeof obj, obj))

// 最终会得到如下结果
// object Number{ 3 }
// object String{ "hellojs" }
// object Boolean{ true }
// object Symbol{ Symbol() }
```

### 隐式包装的过程

对于值类型数据来说，如果它用作普通求值运算或赋值运算，那么是以“非对象”的形式存在的。例如下面这行代码

```js
// 因为做 + 运算的两边都是以 “非对象” 形式在做运算。 就是直接做值运算
var b = 'hello' + 'js'
```
当对值类型数据进行对象系统运算时，是不会有包装的
```js
var a = 100
// 1. instanceof 不算对原数据类型的包装
a instanceof Number

// 2. 因为不能对值类型数据 做 in 运算
'toString' in a

// 但是有些情况下需要将值类型包装转换为对象，在进行运算
// 3. 成员在存取时，“包装” 的行为发生在存取中
a.constructor
a['constructor']

// 4. 成员存取后进行的方法调用，“包装” 也发生在调用过程中
a.toString()

// 5. 做 delete 运算时
delete a.toString
```
所谓值类型数据到对象的“隐式包装”，在已知的表达式运算中，其实总是由成员存取运算符触发的。那么如何检测呢

### 检测方法

然而如何检测被包装后的这个对象呢？我们知道，对象方法调用时，会传入一个this引用，而这个this引用必然是一个“真实的对象”。因此，如果是对值类型数据做方法调用运算，那么就可以检测到这个“被包装后的对象”。

通过方法调用来获得被包装后的对象

```js
var a = 100
Object.prototype.getSelf = function() {
  return this
}
Object.prototype.getClass = function() {
  return this.constructor
}
Object.prototype.getTypeof = function() {
  return typeof this
}
Object.prototype.getInstanceof = function() {
  return this instanceof this.getClass()
}

// 包装行为发生在存取运算中
a.getSelf()
// 包装后的对象
console.log(typeof a, a)
// Number{10}

// 其他情况也是如此

var example = [
  '', // 字符串
  100, // 数值
  true, // 布尔值
  function(){}, // 函数
  {}, // 对象
  [], // 数组
  /./ // 正则
]
example.push(Symbol()) // Symbol 不支持字面量形式赋值

// 取特性看看 v2:object
var getAttr = (v, v2, cls) => [typeof v, v2.getTypeof(), v instanceof cls, v2.getInstanceof()]
// 检测试试
example.map(it => [typeof it, getAttr(it, it.getSelf(), it.getClass())]).forEach( ([method, attr]) => {
  console.log(method, ':', attr)
}
```

处理 undefined 只有 v 没有 v2

对string、number、boolean和symbol的值v检测的结果表明

- 进行typeof检测时，都不是'object'，这表明“值类型数据”不是对象

- 进行instanceof检测时，值都是false，表明它们都不是通过对象系统（构造器）创建的。

![jstype](/jsNote/jstype.png)


包装类是JavaScript用来应对“在值类型数据上调用对象方法”的处理技术。这与后来在.NET中产生的“装箱（boxing）”是一样的[20]，只是JavaScript将这种技术称为“包装”而已。

```js
Number.prototype.showDataType = function() {
  console.log(`values: ${this},type: ${typeof this}`);
}

var a = 100
console.log(typeof a)
a.showDataType()
// 在函数外部调用 typeof 时 a 竟然变成了 object ？，这是因为对对象 a 进行了对象成员的存取操作
// JavaScript 用包装类为上边的 a 临时创建了一个对象
// 等同于
Object(a).showDataType()
// 在 showDataType 这个栈帧执行完成之后，这个临时的包装对象就会被清理掉
```
<HighLight>可见，在“值类型数据”方法调用其实是被一个隔离在另外一个对象中完成，我们无论修改这个新对象，都不会影响到原来的值</HighLight>

例如

```js
// 声明值类型并且修改他的成员方法
var str = 'hellojs'
// 这里重写是无意义的
str.toString = function() {
  return 'hoho'
}
console.log(str.toString()) // 'hoho'
console.log(str) // 'hellojs'
```

