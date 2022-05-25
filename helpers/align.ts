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

    const arr = text.split(options.split || '\n')

    let maxWidth = options.width || 0
    return arr.map(s => {
        const width = stringWidth(s)
        maxWidth = Math.max(width, maxWidth)
        return [s, width] as const
    }).map(([s, width]) => {
        if (options.align === 'right') {
            return options.pad?.repeat(maxWidth - width) + s
        } else if (options.align === 'center') {
            return options.pad?.repeat(Math.floor((maxWidth - width) / 2)) + s
        }
    }).join(options.split)

}

console.log('Hello world')
console.log(align('New\nWorld\nYes', { align: 'center', width: 60 }))
console.log(align('World\nNew\nNo', { align: 'right' }))