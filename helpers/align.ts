//  Helpers
import { stringWidth } from './stringWidth.ts'
import { pad } from '../ansi/styles.ts'

type Alignment = 'left' | 'center' | 'right'

type Options = {
    align: Alignment,
    split?: string,
    pad?: string,
    width?: number,
}

const defaultOptions: Options = {
    align: 'left',
    split: '\n',
    pad: ' ',
    width: 0
}

export function align(text: string, options: Options) {
    options = Object.assign(defaultOptions, options)

    let maxWidth = options.width || 0
    return text
        //  parse as array
        .split(options.split!)
        //  determine width and maxWidth
        .map(s => {
            const width = stringWidth(s)
            maxWidth = Math.max(width, maxWidth)
            return [s, width] as const
        })
        //  apply padding
        .map(([s, width]) => {
            if (options.align === 'left') {
                const space = maxWidth - width
                return pad.right(space)(s, options!.pad)
            } else if (options.align === 'center') {
                const space = Math.floor((maxWidth - width) / 2)
                return pad(space)(s, options!.pad)
            } else if (options.align === 'right') {
                const space = maxWidth - width
                return pad.left(space)(s, options!.pad)
            }
        })
        //  concatenate as string
        .join(options.split)

}