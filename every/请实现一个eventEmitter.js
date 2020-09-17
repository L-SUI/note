// 请实现一个eventEmitter，拥有四个方法on, off, once 和 trigger

class EventEmitter {
    constructor(){
        this.eventQueue = {}
    }
    on(eventName, callback) {
        if (this.eventQueue[eventName]) {
            this.eventQueue[eventName].push(callback)
        }else {
            this.eventQueue[eventName] = [callback]
        }
    }
    off(eventName) {
        if(this.eventQueue[eventName]){
            this.eventQueue[eventName]=null;
        }else {
            return;
        }
    }
    once(eventName, callback) {
        let fn = ()=>{
            callback()
            this.off(eventName)
        }
        if (this.eventQueue[eventName]) {
            this.eventQueue[eventName].push(fn)
        }else {
            this.eventQueue[eventName] = [fn]
        }
    }
    trigger(eventName) {
        if (this.eventQueue[eventName]) {
            this.eventQueue[eventName].forEach(item=>item());
        }else {
            console.log( `${eventName} is not defined`);
        }
    }
}
let eventEmitter = new EventEmitter();
eventEmitter.on('setName',()=>{console.log('setName')})
eventEmitter.once('once',()=>{console.log('once')})
eventEmitter.trigger('setName')
eventEmitter.trigger('once')
eventEmitter.trigger('setName')
eventEmitter.trigger('once')
eventEmitter.off('setName')
eventEmitter.trigger('setName')