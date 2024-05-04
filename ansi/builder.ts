//  ============
//  ANSI BUILDER
//  ============

/** Callback function that takes in a string and returns a modified version of that string */
type StringModifier = (s: string) => string


/**
 * Applies ANSI escape sequences to a template string.
 * @param templateStr - The template string to apply ANSI escape sequences to.
 * @param rest - Additional parameters that can be used as string modifiers or values to be inserted into the template string.
 * @returns The resulting string with ANSI escape sequences applied.
 * 
 * @example
 * ```ts
 * ansi`This is ${blue}BLUE` // This is \u001b[34mBLUE\u001b[39m
 * ```
 */
export const ansi = (templateStr: TemplateStringsArray, ...rest: (string | number | StringModifier)[]) => {
  return templateStr.reduce((acc, curr, i) => {

    //  If the preceding parameter is a function, execute it on the current template string
    if (typeof rest[i - 1] === 'function') {
      const fn = rest[i - 1] as StringModifier
      acc += fn(curr)
    }

    //  If the template parameter is a string then return normally
    if (typeof rest[i - 1] === 'string' || typeof rest[i - 1] === 'number') {
      acc += rest[i - 1].toString() || ''
      acc += curr
    }

    return acc
  })
}
