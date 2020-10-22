// 输入一个int型数组，数组中的一个或多个连续整数组成一个子数组。
// 求所有子数组中和的最大值。输入的数组中保证至少有一个正数。


function maxArray (nums) {
    let res = nums[0];
    let sum = nums[0];
    let i = 1;
    while (i < nums.length) {
        if(Math.abs(nums[i]-nums[i-1])==1){
            sum+=nums[i]
        }else{
            sum=nums[i];
        }
        i++;
        res = Math.max(res,sum)
    }
    return res;
}

console.log(maxArray([1,2,3,-1,5]))
console.log(maxArray([1,2,3,-1,5,11]))
console.log(maxArray([-2,-1,1]))
console.log(maxArray([-2]))