//  Helpers
import { stringWidth } from '../helpers/mod.ts'
import { pad } from './pad.ts'

export type Alignment = 'left' | 'center' | 'right'

type Options = {
    align?: Alignment,
    split?: string,
    pad?: string,
    width?: number,
}

/** Align text to the left, right or center */
export function align(text: string, options: Options = {}): string {

    //  Assign options
    options = {
        align: 'center',
        split: '\n',
        pad: ' ',
        width: 0,
        ...options
    }

    /** Maximum width of the text to display */
    let maxWidth = options.width || 0

    return text
        //  Parse as array
        .split(options.split!)
        //  Determine width and maxWidth
        .map(str => {
            const width = stringWidth(str)
            maxWidth = Math.max(width, maxWidth)
            return [str, width] as const
        })
        //  Apply padding
        .map(([str, width]) => {
            const space = maxWidth - width     //  Difference of maxWidth and width
            return applyPadding(str, options.align!, options.pad!, space)
        })
        //  Concatenate back to string
        .join(options.split)

}

/** Align text to the left */
align.left = (text: string, options: Omit<Options, 'align'> = {}) => align(text, { align: 'left', ...options })
/** Align text to the center */
align.center = (text: string, options: Omit<Options, 'align'> = {}) => align(text, { align: 'center', ...options })
/** Align text to the right */
align.right = (text: string, options: Omit<Options, 'align'> = {}) => align(text, { align: 'right', ...options })

//  ---------------
//  HELPER FUNCTION
//  ---------------

function applyPadding(text: string, mode: Alignment, char: string, space: number): string {
    switch (mode) {

        case 'left': {
            return pad.right(space)(text, char)
        }

        case 'center': {
            const half = Math.floor(space / 2)
            if (space % 2 === 0) {
                return pad(half)(text, char)
            } else {
                return char?.repeat(half) + text + char?.repeat(half + 1)
            }
        }

        case 'right': {
            return pad.left(space)(text, char)
        }

    }
}
