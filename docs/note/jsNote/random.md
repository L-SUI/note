# 乱序你真的会了吗？

关于乱序（数组的重新排序）你知道几种方式呢？

## 基础版

```js
function shuffle(array) {
  array.sort(function() {
    return Math.random() - .5;
  });
}
```

可惜的是不够随机，不够乱序；看一下分布：

![1621331071597_5F113761-61D6-489E-811D-58D8C2782AC1](/jsNote/1621331071597_5F113761-61D6-489E-811D-58D8C2782AC1.png)

## 加强版

```js
function shuffle(array) {
  var n = array.length, i = -1, j;
  while (++i < n) {
    j = Math.floor(Math.random() * n);
    t = array[j];
    array[j] = array[i];
    array[i] = t;
  }
}
```

看下分布：

![1621337387896_42EFE9D1-CC15-4A83-82ED-1A9FDAA9F7DD](/jsNote/1621337387896_42EFE9D1-CC15-4A83-82ED-1A9FDAA9F7DD.png)

## 进阶版

```js
function shuffle(array) {
  var n = array.length, i = -1, j, k;
  while (++i < n) {
    j = Math.floor(Math.random() * n);
    k = Math.floor(Math.random() * n);
    t = array[j];
    array[j] = array[k];
    array[k] = t;
  }
}
```

看下分布：

![1621337585177_9C3224F8-CFC1-49B1-BEB6-63F6341EAE38](/jsNote/1621337585177_9C3224F8-CFC1-49B1-BEB6-63F6341EAE38.png)

## 最终版(Fisher–Yates)

为什么叫` Fisher–Yates` 呢？ 因为这个算法是由 `Ronald Fisher `和` Frank Yates `首次提出的。

上代码：

```js
function shuffle(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
}
```

看下分布：

![1621337988665_58174379-CBDB-40C3-99AB-C7C808EBA296](/jsNote/1621337988665_58174379-CBDB-40C3-99AB-C7C808EBA296.png)

原理很简单，就是遍历数组元素，然后将当前元素与以后随机位置的元素进行交换，从代码中也可以看出，这样乱序的就会更加彻底。

**优化一下：**

```js
function shuffle(array) {
  let m = array.length, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    [array[m],array[i]] = [array[i],array[m]];
  }
}

function shuffle(array) {
  let m = array.length, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    array[m] = array[m]^array[i];
    array[i] = array[m]^array[i];
		array[m] = array[m]^array[i];
  }
}
```

## 结尾

你还有更好的方法吗？