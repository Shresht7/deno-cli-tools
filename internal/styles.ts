//  Library
import { white } from '../ansi/colors.ts'
import { bold, inverse } from '../ansi/styles.ts'
import { compose } from '../helpers/composition.ts'
import { pad } from '../utilities/mod.ts'

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
    pad.left(4)(
        compose(
            bold
        )(s)
    ) +
    '\n'
)
