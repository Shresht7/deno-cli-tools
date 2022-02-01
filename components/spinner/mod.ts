//  Library
import clear from '../../ansi/clear.ts'
import cursor from '../../ansi/cursor.ts'
import { spinners, spinnerType, ISpinner } from './spinners.ts'

//  Helpers
import write from '../../helpers/write.ts'

//  =======
//  SPINNER
//  =======

type SpinnerProps = {
    text?: string,
    type?: spinnerType
}

class Spinner {

    /** Text to display next to the spinner */
    private text: string
    /** Spinner type */
    private spinner: ISpinner

    /** Reference to the currently active timer */
    private timer: number | null = null
    /** The current frame */
    private frame = 0

    constructor({ text = '', type = 'windows' }: SpinnerProps = { text: '', type: 'windows' }) {
        this.text = text
        this.spinner = spinners[type]
    }

    /** set the text */
    setText(text: string) {
        this.text = text
    }

    /** Set new spinner */
    setSpinner(type: spinnerType) {
        this.spinner = spinners[type]
    }

    /** Update text and spinner */
    update(text: string, type: spinnerType) {
        this.setText(text)
        this.setSpinner(type)
    }

    /** Returns whether timer is running */
    isRunning = () => this.timer != null

    /** Starts the spinner */
    start(text?: string) {
        if (this.timer) { throw new Error("Spinner already active") }

        //  If text is passed, update the spinner text
        if (text) { this.setText(text) }

        //  Hide cursor
        write(cursor.hide)

        //  Start the timer and store it's reference
        this.timer = setInterval(() => {
            const str = this.spinner.frames[this.frame] + " " + this.text

            //  Re-render the spinner and text every interval
            write(clear.entireLine)
            write(cursor.left(999))
            write(str)

            //  Increment the frame counter
            this.frame = (this.frame + 1) % this.spinner.frames.length
        }, this.spinner.interval)

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