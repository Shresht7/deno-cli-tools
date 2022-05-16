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
    private progressCharacter = '#'

    /** Character to represent remaining progress */
    private remainingCharacter = ' '

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

    constructor({ progressCharacter, remainingCharacter, writer, caps, total }: ProgressBarProps = {}) {
        this.progressCharacter = progressCharacter || this.progressCharacter
        this.remainingCharacter = remainingCharacter || this.remainingCharacter
        this.caps = caps || this.caps
        this.total = total || this.total
        this.writer = writer || this.writer
    }

    /** Writes to this.writer */
    private write(text: string) {
        write(text, this.writer)
    }

    /** Start the progress-bar */
    start() {
        if (this.isRunning) { throw new Error("ProgressBar already active") }

        //  Hide cursor
        write(cursor.hide)

        //  Write progress-bar
        write(this.caps[0] + this.remainingCharacter.repeat(this.total) + this.caps[1])

        //  Move cursor back for next update
        write(cursor.left(this.total + this.caps[1].length - 1))
    }

    /** Update progress */
    updateProgress(n: number) {

        //  Stop when progress completes
        if (n > this.total) {
            this.stop()
            return true
        }

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

    }

    /** Stop the spinner */
    stop(text?: string) {
        this.write(clear.entireLine)
        this.write(cursor.toColumn(0))
        //  Show cursor
        this.write(cursor.show)
        //  If text is passed, write text in place of spinner
        if (text) { this.write(text) }
    }
}

//  ----------------------
export default ProgressBar
//  ----------------------

const progress = new ProgressBar({
    progressCharacter: "x",
    remainingCharacter: "_"
})

progress.start()

let count = 0
const interval = setInterval(() => {
    progress.updateProgress(count++)
    if (count > 10) {
        clearInterval(interval)
        progress.stop('Done')
    }
}, 1000)
