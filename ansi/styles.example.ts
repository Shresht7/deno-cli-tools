//  Library
import {
    bold,
    faint,
    italic,
    underline,
    blinking,
    inverse,
    hidden,
    strikethrough
} from './styles.ts'
import { h } from '../internal/styles.ts'

h('Styles')

console.log(`
    ${bold('Bold')}
    ${faint('Faint')}
    ${italic('Italic')}
    ${underline('Underline')}
    ${blinking('Blinking')}
    ${inverse('Inverse')}
    ${hidden('Hidden')}
    ${strikethrough('Strikethrough')}
`)
