// 给你一个字符串 s 和一个字符 c ，且 c 是 s 中出现过的字符。

// 返回一个整数数组 answer ，其中 answer.length == s.length 且 answer[i] 是 s 中从下标 i 到离它 最近 的字符 c 的 距离 。

// 两个下标 i 和 j 之间的 距离 为 abs(i - j) ，其中 abs 是绝对值函数。

//  

// 示例 1：

// 输入：s = "loveleetcode", c = "e"
// 输出：[3,2,1,0,1,0,0,1,2,2,1,0]
// 解释：字符 'e' 出现在下标 3、5、6 和 11 处（下标从 0 开始计数）。
// 距下标 0 最近的 'e' 出现在下标 3 ，所以距离为 abs(0 - 3) = 3 。
// 距下标 1 最近的 'e' 出现在下标 3 ，所以距离为 abs(1 - 3) = 3 。
// 对于下标 4 ，出现在下标 3 和下标 5 处的 'e' 都离它最近，但距离是一样的 abs(4 - 3) == abs(4 - 5) = 1 。
// 距下标 8 最近的 'e' 出现在下标 6 ，所以距离为 abs(8 - 6) = 2 。
// 示例 2：

// 输入：s = "aaab", c = "b"
// 输出：[3,2,1,0]
//  

// 提示：
// 1 <= s.length <= 104
// s[i] 和 c 均为小写英文字母
// 题目数据保证 c 在 s 中至少出现一次


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/shortest-distance-to-a-character
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


/**
 * @param {string} s
 * @param {character} c
 * @return {number[]}
 */
//  var shortestToChar = function (S, C) {
//     // 结果数组 res
//     var res = Array(S.length).fill(0);
  
//     for (let i = 0; i < S.length; i++) {
//       // 如果当前是目标字符，就什么都不用做
//       if (S[i] === C) continue;
  
//       // 定义两个指针 l, r 分别向左、右两个方向寻找目标字符 C，取最短距离
//       let l = i,
//         r = i,
//         shortest = Infinity;
  
//       while (l >= 0) {
//         if (S[l] === C) {
//           shortest = Math.min(shortest, i - l);
//           break;
//         }
//         l--;
//       }
  
//       while (r < S.length) {
//         if (S[r] === C) {
//           shortest = Math.min(shortest, r - i);
//           break;
//         }
//         r++;
//       }
  
//       res[i] = shortest;
//     }
//     return res;
//   };
  

var shortestToChar = function(s, c) {
  const arr = [];
  s.split('').forEach((item,index)=>item==c&&arr.push(index))
  let len=s.length,left=arr[0],right=arr.shift();
  const res=new Array(len).fill(0);
  for (let i=0,len=s.length;i<len;++i) {
      if(s[i]==c) {
        left = right
        right = arr.shift();
        console.log(i,left,right);
        continue;
      }
      console.log(i,left,right,Math.abs(left-i),Math.abs(right-i));
      if(Math.abs(left-i)>Math.abs(right-i)){
          left = right
          right = arr.shift()||right;
          res[i]=Math.abs(right-i)
      }else{
          res[i]=Math.abs(left-i)
      }
  }
  return res;
};
console.log(shortestToChar("loveleetcode","e"))
