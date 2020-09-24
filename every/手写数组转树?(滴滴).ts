// [{id:1, parentId: 0}, {id:2, parentId:1},{id:3, parentId:1}]
// 把这个数组从顶级分类递归查找子分类，最终构建一个树状数组。结果输出如下
// [{id:1, parentId: 0,children:[{id:2, parentId:1},{id:3, parentId:1}]}]
// ，parentId为0 的是根节点

interface IObj {
    [key: string]: number;
}
// interface IChildren {
//     id:number
//     parentId: number
//     children:Array<IChildren>|[]
// }
type IFormArray = Array<IObj>


function arrToTree<T extends IFormArray>(arr: T) {
    let result = [];
    let current = arr.shift();
    result.push(current);
    let toTree = (arr, result) => {
        for (let item of result) {
            if (arr.length > 0) {
                item.children = [];
                item.children.push(arr.shift(), arr.shift());
                toTree(arr, item.children)
            }
        }
    }
    toTree(arr, result)
    return result;
}

console.log(JSON.stringify(arrToTree([{ id: 1, parentId: 0 }, { id: 2, parentId: 1 }, { id: 3, parentId: 1 }])))
