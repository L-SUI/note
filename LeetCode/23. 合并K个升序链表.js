// 给你一个链表数组，每个链表都已经按升序排列。

// 请你将所有链表合并到一个升序链表中，返回合并后的链表。

//  

// 示例 1：

// 输入：lists = [[1,4,5],[1,3,4],[2,6]]
// 输出：[1,1,2,3,4,4,5,6]
// 解释：链表数组如下：
// [
//   1->4->5,
//   1->3->4,
//   2->6
// ]
// 将它们合并到一个有序链表中得到。
// 1->1->2->3->4->4->5->6
// 示例 2：

// 输入：lists = []
// 输出：[]
// 示例 3：

// 输入：lists = [[]]
// 输出：[]
//  

// 提示：

// k == lists.length
// 0 <= k <= 10^4
// 0 <= lists[i].length <= 500
// -10^4 <= lists[i][j] <= 10^4
// lists[i] 按 升序 排列
// lists[i].length 的总和不超过 10^4


// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/merge-k-sorted-lists
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。




/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
 var mergeKLists = function (lists) {
    // 当是空数组的情况下
    if (!lists.length) {
      return null;
    }
    // 合并两个排序链表
    const merge = (head1, head2) => {
      let dummy = new ListNode(0);
      let cur = dummy;
      // 新链表，新的值小就先接谁
      while (head1 && head2) {
        if (head1.val < head2.val) {
          cur.next = head1;
          head1 = head1.next;
        } else {
          cur.next = head2;
          head2 = head2.next;
        }
        cur = cur.next;
      }
      // 如果后面还有剩余的就把剩余的接上
      cur.next = head1 == null ? head2 : head1;
      return dummy.next;
    };
    const mergeLists = (lists, start, end) => {
      if (start + 1 == end) {
        return lists[start];
      }
      // 输入的k个排序链表，可以分成两部分，前k/2个链表和后k/2个链表
      // 如果将这前k/2个链表和后k/2个链表分别合并成两个排序的链表，再将两个排序的链表合并，那么所有链表都合并了
      let mid = (start + end) >> 1;
      let head1 = mergeLists(lists, start, mid);
      let head2 = mergeLists(lists, mid, end);
      return merge(head1, head2);
    };
    return mergeLists(lists, 0, lists.length);
  };
  
  