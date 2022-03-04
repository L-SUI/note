// 我们可以通过document.cookie来获取或者设置cookie。

// document.cookie = 'bfe=dev'
// // "bfe=dev"

// document.cookie = 'bfe1=dev1'
// // "bfe1=dev1"

// document.cookie
// // "bfe=dev; bfe1=dev1"
// 请实现自己的myCookie。

// 需要支持get和set
// document.myCookie = 'bfe=dev'
// // "bfe=dev"

// document.myCookie = 'bfe1=dev1'
// // "bfe1=dev1"

// document.myCookie
// // "bfe=dev; bfe1=dev1"
// cookie支持多种option，本题目中只需要支持max-age即可。max-age中指定的时间过后cookie将被删除。
// document.myCookie = 'bfe=dev; max-age=1'
// // "bfe=dev; max-age=1"

// document.myCookie
// // "bfe=dev"
// 1秒过后

// document.myCookie
// // ""
// 在install()中激活myCookie，在uninstall()删除整个逻辑。
// https://bigfrontend.dev/zh/problem/create-your-own-Cookie// enable myCookie



function install() {
    // Map<string, {value: string, maxAge?: number, createdAt: number}>
    const store = new Map()
    // use getter and setter
    Object.defineProperty(document, 'myCookie', {
      get() {
        const result = []
        for (let [key, entry] of store.entries()) {
          if (entry.maxAge !== undefined) {
            if (Date.now() - entry.createdAt >= entry.maxAge) {
              // expire
              store.delete(key)
              continue
            }
          }
          result.push(`${key}=${entry.value}`)
        }
        return result.join('; ')
      },
      
      set(valueStr) {
        const [keyValuePair,...options] = valueStr.replace(/ /g, '').split(';')
        const [key, value] = keyValuePair.split('=')
        if (!key || !value) return
        
        const entry = {
          value,
          createdAt: Date.now()
        }
        
        options.forEach((option) => {
          const [key, value] = option.split('=')
          if (!key || !value) return
          
          if (key === 'max-age') {
            const maxAge = parseInt(value, 10)
            
            if (Number.isNaN(maxAge)) return
            entry.maxAge = maxAge * 1000
          }
        })
        
        store.set(key, entry)
      },
      
      configurable: true
    })
  }
  
  // disable myCookie
  function uninstall() {
    delete document.myCookie
  }



