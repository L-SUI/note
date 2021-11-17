function tuplify<T extends unknown[]>(...elements: T): T {
  return elements;
}
function get<T extends object, K extends keyof T>(o: T, name: K) {
  return o[name];
}

type PickPromise<T extends Promise<unknown>> = T extends Promise<infer P>?P:T;
export { tuplify, get, PickPromise };
