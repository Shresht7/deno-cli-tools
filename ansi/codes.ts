//  =================
//  ANSI ESCAPE CODES
//  =================

//  ESCAPE CODES : Unicode | Octal  | Hexadecimal | Decimal
export enum EscapeCode {
    Unicode = '\u001b',
    // Octal = '\033',
    Hexadecimal = '\x1b',
    Decimal = '27'
}

//  Escape Code
export const ESC = EscapeCode.Unicode

/* Control Sequence Introducer */
export const CSI = ESC + '['

/* Operating System Command */
export const OSC = ESC + ']'


/*  Reset Code */
export const RESET = CSI + '0m'

//  Miscellaneous
export const CTRL = '^['
export const BEL = '\u0007'

//  ---------------
//  HELPER FUNCTION
//  ---------------

interface ANSICode {
    open: string
    close: string
    regexp: {
        open: RegExp
        close: RegExp
    }
}

/** Helper function to format the given ANSI codes */
export const code = (start: number | number[], end: number): ANSICode => {
    start = Array.isArray(start) ? start : [start]
    const CSI = ESC + '\\['
    const open = CSI + start.join(';') + 'm'
    const close = CSI + end + 'm'
    return {
        open,
        close,
        regexp: {
            open: new RegExp(open),
            close: new RegExp(close)
        }
    }
}

/**
 * Wrap ANSI Codes around string
 * @param str text to wrap string around
 * @param code ansi code to wrap
 * @param enabled if false, return the string unaltered
 */
export const wrap = (str: string, code: ANSICode, enabled = true) => enabled
    ? code.open + str.replace(code.regexp.close, code.open) + code.close
    : str

/**
 * Constructs ANSIColor objects. The objects can be called as a function on a string
 * to wrap the ANSI escape codes around it. The objects also have `open` and `close`
 * properties that have the respective ANSI escape codes. The `regexp` property
 * has the respective RegExp objects.
 * @param open Opening ANSI escape code
 * @param close Closing ANSI escape code
 * @param enabled if false, return the string unaltered
 */
export function construct(open: number | number[], close: number, enabled = true) {
    const ansiCode = code(open, close)
    return Object.assign(
        (str: string) => wrap(str, ansiCode, enabled),
        ansiCode
    )
}
