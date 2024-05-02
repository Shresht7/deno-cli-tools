import { box } from './mod.ts'
import boxes from './boxes.json' with { type: 'json' }

console.log(box('Contents that rest on the left side', {
    title: 'Title Left',
    type: 'double',
    alignment: 'left'
}))

console.log(box('Contents that rest on the center', {
    title: 'Title Center',
    type: 'double',
    alignment: 'center'
}))

console.log(box('Contents that rest on the right side', {
    title: 'Title Right',
    type: 'double',
    alignment: 'right'
}))


for (const b of Object.keys(boxes)) {
    console.log(box(b, {
        type: b as keyof typeof boxes,
        alignment: 'center'
    }))
}
