// 某乐团的演出场地可视作 num * num 的二维矩阵 grid（左上角坐标为 [0,0])，每个位置站有一位成员。乐团共有 9 种乐器，乐器编号为 1~9，每位成员持有 1 个乐器。

// 为保证声乐混合效果，成员站位规则为：自 grid 左上角开始顺时针螺旋形向内循环以 1，2，...，9 循环重复排列。例如当 num = 5 时，站位如图所示



// 请返回位于场地坐标 [Xpos,Ypos] 的成员所持乐器编号。

// 示例 1：

// 输入：num = 3, Xpos = 0, Ypos = 2

// 输出：3

// 解释：


// 示例 2：

// 输入：num = 4, Xpos = 1, Ypos = 2

// 输出：5

// 解释：


// 提示：

// 1 <= num <= 10^9
// 0 <= Xpos, Ypos < num


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/SNJvJP
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




/**
 * @param {number} num
 * @param {number} xPos
 * @param {number} yPos
 * @return {number}
 */
 var orchestraLayout = function(num, xPos, yPos) {
    let rectSum = 0
    let whichRect = (Math.min(num - xPos - 1, xPos, yPos, num - yPos - 1))
    rectSum = (4 * whichRect % 9 * ((num - whichRect) % 9)) % 9
    xPos = xPos - whichRect
    yPos = yPos - whichRect
    let tempSum = num - (whichRect) * 2
    // console.log(tempSum, whichRect, xPos, yPos, rectSum)

    if (xPos === 0) {
        return (rectSum + yPos + 1) % 9 === 0 ? 9 : (rectSum + yPos + 1) % 9
    } else if (yPos === 0) {
        return (rectSum + tempSum * 4 - 3 - xPos) % 9 === 0 ? 9 : (rectSum + tempSum * 4 - 3 - xPos) % 9
    } else if (yPos + 1 === tempSum) {
        return (rectSum + tempSum + xPos) % 9 === 0 ? 9 : (rectSum + tempSum + xPos) % 9
    } else {
        return (rectSum + tempSum * 3 - 3 - yPos + 1) % 9 === 0 ? 9 : (rectSum + tempSum * 3 - 3 - yPos + 1) % 9
    }
};