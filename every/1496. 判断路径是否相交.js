// 给你一个字符串 path，其中 path[i] 的值可以是 'N'、'S'、'E' 或者 'W'，分别表示向北、向南、向东、向西移动一个单位。

// 你从二维平面上的原点 (0, 0) 处开始出发，按 path 所指示的路径行走。

// 如果路径在任何位置上与自身相交，也就是走到之前已经走过的位置，请返回 true ；否则，返回 false 。

//  

// 示例 1：



// 输入：path = "NES"
// 输出：false 
// 解释：该路径没有在任何位置相交。
// 示例 2：



// 输入：path = "NESWW"
// 输出：true
// 解释：该路径经过原点两次。
//  

// 提示：

// 1 <= path.length <= 104
// path[i] 为 'N'、'S'、'E' 或 'W'

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/path-crossing
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




/**
 * @param {string} path
 * @return {boolean}
 */
 var isPathCrossing = function(path) {
    const s = new Set()
    let curr = [0, 0]
    s.add(JSON.stringify(curr))
    for (let c of path) {
        switch (c) {
            case 'N':
                curr[0] ++
                break
            case 'S':
                curr[0] --
                break
            case 'E':
                curr[1] ++
                break
            default:
                curr[1] --
        }
        if (s.has(JSON.stringify(curr))) return true
        else s.add(JSON.stringify(curr))
    }
    return false
};