// 给定一个字符串 s 和一个整数 k，你需要对从字符串开头算起的每隔 2k 个字符的前 k 个字符进行反转。

// 如果剩余字符少于 k 个，则将剩余字符全部反转。
// 如果剩余字符小于 2k 但大于或等于 k 个，则反转前 k 个字符，其余字符保持原样。
//  

// 示例:

// 输入: s = "abcdefg", k = 2
// 输出: "bacdfeg"
//  

// 提示：

// 该字符串只包含小写英文字母。
// 给定字符串的长度和 k 在 [1, 10000] 范围内。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/reverse-string-ii
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
 var reverseStr = function(s, k) {
    let arr =s.split('')
    let l=0;
    let r=2*k-1
    // 根据l r来决策可以循环的数组范围
    while(l<r){
      let n=l+k-1
      // 根据l n来决策可以反转的数组范围
      while(l<=n){
         let temp=arr[l]
         arr[l]=arr[n]
         arr[n] = temp
         l++
         n--
      }
      l=r+1
      r = l+2*k-1>arr.length-1?s.length-1:l+2*k-1
    }
    return arr.join('')
};