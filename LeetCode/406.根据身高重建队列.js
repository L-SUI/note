// 假设有打乱顺序的一群人站成一个队列。 每个人由一个整数对(h, k)表示，其中h是这个人的身高，k是排在这个人前面且身高大于或等于h的人数。 编写一个算法来重建这个队列。

// 注意：
// 总人数少于1100人。

// 示例

// 输入:
// [[7,0], [4,4], [7,1], [5,0], [6,1], [5,2]]

// 输出:
// [[5,0], [7,0], [5,2], [6,1], [4,4], [7,1]]

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/queue-reconstruction-by-height
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


/**
 * @param {number[][]} people
 * @return {number[][]}
 */
var reconstructQueue = function(people) {
    // 将people按身高从大到小排序，如果身高一样则将前面高于自己人数小的人放在前面
    people.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : b[0] - a[0])
    // 创建新数组 ans
    let ans = []
    for (let i = 0; i < people.length; i++) {
        // 挨个根据前面高于自己人数插入到ans里
        // 因为people已按照身高排序，所以某个人被插入到ans里时，所有比他高的都已经在ans里了
        // 而身高比他矮的人怎样插入到ans里都不影响前面高于他的人数
        // 所以这样得到的数组就是符合我们要求的队列
        ans.splice(people[i][1],0,people[i])
        console.log(ans)
    }
    return ans
};