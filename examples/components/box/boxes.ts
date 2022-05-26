import { box } from '../../../components/box/mod.ts'

console.log(box({
    title: 'Title Left',
    contents: 'Contents Left',
    type: 'double',
    alignment: 'left'
}))

console.log(box({
    title: 'Title Center',
    contents: 'Contents Center',
    type: 'double',
    alignment: 'center'
}))

console.log(box({
    title: 'Title Right',
    contents: 'Contents Right',
    type: 'double',
    alignment: 'right'
}))