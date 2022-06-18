//  Library
import { align } from './align.ts'

//  Testing
import { assertEquals } from '../library/asserts.ts'

Deno.test('align', async (t) => {

    await t.step('should align to the center by default', () => {
        assertEquals(align('MAIN', { width: 10 }), '   MAIN   ')
    })

    await t.step('should align multiple lines', () => {
        assertEquals(align('123\n4567\n890'), '123 \n4567\n890 ')
        assertEquals(align('123\n4567\n890', { align: 'right' }), ' 123\n4567\n 890')
    })

    await t.step('should align to the left', () => {
        assertEquals(align('LEFT', { align: 'left', width: 10 }), 'LEFT      ')
    })

    await t.step('should align to the center', () => {
        assertEquals(align('CENTER', { align: 'center', width: 10 }), '  CENTER  ')
    })

    await t.step('should align to the right', () => {
        assertEquals(align('RIGHT', { align: 'right', width: 10 }), '     RIGHT')
    })

    await t.step('should use the user-defined padding character', () => {
        assertEquals(align('pad', { align: 'center', pad: '-', width: 7 }), '--pad--')
    })

    await t.step('should split an even difference equally', () => {
        assertEquals(align('abc', { align: 'center', pad: '-', width: 7 }), '--abc--')
        assertEquals(align('abcd', { align: 'center', pad: '-', width: 8 }), '--abcd--')
    })

    await t.step('should split an odd difference evenly', () => {
        assertEquals(align('abc', { align: 'center', pad: '-', width: 8 }), '--abc---')
        assertEquals(align('abcd', { align: 'center', pad: '-', width: 7 }), '-abcd--')
    })

    await t.step('can be called using shorthands', () => {
        assertEquals(align.left('left', { width: 10 }), 'left      ')
        assertEquals(align.center('center', { width: 10 }), '  center  ')
        assertEquals(align.right('right', { width: 10 }), '     right')
    })

})
