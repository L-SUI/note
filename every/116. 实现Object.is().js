// Object.is() 和===基于一致，除了以下情况：

// Object.is(0, -0) // false
// 0 === -0 // true

// Object.is(NaN, NaN) // true
// NaN === NaN // false
// 这里是 详细的 spec，你能否自己实现is()?





/**
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */
 function is(a, b) {
    if (typeof a === 'number' && typeof b === 'number') {
      if (Number.isNaN(a) && Number.isNaN(b)) {
        return true
      }
      
      if (a === 0 && b === 0 && 1 / a !== 1 / b) {
        return false
      }
    }
    
    return a === b
  }