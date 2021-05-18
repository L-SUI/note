# LRU缓存算法

```js
/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.max = capacity
    this.cache = new Map();
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    let flag = this.cache.has(key)
    if (flag) {
        let value = this.cache.get(key)
        this.cache.delete(key)
        this.cache.set(key,value)
    }
    return flag?this.cache.get(key):-1
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    let size = this.cache.size
    let max = this.max
    if(this.cache.has(key)) {
        this.cache.delete(key)
    }
    this.cache.set(key,value)
    while (this.cache.size>max) {
        this.cache.delete(this.cache.keys().next().value)
    }
};
```