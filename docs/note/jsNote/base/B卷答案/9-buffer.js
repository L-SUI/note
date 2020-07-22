// const Readable = require("stream").Readable;
// const rs = new Readable();
// rs.push("学习");
// rs.push(null);
// const rs2 = rs;
// rs2.push("node");
// rs2.push(null);
// rs.pipe(process.stdout);
// rs2.pipe(process.stdout)

const allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
    result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

// const buf2 = cloneBuffer(buf,true);

const buf = Buffer.from('laoyuan');
const buf2 = buf;
buf2.write("nodejs");
buf2.write("22");
console.log("buf",buf.toString("utf-8"))
console.log("buf2",buf2.toString("utf-8"))