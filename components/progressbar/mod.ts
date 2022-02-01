//  Library
import clear from '../../ansi/clear.ts'
import cursor from '../../ansi/cursor.ts'

//  Helpers
import write from '../../helpers/write.ts'

//  =============
//  PROGRESS BARS
//  =============

type ProgressBarProps = {
    character?: string,
    writer?: Deno.Writer
}

class ProgressBar {

    /** Character to represent progress */
    private character = '#'

    /** Current level of progress */
    private progress = 0
    /** Total progress level */
    private total = 100

    /** Progress-bar is running */
    private isRunning = false

    /** Output */
    private writer: Deno.Writer = Deno.stdout

    constructor({ character, writer }: ProgressBarProps = {}) {
        this.character = character || this.character
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
        this.write(cursor.hide)

    }

    /** Update progress */
    updateProgress(n: number) {
        if (n > this.progress) {
            this.write(this.character.repeat(n - this.progress))
        } else {
            this.write(cursor.left(this.character.repeat(this.progress).length))
            this.write(clear.entireLine)
            this.write(this.character.repeat(n))
        }
        this.progress = n
    }

    /** Stop the spinner */
    stop(text?: string) {
        this.write(clear.entireLine + '\n')
        //  Show cursor
        this.write(cursor.show)
        //  If text is passed, write text in place of spinner
        if (text) { this.write(text) }
    }
}

//  ----------------------
export default ProgressBar
//  ----------------------