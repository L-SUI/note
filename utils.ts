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

type Trim<T extends string> = T extends ` ${infer R}` 
? Trim<R> 
: T extends `${infer L} `
  ? Trim<L>
  : T

// 实现 CapitalizeString 泛型 将字符串的第一个字符转成大些，如果不是字符串，则直接返回。
type CapitalizeString<T> = T extends `${infer L}${infer R}`
  ? `${Uppercase<L>}${R}` : T;

// 实现 FirstChar 泛型 获取字符串的第一个字母，如果字符串为空，则返回never;
type FirstChar<Str extends string> = Str extends `${infer First}${infer Second}`
  ? `${First}`: never;

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

// 实现 TupleToString 泛型 将元组转换成字符串。
type TupleToString<T, prev extends string = ""> = T extends [
  infer L,
  ...infer R
]
  ? L extends string
  ? TupleToString<R, `${prev}${L}`>
  : never
  : prev;

// 实现 RepeatString 泛型 将一个泛型复制多分，变成字符串返回
type RepeatString<
  T extends string, // 字符串
  C extends number, // 遍历个数
  S extends string = "", // 临时结果
  A extends any[] = [] // 结束条件
  > = A["length"] extends C ? S : RepeatString<T, C, `${T}${S}`, [1, ...A]>;

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

type NaiveFlats<T extends any[]>  = {
  [P in keyof T]: T[P] extends any[] ? NaiveFlat<T[P]> : T[P]
}[number]

type NaiveResult1 = NaiveFlat<['a','s','d']>

// 实现 NonEmptyArray 泛型，提示数组不能为空。
// 方案一
type NonEmptyArray<T> = [T,...T[]]
// 方案二
type NonEmptyArray<T> = T[] & {0:T}

// Function.prototype.bind()返回一个this已经bind过后的function。 
// 对于这种情况，可以用OmitThisParameter<T>来增加type信息。请自行实现MyOmitThisParameter<T>。

type MyOmitThisParameter<T> = T extends (...args: unknown[]) => infer R
? () => R
: never

