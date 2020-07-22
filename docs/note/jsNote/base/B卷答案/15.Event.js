// 组件通信，一个触发与监听的过程
class EventEmitter {
    constructor () {
      // 存储事件
      this.events = this.events || new Map()
    }
    // 监听事件
    addListener (type, fn) {
      if (!this.events.get(type)) {
        this.events.set(type, fn)
      }
    }
    // 触发事件
    emit (type) {
      let handle = this.events.get(type)
      handle.apply(this, [...arguments].slice(1))
    }
  }

  // 测试
  let emitter = new EventEmitter()
  // 监听事件
  emitter.addListener('ages', age => {
    console.log(age)
  })
  // 触发事件
  emitter.emit('ages', 18)  // 18
