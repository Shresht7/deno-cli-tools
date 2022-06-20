import { strip } from '../ansi/regex.ts'

/**
 * Calculate the width of the string
 * 
 * - Source: {@link https://github.com/sindresorhus/string-width}
 * - Link: {@link https://github.com/sindresorhus/string-width/blob/main/index.js}
 * - License: {@link https://github.com/sindresorhus/string-width/blob/9f90691968ad356c807aaad1a5ed98d795749932/license}
 */
export function stringWidth(s: string) {
    s = strip(s)    //  Strip ANSI Codes

    //  TODO: Implementation Pending
    //  ! The implementation is beyond me. May return to it later. (when I actually need it)

    //  Calculate string-width
    let width = 0
    for (const _character of s) {
        width++
    }

    return width
}
