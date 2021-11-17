// 手写代码，就是简单的移除dom树上面的class属性

//数据结构大致如此，如果有误不必纠结，可以尝试用TS来写代码
const baseRoot = {
    tagName: 'div',
    children: [
        "this is a span",
        {
            tagName: 'span',
            children: [
                "hello world!",
                {
                    tagName: 'input',
                    children: [
                        "this is a input",
                    ],
                    attribute:[
                        {
                            key:"class",
                            value:"Input",
                        },
                        {
                            key:"value",
                            value:"something",
                        }
                    ]
                }
            ],
            attribute:[
                {
                    key:"style",
                    value:"xxx",
                }
            ]
        }
    ],
    attribute:[
        {
            key:"class",
            value:"button",
        },
        {
            key:"data-text",
            value:"demo",
        }
    ]
};
const resultRoot = {
    tagName: 'div',
    children: [
        "this is a span",
        {
            tagName: 'span',
            children: [
                "hello world!",
                {
                    tagName: 'input',
                    children: [
                        "this is a input",
                    ],
                    attribute:[
                        {
                            key:"value",
                            value:"something",
                        }
                    ]
                }
            ],
            attribute:[
                {
                    key:"style",
                    value:"xxx",
                }
            ]
        }
    ],
    attribute:[
        {
            key:"data-text",
            value:"demo",
        }
    ]
};

function removeClass(root:typeof baseRoot):typeof resultRoot{
    for(const key in root){
        if(key=='attribute') root[key] = root[key].filter(item => item.key != 'class')
        if(key=='children'&& root[key].length) root[key].forEach(item =>typeof item=='object' && removeClass(item))
    }
    return root;
}

console.log(JSON.stringify(removeClass(baseRoot)))