//  Library
import Component from '../mod.ts'
import clear from '../../ansi/clear.ts'
import cursor from '../../ansi/cursor.ts'
import { spinners, SpinnerType, SpinnerInterface } from './spinners.ts'

//  Type Definitions
import { UpdateStringCallback } from '../types.ts'

//  =======
//  SPINNER
//  =======

interface SpinnerProps {
    text?: string,
    prefixText?: string,
    type?: SpinnerType,
    customSpinner?: SpinnerInterface,
    formatter?: UpdateStringCallback,
    writer?: Deno.Writer
}

class Spinner extends Component {

    /** Text to display next to the spinner */
    private text: string

    /** Text to display before the spinner */
    private prefixText: string

    /** Spinner type */
    private spinner: SpinnerInterface

    /** Spinner formatter */
    private formatter: UpdateStringCallback | undefined

    /** Reference to the currently active timer */
    private timer: number | null = null

    /** The current frame */
    private frame = 0

    constructor({
        text = '',
        prefixText = '',
        type = 'windows',
        customSpinner = { interval: 80, frames: [] },
        formatter,
        writer
    }: SpinnerProps = {}) {
        super({ writer })

        this.text = text
        this.prefixText = prefixText

        this.spinner = type === 'custom'
            ? customSpinner
            : spinners[type]

        this.formatter = formatter
    }

    /** Set the text */
    setText(text: string | UpdateStringCallback) {
        text = typeof text === 'string' ? text : text(this.text)
        this.text = text
    }

    /** Set the prefixText */
    setPrefixText(text: string | UpdateStringCallback) {
        text = typeof text === 'string' ? text : text(this.prefixText)
        this.prefixText = text
    }

    /** Set new spinner */
    setSpinner(type: SpinnerType, formatter?: UpdateStringCallback) {
        this.spinner = spinners[type]
        this.formatter = formatter
    }

    /** Update text and spinner */
    update(text: (string | ((text: string) => string)), type: SpinnerType, formatter?: (text: string) => string) {
        this.setText(text)
        this.setSpinner(type, formatter)
    }

    /** Returns whether timer is running */
    isRunning = () => this.timer != null

    /** Starts the spinner */
    start({ text, prefixText }: Pick<SpinnerProps, 'text' | 'prefixText'> = {}) {

        if (this.timer) { throw new Error("Spinner already active") }

        //  If text is passed, update the spinner text
        if (text) { this.setText(text) }
        if (prefixText) { this.setPrefixText(prefixText) }

        //  Hide cursor
        this.write(cursor.hide)

        //  Start the timer and store it's reference
        this.timer = setInterval(() => {
            //  Format display string
            let frame = this.spinner.frames[this.frame]
            frame = this.formatter ? this.formatter(frame) : frame
            const str = this.prefixText + " " + frame + " " + this.text


            this.write(clear.lineFromCursor)

            //  Re-render the spinner and text every interval
            this.write(cursor.left(999))     //  Move cursor all the way to the left
            this.write(str)
            this.render()

            //  Increment the frame counter
            this.frame = (this.frame + 1) % this.spinner.frames.length
        }, this.spinner.interval)

        this.render()

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