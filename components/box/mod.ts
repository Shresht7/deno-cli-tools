//  Library
import boxes from './boxes.json' assert { type: 'json' }
import { stringWidth } from '../../helpers/stringWidth.ts'
import { align, Alignment } from '../../helpers/align.ts'

//  =====
//  BOXES
//  =====

type BoxProps = {
    contents: string,
    title?: string,
    type?: keyof typeof boxes,
    alignment?: Alignment
}

export function box({ contents, title, type = 'classic', alignment = 'center' }: BoxProps) {

    //  Split input text into an array
    let arr = contents.split('\n')

    //  Calculate the maxWidth of the text
    const maxWidth = arr.reduce((acc, curr) => Math.max(acc, stringWidth(curr)), 0) + 2

    //  Keep a simpler reference
    const box = boxes[type]

    //  Transform lines to fit the box
    arr = arr
        .map(line => align(line || ' ', { align: alignment, width: maxWidth }))
        .map(line => box.left + line + box.right)

    //  Add the top and bottom sections
    title = align(' ' + title + ' ', { align: alignment, pad: box.top, width: maxWidth })
    arr.unshift(box.topLeft + title + box.topRight)
    arr.push(box.bottomLeft + box.bottom.repeat(maxWidth) + box.bottomRight)

    //  Concatenate as string
    return arr.join('\n')

}