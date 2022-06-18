//  Library
import {
    color,
    rgb,
    setColorEnabled,
    ansiColor,
    ANSIColor
} from './colors.ts'
import { h } from '../internal/styles.ts'

/* Run this example with:
    deno run ansi/colors.example.ts
*/

if (Deno.args.includes('--no-color')) {
    setColorEnabled(false)
}

h('ANSI Colors')

console.log('color\t\tbrightColor\tbgColor\t\tbgBrightColor')
for (const c in color) {
    const clr = ansiColor(c as ANSIColor)
    console.table(
        clr(c) + '\t\t' +
        clr.bright(c) + '\t\t' +
        clr.bg(c) + '\t\t' +
        clr.bgBright(c)
    )
}

h('RGB ANSI Colors')

const number = 16
let rgbStr = ''
for (let i = 0; i < number; i++) {
    rgbStr += rgb([rand(256), rand(256), rand(256)])(` ${i} `) + ' '
}
console.log(rgbStr)

rgbStr = ''
for (let i = 0; i < number; i++) {
    rgbStr += rgb.bg([rand(256), rand(256), rand(256)])(` ${i} `) + ' '
}
console.log(rgbStr)

/** Generate a random number */
function rand(i: number): number {
    return Math.floor(Math.random() * i)
}
