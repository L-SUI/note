// 给定仅有小写字母组成的字符串数组 A，返回列表中的每个字符串中都显示的全部字符（包括重复字符）组成的列表。
// 例如，如果一个字符在每个字符串中出现 3 次，但不是 4 次，则需要在最终答案中包含该字符 3 次。
// 你可以按任意顺序返回答案。

// 示例 1：

// 输入：["bella","label","roller"]
// 输出：["e","l","l"]
// 示例 2：

// 输入：["cool","lock","cook"]
// 输出：["c","o"]
//  

// 提示：

// 1 <= A.length <= 100
// 1 <= A[i].length <= 100
// A[i][j] 是小写字母

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/find-common-characters
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


/**
 * @param {string[]} A
 * @return {string[]}
 */
var commonChars = function(A) {
    var ans = A[0].split('');
    for (var i = 0, len = A.length; i < len; i++) {
      var temp = A[i].split('');
      // 过滤答案数组，删除其他字符串中不存在的字符
      ans = ans.filter(item => {
        var index = temp.indexOf(item);
        // 若存在需要查找的字符，被查找的字符串中把该字符换成其他占位符
        return index !== -1 ? temp[index] = ' ' : false;
      });
    }
    return ans;
  };