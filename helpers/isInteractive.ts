/** Checks if the stream is a interactive tty */
export function isInteractive(stream = Deno.stdout) {
    return Boolean(
        stream
        && Deno.isatty(stream.rid)
        && Deno.env.get('TERM') !== 'dumb'
        && !Deno.env.get('CI')
    )
}
