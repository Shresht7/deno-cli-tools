//  Library
import { construct } from './codes.ts'
import { ANSIStyle, style } from './styles.ts'
import { ANSIColor, color, bgOffset } from './colors.ts'

/**
 * Mixes several ANSI styles and colors together
 * @param s The style to apply to the text
 * @param c The color to apply to the text
 * @param bg The color to apply to the background
 */
export const mix = (s: ANSIStyle, c: ANSIColor = 'default', bg: ANSIColor = 'default') => {
    const _mix: number[] = [style[s][0]]
    if (c !== 'default') { _mix.push(color[c][0]) }
    if (bg !== 'default') { _mix.push(color[bg][0] + bgOffset) }
    return construct(_mix, 0)
}
