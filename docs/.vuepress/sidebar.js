// note
const note = [
    {
        title: '性能优化',
        collapsable: false,
        children: [
            'optimization/性能优化一',
            'optimization/性能优化二',
            'optimization/性能优化三',
            'optimization/性能优化四',
        ]
    },
    {
        title: 'TypeScript',
        collapsable: false,
        children: [
            'typescript/recursive_optimization',
            'typescript/functional_programming.md'
        ]
    },
    {
        title: 'Node',
        collapsable: false,
        children: [
            'node/node',
            'node/pm2'
        ]
    },
    {
        title: 'HTTP',
        collapsable: false,
        children: [
            'http/http_1',
            'http/http_2'
        ]
    },
    {
        title: 'Linux',
        collapsable: false,
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
        collapsable: false,
        children: [
            'os/thread'
        ]
    },
    {
        title: 'Python',
        collapsable: false,
        children: [
            'python/python爬虫'
        ]
    },
    {
        title: 'Java',
        collapsable: false,
        children: [
            'java/java'
        ]
    },
    {
        title: 'Nginx',
        collapsable: false,
        children: [
            'nginx/nginx'
        ]
    },
    {
        title: '项目工程化',
        collapsable: false,
        children: [
            'engineering/ci_cd',
            'engineering/sonar',
        ]
    },
    {
        title: '数据库',
        collapsable: false,
        children: [
            'mysql/mysql'
        ]
    },
    {
        title: '常用工具',
        collapsable: false,
        children: [
            'mac/command_line',
            'mac/homebrew',
            'mac/nvm',
            'node/nrm'
        ]
    },
    {
        title: '自动化',
        collapsable: false,
        children: [
            'automation/jenkins',
            'automation/cli',
        ]
    },
    {
        title: 'js相关',
        collapsable: false,
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
        collapsable: false,
        children: [
            'QA/JavaScript&QA',
        ]
    },
    
]

// 算法
// const algorithm = [
//     {
//         title: '数组',
//         collapsable: false,
//         children: [
//             'array/count',
//             'array/bisection_method',
//             'array/find_min_number'
//         ]
//     },
//     {
//         title: '字符串',
//         collapsable: false,
//         children: [
//             'string/slide_window'
//         ]
//     },
//     {
//         title: '栈、队列、链表',
//         collapsable: false,
//         children: [
//             'sort/queue',
//             'sort/linked_list',
//             'linked_list/find_key'
//         ]
//     },
//     {
//         title: '趣味算法',
//         collapsable: false,
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
//         collapsable: false,
//         children: [
//             '',
//         ]
//     },
//     {
//         title: 'TinyDB',
//         collapsable: false,
//         children: [
//             'github/indexeddb',
//             'github/tinydb_docapi'
//         ]
//     },
//     {
//         title: 'Simple-dark',
//         collapsable: false,
//         children: [
//             'vscode/Simple-dark'
//         ]
//     },
//     {
//         title: 'tscli',
//         collapsable: false,
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