//  Library
import { ESC } from './codes.ts'

//  =====
//  CLEAR
//  =====

const clear = {
    /** Clears the screen */
    screen: `${ESC}[J`,
    /** Clears the cursor and everything below it */
    cursorAndBelow: `${ESC}[0J`,
    /** Clears the cursor and everything above it */
    cursorAndAbove: `${ESC}[1J`,
    /** Clears the entire screen  */
    entireScreen: `${ESC}[2J`,
    /** Clears the line */
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