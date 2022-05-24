import { strip } from '../ansi/regex.ts'

/**
 * Calculate the width of the string
 * 
 * {@link https://github.com/sindresorhus/string-width/blob/main/index.js}
 */
export function stringWidth(s: string) {
    s = strip(s)    //  Strip ANSI Codes

    //  Calculate string-width
    let width = 0
    for (const _character of s) {
        width++
    }

    return width
}