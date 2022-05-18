//  Library
import Component from '../mod.ts'

//  Helpers
import cursor from '../../ansi/cursor.ts'
import clear from '../../ansi/clear.ts'
import { ANSIColor, ansiColor } from '../../ansi/colors.ts'

//  =============
//  PROGRESS BARS
//  =============

/** ProgressBar Constructor Properties */
type ProgressBarProps = {
    progressCharacter?: string,
    remainingCharacter?: string,
    separator?: string,
    caps?: [string, string],
    total?: number,
    color?: ANSIColor,
    writer?: Deno.Writer,
}

class ProgressBar extends Component {

    /** Character to represent progress */
    private progressCharacter = '█'
    /** Character to represent remaining progress */
    private remainingCharacter = '░'
    /** Separates progress-bar and text */
    private separator = " - "

    private color: ANSIColor | undefined

    /** ProgressBar end caps */
    private caps: [string, string] = ['|', '|']

    /** Current level of progress */
    public value = 0
    /** Total progress level */
    public total = 20

    /** Progress in percentage */
    get percentage() {
        return (this.value / this.total) * 100
    }

    /** Progress-bar is running */
    private isRunning = false

    constructor(properties: ProgressBarProps = {}) {
        super({ writer: properties.writer })
        this.progressCharacter = properties.progressCharacter || this.progressCharacter
        this.remainingCharacter = properties.remainingCharacter || this.remainingCharacter
        this.separator = properties.separator || this.separator
        this.caps = properties.caps || this.caps
        this.total = properties.total || this.total
        this.color = properties.color
    }

    /** Start the progress-bar */
    start(text?: string) {

        //  Throw error if the progress-bar is already active
        if (this.isRunning) { throw new Error("ProgressBar already active") }

        //  Hide cursor
        this.write(cursor.hide)

        //  Write empty progress-bar
        this.write(this.caps[0] + this.remainingCharacter.repeat(this.total) + this.caps[1])


        //  Write progress text
        if (text) {
            this.write(this.separator)
            this.write(text)
        }

        //  Push to this.writer
        this.render()

    }

    /** Update progress */
    updateProgress(n: number, text: string = Math.floor(this.percentage) + "%") {

        //  Stop when progress completes
        if (n > this.total) {
            this.stop(text)
            return true
        }

        //  Move back to the correct position
        this.write(cursor.toColumn(this.caps[0].length + n))

        //  Update progress-bar length
        let pg = ""
        if (n > this.value) {
            pg += (this.progressCharacter.repeat(n - this.value))
        } else {
            pg += (cursor.left(this.progressCharacter.repeat(this.value).length))
            pg += (this.progressCharacter.repeat(n))
        }
        if (this.color) {
            pg = ansiColor(this.color)(pg)
        }
        this.write(pg)

        //  Record current progress
        this.value = n

        //  Write progress text
        if (text) {
            this.write(cursor.toColumn(this.caps[0].length + this.total + this.caps[1].length + 1))
            this.write(this.separator)
            this.write(text)
        }

        //  Clear anything beyond this point
        this.write(clear.lineFromCursor)

        //  Push to this.writer
        this.render()

    }

    /** Stop the spinner */
    stop(text?: string, clearLine = true) {

        if (clearLine) {
            //  Clear the entire line
            this.write(clear.entireLine)
            this.write(cursor.toColumn(0))
        }

        //  Show cursor
        this.write(cursor.show)

        //  If text is passed, write text in place of spinner
        if (text) { this.write(text + "\n") }

        //  Push to this.writer
        this.render()

    }

}

//  ----------------------
export default ProgressBar
//  ----------------------