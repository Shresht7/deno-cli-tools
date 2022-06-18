//  Library
import { ansi } from './builder.ts'

//  Testing
import { assertEquals } from '../deps.ts'

//  Helpers
import { blue, black, white } from './colors.ts'
import { bold } from './styles.ts'
import { RESET } from './codes.ts'
import { compose } from '../helpers/composition.ts'


Deno.test('ANSI Template String Builder', async (t) => {

    await t.step('should return a string', () => assertEquals(typeof ansi`abcde`, 'string'))

    await t.step('should allow string interpolation', () => {
        const number = Math.floor(Math.random() * 10)
        assertEquals(ansi`Random number: ${number}`, `Random number: ${number}`)
    })

    await t.step('should apply ansi codes using a ansi function', () => {
        const actual = ansi`This is ${blue}BLUE`
        const expected = 'This is \u001b[34mBLUE\u001b[39m'
        assertEquals(actual, expected)
    })

    await t.step('should apply ansi codes using multiple ansi functions', () => {
        const actual = ansi`Nothing is ever completely ${black}BLACK${RESET} or ${white}WHITE`
        const expected = 'Nothing is ever completely \u001b[30mBLACK\u001b[39m\u001b[0m or \u001b[37mWHITE\u001b[39m'
        assertEquals(actual, expected)
    })

    await t.step('should allow function composition', () => {
        const actual = ansi`Mix ${compose(black, bold)}BLACK and BOLD`
        const expected = 'Mix \u001b[30m\u001b[1mBLACK and BOLD\u001b[22m\u001b[39m'
        assertEquals(actual, expected)
    })

})
