// 给你个整数数组 arr，其中每个元素都 不相同。

// 请你找到所有具有最小绝对差的元素对，并且按升序的顺序返回。

//  

// 示例 1：

// 输入：arr = [4,2,1,3]
// 输出：[[1,2],[2,3],[3,4]]
// 示例 2：

// 输入：arr = [1,3,6,10,15]
// 输出：[[1,3]]
// 示例 3：

// 输入：arr = [3,8,-10,23,19,-4,-14,27]
// 输出：[[-14,-10],[19,23],[23,27]]
//  

// 提示：

// 2 <= arr.length <= 10^5
// -10^6 <= arr[i] <= 10^6


// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/minimum-absolute-difference
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




/**
 * @param {number[]} arr
 * @return {number[][]}
 */
 var minimumAbsDifference = function(arr) {
    const n = arr.length;
    arr.sort((a, b) => a - b);

    let best = Number.MAX_VALUE;
    let ans = [];
    for (let i = 0; i < n - 1; ++i) {
        let delta = arr[i + 1] - arr[i];
        if (delta < best) {
            best = delta;
            ans = [];
            const pair = [];
            pair.push(arr[i]);
            pair.push(arr[i + 1]);
            ans.push(pair);
        } else if (delta === best) {
            const pair = [];
            pair.push(arr[i]);
            pair.push(arr[i + 1]);
            ans.push(pair);
        }
    }

    return ans;
};
