//  Library
import spinners from './spinners.ts'
import clear from '../../ansi/clear.ts'

//  =======
//  SPINNER
//  =======

type SpinnerProps = {
    text: string
}

class Spinner {

    private text: string
    private timer: number | null = null
    private isRunning = false
    private frame = 0

    constructor({ text }: SpinnerProps) {
        this.text = text || ""
    }

    start(text: string) {
        this.text = text
        this.timer = setInterval(() => {
            clear.entireLine
            Deno.stdout.write(new TextEncoder().encode(spinners.windows.frames[this.frame] + " " + this.text))
            this.frame = (this.frame + 1) % spinners.windows.frames.length
        }, spinners.windows.interval)
    }

    stop(text?: string) {
        if (this.timer) { clearInterval(this.timer) }
        Deno.stdout.write(new TextEncoder().encode(clear.entireLine + '\n'))
        if (text) { Deno.stdout.write(new TextEncoder().encode(text)) }
        this.timer = null
    }
}

//  ------------------
export default Spinner
//  ------------------