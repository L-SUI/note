# 实现Symbol类型

## 前言

实际上，Symbol 的很多特性都无法模拟实现……所以先让我们回顾下有哪些特性，然后挑点能实现的……当然在看的过程中，你也可以思考这个特性是否能实现，如果可以实现，该如何实现。

## 回顾

ES6 引入了一种新的原始数据类型 Symbol，表示独一无二的值。

**1. Symbol 值通过 Symbol 函数生成，使用 typeof，结果为 "symbol"**

```
var s = Symbol();
console.log(typeof s); // "symbol"
```

**2. Symbol 函数前不能使用 new 命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。**

**3. instanceof 的结果为 false**

```
var s = Symbol('foo');
console.log(s instanceof Symbol); // false
```

**4. Symbol 函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。**

```
var s1 = Symbol('foo');
console.log(s1); // Symbol(foo)
```

**5. 如果 Symbol 的参数是一个对象，就会调用该对象的 toString 方法，将其转为字符串，然后才生成一个 Symbol 值。**

```
const obj = {
  toString() {
    return 'abc';
  }
};
const sym = Symbol(obj);
console.log(sym); // Symbol(abc)
```

**6. Symbol 函数的参数只是表示对当前 Symbol 值的描述，相同参数的 Symbol 函数的返回值是不相等的。**

```
// 没有参数的情况
var s1 = Symbol();
var s2 = Symbol();

console.log(s1 === s2); // false

// 有参数的情况
var s1 = Symbol('foo');
var s2 = Symbol('foo');

console.log(s1 === s2); // false
```

**7. Symbol 值不能与其他类型的值进行运算，会报错。**

```
var sym = Symbol('My symbol');

console.log("your symbol is " + sym); // TypeError: can't convert symbol to string
```

**8. Symbol 值可以显式转为字符串。**

```
var sym = Symbol('My symbol');

console.log(String(sym)); // 'Symbol(My symbol)'
console.log(sym.toString()); // 'Symbol(My symbol)'
```

**9. Symbol 值可以作为标识符，用于对象的属性名，可以保证不会出现同名的属性。**

```
var mySymbol = Symbol();

// 第一种写法
var a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
var a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
var a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
console.log(a[mySymbol]); // "Hello!"
```

**10. Symbol 作为属性名，该属性不会出现在 for...in、for...of 循环中，也不会被 Object.keys()、Object.getOwnPropertyNames()、JSON.stringify() 返回。但是，它也不是私有属性，有一个 Object.getOwnPropertySymbols 方法，可以获取指定对象的所有 Symbol 属性名。**

```
var obj = {};
var a = Symbol('a');
var b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';

var objectSymbols = Object.getOwnPropertySymbols(obj);

console.log(objectSymbols);
// [Symbol(a), Symbol(b)]
```

**11. 如果我们希望使用同一个 Symbol 值，可以使用 Symbol.for。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值。**

```
var s1 = Symbol.for('foo');
var s2 = Symbol.for('foo');

console.log(s1 === s2); // true
```

**12. Symbol.keyFor 方法返回一个已登记的 Symbol 类型值的 key。**

```
var s1 = Symbol.for("foo");
console.log(Symbol.keyFor(s1)); // "foo"

var s2 = Symbol("foo");
console.log(Symbol.keyFor(s2) ); // undefined
```

## 分析

看完以上的特性，你觉得哪些特性是可以模拟实现的呢？

如果我们要模拟实现一个 Symbol 的话，基本的思路就是构建一个 Symbol 函数，然后直接返回一个独一无二的值。

不过在此之前，我们先看看[规范](http://www.ecma-international.org/ecma-262/6.0/#sec-symbol-description)中调用 Symbol 时到底做了哪些工作：

> Symbol ( [ description ] )

> When Symbol is called with optional argument description, the following steps are taken:

> 1. If NewTarget is not undefined, throw a TypeError exception.
> 2. If description is undefined, var descString be undefined.
> 3. Else, var descString be ToString(description).
> 4. ReturnIfAbrupt(descString).
> 5. Return a new unique Symbol value whose [[Description]] value is descString.

当调用 Symbol 的时候，会采用以下步骤：

1. 如果使用 new ，就报错
2. 如果 description 是 undefined，让 descString 为 undefined
3. 否则 让 descString 为 ToString(description)
4. 如果报错，就返回
5. 返回一个新的唯一的 Symbol 值，它的内部属性 [[Description]] 值为 descString

考虑到还需要定义一个 [[Description]] 属性，如果直接返回一个基本类型的值，是无法做到这一点的，所以我们最终还是返回一个对象。

## 第一版

参照着规范，其实我们已经可以开始写起来了：

```
// 第一版
(function() {
    var root = this;

    var SymbolPolyfill = function Symbol(description) {

        // 实现特性第 2 点：Symbol 函数前不能使用 new 命令
        if (this instanceof SymbolPolyfill) throw new TypeError('Symbol is not a constructor');

        // 实现特性第 5 点：如果 Symbol 的参数是一个对象，就会调用该对象的 toString 方法，将其转为字符串，然后才生成一个 Symbol 值。
        var descString = description === undefined ? undefined : String(description)

        var symbol = Object.create(null)

        Object.defineProperties(symbol, {
            '__Description__': {
                value: descString,
                writable: false,
                enumerable: false,
                configurable: false
            }
        });

        // 实现特性第 6 点，因为调用该方法，返回的是一个新对象，两个对象之间，只要引用不同，就不会相同
        return symbol;
    }

    root.SymbolPolyfill = SymbolPolyfill;
})();
```

只是参照着规范，我们已经实现了特性的第 2、5、6 点。

## 第二版

我们来看看其他的特性该如何实现：

**1. 使用 typeof，结果为 "symbol"。**

利用 ES5，我们并不能修改 typeof 操作符的结果，所以这个无法实现。

**3. instanceof 的结果为 false**

因为不是通过 new 的方式实现的，所以 instanceof 的结果自然是 false。

**4. Symbol 函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述。主要是为了在控制台显示，或者转为字符串时，比较容易区分。**

当我们打印一个原生 Symbol 值的时候：

```
console.log(Symbol('1')); // Symbol(1)
```

可是我们模拟实现的时候返回的却是一个对象，所以这个也是无法实现的，当然你修改 console.log 这个方法是另讲。

**8. Symbol 值可以显式转为字符串。**

```
var sym = Symbol('My symbol');

console.log(String(sym)); // 'Symbol(My symbol)'
console.log(sym.toString()); // 'Symbol(My symbol)'
```

当调用 String 方法的时候，如果该对象有 toString 方法，就会调用该 toString 方法，所以我们只要给返回的对象添加一个 toString 方法，即可实现这两个效果。

```
// 第二版

// 前面面代码相同 ……

var symbol = Object.create({
    toString: function() {
        return 'Symbol(' + this.__Description__ + ')';
    },
});

// 后面代码相同 ……
```

## 第三版

**9. Symbol 值可以作为标识符，用于对象的属性名，可以保证不会出现同名的属性。**

看着好像没什么，这点其实和第 8 点是冲突的，这是因为当我们模拟的所谓 Symbol 值其实是一个有着 toString 方法的 对象，当对象作为对象的属性名的时候，就会进行隐式类型转换，还是会调用我们添加的 toString 方法，对于 Symbol('foo') 和 Symbol('foo')两个 Symbol 值，虽然描述一样，但是因为是两个对象，所以并不相等，但是当作为对象的属性名的时候，都会隐式转换为 `Symbol(foo)` 字符串，这个时候就会造成同名的属性。举个例子：

```
var a = SymbolPolyfill('foo');
var b = SymbolPolyfill('foo');

console.log(a ===  b); // false

var o = {};
o[a] = 'hello';
o[b] = 'hi';

console.log(o); // {Symbol(foo): 'hi'}
```

为了防止不会出现同名的属性，毕竟这是一个非常重要的特性，迫不得已，我们需要修改 toString 方法，让它返回一个唯一值，所以第 8 点就无法实现了，而且我们还需要再写一个用来生成 唯一值的方法，就命名为 generateName，我们将该唯一值添加到返回对象的 __Name__ 属性中保存下来。

```
// 第三版
(function() {
    var root = this;

    var generateName = (function(){
        var postfix = 0;
        return function(descString){
            postfix++;
            return '@@' + descString + '_' + postfix
        }
    })()

    var SymbolPolyfill = function Symbol(description) {

        if (this instanceof SymbolPolyfill) throw new TypeError('Symbol is not a constructor');

        var descString = description === undefined ? undefined : String(description)

        var symbol = Object.create({
            toString: function() {
                return this.__Name__;
            }
        })

        Object.defineProperties(symbol, {
            '__Description__': {
                value: descString,
                writable: false,
                enumerable: false,
                configurable: false
            },
            '__Name__': {
                value: generateName(descString),
                writable: false,
                enumerable: false,
                configurable: false
            }
        });

        return symbol;
    }


    root.SymbolPolyfill = SymbolPolyfill;

})()
```

此时再看下这个例子：

```
var a = SymbolPolyfill('foo');
var b = SymbolPolyfill('foo');

console.log(a ===  b); // false

var o = {};
o[a] = 'hello';
o[b] = 'hi';

console.log(o); // Object { "@@foo_1": "hello", "@@foo_2": "hi" }
```

## 第四版

我们再看看接下来的特性。

** 7.Symbol 值不能与其他类型的值进行运算，会报错。**

以 `+` 操作符为例，当进行隐式类型转换的时候，会先调用对象的 valueOf 方法，如果没有返回基本值，就会再调用 toString 方法，所以我们考虑在 valueOf 方法中进行报错，比如：

```
var symbol = Object.create({
    valueOf: function() {
        throw new Error('Cannot convert a Symbol value')
    }
})

console.log('1' + symbol); // 报错
```

看着很简单的解决了这个问题，可是如果我们是显式调用 valueOf 方法呢？对于一个原生的 Symbol 值：

```
var s1 = Symbol('foo')
console.log(s1.valueOf()); // Symbol(foo)
```

是的，对于原生 Symbol，显式调用 valueOf 方法，会直接返回该 Symbol 值，而我们又无法判断是显式还是隐式的调用，所以这个我们就只能实现一半，要不然实现隐式调用报错，要不然实现显式调用返回该值，那……我们选择不报错的那个吧，即后者。

我们迫不得已的修改 valueOf 函数：

```
// 第四版
// 前面面代码相同 ……

var symbol = Object.create({
    toString: function() {
        return this.__Name__;
    },
    valueOf: function() {
        return this;
    }
});
// 后面代码相同 ……
```

## 第五版

**10. Symbol 作为属性名，该属性不会出现在 for...in、for...of 循环中，也不会被 Object.keys()、Object.getOwnPropertyNames()、JSON.stringify() 返回。但是，它也不是私有属性，有一个 Object.getOwnPropertySymbols 方法，可以获取指定对象的所有 Symbol 属性名。**

嗯，无法实现。

**11. 有时，我们希望重新使用同一个Symbol值，Symbol.for方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值。如果有，就返回这个Symbol值，否则就新建并返回一个以该字符串为名称的Symbol值。**

这个实现类似于函数记忆，我们建立一个对象，用来储存已经创建的 Symbol 值即可。

**12. Symbol.keyFor 方法返回一个已登记的 Symbol 类型值的 key。**

遍历 forMap,查找该值对应的键值即可。

```
// 第五版
// 前面代码相同 ……
var SymbolPolyfill = function() { ... }

var forMap = {};

Object.defineProperties(SymbolPolyfill, {
    'for': {
        value: function(description) {
            var descString = description === undefined ? undefined : String(description)
            return forMap[descString] ? forMap[descString] : forMap[descString] = SymbolPolyfill(descString);
        },
        writable: true,
        enumerable: false,
        configurable: true
    },
    'keyFor': {
        value: function(symbol) {
            for (var key in forMap) {
                if (forMap[key] === symbol) return key;
            }
        },
        writable: true,
        enumerable: false,
        configurable: true
    }
});
// 后面代码相同 ……
```

## 完整实现

综上所述：

无法实现的特性有：1、4、7、8、10

可以实现的特性有：2、3、5、6、9、11、12

最后的实现如下:

```
(function() {
    var root = this;

    var generateName = (function(){
        var postfix = 0;
        return function(descString){
            postfix++;
            return '@@' + descString + '_' + postfix
        }
    })()

    var SymbolPolyfill = function Symbol(description) {

        if (this instanceof SymbolPolyfill) throw new TypeError('Symbol is not a constructor');

        var descString = description === undefined ? undefined : String(description)

        var symbol = Object.create({
            toString: function() {
                return this.__Name__;
            },
            valueOf: function() {
                return this;
            }
        })

        Object.defineProperties(symbol, {
            '__Description__': {
                value: descString,
                writable: false,
                enumerable: false,
                configurable: false
            },
            '__Name__': {
                value: generateName(descString),
                writable: false,
                enumerable: false,
                configurable: false
            }
        });

        return symbol;
    }

    var forMap = {};

    Object.defineProperties(SymbolPolyfill, {
        'for': {
            value: function(description) {
                var descString = description === undefined ? undefined : String(description)
                return forMap[descString] ? forMap[descString] : forMap[descString] = SymbolPolyfill(descString);
            },
            writable: true,
            enumerable: false,
            configurable: true
        },
        'keyFor': {
            value: function(symbol) {
                for (var key in forMap) {
                    if (forMap[key] === symbol) return key;
                }
            },
            writable: true,
            enumerable: false,
            configurable: true
        }
    });

    root.SymbolPolyfill = SymbolPolyfill;

})()
```