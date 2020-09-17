function shell (array) {
    let gaps = [5,3,1];

    for(let g=0;g<gaps.length;g++){
        for(let i=gaps[g];i<array.length;i++){
            let temp = array[i]
            for(var j=i;j>=gaps[g]&&array[j-gaps[g]]>temp;j-=gaps[g]){
                array[j]=array[j-gaps[g]]
                console.log(g,i,j)
            }
            array[j]=temp;
        }
        console.log(array)
    }
}

function dynamicSort (array) {
    let N =array.length;
    let h =1;
    while (h<N/3){
        h = 3*h+1;
    }
    while (h>1){
        for(let i=h;i<N;i++){
            for(let j=i;j>=h&&array[j]<array[j-h];j=j-h){
                [array[j],array[j-h]] = [array[j-h],array[j]]
            }
        }
        h=(h-1)/3;
    }
    return array;
}

console.log(shell([9,3,25,4,1,47,6,8,5,10,25]))
console.log(dynamicSort([9,3,25,4,1,47,6,8,5,10,25]))