//  Library
import spinners from './spinners.ts'
import clear from '../../ansi/clear.ts'

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

        //  Start the timer and store it's reference
        this.timer = setInterval(() => {
            //  Re-render the spinner and text every interval
            write(clear.entireLine)
            write(spinners.windows.frames[this.frame] + " " + this.text)

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

        //  If text is passed, write text in place of spinner
        if (text) { write(text) }

    }

}

//  ------------------
export default Spinner
//  ------------------