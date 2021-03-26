// 存在一个按升序排列的链表，给你这个链表的头节点 head ，请你删除链表中所有存在数字重复情况的节点，只保留原始链表中 没有重复出现 的数字。

// 返回同样按升序排列的结果链表。

//  

// 示例 1：


// 输入：head = [1,2,3,3,4,4,5]
// 输出：[1,2,5]
// 示例 2：


// 输入：head = [1,1,1,2,3]
// 输出：[2,3]
//  

// 提示：

// 链表中节点数目在范围 [0, 300] 内
// -100 <= Node.val <= 100
// 题目数据保证链表已经按升序排列

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
 var deleteDuplicates = function(head) {
    if(!head) return head
    let res = new ListNode('head');
    res.next = head;
    let pre = res,curr = res.next;
    while(curr&&curr.next){
        let next = curr.next;
        let num = 0;
        while(curr.val==next.val){
            num++
            next = next.next
            if(!next) break
        }
        if(num==0){
            pre=curr
            curr = pre.next
        }else{
            pre.next = next
            curr = pre.next;
        }
    }
    return res.next
};