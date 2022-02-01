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
    type?: spinnerType,
    formatter?: (((spinner: string) => string) | null),
    writer?: Deno.Writer
}

class Spinner {

    /** Text to display next to the spinner */
    private text: string
    /** Spinner type */
    private spinner: ISpinner
    /** Spinner formatter */
    private formatter: (((text: string) => string) | undefined | null) = null

    /** Output */
    private writer: Deno.Writer = Deno.stdout

    /** Reference to the currently active timer */
    private timer: number | null = null
    /** The current frame */
    private frame = 0

    constructor({ text = '', type = 'windows', formatter, writer }: SpinnerProps = { text: '', type: 'windows' }) {
        this.text = text
        this.spinner = spinners[type]
        this.formatter = formatter
        if (writer) { this.writer = writer }
    }

    /** Writes text to this.writer */
    private write(text: string) {
        write(text, this.writer)
    }

    /** set the text */
    setText(text: (string | ((text: string) => string))) {
        text = typeof text === 'string' ? text : text(this.text)
        this.write(clear.entireLine)
        this.text = text
    }

    /** Set new spinner */
    setSpinner(type: spinnerType, formatter?: (spinner: string) => string) {
        this.spinner = spinners[type]
        this.formatter = formatter
    }

    /** Update text and spinner */
    update(text: (string | ((text: string) => string)), type: spinnerType, formatter?: (text: string) => string) {
        this.setText(text)
        this.setSpinner(type, formatter)
    }

    /** Returns whether timer is running */
    isRunning = () => this.timer != null

    /** Starts the spinner */
    start(text?: string) {
        if (this.timer) { throw new Error("Spinner already active") }

        //  If text is passed, update the spinner text
        if (text) { this.setText(text) }

        //  Hide cursor
        this.write(cursor.hide)

        //  Start the timer and store it's reference
        this.timer = setInterval(() => {
            //  Format display string
            let frame = this.spinner.frames[this.frame]
            frame = this.formatter ? this.formatter(frame) : frame
            const str = frame + " " + this.text

            //  Only clear the line if necessary
            if (!new RegExp(this.text + "$").test(str)) {
                this.write(clear.entireLine)
            }

            //  Re-render the spinner and text every interval
            this.write(cursor.left(999))     //  Move cursor all the way to the left
            this.write(str)

            //  Increment the frame counter
            this.frame = (this.frame + 1) % this.spinner.frames.length
        }, this.spinner.interval)

    }

    /** Stop the spinner */
    stop(text?: string) {
        //  Stop the timer
        if (this.timer) { clearInterval(this.timer) }
        this.timer = null

        this.write(clear.entireLine + '\n')

        //  Show cursor
        this.write(cursor.show)

        //  If text is passed, write text in place of spinner
        if (text) { this.write(text) }

    }

}

//  ------------------
export default Spinner
//  ------------------