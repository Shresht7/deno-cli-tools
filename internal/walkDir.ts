//  Library
import { join } from '../dev-deps.ts'

/** Walk the directory */
export async function walkDir(path: string, callback: (file: string) => void) {
    for await (const dir of Deno.readDir(path)) {
        const target = join(path, dir.name)
        if (dir.isDirectory) {
            await walkDir(target, callback)
        } else if (dir.isFile) {
            callback(target)
        }
    }
}
