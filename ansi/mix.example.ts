//  Library
import { mix } from './mix.ts'
import { h } from '../internal/styles.ts'

h('Mixing Styles and Colors')

console.log(mix('bold', 'white', 'magenta')('  Mixology 101  '))
