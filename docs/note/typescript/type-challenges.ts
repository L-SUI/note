type H = Record<string, any[]>

type Merge<A extends H, B extends H> =
{
  [P in keyof A] : P extends keyof B ? [...A[P], ...B[P]] : A[P]
} & {
  [P in Exclude<keyof B, keyof A>] : B[P]
}

type MapsLength<T extends H> = { [P in keyof T]: T[P]['length'] }

type GenType<T> = T extends number | string
  ? { [P in T] : [0] }
  : {}

type Helper<T extends any[], Res extends H = {}> =
T extends [infer L, ...infer R]
  ? [L] extends [never]
    ? Helper<R, Res>
    : L extends any[]
      ? Helper<R, Merge<Helper<L>, Res>>
      : Helper<R, Merge<GenType<L>, Res>>
  : Res

type CountElementNumberToObject<T extends any[]> = MapsLength<Helper<T>>
type Simple1 = CountElementNumberToObject<[]> // return {}
type Simple2 = CountElementNumberToObject<[1,2,3,4,5]> 
/*
 return {
  1: 1,
  2: 1,
  3: 1,
  4: 1,
  5: 1
}
*/
type Simple3 = CountElementNumberToObject<[1,2,3,4,5,[1,2,3]]> 
/*
 return {
  1: 2,
  2: 2,
  3: 2,
  4: 1,
  5: 1
}
*/