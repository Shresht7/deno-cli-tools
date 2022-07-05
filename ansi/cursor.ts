//  Library
import { ESC, CSI } from './codes.ts'

//  ===================
//  CURSOR MANIPULATION
//  ===================

/** ANSI Cursor Manipulation */
const cursor = {
    /** Moves the cursor to home position (0, 0) */
    toHome: `${CSI}H`,
    /** Moves the cursor to given row and column */
    toPos: (row = 0, column = 0) => `${CSI}${row};${column}H`,
    /** Moves the cursor up by n number of lines */
    up: (n = 1) => `${CSI}${n}A`,
    /** Moves the cursor down by n number of lines */
    down: (n = 1) => `${CSI}${n}B`,
    /** Moves the cursor right by n number of lines */
    right: (n = 1) => `${CSI}${n}C`,
    /** Moves the cursor left by n number of lines */
    left: (n = 1) => `${CSI}${n}D`,
    /** Moves the cursor to the nth next line */
    toNextLine: (n = 1) => `${CSI}${n}E`,
    /** Moves the cursor to the nth prev line */
    toPrevLine: (n = 1) => `${CSI}${n}F`,
    /** Moves the cursor to a given column position */
    toColumn: (n = 0) => `${CSI}${n}G`,
    /** Returns the current cursor position (reports as `ESC[#;#R`) */
    requestPosition: `${CSI}6n`,
    /** Makes the cursor visible */
    show: `${CSI}?25h`,
    /** Makes the cursor invisible */
    hide: `${CSI}?25l`,
    //  The following commands have not been standardized and may have different functionality across different terminal applications. DEC Sequences are recommended.
    /** Saves the current cursor position */
    save: (mode: 'DEC' | 'SOC' = 'DEC') => mode === 'DEC' ? `${ESC} 7` : `${CSI}s`,
    /** Restores the current cursor position */
    restore: (mode: 'DEC' | 'SOC') => mode === 'DEC' ? `${ESC} 8` : `${CSI}u`
}

//  -----------------
export default cursor
//  -----------------
