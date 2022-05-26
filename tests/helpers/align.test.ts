//  Library
import { align } from '../../helpers/align.ts'
import { assertEquals } from '../../library/asserts.ts'

Deno.test('align', async (t) => {

    await t.step('should align to the left by default', () => {
        assertEquals(align('LEFT'), 'LEFT')
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

})