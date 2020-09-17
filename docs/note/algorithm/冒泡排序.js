
function bubbling (array){
    let len = array.length
    for(let outer=len;outer>=2;--outer){
        for(let inner=0;inner<=outer;inner++){
            if(array[inner]>array[inner+1]){
                [array[inner],array[inner+1]] = [array[inner+1],array[inner]]
                console.log(array)
            }
        }
    }
}
console.log(bubbling([9,3,4,1,6,8,5]))