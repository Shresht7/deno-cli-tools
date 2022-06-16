/**
 * Detect whether the terminal supports Unicode.
 * @link https://github.com/sindresorhus/is-unicode-supported/blob/main/index.js
*/
export function isUnicodeSupported(platform = Deno.build.os) {
    if (platform !== "windows") {
        return Deno.env.get("TERM") !== "linux"  //  Linux terminal does not support unicode
    }

    return (
        Boolean(Deno.env.get("CI")) ||
        Boolean(Deno.env.get("WT_SESSION")) || // Windows Terminal
        Deno.env.get("ConEmuTask") === "{cmd::Cmder}" || // ConEmu and cmder
        Deno.env.get("TERM_PROGRAM") === "vscode" ||
        Deno.env.get("TERM") === "xterm-256color" ||
        Deno.env.get("TERM") === "alacritty"
    )
}
