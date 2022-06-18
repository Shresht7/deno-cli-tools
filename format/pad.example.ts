//  Library
import { pad } from './pad.ts'
import { h } from '../internal/styles.ts'

h('Padding')

console.log(pad(5)('deno-cli-tools'))
console.log(pad(5)('deno-cli-tools', '-'))
console.log(pad.left(10)('deno-cli-tools', '-'))
console.log(pad.right(10)('deno-cli-tools', '-'))
