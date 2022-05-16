// 字符串有三种编辑操作:插入一个字符、删除一个字符或者替换一个字符。 给定两个字符串，编写一个函数判定它们是否只需要一次(或者零次)编辑。

//  

// 示例 1:

// 输入: 
// first = "pale"
// second = "ple"
// 输出: True
//  

// 示例 2:

// 输入: 
// first = "pales"
// second = "pal"
// 输出: False

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/one-away-lcci
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



/**
 * @param {string} first
 * @param {string} second
 * @return {boolean}
 */
 var oneEditAway = function(first, second) {
    const m = first.length, n = second.length;
    if (n - m === 1) {
        return oneInsert(first, second);
    } else if (m - n === 1) {
        return oneInsert(second, first);
    } else if (m === n) {
        let foundDifference = false;
        for (let i = 0; i < m; i++) {
            if (first[i] != second[i]) {
                if (!foundDifference) {
                    foundDifference = true;
                } else {
                    return false;
                }
            }
        }
        return true;
    } else {
        return false;
    }
}

const oneInsert = (shorter, longer) => {
    const length1 = shorter.length, length2 = longer.length;
    let index1 = 0, index2 = 0;
    while (index1 < length1 && index2 < length2) {
        if (shorter[index1] == longer[index2]) {
            index1++;
        }
        index2++;
        if (index2 - index1 > 1) {
            return false;
        }
    }
    return true;
};
