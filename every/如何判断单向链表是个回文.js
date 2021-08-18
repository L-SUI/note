// 算法：如何判断单向链表是个回文

function isPalindrome(node) {
    const current = [];
    while (node) (current.push(node),node = node.next);
    let i=-1,len=current.length;
    while (++i<=--len) if(current[i]!=current[len])return false;
    return true;
}

