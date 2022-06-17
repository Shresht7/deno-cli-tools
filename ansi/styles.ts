//  Library
import { wrap, code as getCode } from './codes.ts'

//  ==========
//  ANSI STYLE
//  ==========

export type ANSIStyle =
    | 'bold'
    | 'faint'
    | 'italic'
    | 'underline'
    | 'blinking'
    | 'inverse'
    | 'hidden'
    | 'strikethrough'


export const styles = {
    bold: [1, 22],  //  21 doesn't work for some reason, 22 does the trick though
    faint: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    blinking: [5, 25],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29],
} as const

/**
 * Constructs an ANSIStyle object. The object can be called like a function on a string
 * to wrap the ANSI escape codes around it. The object also has `open` and `close` properties
 * that store the opening and closing ANSI escape code respectively.
 */
function construct(tuple: readonly [number, number]) {
    const code = getCode(tuple[0], tuple[1])
    return Object.assign(
        (str: string) => wrap(str, code),
        code
    )
}

/** Makes the string bold */
export const bold = construct(styles.bold)
/** Makes the string faint */
export const faint = construct(styles.faint)
/** Makes the string italic */
export const italic = construct(styles.italic)
/** Makes the string underlined */
export const underline = construct(styles.underline)
/** Makes the string blink */
export const blinking = construct(styles.blinking)
/** Inverts the string's colors */
export const inverse = construct(styles.inverse)
/** Hides the string */
export const hidden = construct(styles.hidden)
/** Strikethrough a string */
export const strikethrough = construct(styles.strikethrough)

/** Add padding around text */
export const pad = (n = 1) => (str: string, char = ' ') => char.repeat(n) + str + char.repeat(n)
pad.left = (n = 1) => (str: string, char = ' ') => char.repeat(n) + str
pad.right = (n = 1) => (str: string, char = ' ') => str + char.repeat(n)
