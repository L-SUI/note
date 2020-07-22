function cloneReg(target, isDeep) {
  var regFlag = /\w*$/;
  console.log(regFlag.exec(target));
  var result = new target.constructor(target.source, regFlag.exec(target));
  if (isDeep) {
    result.lastIndex = 0;
  } else {
    result.lastIndex = target.lastIndex;
  }
  return result;
}
var regx = /yideng/g;
var reg2 = cloneReg(regx, true);
console.log(reg2);
