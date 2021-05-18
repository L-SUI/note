// 实现一个方法，将一个数组中的数字，奇数在前，偶数在后
/*
* @param {Array} number
*/
function sorted(nums){
    let i = 0,len = nums.length-1;
    while(i<len){
        while(nums[i]%2==1){i++}
        while(nums[len]%2==0){len--}
        if(i>=len) return nums;
        [nums[i],nums[len]] = [nums[len], nums[i]];
        i++;
        len--;
    }
    return nums;
}
console.log(sorted([9,3,25,4,1,47,6,8,5,10,25]))
console.log(sorted([2,3,24,4,1,47,6,8,5,9,25]))