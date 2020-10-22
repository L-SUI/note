// 给定一个单链表 L：L0→L1→…→Ln-1→Ln ，
// 将其重新排列后变为： L0→Ln→L1→Ln-1→L2→Ln-2→…

// 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

// 示例 1:

// 给定链表 1->2->3->4, 重新排列为 1->4->2->3.
// 示例 2:

// 给定链表 1->2->3->4->5, 重新排列为 1->5->2->4->3.

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/reorder-list
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
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function(head) {
    if(!head) return
    let arr = [];
    let node = head;
    while(node){
        arr.push(node)
        node=node.next
    }
    let left=0,right=arr.length-1
    while(right-left>1){
        let next = arr[left].next;
        arr[right-1].next=arr[right].next
        arr[left].next = arr[right]
        arr[right].next = next
        left++
        right--
    }
};