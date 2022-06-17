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
}

/** Helper function to format the given ANSI code */
export const code = (open: number | number[], close: number): Code => {
    open = Array.isArray(open) ? open : [open]
    return {
        open: `${ESC}[${open.join(';')}m`,
        close: `${ESC}[${close}m`,
    }
}

/**
 * Wrap ANSICode around string
 * @param str text to wrap string around
 * @param tuple ansiCode tuple to wrap
 */
export const wrap = (str: string, code: Code, enabled = true) => enabled
    ? code.open + str + code.close
    : str
