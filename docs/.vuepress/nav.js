// blog
const note = {
    text: '博客',
    link: '/note/'
}

// 算法
const algorithm = {
    text: '算法',
    items: [
        {
            text: '每日',
            link: 'https://github.com/L-SUI/note/tree/master/every',
        },
        {
            text: 'LeetCode',
            link: 'https://github.com/L-SUI/note/tree/master/LeetCode/',
        }
    ]
}

// more
const more = {
    text: '友邻',
    items: [
        {
            text: '朱昆鹏',
            link: 'http://notes.itzkp.com/',
        }
    ]
}

module.exports = [
    note,
    algorithm,
    more
]