//  Library
import Component from '../mod.ts'
import { spinners, SpinnerType, SpinnerInterface } from './spinners.ts'

//  Helper Functions
import clear from '../../ansi/clear.ts'
import cursor from '../../ansi/cursor.ts'

//  =======
//  SPINNER
//  =======

type UpdateStringCallback = (s: string) => string

interface SpinnerProps {
    text?: string,
    prefixText?: string,
    separator?: string,
    spinner?: SpinnerType | SpinnerInterface,
    formatter?: UpdateStringCallback,
    writer?: Deno.Writer
}

class Spinner extends Component {

    /** Text to display next to the spinner */
    private text: string

    /** Text to display before the spinner */
    private prefixText: string

    /** String that separates text and spinner */
    private separator: string

    /** Spinner type */
    private spinner: SpinnerInterface = spinners['windows']

    /** Callback function to modify the spinner frames */
    private formatter: UpdateStringCallback | undefined

    /** Reference to the currently active timer */
    private timer: number | null = null

    /** The current frame */
    private frame = 0

    constructor({
        text = '',
        prefixText = '',
        separator = ' ',
        spinner = 'windows',
        formatter,
        writer
    }: SpinnerProps = {}) {

        super({ writer })

        this.text = text
        this.prefixText = prefixText
        this.separator = separator

        this.setSpinner(spinner, formatter)

    }

    /** Set the text following the spinner */
    setText(text: string | UpdateStringCallback) {
        this.text = typeof text === 'string' ? text : text(this.text)
        return this
    }

    /** Set the text preceding the spinner */
    setPrefixText(text: string | UpdateStringCallback) {
        this.prefixText = typeof text === 'string' ? text : text(this.prefixText)
        return this
    }

    /** Set new spinner */
    setSpinner(spinner: SpinnerType | SpinnerInterface, formatter: UpdateStringCallback | undefined = this.formatter) {
        this.spinner = typeof spinner === 'string'
            ? spinners[spinner]
            : spinner
        this.formatter = formatter
        return this
    }

    /** Returns whether timer is running */
    isRunning = () => this.timer != null

    /** Starts the spinner */
    start({ text, prefixText, spinner, formatter }: Omit<SpinnerProps, 'writer'> = {}) {

        if (this.isRunning()) { return }

        //  If text is passed, update the spinner text
        if (text) { this.setText(text) }
        if (prefixText) { this.setPrefixText(prefixText) }
        if (spinner) { this.setSpinner(spinner, formatter) }

        //  Hide cursor
        this.write(cursor.hide)

        //  Start the timer and store it's reference
        this.timer = setInterval(() => {
            //  Clear everything on this line
            this.write(clear.entireLine)

            //  Format display string
            let frame = this.spinner.frames[this.frame]
            frame = this.formatter ? this.formatter(frame) : frame
            const str = this.prefixText + this.separator + frame + this.separator + this.text

            //  Re-render the spinner and text every interval
            this.write(cursor.toColumn(0))     //  Move cursor all the way to the left
            this.write(str)
            this.render()

            //  Increment the frame counter
            this.frame = (this.frame + 1) % this.spinner.frames.length
        }, this.spinner.interval)

        //  Render the initial state
        this.render()

    }

    /** Stop the spinner */
    stop(text?: string) {

        //  Stop the timer
        if (this.timer) { clearInterval(this.timer) }
        this.timer = null

        //  Clear the entire line
        this.write(clear.entireLine)
        this.write(cursor.toColumn(0))

        //  Show cursor
        this.write(cursor.show)

        //  If text is passed, write text in place of spinner
        if (text) { this.write(text) }

        //  Rerender
        this.render()

    }

}

//  ------------------
export default Spinner
//  ------------------