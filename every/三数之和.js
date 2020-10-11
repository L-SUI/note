// 在一个int型数组中，找出所有符合条件的三元组[a,b,c]，满足a+b+c=0。要求时间复杂度不得超过O(n^2)

function threeSum(nums) {
    nums.sort((a, b) => a - b)
    let result = []
    let len = nums.length;
    if (nums[0] <= 0 && nums[len - 1] >= 0) {
        for(let i=0; i < len-2;i++){
            let curr = nums[i]
            if(curr>0) break;
            let left = i+1;
            let right = len-1;
            while (left < right){
                if(curr*nums[right]>0) break;
                let sum = nums[left]+nums[right]+curr
                if(sum>0) right--; 
                else if(sum<0) left++
                else {
                    result.push([curr,nums[left],nums[right]])
                    break;
                }
            }
        }
    }
    return result;
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]))
console.log(threeSum([-1, 0, 1, 2, -1, -4,-2,4]))