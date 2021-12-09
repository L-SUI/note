# 如何创建一个自己的cli

## 前置

首先我们需要了解一些前置的知识，以便去更好的理解。

[npm link 命令](https://docs.npmjs.com/cli/link.html)，这块儿会告诉你如何创建一个全局的命令

[shelljs](https://www.npmjs.com/package/shelljs),用js去书写命令行

## Start

**cli主要是每个项目中的bin文件夹📂。和package.json中的bin字段**

### where node

```bash
~ % where node
/Users/userName/.nvm/versions/node/v12.18.2/bin/node
/usr/local/bin/node
~ % cd /usr/local/bin/
bin % ls -all
drwxr-xr-x  15 root         wheel       480  7 14 17:49 .
drwxr-xr-x   6 root         wheel       192  6 11 09:04 ..
lrwxr-xr-x   1 root         wheel        43  6  9 22:27 backstop -> ../lib/node_modules/backstopjs/cli/index.js
lrwxr-xr-x   1 root         wheel        33  6  9 22:04 cnpm -> ../lib/node_modules/cnpm/bin/cnpm
-rwxr-xr-x   1 liuxiaodong  staff   1976232  6 15 13:56 composer
lrwxr-xr-x   1 root         wheel        35  6  9 21:28 karma -> ../lib/node_modules/karma/bin/karma
-rwxr-xr-x   1 root         wheel       576  7 14 17:49 lolcat
-rwxr-xr-x   1 root         wheel  47298768  5 26 20:55 node
lrwxr-xr-x   1 root         wheel        38  5 29 10:34 npm -> ../lib/node_modules/npm/bin/npm-cli.js
lrwxr-xr-x   1 root         wheel        38  5 29 10:34 npx -> ../lib/node_modules/npm/bin/npx-cli.js
lrwxr-xr-x   1 root         wheel        35  6  9 21:00 vue -> ../lib/node_modules/vue-cli/bin/vue
lrwxr-xr-x   1 root         wheel        40  6  9 21:00 vue-init -> ../lib/node_modules/vue-cli/bin/vue-init
lrwxr-xr-x   1 root         wheel        40  6  9 21:00 vue-list -> ../lib/node_modules/vue-cli/bin/vue-list
lrwxr-xr-x   1 root         wheel        36  6  9 21:52 yarn -> ../lib/node_modules/yarn/bin/yarn.js
lrwxr-xr-x   1 root         wheel        36  6  9 21:52 yarnpkg -> ../lib/node_modules/yarn/bin/yarn.js

#lib/node_modules/  存放文件夹
```

如果想要在项目文件中的bin文件夹下执行，需要对该文件夹进行权限赋予。

```bash
# 添加权限
chmod -R +x ./bin/yd-cli
```

### bin

新建一个文件，例如：yd-cli

简单写点东西

```js
console.log('yd-cli')
```

执行`node ./bin/cli` 则输出yd-cli

如果想全局都可以执行这个命令,而不是`node ./bin/cli`

那么则需要添加全局变量（这时候就用到了`npm link`）

修改`package.json`文件中bin字段

```js
{
  "name": "yd-cli",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "bin": {
    //key 表示全局命令的名字  value 表示路径
    "yd-cli": "bin/yd-cli"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@darkobits/lolcatjs": "^3.1.3",
    "commander": "^5.1.0",
    "download-git-repo": "^3.0.2",
    "figlet": "^1.4.0",
    "inquirer": "^7.1.0",
    "json2ts": "^0.0.7",
    "ora": "^4.0.4",
    "shelljs": "^0.8.4"
  }
}

```

然后对`yd-cli`文件进行修改

```bash
//下面表示文件的执行环境，env表示环境变量 兼容linux系统，
#!/usr/bin/env node  
console.log('yd-cli')
```

执行命令，添加全局变量`yd-cli`

```bash
npm link
# 会默认install，下载和锁定版本
```

完成添加，执行`yd-cli`

输出yd-cli

### 添加展示花里胡哨的字体icon

```js
#!/usr/bin/env node
const figlet = require('figlet');
const versionStr = figlet.textSync('memory');
const Printer = require('@darkobits/lolcatjs');
const version = require('../package.json').version;
const transformed = Printer.default.fromString(
  ` \n   项目脚手架${version} \n ${versionStr}`
);
console.log(transformed);


```

执行`yd-cli`后面跟任何参数都会显示出来

到这里就做出来了花里胡哨的字体icon

### 添加cli后面的参数

下面就用到了我们的shelljs和commander，用于接受命令和执行脚本

需要用到 [quicktype](https://app.quicktype.io/)，`sudo npm i -g quicktype`

```js
#!/usr/bin/env node
const figlet = require('figlet');
const versionStr = figlet.textSync('memory');
const Printer = require('@darkobits/lolcatjs');
const version = require('../package.json').version;
const chalk = require('chalk');
const shell = require('shelljs');
const transformed = Printer.default.fromString(
  ` \n   项目脚手架${version} \n ${versionStr}`
);
const { program } = require('commander');
// console.log(transformed);
program.version(transformed);
program
  .option('-c, --create', '创建一个组件😁')
  .option('-j, --json2ts', '生成TypeScript🐻');
const handlers = {
  json2ts(dataURL) {
    shell.exec(
      `quicktype ${dataURL} -o ${
        shell.pwd().stdout
      }/Weather.ts --runtime-typecheck`
    );
  },
  /**
   *1.完成脚手架 webpack less typescript .... inquirer
   *2.根据用户的选择 下载github的项目 download-git-repo
   *3.对应的目录 利用shelljs yd-xxx ora
   *4.帮用户完善最终的操作 yarn intsall/npm install
   */
};

program
  .usage('[cmd] <options>')
  .arguments('<cmd> [env]')
  .action((cmd, otherParams) => {
    // console.log(cmd, otherParams);
    const handler = handlers[cmd];
    if (typeof handler == 'undefined') {
      console.log(chalk.blue(`${cmd}`) + chalk.red('暂未支持'));
    } else {
      handler(otherParams);
    }
  });
//必须存在的不能丢
program.parse(process.argv);

```

此时已经有了 `yd-cli --help`命令

执行脚本

```bash
 yd-cli  json2ts https://api.github.com/
```

生成后的文件

```ts
// To parse this data:
//
//   import { Convert, Weather } from "./file";
//
//   const weather = Convert.toWeather(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Weather {
    current_user_url:                     string;
    current_user_authorizations_html_url: string;
    authorizations_url:                   string;
    code_search_url:                      string;
    commit_search_url:                    string;
    emails_url:                           string;
    emojis_url:                           string;
    events_url:                           string;
    feeds_url:                            string;
    followers_url:                        string;
    following_url:                        string;
    gists_url:                            string;
    hub_url:                              string;
    issue_search_url:                     string;
    issues_url:                           string;
    keys_url:                             string;
    label_search_url:                     string;
    notifications_url:                    string;
    organization_url:                     string;
    organization_repositories_url:        string;
    organization_teams_url:               string;
    public_gists_url:                     string;
    rate_limit_url:                       string;
    repository_url:                       string;
    repository_search_url:                string;
    current_user_repositories_url:        string;
    starred_url:                          string;
    starred_gists_url:                    string;
    user_url:                             string;
    user_organizations_url:               string;
    user_repositories_url:                string;
    user_search_url:                      string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toWeather(json: string): Weather {
        return cast(JSON.parse(json), r("Weather"));
    }

    public static weatherToJson(value: Weather): string {
        return JSON.stringify(uncast(value, r("Weather")), null, 2);
    }
}

function invalidValue(typ: any, val: any): never {
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`);
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Weather": o([
        { json: "current_user_url", js: "current_user_url", typ: "" },
        { json: "current_user_authorizations_html_url", js: "current_user_authorizations_html_url", typ: "" },
        { json: "authorizations_url", js: "authorizations_url", typ: "" },
        { json: "code_search_url", js: "code_search_url", typ: "" },
        { json: "commit_search_url", js: "commit_search_url", typ: "" },
        { json: "emails_url", js: "emails_url", typ: "" },
        { json: "emojis_url", js: "emojis_url", typ: "" },
        { json: "events_url", js: "events_url", typ: "" },
        { json: "feeds_url", js: "feeds_url", typ: "" },
        { json: "followers_url", js: "followers_url", typ: "" },
        { json: "following_url", js: "following_url", typ: "" },
        { json: "gists_url", js: "gists_url", typ: "" },
        { json: "hub_url", js: "hub_url", typ: "" },
        { json: "issue_search_url", js: "issue_search_url", typ: "" },
        { json: "issues_url", js: "issues_url", typ: "" },
        { json: "keys_url", js: "keys_url", typ: "" },
        { json: "label_search_url", js: "label_search_url", typ: "" },
        { json: "notifications_url", js: "notifications_url", typ: "" },
        { json: "organization_url", js: "organization_url", typ: "" },
        { json: "organization_repositories_url", js: "organization_repositories_url", typ: "" },
        { json: "organization_teams_url", js: "organization_teams_url", typ: "" },
        { json: "public_gists_url", js: "public_gists_url", typ: "" },
        { json: "rate_limit_url", js: "rate_limit_url", typ: "" },
        { json: "repository_url", js: "repository_url", typ: "" },
        { json: "repository_search_url", js: "repository_search_url", typ: "" },
        { json: "current_user_repositories_url", js: "current_user_repositories_url", typ: "" },
        { json: "starred_url", js: "starred_url", typ: "" },
        { json: "starred_gists_url", js: "starred_gists_url", typ: "" },
        { json: "user_url", js: "user_url", typ: "" },
        { json: "user_organizations_url", js: "user_organizations_url", typ: "" },
        { json: "user_repositories_url", js: "user_repositories_url", typ: "" },
        { json: "user_search_url", js: "user_search_url", typ: "" },
    ], false),
};

```





## 未完待续

```js
#!/usr/bin/env node
const { program } = require('commander');
const figlet = require('figlet');
const versionStr = figlet.textSync('memory');
const Printer = require('@darkobits/lolcatjs');
const shell = require('shelljs');
let json2ts = require('json2ts');
const _version = require('../package.json').version;
const chalk = require('chalk');
const inquirer = require('inquirer');
const ora = require('ora');
const download = require('download-git-repo');
program.version(
  Printer.default.fromString(
    `   \n      脚手架${_version}\n    www.baidu.com \n${versionStr}`
  )
);
program.option('-c,create', '初始化项目😁');
program.option('-j,json2ts', '生成TypeScript🐻');
const bindHandler = {
  create(otherParmas) {
    inquirer
      .prompt([
        {
          type: 'text',
          message: '① 💌 请输入文件夹名称',
          name: 'dirname',
        },
        {
          type: 'list',
          name: 'jskind',
          message: '② 请选择开发语言',
          choices: ['☉ TypeScript', '☉ EcmaScript6'],
        },
      ])
      .then((answers) => {
        // console.log(answers.dirname);
        const _pwd = shell.pwd().stdout;
        const projectPath = `${_pwd}/${answers.dirname}`;
        // console.log('用户的全路径', projectPath, answers.jskind);
        shell.rm('-rf', projectPath);
        shell.mkdir(projectPath);
        const spinner = ora('⏰ downloading template.....');
        spinner.start();
        const template =
          'direct:https://github.com/lgwebdream/yd-vue-kernel.git';
        download(template, projectPath, { clone: true }, function (err) {
          spinner.stop();
          if (err) {
            console.log(chalk.red('下载失败😭'));
          } else {
            shell.sed(
              '-i',
              'yd-vue-kernel',
              answers.dirname,
              projectPath + '/package.json'
            );
          }
        });
      });
  },
  json2ts(url) {
    const data = {
      memory: 'laoyuan',
      data: {
        age: 30 || '',
      },
    };
    const jsonContent = JSON.stringify(data);
    let result = json2ts.convert(jsonContent);
    console.log(result);
  },
};
program
  .usage('[cmd] <options>')
  .arguments('<cmd> [env]')
  .action(function (cmd, otherParmas) {
    const handler = bindHandler[cmd];
    if (typeof handler === 'undefined') {
      console.log(chalk.blue(`${cmd}`) + chalk.red('暂未支持'));
    } else {
      handler(otherParmas);
    }
    // console.log('cmd', cmd);
    // console.log('otherParmas', otherParmas);
  });
program.parse(process.argv);

```

