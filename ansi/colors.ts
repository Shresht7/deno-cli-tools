//  Library
import { wrap, code as getCode } from './codes.ts'

/** ANSI Colors are enabled */
let enabled = !Deno?.noColor ?? true
/** Helper function to enable or disable ANSI Colors */
export const setColorEnabled = (bool: boolean) => enabled = bool
/** Helper function to get whether ANSI Colors are enabled or disabled */
export const getColorEnabled = () => enabled

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

export const color = {
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    default: [39, 39],
} as const

/** Background offset */
const bgOffset = 10
/** Bright offset */
const brightOffset = 60

/**
 * Construct an ANSIColor object. The object can be called as a function on a string
 * to wrap the ANSI escape codes around it. The object also has `open` and `close` properties
 * that store the opening and closing ANSI escape code respectively.
 */
function construct(tuple: readonly [number, number]) {
    const code = getCode(tuple[0], tuple[1])
    return Object.assign(
        (str: string) => wrap(str, code, enabled),
        code
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

//  ===
//  RGB
//  ===

/** Color the string with the 8-bit color palette */
export const rgb8 = (str: string, color: number) => wrap(
    str,
    getCode([38, 5, clamp(color)], 39),
    enabled
)
/** Color the string's background with the 8-bit color palette */
rgb8.bg = (str: string, color: number) => wrap(
    str,
    getCode([48, 5, clamp(color)], 49),
    enabled
)

/** Colors the string with the given rgb values */
export const rgb = (str: string, [r, g, b]: [number, number, number]) => wrap(
    str,
    getCode([38, 2, ...clamp([r, g, b])], 39),
    enabled
)
/** Colors the string's background with the given rgb values */
rgb.bg = (str: string, [r, g, b]: [number, number, number]) => wrap(
    str,
    getCode([48, 2, ...clamp([r, g, b])], 49),
    enabled
)

// -------
// HELPERS
// -------

/** Clamp numbers between min and max */
function clamp(n: number, min?: number, max?: number): number
function clamp(n: number[], min?: number, max?: number): number[]
function clamp(n: number | number[], min = 0, max = 255): number | number[] {
    return Array.isArray(n)
        ? n.map(x => clamp(x, min, max))
        : Math.max(min, Math.min(max, n))
}
