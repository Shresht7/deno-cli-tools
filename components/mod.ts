//  Library
import write from '../helpers/write.ts'

//  Type Definitions
import { UpdateStringCallback } from './types.ts'

interface ConstructorProps {
    contents?: string,
    writer?: Deno.Writer
}

class Component {

    /** Text contents of the component */
    private contents = ""

    /** Writer to use when writing contents */
    private writer: Deno.Writer = Deno.stdout

    constructor({ contents, writer }: ConstructorProps = {}) {
        this.contents = contents || this.contents
        this.writer = writer || this.writer
    }

    /** Write the given text to contents */
    protected write(text: string) {
        this.contents += text
    }

    /** Update the component text contents */
    protected _update(contents: string | UpdateStringCallback) {
        this.contents = typeof contents === 'string'
            ? contents
            : contents(this.contents)
    }

    /** Write the contents to Writer */
    protected render() {
        write(this.contents, this.writer)
    }

}

//  --------------------
export default Component
//  --------------------