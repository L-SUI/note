# 手写 Promise

**Promise** 对象用于表示一个异步操作的最终完成 (或失败)及其结果值

[**Promise A+规范**](https://promisesaplus.com/)

## Promise 自身的状态

1. state 存放当前的状态

2. value 存放当前状态的值

3. then 方法，返回值也是一个 Promise

4. catch 方法

5. finally 方法

6. 静态方法，如 Promise.all、Promise.resolve

## 实现 Promise

### 1、实现一个 promise ，在 setTimeout 中去 resolve 

```js
// promise 的三种状态
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class MyPromise {
  constructor(fn) {
    this.state = PENDING;
    this.value = undefined;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];

    const resolve = (val) => {
      this.state = FULFILLED;
      this.value = val;
      // 执行所有的 then 方法
      this.resolvedCallbacks.map((fn) => fn());
    };
    const reject = (val) => {
      this.value = val;
      this.state = REJECTED;
      // 执行所有的 then 方法
      this.rejectedCallbacks.map((fn) => fn());
    };
    fn(resolve, reject);
  }
  then (onFulfilled) {
    let promise2 = null;
    // 处理尚未完成的promise
    if (this.state === PENDING) {
      this.resolvedCallbacks.push(onFulfilled(this.value));
      this.rejectedCallbacks.push(onRejected(this.value));
    }
  }
}
```

### 2、实现一个 promise，直接同步 resolve

```js
// promise 的三种状态
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class MyPromise {
  constructor(fn) {
    this.state = PENDING;
    this.value = undefined;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];

    const resolve = (val) => {
      setTimeout(() => {
          this.state = FULFILLED;
          this.value = val;
          // 执行所有的 then 方法
          this.resolvedCallbacks.map((fn) => fn());
      });
    };
    const reject = (val) => {
      this.value = val;
      this.state = REJECTED;
      // 执行所有的 then 方法
      this.rejectedCallbacks.map((fn) => fn());
    };
    fn(resolve, reject);
  }
  then (onFulfilled) {
    let promise2 = null;
    // 处理尚未完成的promise
    if (this.state === PENDING) {
        this.resolvedCallbacks.push(onFulfilled(this.value));
        this.rejectedCallbacks.push(onRejected(this.value));
    }
  }
}
```

### 3、实现一个 promise，防止 resolve 多次 

```js
// promise 的三种状态
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class MyPromise {
  constructor(fn) {
    this.state = PENDING;
    this.value = undefined;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];

    const resolve = (val) => {
      setTimeout(() => {
        if (this.state === PENDING) {
          this.state = FULFILLED;
          this.value = val;
          // 执行所有的 then 方法
          this.resolvedCallbacks.map((fn) => fn());
        }
      });
    };
    const reject = (val) => {
      this.value = val;
      this.state = REJECTED;
      // 执行所有的 then 方法
      this.rejectedCallbacks.map((fn) => fn());
    };
    fn(resolve, reject);
  }
  then (onFulfilled) {
    let promise2 = null;
    // 处理尚未完成的promise
    if (this.state === PENDING) {
        this.resolvedCallbacks.push(onFulfilled(this.value));
        this.rejectedCallbacks.push(onRejected(this.value));
    }
  }
}
```

### 4、实现一个 promise，可以让 then 方法链式调用  

```js
// promise 的三种状态
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class MyPromise {
  constructor(fn) {
    this.state = PENDING;
    this.value = undefined;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];

    const resolve = (val) => {
      setTimeout(() => {
        if (this.state === PENDING) {
          this.state = FULFILLED;
          this.value = val;
          // 执行所有的 then 方法
          this.resolvedCallbacks.map((fn) => fn());
        }
      });
    };
    const reject = (val) => {
      this.value = val;
      this.state = REJECTED;
      // 执行所有的 then 方法
      this.rejectedCallbacks.map((fn) => fn());
    };
    fn(resolve, reject);
  }
  then (onFulfilled) {
    let promise2 = null;
    // 处理尚未完成的promise
    if (this.state === PENDING) {
      promise2 = new MyPromise((resolve, reject) => {
        this.resolvedCallbacks.push(() => {
          const x = onFulfilled(this.value);
          resolve(x)
        });
      });
    }
    return promise2;
  }
}
```

### 5、实现一个 promise，支持空 then 函数

```js
// promise 的三种状态
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class MyPromise {
  constructor(fn) {
    this.state = PENDING;
    this.value = undefined;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];

    const resolve = (val) => {
      setTimeout(() => {
        if (this.state === PENDING) {
          this.state = FULFILLED;
          this.value = val;
          // 执行所有的 then 方法
          this.resolvedCallbacks.map((fn) => fn());
        }
      });
    };
    const reject = (val) => {
      this.value = val;
      this.state = REJECTED;
      // 执行所有的 then 方法
      this.rejectedCallbacks.map((fn) => fn());
    };
    fn(resolve, reject);
  }
  then (onFulfilled = (val) => val) {
    let promise2 = null;
    // 处理尚未完成的promise
    if (this.state === PENDING) {
      promise2 = new MyPromise((resolve, reject) => {
        this.resolvedCallbacks.push(() => {
          const x = onFulfilled(this.value);
          resolve(x)
        });
      });
    }
    return promise2;
  }
}
```

### 6、实现一个 promise，支持 then 传递 thenable 对象  

```js
// promise 的三种状态
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

function promiseResolutionProcedure(promise2, x, resolve, reject) {
  //   判断 thenable 对象
  if ((typeof x === "object" || typeof x === "function") && x !== null) {
    if (typeof x.then === "function") {
      x.then((y) => {
        promiseResolutionProcedure(promise2, y, resolve, reject);
      }, reject);
    } else {
      resolve(x);
    }
  } else {
    resolve(x);
  }
}

class MyPromise {
  constructor(fn) {
    this.state = PENDING;
    this.value = undefined;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];

    const resolve = (val) => {
      setTimeout(() => {
        if (this.state === PENDING) {
          this.state = FULFILLED;
          this.value = val;
          // 执行所有的 then 方法
          this.resolvedCallbacks.map((fn) => fn());
        }
      });
    };
    const reject = (val) => {
      this.value = val;
      this.state = REJECTED;
      // 执行所有的 then 方法
      this.rejectedCallbacks.map((fn) => fn());
    };
    fn(resolve, reject);
  }
  then (onFulfilled = (val) => val) {
    let promise2 = null;
    // 处理尚未完成的promise
    if (this.state === PENDING) {
      promise2 = new MyPromise((resolve, reject) => {
        this.resolvedCallbacks.push(() => {
          const x = onFulfilled(this.value);
          promiseResolutionProcedure(promise2, x, resolve, reject);
        });
      });
    }
    return promise2;
  }
}
```

### 7、实现一个 promise，支持 then 传递 promise 对象

```js
// promise 的三种状态
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

// promise 处理过程
function promiseResolutionProcedure(promise2, x, resolve, reject) {
  //   处理 prmomise 对象
  if (x instanceof MyPromise) {
    if (x.state === PENDING) {
      x.then((y) => {
        promiseResolutionProcedure(promise2, y, resolve, reject);
      }, reject);
    } else {
      x.state === FULFILLED && resolve(x.value);
      x.state === REJECTED && reject(x.value);
    }
  }

  //   判断 thenable 对象
  if ((typeof x === "object" || typeof x === "function") && x !== null) {
    if (typeof x.then === "function") {
      x.then((y) => {
        promiseResolutionProcedure(promise2, y, resolve, reject);
      }, reject);
    } else {
      resolve(x);
    }
  } else {
    resolve(x);
  }
}


class MyPromise {
  constructor(fn) {
    this.state = PENDING;
    this.value = undefined;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];

    const resolve = (val) => {
      setTimeout(() => {
        if (this.state === PENDING) {
          this.state = FULFILLED;
          this.value = val;
          // 执行所有的 then 方法
          this.resolvedCallbacks.map((fn) => fn());
        }
      });
    };
    const reject = (val) => {
      this.value = val;
      this.state = REJECTED;
      // 执行所有的 then 方法
      this.rejectedCallbacks.map((fn) => fn());
    };
    fn(resolve, reject);
  }
  then (onFulfilled = (val) => val) {
    let promise2 = null;
    // 处理尚未完成的promise
    if (this.state === PENDING) {
      promise2 = new MyPromise((resolve, reject) => {
        this.resolvedCallbacks.push(() => {
          const x = onFulfilled(this.value);
          promiseResolutionProcedure(promise2, x, resolve, reject);
        });
      });
    }
    return promise2;
  }
}
```

### 8、实现一个 promise，支持 resolve 传递 promise 对象 

```js
// promise 的三种状态
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

// promise 处理过程
function promiseResolutionProcedure(promise2, x, resolve, reject) {
  //   处理 prmomise 对象
  if (x instanceof MyPromise) {
    if (x.state === PENDING) {
      x.then((y) => {
        promiseResolutionProcedure(promise2, y, resolve, reject);
      }, reject);
    } else {
      x.state === FULFILLED && resolve(x.value);
      x.state === REJECTED && reject(x.value);
    }
  }

  //   判断 thenable 对象
  if ((typeof x === "object" || typeof x === "function") && x !== null) {
    if (typeof x.then === "function") {
      x.then((y) => {
        promiseResolutionProcedure(promise2, y, resolve, reject);
      }, reject);
    } else {
      resolve(x);
    }
  } else {
    resolve(x);
  }
}


class MyPromise {
  constructor(fn) {
    this.state = PENDING;
    this.value = undefined;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];

    const resolve = (val) => {
      if ( (typeof val === "object" || typeof val === "function") && val.then) {
        promiseResolutionProcedure(this, val, resolve, reject);
        return;
      }
      setTimeout(() => {
        if (this.state === PENDING) {
          this.state = FULFILLED;
          this.value = val;
          // 执行所有的 then 方法
          this.resolvedCallbacks.map((fn) => fn());
        }
      });
    };
    const reject = (val) => {
      this.value = val;
      this.state = REJECTED;
      // 执行所有的 then 方法
      this.rejectedCallbacks.map((fn) => fn());
    };
    fn(resolve, reject);
  }
  then (onFulfilled = (val) => val) {
    let promise2 = null;
    // 处理尚未完成的promise
    if (this.state === PENDING) {
      promise2 = new MyPromise((resolve, reject) => {
        this.resolvedCallbacks.push(() => {
          const x = onFulfilled(this.value);
          promiseResolutionProcedure(promise2, x, resolve, reject);
        });
      });
    }
    return promise2;
  }
}
```

### 9、实现一个 promise，处理 then 中的循环 promise  

```js
// promise 的三种状态
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

// promise 处理过程
function promiseResolutionProcedure(promise2, x, resolve, reject) {
  if (promise2 === x) {
    throw new Error("循环引用 promise");
  }
  //   处理 prmomise 对象
  if (x instanceof MyPromise) {
    if (x.state === PENDING) {
      x.then((y) => {
        promiseResolutionProcedure(promise2, y, resolve, reject);
      }, reject);
    } else {
      x.state === FULFILLED && resolve(x.value);
      x.state === REJECTED && reject(x.value);
    }
  }

  //   判断 thenable 对象
  if ((typeof x === "object" || typeof x === "function") && x !== null) {
    if (typeof x.then === "function") {
      x.then((y) => {
        promiseResolutionProcedure(promise2, y, resolve, reject);
      }, reject);
    } else {
      resolve(x);
    }
  } else {
    resolve(x);
  }
}


class MyPromise {
  constructor(fn) {
    this.state = PENDING;
    this.value = undefined;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];

    const resolve = (val) => {
      if ( (typeof val === "object" || typeof val === "function") && val.then) {
        promiseResolutionProcedure(this, val, resolve, reject);
        return;
      }
      setTimeout(() => {
        if (this.state === PENDING) {
          this.state = FULFILLED;
          this.value = val;
          // 执行所有的 then 方法
          this.resolvedCallbacks.map((fn) => fn());
        }
      });
    };
    const reject = (val) => {
      this.value = val;
      this.state = REJECTED;
      // 执行所有的 then 方法
      this.rejectedCallbacks.map((fn) => fn());
    };
    fn(resolve, reject);
  }
  then (onFulfilled = (val) => val) {
    let promise2 = null;
    // 处理尚未完成的promise
    if (this.state === PENDING) {
      promise2 = new MyPromise((resolve, reject) => {
        this.resolvedCallbacks.push(() => {
          const x = onFulfilled(this.value);
          promiseResolutionProcedure(promise2, x, resolve, reject);
        });
      });
    }
    return promise2;
  }
}
```

###  10、实现一个 promise，支持静态方法 Promise.all    

```js
// promise 的三种状态
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

// promise 处理过程
function promiseResolutionProcedure(promise2, x, resolve, reject) {
  if (promise2 === x) {
    throw new Error("循环引用 promise");
  }
  //   处理 prmomise 对象
  if (x instanceof MyPromise) {
    if (x.state === PENDING) {
      x.then((y) => {
        promiseResolutionProcedure(promise2, y, resolve, reject);
      }, reject);
    } else {
      x.state === FULFILLED && resolve(x.value);
      x.state === REJECTED && reject(x.value);
    }
  }

  //   判断 thenable 对象
  if ((typeof x === "object" || typeof x === "function") && x !== null) {
    if (typeof x.then === "function") {
      x.then((y) => {
        promiseResolutionProcedure(promise2, y, resolve, reject);
      }, reject);
    } else {
      resolve(x);
    }
  } else {
    resolve(x);
  }
}


class MyPromise {
  static all(promiseArray) {
    return new MyPromise((resolve, reject) => {
      const resultArray = [];
      let successTimes = 0;

      function processResult(index, data) {
        resultArray[index] = data;
        successTimes++;
        if (successTimes === promiseArray.length) {
          // 处理成功
          resolve(resultArray);
        }
      }

      for (let i = 0; i < promiseArray.length; i++) {
        promiseArray[i].then(
          (data) => {
            processResult(i, data);
          },
          (err) => {
            // 处理失败
            reject(err);
          }
        );
      }
    });
  }
  constructor(fn) {
    this.state = PENDING;
    this.value = undefined;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];

    const resolve = (val) => {
      if ( (typeof val === "object" || typeof val === "function") && val.then) {
        promiseResolutionProcedure(this, val, resolve, reject);
        return;
      }
      setTimeout(() => {
        if (this.state === PENDING) {
          this.state = FULFILLED;
          this.value = val;
          // 执行所有的 then 方法
          this.resolvedCallbacks.map((fn) => fn());
        }
      });
    };
    const reject = (val) => {
      this.value = val;
      this.state = REJECTED;
      // 执行所有的 then 方法
      this.rejectedCallbacks.map((fn) => fn());
    };
    fn(resolve, reject);
  }
  then (onFulfilled = (val) => val) {
    let promise2 = null;
    // 处理尚未完成的promise
    if (this.state === PENDING) {
      promise2 = new MyPromise((resolve, reject) => {
        this.resolvedCallbacks.push(() => {
          const x = onFulfilled(this.value);
          promiseResolutionProcedure(promise2, x, resolve, reject);
        });
      });
    }
    return promise2;
  }
}
```

### 11、实现一个 promise，支持 reject 和 catch      

```js
// promise 的三种状态
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

//   promise 处理过程
function promiseResolutionProcedure(promise2, x, resolve, reject) {
  if (promise2 === x) {
    throw new Error("循环引用 promise");
  }
  //   处理 prmomise 对象
  if (x instanceof MyPromise) {
    if (x.state === PENDING) {
      x.then((y) => {
        promiseResolutionProcedure(promise2, y, resolve, reject);
      }, reject);
    } else {
      x.state === FULFILLED && resolve(x.value);
      x.state === REJECTED && reject(x.value);
    }
  }

  //   判断 thenable 对象
  if ((typeof x === "object" || typeof x === "function") && x !== null) {
    if (typeof x.then === "function") {
      x.then((y) => {
        promiseResolutionProcedure(promise2, y, resolve, reject);
      }, reject);
    } else {
      resolve(x);
    }
  } else {
    resolve(x);
  }
}

class MyPromise {
  static all(promiseArray) {
    return new MyPromise((resolve, reject) => {
      const resultArray = [];
      let successTimes = 0;

      function processResult(index, data) {
        resultArray[index] = data;
        successTimes++;
        if (successTimes === promiseArray.length) {
          // 处理成功
          resolve(resultArray);
        }
      }

      for (let i = 0; i < promiseArray.length; i++) {
        promiseArray[i].then(
          (data) => {
            processResult(i, data);
          },
          (err) => {
            // 处理失败
            reject(err);
          }
        );
      }
    });
  }
  constructor(fn) {
    this.state = PENDING;
    this.value = undefined;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];

    const resolve = (val) => {
      if (
        (typeof val === "object" || typeof val === "function") &&
        val.then
      ) {
        promiseResolutionProcedure(this, val, resolve, reject);
        return;
      }
      setTimeout(() => {
        if (this.state === PENDING) {
          this.state = FULFILLED;
          this.value = val;
          // 执行所有的 then 方法
          this.resolvedCallbacks.map((fn) => fn());
        }
      });
    };
    const reject = (val) => {
      if (
        (typeof val === "object" || typeof val === "function") &&
        val.then
      ) {
        promiseResolutionProcedure(this, val, resolve, reject);
        return;
      }
      setTimeout(() => {
        if (this.state === PENDING) {
          this.value = val;
          this.state = REJECTED;
          // 执行所有的 then 方法
          this.rejectedCallbacks.map((fn) => fn());
        }
      });
    };
    fn(resolve, reject);
  }

  then(
  onFulfilled = (val) => val,
   onRejected = (err) => {
    throw new Error(err);
  }
  ) {
    let promise2 = null;
    // 处理尚未完成的promise
    if (this.state === PENDING) {
      promise2 = new MyPromise((resolve, reject) => {
        this.resolvedCallbacks.push(() => {
          const x = onFulfilled(this.value);
          promiseResolutionProcedure(promise2, x, resolve, reject);
        });

        this.rejectedCallbacks.push(() => {
          const x = onRejected(this.value);
          promiseResolutionProcedure(promise2, x, resolve, reject);
        });
      });
    }
    return promise2;
  }
}
```

### 12、实现一个 promise，支持处理完成态或失败态的then    ok

```js
// promise 的三种状态
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

//   promise 处理过程
function promiseResolutionProcedure(promise2, x, resolve, reject) {
  if (promise2 === x) {
    throw new Error("循环引用 promise");
  }
  //   处理 prmomise 对象
  if (x instanceof MyPromise) {
    if (x.state === PENDING) {
      x.then((y) => {
        promiseResolutionProcedure(promise2, y, resolve, reject);
      }, reject);
    } else {
      x.state === FULFILLED && resolve(x.value);
      x.state === REJECTED && reject(x.value);
    }
  }

  //   判断 thenable 对象
  if ((typeof x === "object" || typeof x === "function") && x !== null) {
    if (typeof x.then === "function") {
      x.then((y) => {
        promiseResolutionProcedure(promise2, y, resolve, reject);
      }, reject);
    } else {
      resolve(x);
    }
  } else {
    resolve(x);
  }
}

class MyPromise {
  static all(promiseArray) {
    return new MyPromise((resolve, reject) => {
      const resultArray = [];
      let successTimes = 0;

      function processResult(index, data) {
        resultArray[index] = data;
        successTimes++;
        if (successTimes === promiseArray.length) {
          // 处理成功
          resolve(resultArray);
        }
      }

      for (let i = 0; i < promiseArray.length; i++) {
        promiseArray[i].then(
          (data) => {
            processResult(i, data);
          },
          (err) => {
            // 处理失败
            reject(err);
          }
        );
      }
    });
  }
  constructor(fn) {
    this.state = PENDING;
    this.value = undefined;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];

    const resolve = (val) => {
      if (
        (typeof val === "object" || typeof val === "function") &&
        val.then
      ) {
        promiseResolutionProcedure(this, val, resolve, reject);
        return;
      }
      setTimeout(() => {
        if (this.state === PENDING) {
          this.state = FULFILLED;
          this.value = val;
          // 执行所有的 then 方法
          this.resolvedCallbacks.map((fn) => fn());
        }
      });
    };
    const reject = (val) => {
      if (
        (typeof val === "object" || typeof val === "function") &&
        val.then
      ) {
        promiseResolutionProcedure(this, val, resolve, reject);
        return;
      }
      setTimeout(() => {
        if (this.state === PENDING) {
          this.value = val;
          this.state = REJECTED;
          // 执行所有的 then 方法
          this.rejectedCallbacks.map((fn) => fn());
        }
      });
    };
    fn(resolve, reject);
  }

  then(
  onFulfilled = (val) => val,
   onRejected = (err) => {
    throw new Error(err);
  }
  ) {
    let promise2 = null;
    // 处理已经完成的promise
    if (this.state === FULFILLED) {
      promise2 = new MyPromise((resolve, reject) => {
        const x = onFulfilled(this.value);
        promiseResolutionProcedure(promise2, x, resolve, reject);
      });
    }

    // 处理已经完成的promise
    if (this.state === REJECTED) {
      promise2 = new MyPromise((resolve, reject) => {
        const x = onRejected(this.value);
        promiseResolutionProcedure(promise2, x, resolve, reject);
      });
    }

    // 处理尚未完成的promise
    if (this.state === PENDING) {
      promise2 = new MyPromise((resolve, reject) => {
        this.resolvedCallbacks.push(() => {
          const x = onFulfilled(this.value);
          promiseResolutionProcedure(promise2, x, resolve, reject);
        });

        this.rejectedCallbacks.push(() => {
          const x = onRejected(this.value);
          promiseResolutionProcedure(promise2, x, resolve, reject);
        });
      });
    }
    return promise2;
  }
}
```

