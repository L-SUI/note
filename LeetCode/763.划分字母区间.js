// 字符串 S 由小写字母组成。我们要把这个字符串划分为尽可能多的片段，同一个字母只会出现在其中的一个片段。返回一个表示每个字符串片段的长度的列表。

// 示例 1：

// 输入：S = "ababcbacadefegdehijhklij"
// 输出：[9,7,8]
// 解释：
// 划分结果为 "ababcbaca", "defegde", "hijhklij"。
// 每个字母最多出现在一个片段中。
// 像 "ababcbacadefegde", "hijhklij" 的划分是错误的，因为划分的片段数较少。
//  
// 提示：

// S的长度在[1, 500]之间。
// S只包含小写字母 'a' 到 'z' 。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/partition-labels
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


/**
 * @param {string} S
 * @return {number[]}
 */
var partitionLabels = function(S) {
    let res = [];
    let i=0;
    let pre = 0;
    let min = 0;
    while(i<S.length){
        let index = S.lastIndexOf(S[i])
        if(index>i && index>-1) {
            if(index>pre) pre=index
        }else{
            if(i==pre){
                res.push(pre-min+1)
                S = S.slice(pre+1)
                min = 0;
                pre = 0;
                i=0;
                continue
            }
        }
        i++
    }
    return res
};