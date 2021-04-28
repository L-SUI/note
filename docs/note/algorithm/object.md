# 为什么你的对象时快时慢呢

[想知道原因大家可以点击查看V8官网](https://v8.dev/blog)

讲解完成，大家各回各家。

## JS Object

**JavaScript** 对象像一个字典是由一组组属性和值组成的，所以最简单的方式是使用一个字典来保存属性和值，但 是由于字典是非线性结构，所以如果使用字典，读取效率会大大降低。

V8 为了提升存储和查找效率，V8 在对象中添加了两个隐藏属性，排序属性和常规属性，`element` 属性指向了 `elements` 对象，在 `elements` 对象中，会按照顺序存放排序属性。`properties` 属性则指向了 `properties` 对象，在 `properties` 对象中，会按照创建时的顺序保存常规属性。

先拽几个名词：

- 常规属性 (properties) 和排序属性 (element) 
- 对象内属性 (in-object properties)
- 快属性和慢属性



> 以下浏览器截图浏览器版本  90.0.4430.85

## 常规属性 **(properties)** 和排序属性 **(element)**

首先来看个例子

```js
/*
 * 1.数字属性被最先打印出来了，并且是按照数字大小的顺序打印的
 * 2.设置的字符串属性依然是按照之前的设置顺序打印的
 * 原因:ECMAScript 规范中定义了数字属性应该按照索引值大小升序排列，字符串属性根据创建时的顺序 升序排列
 */
function Foo() {
  this[100] = 'test-100'
  this[1] = 'test-1'
  this["B"] = 'bar-B'
  this[50] = 'test-50'
  this[9] = 'test-9'
  this["A"] = 'bar-A'
  this[8] = 'test-8'
  this[3] = 'test-3'
  this[5] = 'test-5'
  this["C"] = 'bar-C'
}
var bar = new Foo()
for (key in bar) {
  console.log(`index:${key} value:${bar[key]}`)
}
console.log(bar);
```

在对象中的数字属性称为排序属性，在 V8 中被称为 **elements**(elements 对象中，会按照顺序存放排序属性)， 字符串属性就被称为常规属性，在 V8 中被称为 **properties**(按照创建时的顺序保存了常规属性)。bar 对象恰好 包含了这两个隐藏属性。

![WeChatd41403cc4e17a455965e199bd99a13c8](/algorithm/WeChatd41403cc4e17a455965e199bd99a13c8.png)

如上在 V8 内部，为了有效地提升存储和访问这两种属性的性能，分别使用了两个线性数据结构来分别保存排序属 性和常规属性。分解成这两种线性数据结构之后，如果执行索引操作，那么 V8 会先从 elements 属性中按照顺序读 取所有的元素，然后再在 properties 属性中读取所有的元素，这样就完成一次索引操作。

输出结果：

![WeChat47d45eb82b3f22a9298b280d94ee0e92](/algorithm/WeChat47d45eb82b3f22a9298b280d94ee0e92.png)

当我们在浏览器里打印出来以后，并没有发现 **properties**  						原因是bar.B这个语句来查找 B 的属性值，那么在 V8 会先查找出 properties 属性所指向的对象 properties，然后再在 properties 对象中查找 B 属性，这种方式在查找过 程中增加了一步操作，因此会影响到元素的查找效率。
 所以V8 采取了一个权衡的策略以加快查找属性的效率，这个策略是将部分常规属性直接存储到对象本身，我们把 这称为对象内属性 (in-object properties)。对象在内存中的展现形式你可以参看下图:

![WeChatd41403cc4e17a455965e199bd99a13c8](/algorithm/WeChatd41403cc4e17a455965e199bd99a13c8.png)

不过对象内属性的数量是固定的，如果添加的属性超出了对象分配的空间，则它们将被保存在常规 属性存储中。虽然属性存储多了一层间接层，但可以自由地扩容。 保存在线性数据结构中的属性称之为“快属性”，因为线性数据结构中只需要通过索引即可以访问到属性，虽然访问 线性结构的速度快，但是如果从线性结构中添加或者删除大量的属性时，则执行效率会非常低，这主要因为会产生 大量时间和内存开销。

因此，如果一个对象的属性过多时，V8 就会采取另外一种存储策略，那就是“慢属性”策略，但慢属性的对象内部会 有独立的非线性数据结构 (词典) 作为属性存储容器。所有的属性元信息不再是线性存储的，而是直接保存在属性字 典中。

![WeChatd41403cc4e17a455965e199bd99a13c8](/algorithm/WeChatd41403cc4e17a455965e199bd99a13c8.png)

由于V8一直在更新迭代，规则也在不停的变化，规则也在变化，一切以官网为准。

接下来看一下目前版本中上面的例子是怎么样的：

![WeChatac837b49c3e693c69ca7be5a120828b5](/algorithm/WeChatac837b49c3e693c69ca7be5a120828b5.png)

上述例子中

![WeChat5ed17ea66777c59ca140044503cad2aa](/algorithm/WeChat5ed17ea66777c59ca140044503cad2aa.png)

这部分表示对象内属性 (in-object properties)，也可以叫快属性。

## 快属性

我们继续看个例子

```js
function Foo(element_num,property_num) {
  //添加可索引属性
  for (let i = 0; i < element_num; i++) {
    this[i] = `element${i}`;
  }
  //添加常规属性
  for (let i = 0; i < property_num; i++) {
    let ppt = `property${i}`;
    this[ppt] = ppt;
  }
}
var bar = new Foo(10, 10);
var bar = new Foo(10, 11);
```

下面我会用这两个做对比：

首先看`var bar = new Foo(10, 10);`时候

![WeChata540e191bff41a51e104306d34de7e3c](/algorithm/WeChata540e191bff41a51e104306d34de7e3c.png)

图中缺少了`properties`这个属性

接下来看看`var bar = new Foo(10, 11);`

![WeChat7b54748578679edd511c18de668e9ae1](/algorithm/WeChat7b54748578679edd511c18de668e9ae1.png)

对比可以看出，在我们动态创建的的时候，10个以内是不会创建`properties`这个属性，而超过了10个是会创建的，查询时候就会多一层所以就慢了。快满属性的区别就在这里。

但是，貌似哪里有些问题?

> The number of in-object properties is predetermined by the initial size of the object.  --摘自V8  blog

```js
function init() {
  var obj = {
    0: "item0",
    1: "item1",
    2: "item2",
    3: "item3",
    4: "item4",
    5: "item5",
    obj1: "item-obj1",
    obj2: "item-obj2",
    obj3: "item-obj3",
    obj4: "item-obj4",
    obj5: "item-obj5",
    obj6: "item-obj6",
    obj7: "item-obj7",
    obj8: "item-obj8",
    obj9: "item-obj9",
    obj10: "item-obj10",
    obj11: "item-obj11",
    obj12: "item-obj11",
    obj13: "item-obj11",
    obj14: "item-obj11",
    obj15: "item-obj11",
    obj16: "item-obj11",
    obj17: "item-obj11",
    obj18: "item-obj11",
    obj19: "item-obj11",
  };
  return function apple() {
    console.log(obj);
  };
}
var result = init();
result();
```

结果是这样的：

![1619621051709_A427B0CB-611A-4A7E-8029-40D14B44A7DC](/algorithm/1619621051709_A427B0CB-611A-4A7E-8029-40D14B44A7DC.png)

我尝试了手动添加到30个，依然没有`properties`这个属性。具体上限多少个不清楚。对象初始化有的算是快属性。

V8通过引入这两个属性，加速了 V8 查找属性的速度，为了更加进一步提升查找效率，V8 还实现了内置属性的策略， 当常规属性少于一定数量时，V8 就会将这些常规属性直接写进对象中，这样又节省了一个中间步骤。

最后如果对象中的属性过多时，或者存在反复添加或者删除属性的操作，那么 V8 就会将线性的存储模式降级为非 线性的字典存储模式，这样虽然降低了查找速度，但是却提升了修改对象的属性的速度。

以上资料参考自 https://v8.dev/blog/fast-properties

## 结尾

有不同理解的可以给我留言

