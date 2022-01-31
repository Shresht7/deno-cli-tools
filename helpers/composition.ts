//  ====================
//  FUNCTION COMPOSITION
//  ====================

/** Pipes the given functions */
export const pipe = (...fns: ((s: string) => string)[]) => (s: string) => fns.reduce((acc, currFn) => currFn(acc), s)

/** Composes the given functions */
export const compose = (...fns: ((s: string) => string)[]) => (s: string) => fns.reduceRight((acc, currFn) => currFn(acc), s)
