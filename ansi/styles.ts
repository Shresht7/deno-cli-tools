//  Library
import { wrap } from './codes.ts'

//  ==========
//  ANSI STYLE
//  ==========

type ANSIStyle =
    | 'bold'
    | 'faint'
    | 'italic'
    | 'underline'
    | 'blinking'
    | 'inverse'
    | 'hidden'
    | 'strikethrough'

type ANSICodeTuple = [number, number]

export const style: Record<ANSIStyle, ANSICodeTuple> = {
    bold: [1, 22],  //  21 doesn't work for some reason, 22 does the trick though
    faint: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    blinking: [5, 25],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29],
}

/** Makes the string bold */
export const bold = (str: string) => wrap(str, style.bold)
/** Makes the string faint */
export const faint = (str: string) => wrap(str, style.faint)
/** Makes the string italic */
export const italic = (str: string) => wrap(str, style.italic)
/** Makes the string underlined */
export const underline = (str: string) => wrap(str, style.underline)
/** Makes the string blink */
export const blinking = (str: string) => wrap(str, style.blinking)
/** Inverts the string's colors */
export const inverse = (str: string) => wrap(str, style.inverse)
/** Hides the string */
export const hidden = (str: string) => wrap(str, style.hidden)
/** Strikethrough a string */
export const strikethrough = (str: string) => wrap(str, style.strikethrough)

/** Add padding around text */
export const pad = (n = 1) => (str: string, char = ' ') => char.repeat(n) + str + char.repeat(n)
pad.left = (n = 1) => (str: string, char = ' ') => char.repeat(n) + str
pad.right = (n = 1) => (str: string, char = ' ') => str + char.repeat(n)