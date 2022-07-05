//  Library
import { Writer } from '../internal/mod.ts'

type UpdateStringFn = (s: string) => string

interface ConstructorProps {
    contents?: string,
    writer?: Deno.Writer
}

class Component {

    /** Text contents of the component */
    private contents = ""

    /** Writer to use when writing contents */
    private writer: Writer = new Writer(Deno.stdout)

    constructor({ contents, writer }: ConstructorProps = {}) {
        this.contents = contents || this.contents
        this.writer = writer ? new Writer(writer) : this.writer
    }

    /** Write the given text to contents */
    protected write(text: string) {
        this.contents += text
    }

    /** Update the component text contents */
    protected _update(contents: string | UpdateStringFn) {
        this.contents = typeof contents === 'string'
            ? contents
            : contents(this.contents)
    }

    /** Write the contents to Writer */
    protected render() {
        this.writer.write(this.contents)
    }

}

//  --------------------
export default Component
//  --------------------
