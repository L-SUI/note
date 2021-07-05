// [0,2,0,6,5,0,1]如何在一次循环且不创建新数组的方式下变成
// [2,6,5,1,0,0,0]  把0移动到后面，不改变其他元素顺序


const sort = function (arr) {
    let left = 0,right=0;
    while (right < arr.length){
        while(arr[left]!=0){
            left++;
        }
        while(arr[right]==0){
            right++;
        }
        if(arr[left]==0 && arr[right]!=0 && left<right){
            [arr[left],arr[right]] = [arr[right],arr[left]]
            left++;
            right++;
        }
    }
    return arr
}
console.log(sort([0,2,0,6,5,0,1]))
console.log(sort([0,2,0,6,0,5,1]))