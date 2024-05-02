//  Library
import boxes from './boxes.json' with { type: 'json' }
import { stringWidth } from '../../helpers/stringWidth.ts'
import { align, Alignment } from '../../format/mod.ts'

//  =====
//  BOXES
//  =====

type BoxProps = {
    title?: string,
    type?: keyof typeof boxes,
    alignment?: Alignment
}

export function box(contents: string, { title, type = 'classic', alignment = 'center' }: BoxProps) {

    //  Split input text into an array
    let arr = contents.split('\n')

    //  Calculate the maxWidth of the text
    const maxWidth = arr.reduce((acc, curr) => Math.max(acc, stringWidth(curr)), 0) + 2

    //  Keep a simpler reference
    const box = boxes[type]

    //  Transform lines to fit the box
    arr = arr
        .map(line => align(line || ' ', { align: alignment, width: maxWidth }))
        .map(line => box.left + ' ' + line + ' ' + box.right)

    //  Add the top section
    if (title) {
        title = align(' ' + title + ' ', { align: alignment, pad: box.top, width: maxWidth })
        arr.unshift(box.topLeft + box.top + title + box.top + box.topRight)
    } else {
        arr.unshift(box.topLeft + box.top + box.top.repeat(maxWidth) + box.top + box.topRight)
    }

    //  Add the bottom section
    arr.push(box.bottomLeft + box.bottom + box.bottom.repeat(maxWidth) + box.bottom + box.bottomRight)

    //  Concatenate as string
    return arr.join('\n')

}
