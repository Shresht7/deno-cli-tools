//  Library
import { wrap, code } from './codes.ts'

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

type CodeTuple = [number, number]

export const styles: Record<ANSIStyle, CodeTuple> = {
    bold: [1, 22],  //  21 doesn't work for some reason, 22 does the trick though
    faint: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    blinking: [5, 25],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29],
}

function construct(tuple: [number, number]) {
    const c = code(tuple[0], tuple[1])
    return Object.assign(
        (str: string) => wrap(str, c),
        c
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
