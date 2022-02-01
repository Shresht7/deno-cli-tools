//  ======
//  WRITER
//  ======

const writer = (encoder = new TextEncoder()) => {
    return (text: string, writer: Deno.Writer = Deno.stdout) => writer.write(encoder.encode(text))
}

/**
 * Write text to Deno.Writer
 * @param text String to write
 * @param writer Output resource. default: Deno.stdout
 */
const write = writer()

//  ----------------
export default write
//  ----------------