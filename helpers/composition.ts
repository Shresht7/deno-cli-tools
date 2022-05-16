//  ====================
//  FUNCTION COMPOSITION
//  ====================

type CallbackFunction<T> = (x: T) => T

/** Pipes the given functions */
export const pipe = <T>(...fns: CallbackFunction<T>[]) => (x: T) => fns.reduce((acc, currFn) => currFn(acc), x)

/** Composes the given functions */
export const compose = <T>(...fns: CallbackFunction<T>[]) => (x: T) => fns.reduceRight((acc, currFn) => currFn(acc), x)
