// 新闻上有时候名字会某化处理，姓氏一样时候会后面添加甲乙丙丁，
// 给定一个名字数组，返回某化后的名字数组，顺序不变。


function maskNames(names){
    const symbols = ['甲','已','丙','丁','甲','甲','甲','甲','甲','甲'];
    const map = {};
    names.forEach(item=>{
        let current = item.slice(0,1).charCodeAt()
        if(map[current]) map[current].push(item);
        else map[current]=[item]
    })
    const arr = Object.values(map);
    arr.forEach(item=>{
        let len = item.length;
        for(let i = 0; i < len;i++){
            let current = item[i].slice(0,1)
            let index = names.indexOf(item[i]);
            if(len>1){
                names[index]=current+'某'+symbols[i];
            }else{
                names[index]=current+'某'
            }
        }
    })
    return names;
}
console.log(maskNames(['刘备','关于','张飞','刘表','刘邦','孙权']));