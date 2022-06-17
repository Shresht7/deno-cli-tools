//  Library
import { wrap, code, ESC, RESET } from './codes.ts'

//  ==========
//  ANSI COLOR
//  ==========

export type ANSIColor =
    | 'black'
    | 'red'
    | 'green'
    | 'yellow'
    | 'blue'
    | 'magenta'
    | 'cyan'
    | 'white'
    | 'default'

export const color: Record<ANSIColor, [number, number]> = {
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    default: [39, 39],
}

/** Background offset */
const bgOffset = 10
/** Bright-color offset */
const brightOffset = 60

/**
 * Construct an ANSIColor object. The object can be called as a function on a string
 * to wrap the ANSI escape codes around it. The object also has `open` and `close` properties
 * that store the opening and closing ANSI escape code respectively.
 */
function construct(tuple: [number, number]) {
    return Object.assign(
        (str: string) => wrap(str, tuple)
        ,
        {
            open: code(tuple[0]),
            close: code(tuple[1]),
        }
    )
}

/**
 * Constructs ANSIColor objects. The objects can be called as a function on a string
 * to wrap the ANSI escape codes around it. The objects also have `bg`, `bright` and `bgBright`
 * properties that are ANSIColor objects themselves. Each ANSIColor object has an `open` and `close`
 * property that stores the opening and closing ANSI escape code respectively.
 */
export const ansiColor = (clr: ANSIColor) => {
    return Object.assign(
        construct(color[clr]),
        {
            bg: construct([color[clr][0] + bgOffset, color[clr][1] + bgOffset]),
            bright: construct([color[clr][0] + brightOffset, color[clr][1]]),
            bgBright: construct([color[clr][0] + bgOffset + brightOffset, color[clr][1] + bgOffset]),
        }
    )
}

/** Colors the string black */
export const black = ansiColor('black')
/** Colors the string red */
export const red = ansiColor('red')
/** Colors the string green */
export const green = ansiColor('green')
/** Colors the string yellow */
export const yellow = ansiColor('yellow')
/** Colors the string blue */
export const blue = ansiColor('blue')
/** Colors the string magenta */
export const magenta = ansiColor('magenta')
/** Colors the string cyan */
export const cyan = ansiColor('cyan')
/** Colors the string white */
export const white = ansiColor('white')

export type RGBColor = [number, number, number]

/** Colors the string with the given rgb values */
export const rgb = (str: string, [r, g, b]: RGBColor) => `${ESC}[38;2;${r};${g};${b}m${str}${RESET}`
/** Colors the string's background with the given rgb values */
rgb.bg = (str: string, [r, g, b]: RGBColor) => `${ESC}[48;2;${r};${g};${b}m${str}${RESET}`
