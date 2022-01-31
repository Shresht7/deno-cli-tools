//  Library
import spinners from './spinners.ts'
import clear from '../../ansi/clear.ts'
import cursor from '../../ansi/cursor.ts'

//  Helpers
import write from '../../helpers/write.ts'

//  =======
//  SPINNER
//  =======

type SpinnerProps = {
    text: string
}

class Spinner {

    /** Text to display next to the spinner */
    private text: string
    /** Reference to the currently active timer */
    private timer: number | null = null
    /** The current frame */
    private frame = 0

    constructor({ text }: SpinnerProps) {
        this.text = text || ""
    }

    updateText(text: string) {
        this.text = text
    }

    /** Starts the spinner */
    start(text?: string) {

        //  If text is passed, update the spinner text
        if (text) { this.updateText(text) }

        //  Hide cursor
        write(cursor.hide)

        //  Start the timer and store it's reference
        this.timer = setInterval(() => {
            const str = spinners.windows.frames[this.frame] + " " + this.text

            //  Re-render the spinner and text every interval
            write(clear.entireLine)
            write(cursor.left(str.length))
            write(str)

            //  Increment the frame counter
            this.frame = (this.frame + 1) % spinners.windows.frames.length
        }, spinners.windows.interval)

    }

    /** Stop the spinner */
    stop(text?: string) {
        //  Stop the timer
        if (this.timer) { clearInterval(this.timer) }
        this.timer = null

        write(clear.entireLine + '\n')

        //  Show cursor
        write(cursor.show)

        //  If text is passed, write text in place of spinner
        if (text) { write(text) }

    }

}

//  ------------------
export default Spinner
//  ------------------