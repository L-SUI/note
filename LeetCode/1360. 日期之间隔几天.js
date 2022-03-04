// 请你编写一个程序来计算两个日期之间隔了多少天。

// 日期以字符串形式给出，格式为 YYYY-MM-DD，如示例所示。

//  

// 示例 1：

// 输入：date1 = "2019-06-29", date2 = "2019-06-30"
// 输出：1
// 示例 2：

// 输入：date1 = "2020-01-15", date2 = "2019-12-31"
// 输出：15
//  

// 提示：

// 给定的日期是 1971 年到 2100 年之间的有效日期。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/number-of-days-between-two-dates
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




/**
 * @param {string} date1
 * @param {string} date2
 * @return {number}
 */
 var daysBetweenDates = function (date1, date2) {
    date1 = new Date(date1).getTime();
    date2 = new Date(date2).getTime();
    return Math.abs(date1 - date2) / 1000 / 60 / 60 / 24;
  };
  