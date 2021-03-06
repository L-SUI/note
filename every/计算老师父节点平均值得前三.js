// 计算老师父节点平均值得前三

let root = [
    {
        id: 1,
        name: "东北区",
        children: [
            {
                id: 10,
                name: "沈阳",
                children: [
                    {
                        id: 100,
                        name: "沈阳英语Team-1",
                        children: [
                            {
                                id: 1000,
                                name: "A老师",
                                score: 10,
                                children: [],
                            },
                            {
                                id: 1001,
                                name: "A老师",
                                score: 20,
                                children: [],
                            },
                            {
                                id: 1002,
                                name: "A老师",
                                score: 30,
                                children: [],
                            },
                        ],
                    },
                    {
                        id: 101,
                        name: "沈阳英语Team-2",
                        children: [
                            {
                                id: 1003,
                                name: "C老师",
                                score: 15,
                                children: [],
                            },
                            {
                                id: 1004,
                                name: "D老师",
                                score: 25,
                                children: [],
                            },
                            {
                                id: 1005,
                                name: "E老师",
                                score: 30,
                                children: [],
                            },
                        ],
                    }
                ],
            },
            {
                id: 11,
                name: "长春",
                children: [
                    {
                        id: 111,
                        name: "长春英语Team-1",
                        children: [
                            {
                                id: 1101,
                                name: "A老师",
                                score: 10,
                                children: [],
                            },
                            {
                                id: 1102,
                                name: "A老师",
                                score: 90,
                                children: [],
                            },
                            {
                                id: 1103,
                                name: "A老师",
                                score: 30,
                                children: [],
                            },
                        ],
                    },
                    {
                        id: 101,
                        name: "长春英语Team-2",
                        children: [
                            {
                                id: 1104,
                                name: "C老师",
                                score: 40,
                                children: [],
                            },
                            {
                                id: 1105,
                                name: "D老师",
                                score: 25,
                                children: [],
                            },
                            {
                                id: 1106,
                                name: "E老师",
                                score: 30,
                                children: [],
                            },
                        ],
                    }
                ],
            }
        ],
    }, {
        id: 2,
        name: "华北区",
        children: [
            {
                id: 20,
                name: "河北",
                children: [
                    {
                        id: 200,
                        name: "河北英语Team-1",
                        children: [
                            {
                                id: 2000,
                                name: "A老师",
                                score: 10,
                                children: [],
                            },
                            {
                                id: 2001,
                                name: "A老师",
                                score: 20,
                                children: [],
                            },
                            {
                                id: 2002,
                                name: "A老师",
                                score: 30,
                                children: [],
                            },
                        ],
                    },
                    {
                        id: 201,
                        name: "河北英语Team-2",
                        children: [
                            {
                                id: 2003,
                                name: "C老师",
                                score: 15,
                                children: [],
                            },
                            {
                                id: 2004,
                                name: "D老师",
                                score: 25,
                                children: [],
                            },
                            {
                                id: 2005,
                                name: "E老师",
                                score: 30,
                                children: [],
                            },
                        ],
                    }
                ],
            },
            {
                id: 21,
                name: "石家庄",
                children: [
                    {
                        id: 211,
                        name: "石家庄英语Team-1",
                        children: [
                            {
                                id: 2101,
                                name: "A老师",
                                score: 15,
                                children: [],
                            },
                            {
                                id: 2102,
                                name: "A老师",
                                score: 9,
                                children: [],
                            },
                            {
                                id: 2103,
                                name: "A老师",
                                score: 30,
                                children: [],
                            },
                        ],
                    },
                    {
                        id: 201,
                        name: "石家庄英语Team-2",
                        children: [
                            {
                                id: 2104,
                                name: "C老师",
                                score: 45,
                                children: [],
                            },
                            {
                                id: 2105,
                                name: "D老师",
                                score: 90,
                                children: [],
                            },
                            {
                                id: 2106,
                                name: "E老师",
                                score: 10,
                                children: [],
                            },
                        ],
                    }
                ],
            }
        ],
    }
]

function searchRanks(node){
    const map = {};
    const getNum=(node)=>{
        if(node.children.length>0){
            let count = 0;
            node.children.forEach(item=>{
                count+=getNum(item);
            });
            let res = count/node.children.length
            map[res]=node.name
            return res;
        }else {
            return node.score
        }
    }
    node.forEach(item=>{
        getNum(item);
    })
    return Object.values(map).reverse().slice(0,3); 
}
console.log(searchRanks(root))