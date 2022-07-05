//  Library
import { OSC, BEL, CSI } from './codes.ts'

//  =============
//  MISCELLANEOUS
//  =============

export const link = (text: string, url: string) => `${OSC}8;;${url}${BEL}${text}${OSC}8;;${BEL}` //  Returns a link

export const bell = BEL

export const screen = {
    save: CSI + '?47h',
    restore: CSI + '?47l'
}

export const altBuffer = {
    enable: CSI + '?1049h',
    disable: CSI + '?1049l'
}
