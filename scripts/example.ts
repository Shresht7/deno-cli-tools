import { join } from "https://deno.land/std@0.144.0/path/mod.ts"

/** Walk the directory */
async function walkDir(path: string, callback: (file: string) => void) {
    for await (const dir of Deno.readDir(path)) {
        const target = join(path, dir.name)
        if (dir.isDirectory) {
            await walkDir(target, callback)
        } else if (dir.isFile) {
            callback(target)
        }
    }
}

// Walk the directory and print out all examples
await walkDir(Deno.cwd(), async (file) => {
    if (file.endsWith('.example.ts')) {
        await import("file://" + file)
    }
})
