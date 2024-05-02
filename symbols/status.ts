//  Library
import { symbol, symbolName } from './symbols.ts'
import { red, blue, green, yellow } from '../ansi/colors.ts'
import { isEnabled } from '../ansi/codes.ts'
import { strip } from '../ansi/regex.ts'

/**
 * Helper function to get the symbol and color it with the given function. Returns a strictly typed symbol
 * @param name The name of the symbol
 * @param fn The color function to color the symbol with
 * @returns The colored symbol
 */
const color = <T extends symbolName>(name: T, fn: (s: string) => string) => fn(symbol[name]) as unknown as typeof symbol[T]

/** Status Symbols */
export const _status = {

    info: color('info', blue),              // ℹ

    tick: color('tick', green),             // ✔

    warn: color('warning', yellow),         // ⚠

    cross: color('cross', red),             // ✖


    increase: color('triangleUp', green),   // ▲

    decrease: color('triangleDown', red),   // ▼

} as const

export type statusName = keyof typeof _status

/** Status Symbols Without color */
export const _statusWithoutColor = Object.fromEntries(
    Object.entries(_status).map(([name, symbol]) => [name, strip(symbol)])
) as typeof _status

/** Helper function to get the correct symbol based on whether colors are enabled */
const getSymbol = <T extends statusName>(name: T) => (isEnabled
    ? _status[name]
    : _statusWithoutColor[name]
)

/**
 * Status Symbols
 * 
 * @example
 * console.log(status.info, status.warn, status.error)  // prints ℹ ⚠ ✖
 */
export const status = Object.fromEntries(
    Object.entries(_status).map(([name, _]) => [name, getSymbol(name as statusName)])
) as typeof _status
