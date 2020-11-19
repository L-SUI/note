# 实现koa

源码中主要就是四个文件

- [application.js](https://github.com/koajs/koa/blob/master/lib/application.js)
- [context.js](https://github.com/koajs/koa/blob/master/lib/context.js)
- [request.js](https://github.com/koajs/koa/blob/master/lib/request.js)
- [response.js](https://github.com/koajs/koa/blob/master/lib/response.js)

## 简单的实现一个koa

```js
const Emitter = require('events');
const http = require('http');
module.exports = class Application extends Emitter {
   constructor(options) {
    super();
    this.middlewares = [];
  }
  use (middleware) {
    this.middlewares.push(middleware)
  }
  // 最终要去输出的内容
  callback () {
    return  (req,res)=>{
      let fn = this.compose()
      const ctx = {};
      const onerror = this.onerror
      return fn(ctx).then(()=>{
        res.end('')
      }).catch(onerror)
    }
  }
  // 将所有的middleware进行递归合并(源码中使用的递归),这里用循环实现的
  compose () {
    return async ()=>{
      function createNext (middleware,oldNext) {
        return async ()=>{
           await  middleware(ctx,oldNext)
        }
      }
      let len = this.middlewares.length;
      let next = async =>Promise.resolve()//初始值，洋葱模型的中心
      for(let i=len-1;i>=0;i--){
        let currentMiddleware = this.middlewares[i]
        next = createNext(currentMiddleware,next)
      }
      await next();
    }
  }
  listen(...args) {
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }
  onerror (err,ctx) {
    this.emit(err)
  }
}
```

## koa-compose源码

```js
'use strict'

/**
 * Expose compositor.
 */

module.exports = compose

/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */

function compose (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```

