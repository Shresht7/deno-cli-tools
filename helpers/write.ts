//  ======
//  WRITER
//  ======

const writer = (encoder = new TextEncoder()) => {
    return (text: string) => Deno.stdout.write(encoder.encode(text))
}

/** Write text to stdout */
const write = writer()

//  ----------------
export default write
//  ----------------