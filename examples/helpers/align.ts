import { align } from '../../helpers/align.ts'

const text = `
deno-cli-tools

deno-cli-tools is a collection of utilities
to aid in development of command-line-interfaces
`

console.log(align(text, { align: 'left' }))
console.log(align(text))
console.log(align.right(text))