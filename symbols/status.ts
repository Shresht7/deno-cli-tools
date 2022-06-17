//  Library
import { symbol } from './mod.ts'
import { red, blue, green, yellow, getColorEnabled } from '../ansi/colors.ts'

/** Status Symbols */
export const _status = {

    // ℹ
    info: symbol.info,

    // ✔
    tick: symbol.tick,
    done: symbol.tick,
    success: symbol.tick,

    // ⚠
    warn: symbol.warning,
    warning: symbol.warning,

    // ✖
    error: symbol.cross,
    close: symbol.cross,
    cancel: symbol.cross,
    cross: symbol.cross,

    // ▲
    increase: symbol.triangleUp,

    // ▼
    decrease: symbol.triangleDown,

} as const

/** Status Symbols with Color */
export const _statusWithColor = {

    // ℹ
    info: blue(symbol.info),

    // ✔
    tick: green(symbol.tick),
    done: green(symbol.tick),
    success: green(symbol.tick),

    // ⚠
    warn: yellow(symbol.warning),
    warning: yellow(symbol.warning),

    // ✖
    error: red(symbol.cross),
    close: red(symbol.cross),
    cancel: red(symbol.cross),
    cross: red(symbol.cross),

    // ▲
    increase: green(symbol.triangleUp),

    // ▼
    decrease: red(symbol.triangleDown),

} as const

/** Status Symbols */
export const status = (getColorEnabled()
    ? _statusWithColor
    : _status
) as typeof _status
