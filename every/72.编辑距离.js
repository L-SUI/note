// 给你两个单词 word1 和 word2，请你计算出将 word1 转换成 word2 所使用的最少操作数 。
// 你可以对一个单词进行如下三种操作：

// 插入一个字符
// 删除一个字符
// 替换一个字符
//  

// 示例 1：

// 输入：word1 = "horse", word2 = "ros"
// 输出：3
// 解释：
// horse -> rorse (将 'h' 替换为 'r')
// rorse -> rose (删除 'r')
// rose -> ros (删除 'e')
// 示例 2：

// 输入：word1 = "intention", word2 = "execution"
// 输出：5
// 解释：
// intention -> inention (删除 't')
// inention -> enention (将 'i' 替换为 'e')
// enention -> exention (将 'n' 替换为 'x')
// exention -> exection (将 'n' 替换为 'c')
// exection -> execution (插入 'u')

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/edit-distance
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
    let n1 = word1.length+1;
    let n2 = word2.length+1;
    if(n1==1 || n2==1) {
        return Math.max(n1-1,n2-1)
    }
    let dp = new Array(n2)
    for(let i=0;i<n2;i++) {
        dp[i] = i
    }
    // console.log(dp)
    for(let i =1;i<n1;i++) {
        let temp = dp[0];
        dp[0] = i;
        for(let j=1;j<n2;j++) {
            let pre = temp;
            temp = dp[j]
            if(word1.charAt(i-1)===word2.charAt(j-1)) {
                console.log(pre)
                dp[j] = pre
            } else {
                console.log(dp[j-1],pre,dp[j])
                dp[j] = Math.min(dp[j-1],pre,dp[j])+1
            }
            console.log(dp)
        }
    }
    return dp[n2-1]
};

console.log(minDistance('horse','ros'))
// console.log(minDistance('intention','execution'))