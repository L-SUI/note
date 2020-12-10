// 如果有n个接口，需要按接口顺序渲染dom，怎么实现(提供get(id), render(id)方法)
/**
 * get(id)
 * render(id)
 */

function order (ids) {
    return ids.map(id =>new Promise((resolve)=>{
        resolve(get(id))
    }))
}

async function renderUI (ids){
    let arr = order(ids)
    for(let i=0; i<ids.length;i++){
        let data = await arr[i]
        render(id,data)
    }
}

