// 给定一个DOM tree和目标节点，请找出其左边的节点。


// 就像上图那样，绿色<a/>的左边是蓝色的<button/>。注意它们并不一定需要有共同的父节点。

// 如果没有的话，返回null。

// 你的代码的时间和空间复杂度是多少？

// https://bigfrontend.dev/zh/problem/previous-left-sibling



/**
 * @param {Element} root
 * @param {Element} target
 * @return {Elemnt | null}
 */
 function previousLeftSibling(root, target) {
    const q = [root];
  
    while (q.length) {
      const n = q.length;
      let prev = null;
  
      for (let i=0; i<n; i++) {
        const curr = q.shift();
  
        if (curr === target) {
          return prev;
        }
  
        q.push(...curr.children);
  
        prev = curr;
      }
    }
  
    return null;
  }
  
  