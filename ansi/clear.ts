//  Library
import { CSI } from './codes.ts'

//  =====
//  CLEAR
//  =====

/**
 * ANSI Clear
 * 
 * Note: Erasing the line won't move the cursor, it will stay at the last position.
 * You can use `\r` after erasing the line, to return the cursor to the start of the line.
 */
const clear = {

    /** Clears the screen (same as ESC[0J) */
    screen: CSI + 'J',

    /** Clears the cursor and everything below it */
    cursorAndBelow: CSI + '0J',

    /** Clears the cursor and everything above it */
    cursorAndAbove: CSI + '1J',

    /** Clears the entire screen  */
    entireScreen: CSI + '2J',

    /** Erase saved lines */
    savedLines: CSI + '3J',

    /** Clears the line (same as ESC[0K) */
    line: CSI + 'K',

    /** Clears the line from the cursor */
    lineFromCursor: CSI + '0K',

    /** Clears the line to the cursor */
    lineToCursor: CSI + '1K',

    /** Clears the entire line */
    entireLine: CSI + '2K',

}

//  ----------------
export default clear
//  ----------------
