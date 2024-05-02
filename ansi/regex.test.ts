import { strip } from './regex.ts'
import { assertEquals } from '@std/assert'

Deno.test('strip function', () => {
    Deno.test('should remove ANSI escape codes from a string', () => {
        const actual = strip('\u001b[31mHello\u001b[0m')
        const expected = 'Hello'
        assertEquals(actual, expected)
    })
})
