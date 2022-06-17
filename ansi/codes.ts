//  =================
//  ANSI ESCAPE CODES
//  =================

//  ESCAPE CODES : Unicode | Ctrl | Octal  | Hexadecimal | Decimal
export enum EscapeCode {
    Unicode = '\u001b',
    Ctrl = '^[',
    // Octal = '\033',
    Hexadecimal = '\x1b',
    Decimal = '27'
}

//  Escape Code
export const ESC = EscapeCode.Unicode

//  Reset Code
export const RESET = `${ESC}[0m`

//  Miscellaneous
export const OSC = '\u001B]'
export const BEL = '\u0007'

//  ---------------
//  HELPER FUNCTION
//  ---------------

interface Code {
    open: string
    close: string
    regexp: {
        open: RegExp
        close: RegExp
    }
}

/** Helper function to format the given ANSI codes */
export const code = (open: number | number[], close: number): Code => {
    open = Array.isArray(open) ? open : [open]
    return {
        open: `${ESC}[${open.join(';')}m`,
        close: `${ESC}[${close}m`,
        regexp: {
            open: new RegExp(`${ESC}\\[${open.join(';')}m`),
            close: new RegExp(`${ESC}\\[${close}m`)
        }
    }
}

/**
 * Wrap ANSI Codes around string
 * @param str text to wrap string around
 * @param code ansi code to wrap
 * @param enabled if false, return the string unaltered
 */
export const wrap = (str: string, code: Code, enabled = true) => enabled
    ? code.open + str.replace(code.regexp.close, code.open) + code.close
    : str


/** Reset the given string */
export const reset = (str: string) => wrap(str, code(0, 0))
