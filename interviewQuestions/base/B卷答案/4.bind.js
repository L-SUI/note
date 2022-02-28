this.x = 9;    
var module = {
  x: 81,
  getX: function() { return this.x; }
};
var retrieveX = module.getX;
retrieveX();   
var boundGetX = retrieveX.bind(module);
boundGetX(); 