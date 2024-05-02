//  Library
import { OSC, BEL, CSI } from './codes.ts'

//  =============
//  MISCELLANEOUS
//  =============

/** Create a hyperlink */
export const link = (text: string, url: string) => `${OSC}8;;${url}${BEL}${text}${OSC}8;;${BEL}` //  Returns a link

/** Play a bell sound */
export const bell = BEL

export const screen = {
    /** Save the screen */
    save: CSI + '?47h',
    /** Restore the screen */
    restore: CSI + '?47l'
}

export const altBuffer = {
    /** Enable the alternate buffer */
    enable: CSI + '?1049h',
    /** Disable the alternate buffer */
    disable: CSI + '?1049l'
}
