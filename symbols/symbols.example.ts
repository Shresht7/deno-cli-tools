import { symbol, status } from "./mod.ts"

console.log(symbol.twoThirds, symbol.almostEqual, "0.67")   //  ⅔ ≈ 0.67
console.log(symbol.arrowDown, symbol.arrowUp, symbol.arrowLeft, symbol.arrowRight)  //  ↓ ↑ ← →
console.log(status.info, status.increase, "Increase")   //  ⓘ ▲ Increase
console.log(status.warning, status.decrease, "Decrease")    //  ⚠️ ▼ Decrease
