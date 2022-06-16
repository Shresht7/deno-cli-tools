//  Library
import { symbol as _symbol, fallbackSymbols as _fallbackSymbols } from './symbols.ts'
import { isUnicodeSupported } from '../helpers/isUnicodeSupported.ts'
import { blue, green, yellow, red } from '../ansi/colors.ts'

/** Terminal Symbols */
export const symbol = isUnicodeSupported() ? _symbol : _fallbackSymbols

/** Status Symbols with Color */
export const status = {
    info: blue(symbol.info),
    success: green(symbol.tick),
    warning: yellow(symbol.warning),
    error: red(symbol.cross),
    increase: green(symbol.triangleUp),
    decrease: red(symbol.triangleDown),
} as const
