//  Library
import cursor from '../../ansi/cursor.ts'
import clear from '../../ansi/clear.ts'
import { ANSIColor, ansiColor } from '../../ansi/colors.ts'

//  Helpers
import write from '../../helpers/write.ts'

//  =============
//  PROGRESS BARS
//  =============

/** ProgressBar Constructor Properties */
type ProgressBarProps = {
    progressCharacter?: string,
    remainingCharacter?: string,
    textSeparator?: string,
    caps?: [string, string],
    total?: number,
    color?: ANSIColor,
    writer?: Deno.Writer,
}

class ProgressBar {

    /** Character to represent progress */
    private progressCharacter = '█'
    /** Character to represent remaining progress */
    private remainingCharacter = '░'
    /** Separates progress-bar and text */
    private textSeparator = " - "

    private color: ANSIColor | undefined

    /** ProgressBar end caps */
    private caps: [string, string] = ['|', '|']

    /** Current level of progress */
    public value = 0
    /** Total progress level */
    public total = 20

    /** Progress-bar is running */
    private isRunning = false

    /** String to write to the console */
    private str = ""

    /** Deno Writer */
    private writer: Deno.Writer = Deno.stdout

    constructor(properties: ProgressBarProps = {}) {
        this.progressCharacter = properties.progressCharacter || this.progressCharacter
        this.remainingCharacter = properties.remainingCharacter || this.remainingCharacter
        this.textSeparator = properties.textSeparator || this.textSeparator
        this.caps = properties.caps || this.caps
        this.total = properties.total || this.total
        this.writer = properties.writer || this.writer
        this.color = properties.color
    }

    /** Appends the text to the tracked string */
    private write(text: string) {
        this.str += text
    }

    /** Writes to this.writer */
    private flush() {
        write(this.str, this.writer)
        this.str = ""
    }

    /** Start the progress-bar */
    start(text?: string) {

        //  Throw error if the progress-bar is already active
        if (this.isRunning) { throw new Error("ProgressBar already active") }

        //  Hide cursor
        write(cursor.hide)

        //  Write progress-bar
        write(this.caps[0] + this.remainingCharacter.repeat(this.total) + this.caps[1])


        //  Write progress text
        if (text) {
            this.write(this.textSeparator)
            this.write(text)
        }

        //  Push to this.writer
        this.flush()
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
            this.write(this.textSeparator)
            this.write(text)
        }

        //  Push to this.writer
        this.flush()

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
        this.flush()

    }

    get percentage() {
        return (this.value / this.total) * 100
    }
}

//  ----------------------
export default ProgressBar
//  ----------------------