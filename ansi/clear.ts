//  Library
import { ESC } from './codes.ts'

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
    screen: `${ESC}[J`,
    /** Clears the cursor and everything below it */
    cursorAndBelow: `${ESC}[0J`,
    /** Clears the cursor and everything above it */
    cursorAndAbove: `${ESC}[1J`,
    /** Clears the entire screen  */
    entireScreen: `${ESC}[2J`,
    /** Erase saved lines */
    savedLines: `${ESC}[3J`,
    /** Clears the line (same as ESC[0K) */
    line: `${ESC}[K`,
    /** Clears the line from the cursor */
    lineFromCursor: `${ESC}[0K`,
    /** Clears the line to the cursor */
    lineToCursor: `${ESC}[1K`,
    /** Clears the entire line */
    entireLine: `${ESC}[2K`,
}

//  ----------------
export default clear
//  ----------------
