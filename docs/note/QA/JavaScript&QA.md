# javascript & QA 

## karma使用
### 安装依赖
- sudu npm i karma -g 全局安装
- karma init 初始化，会生成一个文件
- npm i karma-jasmine jasmine-core --save-dev  配合使用的依赖
- npm i phantomjs   无头浏览器
- npm i  karma-phantomjs-launcher 配合浏览器使用的
- npm i karma-coverage 测试覆盖率

```javascript
// Karma configuration
// Generated on Tue Jun 09 2020 21:31:00 GMT+0800 (GMT+08:00)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    //断言库
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: ['./src/**/*.js', './tests/unit/**/*.spec.js'],


    // list of files / patterns to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    //进程
    reporters: ['progress', 'coverage'],

    preprocessors: {
      //测试哪些文件对应的覆盖率
      'src/**/*.js': ['coverage']
    },
    coverageReporter: {
      type : 'html',
      dir : 'docs/coverage/'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    //设置浏览器
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,//独立跑

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
```

## UI测试(UI自动化走查)
- sudo cnpm install -g backstopjs 全局下载
- backstop init  初始化

```javascript
"paths": {
    "bitmaps_reference": "backstop_data/bitmaps_reference",//图片存储路径
    "bitmaps_test": "backstop_data/bitmaps_test",
    "engine_scripts": "backstop_data/engine_scripts",
    "html_report": "docs/html_report",//报表存储路径
    "ci_report": "backstop_data/ci_report"
},
```

## e2e测试
### selenium-webdriver
- npm install selenium-webdriver 安装  专属前端的库
- 安装对应浏览器驱动
- 复制扔进根目录

```javascript
const { Builder, By, Key, until } = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get('https://www.baidu.com/');
    await driver.findElement(By.name('wd')).sendKeys('京程一灯', Key.RETURN);
    await driver.wait(until.titleIs('京程一灯_百度搜索'), 1000);
  } finally {
    await driver.quit();
  }
})();
```

> 执行 node 文件路径

### rize
- yarn add --dev puppeteer rize  下载安装
- npm install --save-dev puppeteer rize 下载安装

```javascript
const Rize = require('rize');
const rize = new Rize();

rize
  .goto('https://github.com/')
  .type('input.header-search-input', 'node')
  .press('Enter')
  .waitForNavigation()
  .assertSee('Node.jsxxx')
  .end(); // 别忘了调用 `end` 方法来退出浏览器！
```
> 执行 node+ 文件路径

## 单元测试
### Mocha+chai    &&   jest(做不了异步)
- Mocha 主要做接口测试
- service app.js
```javascript
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx) => {
  ctx.body = {
    data: '京程一灯',
  };
});

app.listen(3000, () => {
  console.log('服务启动成功');
});

module.exports = app;
```
---

> service app.spec.js

```javascript
// const axios = require('axios');
const superagent = require('supertest');
const app = require('./app');
function request() {
  return superagent(app.listen());
}

// axios.get("/").then(function(){})
describe('NodeUii 自动化脚本', function () {
  it('获取后台接口数据', function (done) {
    request()
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          done(new Error('请求出错'));
        } else {
          console.log(res.body);
          if (res.body.data == '京程一灯') {
            done();
          } else {
            done(new Error('请求数据出错'));
          }
        }
      });
  });
  it('404容错脚本', function (done) {
    request().get('/user').expect(404, done);
  });
});

```
---

> mochaRunner.js

```javascript

const Mocha = require('mocha');

const mocha = new Mocha({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'docs/mochawesome-report',
  },
});
mocha.addFile('./tests/service/app.spec.js');

mocha.run(function () {
  process.exit(0);
});

```
> node mochaRunner.js
