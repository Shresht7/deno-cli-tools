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
    caps?: [string, string]
    writer?: Deno.Writer
}

//  ? extend EventTarget

class ProgressBar {

    /** Character to represent progress */
    private character = '#'

    private caps: [string, string] = ['{{', '}}']

    /** Current level of progress */
    private progress = 0
    /** Total progress level */
    private total = 10

    /** Progress-bar is running */
    private isRunning = false

    /** Output */
    private writer: Deno.Writer = Deno.stdout

    constructor({ character, writer, caps }: ProgressBarProps = {}) {
        this.character = character || this.character
        this.caps = caps || this.caps
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

        //  Initialize array
        this.write(this.caps[0] + " ".repeat(this.total) + this.caps[1])
        this.write(cursor.left(this.total + this.caps[1].length - 1))

    }

    /** Update progress */
    updateProgress(n: number) {
        if (n > this.total) {
            this.stop()
            return true
        }

        if (n > this.progress) {
            this.write(this.character.repeat(n - this.progress))
        } else {
            this.write(cursor.left(this.character.repeat(this.progress).length))
            // this.write(clear.entireLine)
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