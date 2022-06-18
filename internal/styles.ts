//  Library
import { white } from '../ansi/colors.ts'
import { bold, inverse } from '../ansi/styles.ts'
import { compose } from '../helpers/composition.ts'
import { pad } from '../format/mod.ts'

/** Heading */
export const h = (s: string, print = console.log) => print(
    '\n' +
    compose(
        inverse,
        white,
        pad(2)
    )(s) +
    '\n'
)

/** Subheading */
export const h2 = (s: string, print = console.log) => print(
    '\n' +
    compose(
        pad.left(4),
        bold
    )(s) +
    '\n'
)
