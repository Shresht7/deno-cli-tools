//  Library
import { walkDir } from '../walkDir.ts'

// Walk the directory and print out all examples
await walkDir(Deno.cwd(), async (file) => {
    if (file.endsWith('.example.ts')) {
        await import("file://" + file)
    }
})
