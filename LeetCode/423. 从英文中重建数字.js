// 给你一个字符串 s ，其中包含字母顺序打乱的用英文单词表示的若干数字（0-9）。按 升序 返回原始的数字。

//  

// 示例 1：

// 输入：s = "owoztneoer"
// 输出："012"
// 示例 2：

// 输入：s = "fviefuro"
// 输出："45"
//  

// 提示：

// 1 <= s.length <= 105
// s[i] 为 ["e","g","f","i","h","o","n","s","r","u","t","w","v","x","z"] 这些字符之一
// s 保证是一个符合题目要求的字符串


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/reconstruct-original-digits-from-english
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



/**
 * @param {string} s
 * @return {string}
 */
 var originalDigits = function(s) {
    const c = new Map();
    for (const ch of s) {
        c.set(ch, (c.get(ch) || 0) + 1);
    }

    const cnt = new Array(10).fill(0);
    cnt[0] = c.get('z') || 0;
    cnt[2] = c.get('w') || 0;
    cnt[4] = c.get('u') || 0;
    cnt[6] = c.get('x') || 0;
    cnt[8] = c.get('g') || 0;

    cnt[3] = (c.get('h') || 0) - cnt[8];
    cnt[5] = (c.get('f') || 0) - cnt[4];
    cnt[7] = (c.get('s') || 0) - cnt[6];

    cnt[1] = (c.get('o') || 0) - cnt[0] - cnt[2] - cnt[4];

    cnt[9] = (c.get('i') || 0) - cnt[5] - cnt[6] - cnt[8];

    const ans = [];
    for (let i = 0; i < 10; ++i) {
        for (let j = 0; j < cnt[i]; ++j) {
            ans.push(String.fromCharCode(i + '0'.charCodeAt()));
        }
    }
    return ans.join('');
};