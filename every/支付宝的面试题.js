1.
function sortVersion(list){
  return list.sort((a, b) => {
      let aa = a.split('.') 
      let bb = b.split('.') 
      let length = aa.length>bb.length?aa.length:bb.length
      for (var i =0; i < length; i++){
          let x = aa[i] || 0;
          let y = bb[i] || 0;
          if(x-y !==0 )return x - y;
      }
  });
}
sortVersion(['1.0.0', '1.2.3.4.5','2.12.1', '0.18.1','3.3.2','0.18.1'])


2.
class Depos {
  constructor(params = {}){
      this.store = this.flat(params);
  }

  flat(params = {}){
      var final = {}
      function baseFlat(params, baseKey){
          Object.keys(params).forEach(key => {
              let value = params[key]
              let finalKey = baseKey ? `${baseKey}.${key}` : key
              if(typeof value === 'object' && value !== null){
                  baseFlat(value, finalKey)
              }else{
                  final[finalKey] = value;
              }
          })
          return final;
      }
      return baseFlat(params)
  }

  transformIn(params){
      let flatParams = this.flat(params);
      Object.keys(flatParams).forEach(key => {
          let value = flatParams[key];
          this.store[key] = this.store[key] ? this.store[key] + value : value;
      })
      console.log(this.store)
  }

  transformOut(params){
      let flatParams = this.flat(params)
      console.log('flatParams',flatParams)
      Object.keys(flatParams).forEach(key => {
          // console.log()
          if(flatParams[key] > (this.store[key] || 0)){
              // throw Error(`${key}已爆仓`)
              // console.log(key + "爆仓了")
          }else{
              this.store[key] -= flatParams[key];
          }
      })
      console.log(this.store)
  }
}

var c = {
  a: 100,
  b:{
      c: {
          d: 400
      }
      ,f: 200  ,
      g: null
  }
}
var b = {
  a: 100,
  c: {
      d: 234
  }
}
var deps = new Depos(b)
deps.transformIn(c)
deps.transformOut(
  {
      b: {
          c: {
              d: 200
          },
          f:100,
      },
      a: 100
  }
)