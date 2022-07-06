// 珂珂喜欢吃香蕉。这里有 n 堆香蕉，第 i 堆中有 piles[i] 根香蕉。警卫已经离开了，将在 h 小时后回来。

// 珂珂可以决定她吃香蕉的速度 k （单位：根/小时）。每个小时，她将会选择一堆香蕉，从中吃掉 k 根。如果这堆香蕉少于 k 根，她将吃掉这堆的所有香蕉，然后这一小时内不会再吃更多的香蕉。  

// 珂珂喜欢慢慢吃，但仍然想在警卫回来前吃掉所有的香蕉。

// 返回她可以在 h 小时内吃掉所有香蕉的最小速度 k（k 为整数）。

//  

// 示例 1：

// 输入：piles = [3,6,7,11], h = 8
// 输出：4
// 示例 2：

// 输入：piles = [30,11,23,4,20], h = 5
// 输出：30
// 示例 3：

// 输入：piles = [30,11,23,4,20], h = 6
// 输出：23
//  

// 提示：

// 1 <= piles.length <= 104
// piles.length <= h <= 109
// 1 <= piles[i] <= 109


// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/koko-eating-bananas
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。






/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
 var minEatingSpeed = function(piles, h) {
    let low = 1;
    let high = 0;
    for (const pile of piles) {
        high = Math.max(high, pile);
    }
    let k = high;
    while (low < high) {
        const speed = Math.floor((high - low) / 2) + low;
        const time = getTime(piles, speed);
        if (time <= h) {
            k = speed;
            high = speed;
        } else {
            low = speed + 1;
        }
    }
    return k;
}

const getTime = (piles, speed) => {
    let time = 0;
    for (const pile of piles) {
        const curTime = Math.floor((pile + speed - 1) / speed);
        time += curTime;
    }
    return time;
};
