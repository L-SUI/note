// 给你一份旅游线路图，该线路图中的旅行线路用数组 paths 表示，其中 paths[i] = [cityAi, cityBi] 表示该线路将会从 cityAi 直接前往 cityBi 。请你找出这次旅行的终点站，即没有任何可以通往其他城市的线路的城市。

// 题目数据保证线路图会形成一条不存在循环的线路，因此恰有一个旅行终点站。

//  

// 示例 1：

// 输入：paths = [["London","New York"],["New York","Lima"],["Lima","Sao Paulo"]]
// 输出："Sao Paulo" 
// 解释：从 "London" 出发，最后抵达终点站 "Sao Paulo" 。本次旅行的路线是 "London" -> "New York" -> "Lima" -> "Sao Paulo" 。
// 示例 2：

// 输入：paths = [["B","C"],["D","B"],["C","A"]]
// 输出："A"
// 解释：所有可能的线路是：
// "D" -> "B" -> "C" -> "A". 
// "B" -> "C" -> "A". 
// "C" -> "A". 
// "A". 
// 显然，旅行终点站是 "A" 。
// 示例 3：

// 输入：paths = [["A","Z"]]
// 输出："Z"
//  

// 提示：

// 1 <= paths.length <= 100
// paths[i].length == 2
// 1 <= cityAi.length, cityBi.length <= 10
// cityAi != cityBi
// 所有字符串均由大小写英文字母和空格字符组成。


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/destination-city
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




/**
 * @param {string[][]} paths
 * @return {string}
 */
 var destCity = function(paths) {
    const citiesA = new Set();
    for (const path of paths) {
        citiesA.add(path[0]);
    }
    for (const path of paths) {
        if (!citiesA.has(path[1])) {
            return path[1];
        }
    }
    return "";
};
