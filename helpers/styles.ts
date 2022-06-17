import { inverse, pad } from '../ansi/styles.ts'
import { white } from '../ansi/colors.ts'
import { compose } from './composition.ts'

export const h = (s: string, print = console.log) => print(
    '\n' +
    compose(
        inverse,
        white,
        pad(2)
    )(s) +
    '\n'
)
