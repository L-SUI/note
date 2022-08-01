// note
const sidebarMap = [
    {
        title: '性能优化',
        dirname: 'optimization',
        collapsable: true,
        children: [
            'optimization/性能优化一',
            'optimization/性能优化二',
            'optimization/性能优化三',
            'optimization/性能优化四',
            'optimization/性能优化五',
            'optimization/性能优化总结',
            'optimization/SOLID',
            'optimization/performance指标解释',
        ]
    },
    {  
        title: '源码解析',
        dirname: 'sourceCode',
        collapsable: true,
        children: [
            'sourceCode/vue2',
            'sourceCode/vue3',
            'sourceCode/react',
            'sourceCode/reactHooks',
            'sourceCode/redux',
            'sourceCode/applets',
            'sourceCode/koa',
        ]
    },
    {
        title: '你不知道的css',
        dirname: 'cssNote',
        collapsable: true,
        children: [
            'cssNote/css',
            'cssNote/cssHoudini',
            'cssNote/css_matrix',
            'cssNote/css_split',
        ]
    },
    {
        title:'数据结构与算法',
        dirname: 'algorithm',
        collapsable: true,
        children: [
            'algorithm/algorithm',
            'algorithm/binaryTree',
            'algorithm/graph',
            'algorithm/bubbling',
            'algorithm/insert',
            'algorithm/merge',
            'algorithm/quick',
            'algorithm/select',
            'algorithm/shell',
            'algorithm/advance',
            'algorithm/object',
            'algorithm/摩尔投票法',
        ]
    },
    {
        title:'设计模式',
        dirname: 'design',
        collapsable: true,
        children: [
            'design/introduce',
            'design/singleton',
            'design/factory',
            'design/flyweightPattern',
        ]
    },
    {
        title: 'TypeScript',
        dirname: 'typescript',
        collapsable: true,
        children: [
            'typescript/typescript',
            'typescript/recursive_optimization',
            'typescript/functional_programming.md'
        ]
    },
    {
        title: 'Node',
        dirname: 'node',
        collapsable: true,
        children: [
            'node/node',
            'node/pm2'
        ]
    },
    {
        title: 'HTTP',
        dirname: 'http',
        collapsable: true,
        children: [
            'http/http_1',
            'http/http_2',
            'http/http_head',
            'http/网络经典问题',
        ]
    },
    {
        title: 'Linux',
        dirname: 'linux',
        collapsable: true,
        children: [
            'linux/linux',
            'linux/linux_deploy',
            'linux/linux_centos',
            'linux/BasicCommand',
            // 'linux/linux免密登陆',
        ]
    },
    {
        title: 'OS',
        dirname: 'os',
        collapsable: true,
        children: [
            'os/thread'
        ]
    },
    {
        title: 'Python',
        dirname: 'python',
        collapsable: true,
        children: [
            'python/python爬虫'
        ]
    },
    {
        title: 'Java',
        dirname: 'java',
        collapsable: true,
        children: [
            'java/java'
        ]
    },
    {
        title: 'Nginx',
        dirname: 'nginx',
        collapsable: true,
        children: [
            'nginx/nginx'
        ]
    },
    {
        title: '项目工程化',
        dirname: 'engineering',
        collapsable: true,
        children: [
            'engineering/ci_cd',
            'engineering/sonar',
            'engineering/小程序系列之-工程化',
        ]
    },
    {
        title: '数据库',
        dirname: 'database',
        collapsable: true,
        children: [
            'mysql/mysql'
        ]
    },
    {
        title: '常用工具',
        dirname: 'tools',
        collapsable: true,
        children: [
            'tools/command_line',
            'tools/homebrew',
            'tools/nvm',
            'tools/nrm'
        ]
    },
    {
        title: '自动化',
        dirname: 'automation',
        collapsable: true,
        children: [
            'automation/jenkins',
            'automation/cli',
        ]
    },
    {
        title: 'js相关',
        dirname: 'jsNote',
        collapsable: true,
        children: [
            'jsNote/函数柯里化curry',
            'jsNote/继承',
            'jsNote/使用setTimeout模拟setInterval',
            'jsNote/手写防抖和节流',
            'jsNote/手写实现拖拽',
            'jsNote/手写实现Object.create',
            'jsNote/手写一个call或apply',
            'jsNote/手写一个Function.bind',
            'jsNote/手写一个instanceOf原理',
            'jsNote/手写一个JS深拷贝',
            'jsNote/手写一个JSON.parse和JSOn.stringify',
            'jsNote/手写一个map和reduce',
            'jsNote/手写一个new操作符',
            'jsNote/LRU缓存算法',
            'jsNote/手写Promise',
            'jsNote/set',
            'jsNote/random',
            'jsNote/原型',
            'jsNote/实现Symbol类型',
        ]
    },
    {
        title: 'QA相关',
        dirname: 'QA',
        collapsable: true,
        children: [
            'QA/JavaScript&QA',
        ]
    },
    {
        title: '文章收藏',
        dirname: 'article',
        collapsable: true,
        children: [
            'article/article',
        ]
    },
]


module.exports = sidebarMap;