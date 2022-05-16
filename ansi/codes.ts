//  =================
//  ANSI ESCAPE CODES
//  =================

//  ESCAPE CODES : Unicode | Ctrl | Octal  | Hexadecimal | Decimal
export enum EscapeCode {
    Unicode = '\u001b',
    Ctrl = '^[',
    Octal = '\033',
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

/** Helper function to format the given ANSI code */
export const code = (n: number) => `${ESC}[${n}m`

/**
 * Wrap ANSICode around string
 * @param str text to wrap string around
 * @param tuple ansiCode tuple to wrap
 */
export const wrap = (str: string, tuple: [number, number]) => code(tuple[0]) + str + code(tuple[1])
