/** Checks if the stream is a interactive tty */
export function isInteractive(stream = Deno.stdout) {
    return Boolean(
        stream
        && Deno.stdin.isTerminal()
        && Deno.env.get('TERM') !== 'dumb'
        && !Deno.env.get('CI')
    )
}
