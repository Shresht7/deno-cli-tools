//  Library
import { compose, pipe } from '../../helpers/composition.ts'

//  Testing
import { assertEquals } from '../../library/asserts.ts'

//  Functions to use for tests
const one = (s: string) => `<one>${s}</one>`
const two = (s: string) => `<two>${s}</two>`

Deno.test('Composition functions', async (t) => {

    await t.step('should compose multiple functions', () => {
        const actual = compose(one, two)('test')
        const expected = '<one><two>test</two></one>'
        assertEquals(actual, expected)
    })

    await t.step('should pipe multiple functions', () => {
        const actual = pipe(one, two)('test')
        const expected = '<two><one>test</one></two>'
        assertEquals(actual, expected)
    })

})