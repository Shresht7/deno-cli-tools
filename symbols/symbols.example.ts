//  Library
import { symbol, status } from "./mod.ts"
import { h, h2 } from '../internal/styles.ts'

h('Symbols')

let str = ''
let count = 0
const rowCount = 21
for (const entry of Object.values(symbol)) {
    str += entry + ' '
    count++
    if (count % rowCount === 0) {
        str += '\n'
    }
}
console.log(str)

h('Status')

for (const [name, s] of Object.entries(status)) {
    console.log(s, name)
}

h2('Examples')

console.log(symbol.twoThirds, symbol.almostEqual, "0.67")   //  ⅔ ≈ 0.67
console.log(symbol.arrowDown, symbol.arrowUp, symbol.arrowLeft, symbol.arrowRight)  //  ↓ ↑ ← →
console.log(status.info, status.increase, "Increase")   //  ⓘ ▲ Increase
console.log(status.warn, status.decrease, "Decrease")    //  ⚠️ ▼ Decrease

