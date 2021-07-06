function tuplify<T extends unknown[]>(...elements: T): T {
  return elements;
}
function get<T extends object, K extends keyof T>(o: T, name: K) {
  return o[name];
}
export { tuplify, get };
