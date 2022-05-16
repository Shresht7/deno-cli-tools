//  Library
import cursor from '../../ansi/cursor.ts'
import clear from '../../ansi/clear.ts'

//  Helpers
import write from '../../helpers/write.ts'

//  =============
//  PROGRESS BARS
//  =============

/** ProgressBar Constructor Properties */
type ProgressBarProps = {
    progressCharacter?: string,
    remainingCharacter?: string,
    caps?: [string, string],
    writer?: Deno.Writer,
    total?: number,
}

class ProgressBar {

    /** Character to represent progress */
    private progressCharacter = '█'
    /** Character to represent remaining progress */
    private remainingCharacter = '░'
    /** Separates progress-bar and text */
    private textSeparator = " - "

    /** ProgressBar end caps */
    private caps: [string, string] = ['{{', '}}']

    /** Current level of progress */
    private progress = 0
    /** Total progress level */
    private total = 10

    /** Progress-bar is running */
    private isRunning = false

    /** Output */
    private writer: Deno.Writer = Deno.stdout

    /** String to write to the console */
    private str = ""

    constructor({ progressCharacter, remainingCharacter, writer, caps, total }: ProgressBarProps = {}) {
        this.progressCharacter = progressCharacter || this.progressCharacter
        this.remainingCharacter = remainingCharacter || this.remainingCharacter
        this.caps = caps || this.caps
        this.total = total || this.total
        this.writer = writer || this.writer
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
    updateProgress(n: number, text?: string) {

        //  Stop when progress completes
        if (n > this.total) {
            this.stop()
            return true
        }

        //  Move back to the correct position
        this.write(cursor.toColumn(this.caps[0].length + n))

        //  Update progress-bar length
        if (n > this.progress) {
            this.write(this.progressCharacter.repeat(n - this.progress))
        } else {
            this.write(cursor.left(this.progressCharacter.repeat(this.progress).length))
            // this.write(clear.entireLine)
            this.write(this.progressCharacter.repeat(n))
        }

        //  Record current progress
        this.progress = n

        if (text) {
            this.write(cursor.toColumn(this.caps[0].length + this.total + this.caps[1].length + 1))
            this.write(this.textSeparator)
            this.write(text)
        }

        //  Push to this.writer
        this.flush()

    }

    /** Stop the spinner */
    stop(text?: string) {
        this.write(clear.entireLine)
        this.write(cursor.toColumn(0))
        //  Show cursor
        this.write(cursor.show)
        //  If text is passed, write text in place of spinner
        if (text) { this.write(text + "\n") }

        this.flush()

    }
}

//  ----------------------
export default ProgressBar
//  ----------------------

const progress = new ProgressBar({ total: 50 })

progress.start("Counting")

let count = 0
const interval = setInterval(() => {
    progress.updateProgress(count++, `Counting ${count}`)
    if (count > 50) {
        clearInterval(interval)
        progress.stop('Done')
    }
}, 500)
