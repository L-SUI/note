export function tuplify<T extends unknown[]>(...elements: T): T {
  return elements;
}
export function get<T extends object, K extends keyof T>(o: T, name: K) {
  return o[name];
}

export type PickPromise<T extends Promise<unknown>> = T extends Promise<infer P> ? P : T;

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

type Trim<T extends string> = T extends ` ${infer R}`
  ? Trim<R>
  : T extends `${infer L} `
  ? Trim<L>
  : T

// 实现 CapitalizeString 泛型 将字符串的第一个字符转成大些，如果不是字符串，则直接返回。
type CapitalizeString<T> = T extends `${infer L}${infer R}`
  ? `${Uppercase<L>}${R}` : T;
// type A =CapitalizeString<'abcd'>//Abcd

// 实现 FirstChar 泛型 获取字符串的第一个字母，如果字符串为空，则返回never;
type FirstChar<Str extends string> = Str extends `${infer First}${infer Second}`
  ? `${First}` : never;

// 实现 LastChar 泛型 获取字符串的最后一个字母，如果字符串为空，则返回never;
type LastChar<
  Str extends string, //目标字符串
  perv = never // 输入字符串
  > = Str extends `${infer First}${infer Second}`
  ? LastChar<Second, First>
  : perv;

//  实现 StringToTuple 泛型 将字符串转成元祖。
type StringToTuple<T extends string> = T extends `${infer L}${infer R}`
  ? [L, ...StringToTuple<R>]
  : [];
// type A = StringToTuple<'BFE.dev'> // ['B', 'F', 'E', '.', 'd', 'e','v']
// type B = StringToTuple<''> // []

// 实现 TupleToString 泛型 将元组转换成字符串。
type TupleToString<T, prev extends string = ""> = T extends [
  infer L,
  ...infer R
]
  ? L extends string
  ? TupleToString<R, `${prev}${L}`>
  : never
  : prev;
// type A = TupleToString<['a']> // 'a'
// type B = TupleToString<['B', 'F', 'E']> // 'BFE'
// type C = TupleToString<[]> // ''

// 实现 RepeatString 泛型 将一个泛型复制多分，变成字符串返回


type RepeatString<T extends string, C extends number, A extends string[] = []> = 
A['length'] extends C
    ? ''
    : `${T}${RepeatString<T, C, [T, ...A]>}`;
// type A = RepeatString<'a', 3> // 'aaa'
// type B = RepeatString<'a', 0> // ''

// 实现 SplitString 泛型 将字符串按照一定的分隔符进行分割，并转成数组。
type SplitString<
  T extends string, // 初始字符串
  C extends string, // 分隔符
  B extends string = "", //临时结果
  A extends any[] = [] // 最终结果  SplitString<T,C,S,B,A>
  > = T extends `${infer L}${infer R}`
  ? L extends C
  ? SplitString<R, C, ``, [...A, B]>
  : SplitString<R, C, `${B}${L}`, A>
  : [...A, B];

// 实现 LengthOfString 泛型 计算一个字符串的个数
type LengthOfString<T, RE extends any[] = []> = T extends `${infer L}${infer R}`
  ? LengthOfString<R, [L, ...RE]>
  : RE["length"];

// 实现 KebabCase 泛型，将驼峰转成字符串输出。
type KebabCase<T, RE extends string = ""> = T extends `${infer L}${infer R}`
  ? Uppercase<L> extends L
  ? RE extends ""
  ? KebabCase<R, `${Lowercase<L>}`>
  : KebabCase<R, `${RE}-${Lowercase<L>}`>
  : KebabCase<R, `${RE}${Lowercase<L>}`>
  : RE;

// 实现 KebabCase 泛型，将驼峰转成字符串输出。
type CamelCase<
  T, // 输入字符串
  SPLIT extends string = "-",
  RE extends string = "", // 输出字符串
  F extends boolean = true // 标记
  > = T extends `${infer L}${infer R}`
  ? F extends true
  ? CamelCase<R, SPLIT, `${RE}${Uppercase<L>}`, false>
  : L extends SPLIT
  ? CamelCase<R, SPLIT, `${RE}`, true>
  : CamelCase<R, SPLIT, `${RE}${L}`, false>
  : RE;

// 实现 NaiveFlats 泛型，将数组字符串拍平。
type NaiveFlat<T extends any[]> = {
  [P in keyof T]: T[P] extends any[] ? T[P][number] : T[P]
}[number]

type NaiveFlats<T extends any[]> = {
  [P in keyof T]: T[P] extends any[] ? NaiveFlat<T[P]> : T[P]
}[number]

type NaiveResult1 = NaiveFlat<['a', 's', 'd']>

// 实现 NonEmptyArray 泛型，提示数组不能为空。
// 方案一
type NonEmptyArray<T> = [T, ...T[]]
// 方案二
// type NonEmptyArray<T> = T[] & { 0: T }

// Function.prototype.bind()返回一个this已经bind过后的function。 
// 对于这种情况，可以用OmitThisParameter<T>来增加type信息。请自行实现MyOmitThisParameter<T>。

type MyOmitThisParameter<T> = T extends (...args: unknown[]) => infer R
  ? () => R
  : never

type LengthOfTuple<T extends any[]> = T['length']
// type A = LengthOfTuple<['B', 'F', 'E']> // 3
// type B = LengthOfTuple<[]> // 0

type TupleToUnion<T extends any[], R = T[0]> =
    T extends [infer P, ...infer Q] ? TupleToUnion<Q, R | P> : R;
// type Foo = [string, number, boolean]
// type Bar = TupleToUnion<Foo> // string | number | boolean

type ReverseTuple<T extends any[],R extends any[]=[]> = T extends [infer L,...infer S]?
ReverseTuple<S,[L,...R]>
:R
// type A = ReverseTuple<[string, number, boolean]> // [boolean, number, string]
// type B = ReverseTuple<[1,2,3]> // [3,2,1]
// type C = ReverseTuple<[]> // []

type Flat<T extends any[],S extends any[]=[]> = T extends [infer L,...infer R]?
L extends any[]?Flat<R,[...S,...Flat<L>]>:Flat<R,[...S,L]>
:S
// type A = Flat<[1,2,3]> // [1,2,3]
// type B = Flat<[1,[2,3], [4,[5,[6]]]]> // [1,2,3,4,5,6]
// type C = Flat<[]> // []

type IsEmptyType<T> = number extends T
  ? keyof T extends never
    ? true
    : false
  : false
// type A = IsEmptyType<string> // false
// type B = IsEmptyType<{a: 3}> // false
// type C = IsEmptyType<{}> // true
// type D = IsEmptyType<any> // false
// type E = IsEmptyType<object> // false
// type F = IsEmptyType<Object> // false

type Repeat<T, C extends number,R extends T[]=[]> = R['length']extends C?R:Repeat<T,C,[...R,T]>
// type A = Repeat<number, 3> // [number, number, number]
// type B = Repeat<string, 2> // [string, string]
// type C = Repeat<1, 1> // [1, 1]
// type D = Repeat<0, 0> // []


type IsAny<T> = 0 extends 1 & T ? true : false
type FilterHelper<T, U> = IsAny<T> extends true ? [T] : T extends U ? [T] : []
type Filter<T extends any[], A> = T extends [infer F, ...infer R] ? [...FilterHelper<F, A>, ...Filter<R, A>] : []

// type A = Filter<[1, 'BFE', 2, true, 'dev'], number> // [1, 2]
// type B = Filter<[1, 'BFE', 2, true, 'dev'], string> // ['BFE', 'dev']
// type C = Filter<[1, 'BFE', 2, any, 'dev'], string> // ['BFE', any, 'dev']


type LargerThan<A extends number, B extends number, S extends any[] = []> =
  S['length'] extends A
  ? false
  : S['length'] extends B
  ? true
  : LargerThan<A, B, [...S, any]>
// type A = LargerThan<0, 1> // false
// type B = LargerThan<1, 0> // true
// type C = LargerThan<10, 9> // true

type LessThan<A extends number, B extends number, S extends any[] = []> =
  S['length'] extends B
  ? false
  : S['length'] extends A
  ? true
  : LessThan<A, B, [...S, any]>
// type A = LessThan<0, 0> // false

type Add<A extends number, B extends number,S extends any[]=[],F extends boolean=true,T extends any[]=[]> = 
F extends true
?(S['length'] extends A?Add<A,B,S,false>:Add<A,B,[...S,any],F>)
:(T['length'] extends B?S['length']:Add<A,B,[...S,any],F,[...T,any]>)
// type A = Add<1, 2> // 3
// type B = Add<0, 0> // 0

type WrapNakedTypeWithFunction<T> = T extends any ? (x: T) => void : never
type UnionToIntersection<T> = 
WrapNakedTypeWithFunction<T> extends (x: infer U) =>  void ? U : never
// type B = WrapNakedTypeWithFunction<{a: string} | {b: string} | {c: string}> 
// type A = UnionToIntersection<{a: string} | {b: string} | {c: string}> 
// {a: string} & {b: string} & {c: string}

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T> () => T extends B ? 1: 2) ? true : false
// type A = Equal<any, any> // true
// type B = Equal<any, 1> // false
// type C = Equal<never, never> // true
// type D = Equal<'BFE', 'BFE'> // true
// type E = Equal<'BFE', string> // false
// type F = Equal<1 | 2, 2 | 1> // true
// type G = Equal<{a : number}, {a: number}> // true

type FindIndex<T extends any[], E, U extends any[] = []> = T extends [infer F, ...infer R] ?
  Equal<F, E> extends true ?
  U['length'] :
  FindIndex<R, E, [...U, F]> :
  never
// type A = [any, never, 1, '2', true]
// type B = FindIndex<A, 1> // 2
// type C = FindIndex<A, 3> // never

type ReplaceAll<
  S extends string,
  F extends string,
  T extends string
  > = F extends '' ? S : (S extends `${F}${infer R}` ? `${T}${ReplaceAll<R, F, T>}` :
    (S extends `${infer A}${F}${infer B}` ? `${A}${T}${ReplaceAll<B, F, T>}` :
      S extends `${infer A}${F}` ? `${ReplaceAll<A, F, T>}${T}` : S
    ));
// type A = ReplaceAll<'aba', 'b', ''> // 'aa'
// type B = ReplaceAll<'ababbab', 'b', ''> // 'aaa'


type Slice<
  A extends any[], // Array
  S extends number = 0, // start
  E extends number = A['length'], // end
  I extends any[] = [], // current index
  O extends any[] = [] // output array
  > =
  A extends [infer F, ...infer R]
  ? LessThan<I['length'], S> extends false // index >= start
    ? LessThan<I['length'], E> extends true // index < end
      ? Slice<R, S, E, [...I, ''], [...O, F]>
      : O // index >= start && index >= end => index >= end => return
    : Slice<R, S, E, [...I, ''], O> // index < start
  : O // A == []
// type A = Slice<[1,2,3,4], 0, 2> // [1, 2]
// type B = Slice<[1,2,3,4], 2> // [3, 4]
// type C = Slice<[number, boolean, bigint], 2, 5> // [bigint]
// type D = Slice<[string, boolean], 0, 1> // [string]
// type E = Slice<[number, boolean, bigint], 5, 6> // []

type NumberToTuple<T extends number,R extends any[]=[]> =R['length'] extends T?R:NumberToTuple<T,[...R,any]>
type SubtractArr<A extends any[],B extends any[]> = B extends []?A['length']:SubtractArr<Slice<A,1>,Slice<B,1>>
type Subtract<A extends number, B extends number> = 
LessThan<A,B> extends true?never:SubtractArr<NumberToTuple<A>,NumberToTuple<B>>
// type A = Subtract<1, 1> // 0
// type B = Subtract<10, 3> // 7
// type C = Subtract<3, 10> // never

type MultiplyTuple<A extends any[],B extends any[],C extends any[]=[]>=B extends [infer L,...infer R]
?MultiplyTuple<A,[...R],[...C,...A]>
:C['length']
type Multiply<A extends number, B extends number> = A extends 0?0:B extends 0?0:
MultiplyTuple<NumberToTuple<A>,NumberToTuple<B>>
// type A = Multiply<1, 0> // 0
// type B = Multiply<4, 6> // 24

type Divide<A extends number, B extends number,C extends any[]=[]> =
  A extends 0?0:B extends 0?never:
  LessThan<Multiply<C['length'],B>,A> extends true
  ?Divide<A,B,[...C,any]>
  :Multiply<C['length'],B> extends A?C['length']:C extends [infer L,...infer R]?R['length']:C['length']
type A = Divide<1, 0> // never
type B = Divide<4, 2> // 2
type C = Divide<10, 3> // 3
