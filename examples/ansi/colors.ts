import {
    color,
    ansiColor,
    ANSIColor
} from '../../ansi/colors.ts'
import { RESET } from '../../ansi/codes.ts'

for (const c in color) {
    const clr = ansiColor(c as ANSIColor)
    console.log(`${clr(c)} ${clr.bright(c)} ${clr.bg(c)} ${clr.bgBright(c)} ${RESET}`)
}