//  Library
import { blue, green, yellow, red } from '../ansi/colors.ts'

/**
 * Terminal Symbols
 * 
 * - Source: {@link https://github.com/sindresorhus/figures}
 * - Link: {@link https://github.com/sindresorhus/figures/blob/62b5c69bd1ff54a523857b89f1fad184fb553ba5/index.js}
 * - License: {@link https://github.com/sindresorhus/figures/blob/62b5c69bd1ff54a523857b89f1fad184fb553ba5/license}
 */
export const symbol = {
    tick: '✔',
    info: 'ℹ',
    warning: '⚠',
    cross: '✖',
    bullet: '●',
    dot: '․',
    ellipsis: '…',
    pointerSmall: '›',
    pointer: '❯',
    triangleUp: '▲',
    triangleDown: '▼',
    triangleLeft: '◀',
    triangleRight: '▶',
    home: '⌂',
    heart: '♥',
    musicNote: '♪',
    musicNoteBeamed: '♫',
    arrowUp: '↑',
    arrowDown: '↓',
    arrowLeft: '←',
    arrowRight: '→',
    arrowLeftRight: '↔',
    arrowUpDown: '↕',
    star: '★',
    play: '▶',
    nodejs: '⬢',
    hamburger: '☰',
    almostEqual: '≈',
    notEqual: '≠',
    lessOrEqual: '≤',
    greaterOrEqual: '≥',
    identical: '≡',
    infinity: '∞',
    subscriptZero: '₀',
    subscriptOne: '₁',
    subscriptTwo: '₂',
    subscriptThree: '₃',
    subscriptFour: '₄',
    subscriptFive: '₅',
    subscriptSix: '₆',
    subscriptSeven: '₇',
    subscriptEight: '₈',
    subscriptNine: '₉',
    oneHalf: '½',
    oneThird: '⅓',
    oneQuarter: '¼',
    oneFifth: '⅕',
    oneSixth: '⅙',
    oneEighth: '⅛',
    twoThirds: '⅔',
    twoFifths: '⅖',
    threeQuarters: '¾',
    threeFifths: '⅗',
    threeEighths: '⅜',
    fourFifths: '⅘',
    fiveSixths: '⅚',
    fiveEighths: '⅝',
    sevenEighths: '⅞',
} as const

export const status = {
    info: blue(symbol.info),
    success: green(symbol.tick),
    warning: yellow(symbol.warning),
    error: red(symbol.cross),
    increase: green(symbol.triangleUp),
    decrease: red(symbol.triangleDown),
} as const
