import { symbol, status } from './mod.ts'
import { strip } from '../ansi/regex.ts'

const md = `
# Symbols Reference

## \`status\`

[Go to Source](./status.ts)

| Symbol | Name |
| -----: | :--- |
${Object.entries(status)
        .sort((a, b) => a[0] < b[0] ? -1 : 1)   //  Sort keys alphabetically
        .map(([name, s]) => `| ${strip(s)} | \`${name}\` |`)    //  Map to markdown table
        .join('\n')
    }

## \`symbols\`

[Go to Source](./symbols.ts)

| Symbol | Name |
| -----: | :--- |
${Object.entries(symbol)
        .sort((a, b) => a[0] < b[0] ? -1 : 1)   //  Sort keys alphabetically
        .map(([name, s]) => `| ${s} | \`${name}\` |`)   //  Map to markdown table
        .join('\n')
    }

`

Deno.writeTextFileSync('symbols/reference.md', md)
