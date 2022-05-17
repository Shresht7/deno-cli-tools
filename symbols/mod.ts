//  Library
import { blue, green, yellow, red } from '../ansi/colors.ts'

export const symbol = {
    tick: '✔',
    info: 'ℹ',
    warning: '⚠',
    cross: '✖',

}

export const status = {
    info: blue(symbol.info),
    success: green(symbol.tick),
    warning: yellow(symbol.warning),
    error: red(symbol.cross)
}