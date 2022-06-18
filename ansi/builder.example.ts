//  ANSI Template String Builder
import { ansi } from './builder.ts'

//  Helper Functions
import { compose } from '../helpers/composition.ts'
import { RESET as reset } from './codes.ts'
import { blue, yellow, magenta } from './colors.ts'
import { inverse, bold, italic, faint, pad } from './styles.ts'
import { h } from '../internal/styles.ts'

h('ANSI Builder')

const header = compose(bold, blue, inverse, pad(3))
const highlight = compose(yellow, italic)
const code = compose(magenta, italic)

console.log(
    ansi`
    ${header}# ANSI Template String Builder${reset}

    The ${bold('ANSI builder API')} makes use of the power of ${highlight}template string literals${reset}
    to provide a simple and clean way to write ANSI strings.
    
    ${faint}Any ANSI helper function (or any function with ${code}\`(s: string) => string\` ${faint}signature for that matter)
    can be passed in the template strings that will be called upon the following string section (and only that section).
    `.split('\n').map(line => line.trimStart()).join('\n')
)
