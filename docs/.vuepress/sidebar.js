// note
const note = [
    {
        title: '性能优化',
        collapsable: true,
        children: [
            'optimization/性能优化一',
            'optimization/性能优化二',
            'optimization/性能优化三',
            'optimization/性能优化四',
            'optimization/性能优化五',
            'optimization/SOLID',
        ]
    },
    {  
        title: '源码解析',
        collapsable: true,
        children: [
            'sourceCode/vue2',
        ]
    },
    {
        title: '你不知道的css',
        collapsable: true,
        children: [
            'cssNote/css',
            'cssNote/cssHoudini',
        ]
    },
    {
        title: 'TypeScript',
        collapsable: true,
        children: [
            'typescript/typescript',
            'typescript/recursive_optimization',
            'typescript/functional_programming.md'
        ]
    },
    {
        title: 'Node',
        collapsable: true,
        children: [
            'node/node',
            'node/pm2'
        ]
    },
    {
        title: 'HTTP',
        collapsable: true,
        children: [
            'http/http_1',
            'http/http_2'
        ]
    },
    {
        title: 'Linux',
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
        collapsable: true,
        children: [
            'os/thread'
        ]
    },
    {
        title: 'Python',
        collapsable: true,
        children: [
            'python/python爬虫'
        ]
    },
    {
        title: 'Java',
        collapsable: true,
        children: [
            'java/java'
        ]
    },
    {
        title: 'Nginx',
        collapsable: true,
        children: [
            'nginx/nginx'
        ]
    },
    {
        title: '项目工程化',
        collapsable: true,
        children: [
            'engineering/ci_cd',
            'engineering/sonar',
        ]
    },
    {
        title: '数据库',
        collapsable: true,
        children: [
            'mysql/mysql'
        ]
    },
    {
        title: '常用工具',
        collapsable: true,
        children: [
            'mac/command_line',
            'mac/homebrew',
            'mac/nvm',
            'node/nrm'
        ]
    },
    {
        title: '自动化',
        collapsable: true,
        children: [
            'automation/jenkins',
            'automation/cli',
        ]
    },
    {
        title: 'js相关',
        collapsable: true,
        children: [
            'jsNote/base/函数柯里化curry',
            'jsNote/base/继承',
            'jsNote/base/使用setTimeout模拟setInterval',
            'jsNote/base/手写防抖(Debouncing)和节流(throttling)',
            'jsNote/base/手写实现拖拽',
            'jsNote/base/手写实现Object.create',
            'jsNote/base/手写一个call或apply',
            'jsNote/base/手写一个Function.bind',
            'jsNote/base/手写一个instanceOf原理',
            'jsNote/base/手写一个JS深拷贝(由浅入深多种解法)',
            'jsNote/base/手写一个JSON.parse和JSOn.stringify',
            'jsNote/base/手写一个map和reduce',
            'jsNote/base/手写一个new操作符',
        ]
    },
    {
        title: 'QA相关',
        collapsable: true,
        children: [
            'QA/JavaScript&QA',
        ]
    },
    
]

// 算法
// const algorithm = [
//     {
//         title: '数组',
//         collapsable: true,
//         children: [
//             'array/count',
//             'array/bisection_method',
//             'array/find_min_number'
//         ]
//     },
//     {
//         title: '字符串',
//         collapsable: true,
//         children: [
//             'string/slide_window'
//         ]
//     },
//     {
//         title: '栈、队列、链表',
//         collapsable: true,
//         children: [
//             'sort/queue',
//             'sort/linked_list',
//             'linked_list/find_key'
//         ]
//     },
//     {
//         title: '趣味算法',
//         collapsable: true,
//         children: [
//             'other/cards',
//             'other/range_of_motion'
//         ]
//     },
// ]

// 开源相关
// const open_source = [
//     {
//         title: '开源贡献',
//         collapsable: true,
//         children: [
//             '',
//         ]
//     },
//     {
//         title: 'TinyDB',
//         collapsable: true,
//         children: [
//             'github/indexeddb',
//             'github/tinydb_docapi'
//         ]
//     },
//     {
//         title: 'Simple-dark',
//         collapsable: true,
//         children: [
//             'vscode/Simple-dark'
//         ]
//     },
//     {
//         title: 'tscli',
//         collapsable: true,
//         children: [
//             'cli/tscli'
//         ]
//     }
// ]

module.exports = {
    '/note/': note,
    // '/algorithm/': algorithm,
    // '/open_source/': open_source
}