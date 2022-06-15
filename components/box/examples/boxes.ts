import { box } from '../mod.ts'

console.log(box('Contents Left', {
    title: 'Title Left',
    type: 'double',
    alignment: 'left'
}))

console.log(box('Contents Center', {
    title: 'Title Center',
    type: 'double',
    alignment: 'center'
}))

console.log(box('Contents Right', {
    title: 'Title Right',
    type: 'double',
    alignment: 'right'
}))
