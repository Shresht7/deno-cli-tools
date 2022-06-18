//  Helpers
import { stringWidth } from '../helpers/stringWidth.ts'
import { pad } from '../ansi/styles.ts'

export type Alignment = 'left' | 'center' | 'right'

type Options = {
    align?: Alignment,
    split?: string,
    pad?: string,
    width?: number,
}

/** Align text to the left, right or center */
export function align(text: string, options: Options = {}) {

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
        .map(s => {
            const width = stringWidth(s)
            maxWidth = Math.max(width, maxWidth)
            return [s, width] as const
        })
        //  Apply padding
        .map(([s, width]) => {
            const space = maxWidth - width     //  Difference of maxWidth and width
            switch (options.align) {
                case 'left': {
                    return pad.right(space)(s, options.pad)
                }
                case 'center': {
                    const half = Math.floor(space / 2)
                    if (space % 2 === 0) {
                        return pad(half)(s, options.pad)
                    } else {
                        return options.pad?.repeat(half) + s + options.pad?.repeat(half + 1)
                    }
                }
                case 'right': {
                    return pad.left(space)(s, options.pad)
                }
            }
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
