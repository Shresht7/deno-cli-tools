# Symbols

Unicode symbols for the terminal.

```
✔ ℹ ⚠ ✖ ☰ ↑ ↓ ← → ♪ ♫
```

> Uses a fallback set of characters on terminals that do not support unicode.

## Usage

```ts
import { symbol, status } from 'https://.../symbols/mod.ts'

console.log(symbol.warning + " Are you sure?")
console.log(status.success, "Done")
```

## Links

Inspired by and heavily borrows from the following projects:

- https://github.com/sindresorhus/figures
