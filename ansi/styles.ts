//  Library
import { construct } from './codes.ts'

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


export const style = {
    bold: [1, 22],  //  21 doesn't work for some reason, 22 does the trick though
    faint: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    blinking: [5, 25],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29],
} as const


/** Makes the string bold */
export const bold = construct(...style.bold)

/** Makes the string faint */
export const faint = construct(...style.faint)

/** Makes the string italic */
export const italic = construct(...style.italic)

/** Makes the string underlined */
export const underline = construct(...style.underline)

/** Makes the string blink */
export const blinking = construct(...style.blinking)

/** Inverts the string's colors */
export const inverse = construct(...style.inverse)

/** Hides the string */
export const hidden = construct(...style.hidden)

/** Strikethrough a string */
export const strikethrough = construct(...style.strikethrough)

/** Reset the given string */
export const reset = construct(0, 0)
