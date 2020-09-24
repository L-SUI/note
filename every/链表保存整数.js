// 生成一个链表，保存100个随机生成的整数，整数不分正负。

function ListNode(val) {
    this.val = val;
    this.next = null;
}

function toLinked(num) {
    let root = new ListNode('head');
    let res = root;
    for(let i = 0; i<num; i++) {
        let sum = Math.random()
        let node = new ListNode(sum)
        root.next = node
        root = root.next
    }
    return res.next
}
console.log(toLinked(100))