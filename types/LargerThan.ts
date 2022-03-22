type NSymbol = 0 | 1

const enum Res {
  Victory,
  Failure,
  Tie
}

interface NumberObject<S extends NSymbol, I extends string[], F extends string[]> {
  symbol: S
  integer: I
  fractional: F
}
type IsNegative<T extends number> = `${T}` extends `-${string}` ? true : false
type IsFractional<T extends number> = `${T}` extends `${string}.${string}` ? true : false

type Split<T extends string, P extends string[] = []> = 
  T extends ''
    ? P
    : T extends `${infer F}${infer R}` 
      ? Split<R, [...P, F]>
      : never


type NumberObjectByNF<T extends number> = 
  `${T}` extends `${infer _}${infer I}.${infer F}`
    ? NumberObject<1, Split<I>, Split<F>>
    : never
type NumberObjectByPF<T extends number> = 
  `${T}` extends `${infer I}.${infer F}`
    ? NumberObject<0, Split<I>, Split<F>>
    : never

type NumberObjectByN<T extends number> =
  `${T}` extends `${infer _}${infer I}`
    ? NumberObject<1, Split<I>, []>
    : never

type NumberObjectByP<T extends number> = NumberObject<0, Split<`${T}`>, []>

type CreateNumberObject<T extends number, N = IsNegative<T>, F = IsFractional<T>> = 
  N extends true 
    ? F extends true
      ? NumberObjectByNF<T>
      : NumberObjectByN<T>
    : F extends true
      ? NumberObjectByPF<T>
      : NumberObjectByP<T>

type NumberCompare<A extends string, B extends string, T extends string[] = [], L = `${T['length']}`> = 
  L extends A
    ? L extends B
      ? Res.Tie
      : Res.Failure
    : L extends B
      ? Res.Victory
      : NumberCompare<A, B, [...T, '_']>

type Pop<T extends string[]> = T[0]
type Shift<T extends string[]> = T extends [infer _, ...infer R] ? R : never

type IsStringArray<T extends unknown> = 
  T extends Array<infer I> ? 
    I extends string 
      ? T 
      : never 
    : never

type NumberArrayCompareHandler<A extends string[], B extends string[]> = 
  A['length'] extends 0
    ? B['length'] extends 0
      ? Res.Tie
      : Res.Failure
    : NumberCompare<Pop<A>, Pop<B>> extends Res.Tie
      ? NumberArrayCompareHandler<IsStringArray<Shift<A>>, IsStringArray<Shift<B>>>
      : NumberCompare<Pop<A>, Pop<B>>


type SymbolCompareResMap = {
  '00': Res.Tie,
  '11': Res.Tie,
  '01': Res.Victory,
  '10': Res.Failure
}
type SymbolCompare<A extends 0 | 1, B extends 0 | 1> = SymbolCompareResMap[`${A}${B}`]

type NumberArrayCompare<A extends string[], B extends string[], CL extends boolean, LR = NumberCompare<`${A['length']}`, `${B['length']}`>> = 
  CL extends true
    ? LR extends Res.Tie
      ? NumberArrayCompareHandler<A, B>
      : LR
    : NumberArrayCompareHandler<A, B>

type LargerThen<
    A extends number, 
    B extends number, 
    AO extends NumberObject<NSymbol, [], []> = CreateNumberObject<A>, 
    BO extends NumberObject<NSymbol, [], []> = CreateNumberObject<B>,
    S =  SymbolCompare<AO['symbol'], BO['symbol']>,
    I = NumberArrayCompare<AO['integer'], BO['integer'], true>,
    F = NumberArrayCompare<AO['fractional'], BO['fractional'], false>
  > = 
    S extends Res.Failure ? false :
    S extends Res.Victory ? true :
      AO['symbol'] extends 1
        ? I extends Res.Failure ? true :
          I extends Res.Victory ? false :
          F extends Res.Failure ? true :
          false
        : I extends Res.Failure ? false :
          I extends Res.Victory ? true :
          F extends Res.Victory ? true :
          false


type D1 = LargerThen<9999999999.3, 99999999999.2>
type D2 = LargerThen<-10, 9.3>
type D3 = LargerThen<-9.34, -9.32>
type D4 = LargerThen<9.33, 9.323>
type D5 = LargerThen<-9.33232435455, -9.312838435934953>
type D6 = LargerThen<-9.33213123123, -9.32>

