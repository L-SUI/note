class EventEmitter {
  // { [eventName: string]: Map<Function, number> }
  subscriptions = {};

  subscribe(eventName, callback) {
    // If new eventName, initialize callbacks map
    if (!(eventName in this.subscriptions)) {
      this.subscriptions[eventName] = new Map();
    }

    // Add callback to map, or increment subscription count for callback
    this.subscriptions[eventName].set(
      callback,
      (this.subscriptions[eventName].get(callback) || 0) + 1
    );

    return {
      release: () => {
        const subCount = this.subscriptions[eventName].get(callback);
        
        // Remove or decrement subscription count for callback
        if (subCount === 1) {
          this.subscriptions[eventName].delete(callback);
          
          if (!this.subscriptions[eventName].size) {
            delete this.subscriptions[eventName];
          }
        } else {
          this.subscriptions[eventName].set(callback, subCount - 1);
        }
      }
    };
  }
  
  emit(eventName, ...args) {
    if (!(eventName in this.subscriptions)) {
      return;
    }
    
    // Call each event callback for the number of times subscribed
    for (let [callback, subCount] of this.subscriptions[eventName].entries()) {
      while (subCount > 0) {
        callback(...args);
        subCount--;
      }
    }
  }
}