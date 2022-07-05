//  ======
//  WRITER
//  ======

export class Writer {


    constructor(
        private writer: Deno.Writer = Deno.stdout,
        private encoder: TextEncoder = new TextEncoder()
    ) { }

    write = (text: string): Promise<number> => {
        return this.writer.write(this.encoder.encode(text))
    }

}

export const { write } = new Writer()
