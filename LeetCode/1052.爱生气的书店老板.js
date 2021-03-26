// 今天，书店老板有一家店打算试营业 customers.length 分钟。每分钟都有一些顾客（customers[i]）会进入书店，所有这些顾客都会在那一分钟结束后离开。

// 在某些时候，书店老板会生气。 如果书店老板在第 i 分钟生气，那么 grumpy[i] = 1，否则 grumpy[i] = 0。 当书店老板生气时，那一分钟的顾客就会不满意，不生气则他们是满意的。

// 书店老板知道一个秘密技巧，能抑制自己的情绪，可以让自己连续 X 分钟不生气，但却只能使用一次。

// 请你返回这一天营业下来，最多有多少客户能够感到满意的数量。
//  

// 示例：

// 输入：customers = [1,0,1,2,1,1,7,5], grumpy = [0,1,0,1,0,1,0,1], X = 3
// 输出：16
// 解释：
// 书店老板在最后 3 分钟保持冷静。
// 感到满意的最大客户数量 = 1 + 1 + 1 + 1 + 7 + 5 = 16.
//  

// 提示：

// 1 <= X <= customers.length == grumpy.length <= 20000
// 0 <= customers[i] <= 1000
// 0 <= grumpy[i] <= 1

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/grumpy-bookstore-owner
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



/**
 * @param {number[]} customers
 * @param {number[]} grumpy
 * @param {number} X
 * @return {number}
 */
var maxSatisfied = function(customers, grumpy, X) {
    if(customers.length<=X) return customers.reduce((a,b)=>a+b);
    let max = 0;
    let num = [...customers.filter((item,index)=>grumpy[index]==0),0].reduce((a,b)=>a+b);
    for(let i=0;i<=customers.length-X;i++) {
        let curr = 0;
        for(let j=i;j<i+X;j++){
            if(grumpy[j]==1) curr+=customers[j]
        }
        max = Math.max(max,curr+num);
    }
    return max
};


var maxSatisfied = function(customers, grumpy, X) {
    let total = 0;
    const n = customers.length;
    for (let i = 0; i < n; i++) {
        if (grumpy[i] === 0) {
            total += customers[i];
        }
    }
    let increase = 0;
    for (let i = 0; i < X; i++) {
        increase += customers[i] * grumpy[i];
    }
    let maxIncrease = increase;
    for (let i = X; i < n; i++) {
        increase = increase - customers[i - X] * grumpy[i - X] + customers[i] * grumpy[i];
        maxIncrease = Math.max(maxIncrease, increase);
    }
    return total + maxIncrease;
};

// 作者：LeetCode-Solution
// 链接：https://leetcode-cn.com/problems/grumpy-bookstore-owner/solution/ai-sheng-qi-de-shu-dian-lao-ban-by-leetc-dloq/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

console.log(maxSatisfied([1,0,1,2,1,1,7,5],[0,1,0,1,0,1,0,1],3))
console.log(maxSatisfied([4,10,10],[1,1,0],2))