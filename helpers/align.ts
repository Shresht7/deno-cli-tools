import { stringWidth } from './stringWidth.ts'

enum Alignment {
    LEFT = 'left',
    CENTER = 'center',
    RIGHT = 'right'
}

type Options = {
    align: Alignment,
    split?: string,
    pad?: string,
    width?: number,
}

const defaultOptions: Options = {
    align: Alignment.LEFT,
    split: '\n',
    pad: ' ',
    width: 0
}

export function align(text: string, options: Options) {
    if (options.align === Alignment.LEFT) { return text }    //  If left-aligned, return as is

    options = Object.assign(defaultOptions, options)

    const arr = text.split(options.split || '\n')

    let maxWidth = options.width || 0
    return arr.map(s => {
        const width = stringWidth(s)
        maxWidth = Math.max(width, maxWidth)
        return [s, width] as const
    }).map(([s, width]) => {
        if (options.align === Alignment.RIGHT) {
            return options.pad?.repeat(maxWidth - width) + s
        } else if (options.align === Alignment.CENTER) {
            return options.pad?.repeat(Math.floor((maxWidth - width) / 2)) + s
        }
    }).join(options.split)

}

console.log('Hello world')
console.log(align('New\nWorld\nYes', { align: Alignment.CENTER, width: 60 }))
console.log(align('World\nNew\nNo', { align: Alignment.RIGHT }))