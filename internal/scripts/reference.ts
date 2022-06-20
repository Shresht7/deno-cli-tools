//  Library
import { walkDir } from '../walkDir.ts'

// Walk the directory and run reference generators
await walkDir(Deno.cwd(), async (file) => {
    if (file.endsWith('.reference.ts')) {
        await import("file://" + file)
    }
})
