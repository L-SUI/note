const nav = require('./nav.js')
const sidebar = require('./sidebar.js')

module.exports = {
    title: 'Memory space',
    description: '记忆空间',
    markdown: {
        lineNumbers: true
    },
    extraWatchFiles: [
        './nav.js',
        './sidebar.js'
    ],
    themeConfig: {
        sidebarDepth: 2,
        smoothScroll: true,
        repo: 'L-SUI/note',
        nav,
        sidebar,
        docsDir: 'docs',
        editLinks: true,
        editLinkText: '在 Github 上编辑此页',
        lastUpdated: '更新时间',
    },
    plugins: [
        ["@vuepress/medium-zoom",true],
        ["@vuepress/back-to-top",true],
    ],
}