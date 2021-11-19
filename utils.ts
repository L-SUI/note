export function tuplify<T extends unknown[]>(...elements: T): T {
  return elements;
}
export function get<T extends object, K extends keyof T>(o: T, name: K) {
  return o[name];
}

export type PickPromise<T extends Promise<unknown>> = T extends Promise<infer P>?P:T;

export type ResponseType<T> = {
  code: number;
  data: T;
  msg: string;
};

export type TApiType<T> = {
  [key in keyof T]: <P>(params?: object) => Promise<ResponseType<P>>;
};

export type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
  infer ElementType
>
  ? ElementType
  : never;