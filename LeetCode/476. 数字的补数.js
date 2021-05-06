// 给你一个 正 整数 num ，输出它的补数。补数是对该数的二进制表示取反。

//  

// 示例 1：

// 输入：num = 5
// 输出：2
// 解释：5 的二进制表示为 101（没有前导零位），其补数为 010。所以你需要输出 2 。
// 示例 2：

// 输入：num = 1
// 输出：0
// 解释：1 的二进制表示为 1（没有前导零位），其补数为 0。所以你需要输出 0 。
//  

// 提示：

// 给定的整数 num 保证在 32 位带符号整数的范围内。
// num >= 1
// 你可以假定二进制数不包含前导零位。
// 本题与 1009 https://leetcode-cn.com/problems/complement-of-base-10-integer/ 相同

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/number-complement
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



/**
 * @param {number} num
 * @return {number}
 */
 var findComplement = function(num) {
    // 转二进制
    var binary = num.toString(2);
    var complement = '';
    // 取反
    for (i = 0, len = binary.length; i < len; i++) {
      complement += binary[i] ^ 1;
    }
    // 转十进制
    return parseInt(complement, 2);
  };