//  Helpers
import { stringWidth } from './stringWidth.ts'

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
    if (options.align === 'left') { return text }    //  If left-aligned, return as is

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
            if (options.align === 'right') {
                return options.pad!.repeat(maxWidth - width) + s
            } else if (options.align === 'center') {
                return options.pad!.repeat(Math.floor((maxWidth - width) / 2)) + s
            }
        })
        //  concatenate as string
        .join(options.split)

}