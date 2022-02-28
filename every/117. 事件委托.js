// Event Delegation是什么?

// 请实现一个类似于 jQuery.on()的方法，用来注册事件处理器。

// 在jQuery中，可以用selector来选择element，在本题目中，这简化为一个predicate函数。

// onClick(
//   // root element
//   document.body,  
//   // predicate
//   (el) => el.tagName.toLowerCase() === 'div',  
//   function(e) {
//     console.log(this);
//     // this logs all the `div` element
//   }
// )
// event.stopPropagation() 和 event.stopImmediatePropagation() 都需要被支持。

// 请只在root element上添加一个真正的event listener

// https://bigfrontend.dev/zh/problem/event-delegation


// Map<node, Array<[predicate, hanlder]>>
const allHandlers = new Map()

/**
 * @param {HTMLElement} root
 * @param {(el: HTMLElement) => boolean} predicate
 * @param {(e: Event) => void} handler
 */
function onClick(root, predicate, handler) {
  if (allHandlers.has(root)) {
    allHandlers.get(root).push([predicate, handler])
    return
  }

  allHandlers.set(root, [[predicate, handler]])

  // attach the real handler
  root.addEventListener('click', function(e) {

    // from e.target -> root
    // check if element shoulded applied witht handler

    let el = e.target
    const handlers = allHandlers.get(root)
    let isPropagationStopped = false

    e.stopPropagation = () => {
      isPropagationStopped = true
    }

    while (el) {
      
      let isImmediatePropagationStopped = false

      e.stopImmediatePropagation = () => {
        isImmediatePropagationStopped = true
        isPropagationStopped = true
      }

      for (const [predicate, handler] of handlers) {
        if (predicate(el)) {
          handler.call(el, e)

          // check immediatepropagtion
          if (isImmediatePropagationStopped) {
            break
          }
        }
      }

      // check propagation
      if (el === root || isPropagationStopped) break

      el = el.parentElement
    }

  }, false)
}
