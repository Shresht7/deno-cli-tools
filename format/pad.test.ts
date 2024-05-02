//  Library
import { pad } from './pad.ts'
import { assert } from '@std/assert'

Deno.test('pad', async t => {

    await t.step('should apply padding around the string', () => {
        const text = 'deno-cli-tools'
        const newText = pad()(text)
        assert(newText, ' ' + text + ' ')
    })

    await t.step('should apply the given padding around the string', () => {
        const text = 'deno-cli-tools'
        const newText = pad()(text, '-')
        assert(newText, '-' + text + '-')
    })

    await t.step('should apply the correct amount of padding around the string', () => {
        const text = 'deno-cli-tools'
        const newText = pad(2)(text)
        assert(newText, '  ' + text + '  ')
    })

    await t.step('should apply padding to the left of the string', () => {
        const text = 'deno-cli-tools'
        const newText = pad.left()(text)
        assert(newText, ' ' + text)
    })

    await t.step('should apply padding to the right of the string', () => {
        const text = 'deno-cli-tools'
        const newText = pad.right()(text)
        assert(newText, text + ' ')
    })

})
