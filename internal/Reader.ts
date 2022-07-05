//  ======
//  READER
//  ======

export class Reader {

    private byteArray: Uint8Array = new Uint8Array()

    constructor(
        private reader: Deno.Reader = Deno.stdin,
        private decoder: TextDecoder = new TextDecoder()
    ) { }

    read = async (len: number): Promise<string> => {
        this.byteArray = new Uint8Array(len)
        await this.reader.read(this.byteArray)
        return this.decoder.decode(this.byteArray)
    }

}

export const { read } = new Reader()
