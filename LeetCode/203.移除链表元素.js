// 删除链表中等于给定值 val 的所有节点。

// 示例:

// 输入: 1->2->6->3->4->5->6, val = 6
// 输出: 1->2->3->4->5


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
    let res = new ListNode('head')
    res.next = head;
    let pre = res;
    while(head) {
        if(head.val == val){
            pre.next = head.next;
            head = pre.next
        }else {
            pre = pre.next;
            head = head.next;
        }
    }
    return res.next;
};