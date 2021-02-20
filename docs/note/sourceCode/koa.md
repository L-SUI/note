# Koa2

Koa 是一个新的 web 框架，由 Express 幕后的原班人马打造， 致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。 通过利用 async 函数，Koa 帮你丢弃回调函数，并有力地增强错误处理。 Koa 并没有捆绑任何中间件， 而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序。

[https://koa.bootcss.com/](https://koa.bootcss.com/)

koa2封装了原生的node http模块，koa的Context吧Node的Request对象和Response对象封装到单个对象中，并且暴露给中间件等回调函数

最主要的核心是 **中间件机制洋葱模型**

## 源码

源码中主要就是四个文件

- [application.js](https://github.com/koajs/koa/blob/master/lib/application.js)
- [context.js](https://github.com/koajs/koa/blob/master/lib/context.js)
- [request.js](https://github.com/koajs/koa/blob/master/lib/request.js)
- [response.js](https://github.com/koajs/koa/blob/master/lib/response.js)

![WechatIMG80](/sourceCode/koa/WechatIMG80.png)

## 中间件机制洋葱模型

![WechatIMG81](/sourceCode/koa/WechatIMG81.jpeg)

通过use()注册多个中间件放入数组中，然后从外层开始往内执行，遇到next()后进入下一个中间件，当所有的中间件执行完后，开始返回，一次执行中间件中未执行的部分，整体流程就是递归处理

## koa-compose

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



## 简单的实现一个koa

```js
const EventEmitter = require('events');
const http = require('http');

class Application extends EventEmitter {
    constructor(){
        super();
        this.middlewares = [];
    }
    use(middleware){
        this.middlewares.push(middleware);
    }
    listen(...args) {
        const server = http.createServer(this.callback());
        server.listen(...args);
    }
    callback() {
        return (req,res) => {
            // console.log(req,res);
            // res.end('hello memory');
            let fn = this.compose()
            const ctx = {};
            const onerror = this.onerror
            return fn(ctx).then(()=>{
                res.end('hello memory')
            }).catch(onerror)
        }
    }
    compose() {
        return async (ctx)=>{
            function createNext (middleware,oldNext) {
              return async ()=>{
                 await  middleware(ctx,oldNext);
              }
            }
            let len = this.middlewares.length;
            let next = async ()=>Promise.resolve();//初始值，洋葱模型的中心
            for(let i=len-1;i>=0;i--){
              let currentMiddleware = this.middlewares[i]
              next = createNext(currentMiddleware,next)
            }
            await next();
        }
    }
    onerror (err,ctx) {
        // this.emit(err)
        console.log(err)
    }
}

module.exports = Application;
```


