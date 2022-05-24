import { assertEquals } from 'https://deno.land/std@0.140.0/testing/asserts.ts'
import { regex } from '../../ansi/regex.ts'

const check = (s: string, t: string[]) => assertEquals(s.match(regex), t)

Deno.test("ANSI Regular Expression", async (s) => {

    await s.step("Clear", async (t) => {
        await t.step("screen", () => check('\u001b[J', ['\u001b[J']))
        await t.step("cursorAndBelow", () => check('\u001b[0J', ['\u001b[0J']))
        await t.step("cursorAndAbove", () => check('\u001b[1J', ['\u001b[1J']))
        await t.step("entireScreen", () => check('\u001b[2J', ['\u001b[2J']))
        await t.step("line", () => check('\u001b[K', ['\u001b[K']))
        await t.step("lineFromCursor", () => check('\u001b[0K', ['\u001b[0K']))
        await t.step("lineToCursor", () => check('\u001b[1K', ['\u001b[1K']))
        await t.step("entireLine", () => check('\u001b[2K', ['\u001b[2K']))
    })

    await s.step("Codes", async (t) => {
        await t.step("RESET", () => check('\u001b[0m', ['\u001b[0m']))
    })

    await s.step("Color", async (t) => {
        await t.step("black", () => check('\u001b[30mBlack\u001b[39m', ['\u001b[30m', '\u001b[39m']))
        await t.step("red", () => check('\u001b[31mRed\u001b[39m', ['\u001b[31m', '\u001b[39m']))
        await t.step("green", () => check('\u001b[32mGreen\u001b[39m', ['\u001b[32m', '\u001b[39m']))
        await t.step("yellow", () => check('\u001b[33mYellow\u001b[39m', ['\u001b[33m', '\u001b[39m']))
        await t.step("blue", () => check('\u001b[34mBlue\u001b[39m', ['\u001b[34m', '\u001b[39m']))
        await t.step("magenta", () => check('\u001b[35mMagenta\u001b[39m', ['\u001b[35m', '\u001b[39m']))
        await t.step("cyan", () => check('\u001b[36mCyan\u001b[39m', ['\u001b[36m', '\u001b[39m']))
        await t.step("white", () => check('\u001b[37mWhite\u001b[39m', ['\u001b[37m', '\u001b[39m']))

        await t.step("bgBlack", () => check('\u001b[40mbgBlack\u001b[49m', ['\u001b[40m', '\u001b[49m']))
        await t.step("brightBlack", () => check('\u001b[90mBrightBlack\u001b[99m', ['\u001b[90m', '\u001b[99m']))
        await t.step("bgBrightBlack", () => check('\u001b[100mbgBrightBlack\u001b[109m', ['\u001b[100m', '\u001b[109m']))

        await t.step("RGB", () => check('\u001b[38;2;127;127;127mRGB\u001b[0m', ['\u001b[38;2;127;127;127m', '\u001b[0m']))
    })

    await s.step("Cursor", async (t) => {
        await t.step("toHome", () => check('\u001b[H', ['\u001b[H']))
        await t.step("toPos", () => check('\u001b[5;12H', ['\u001b[5;12H']))
        await t.step("up", () => check('\u001b[2A', ['\u001b[2A']))
        await t.step("down", () => check('\u001b[2B', ['\u001b[2B']))
        await t.step("right", () => check('\u001b[2C', ['\u001b[2C']))
        await t.step("left", () => check('\u001b[2D', ['\u001b[2D']))
        await t.step("toNextLine", () => check('\u001b[2E', ['\u001b[2E']))
        await t.step("toPrevLine", () => check('\u001b[2F', ['\u001b[2F']))
        await t.step("toColumn", () => check('\u001b[2G', ['\u001b[2G']))
        await t.step("requestPosition", () => check('\u001b[6n', ['\u001b[6n']))
        await t.step("show", () => check('\u001b[?25h', ['\u001b[?25h']))
        await t.step("hide", () => check('\u001b[?25l', ['\u001b[?25l']))
    })

    await s.step("Miscellaneous", async (t) => {
        await t.step("save screen", () => check('\u001b[?47h', ['\u001b[?47h']))
        await t.step("restore screen", () => check('\u001b[?47l', ['\u001b[?47l']))
        await t.step("alt buffer", () => check('\u001b[?1049h', ['\u001b[?1049h']))
        await t.step("alt buffer", () => check('\u001b[?1049l', ['\u001b[?1049l']))
    })

    await s.step("Styles", async (t) => {
        await t.step("bold", () => check('\u001b[1mBold\u001b[22m', ['\u001b[1m', '\u001b[22m']))
        await t.step("faint", () => check('\u001b[2mFaint\u001b[22m', ['\u001b[2m', '\u001b[22m']))
        await t.step("italic", () => check('\u001b[3mItalic\u001b[22m', ['\u001b[3m', '\u001b[22m']))
        await t.step("underline", () => check('\u001b[4mUnderline\u001b[22m', ['\u001b[4m', '\u001b[22m']))
        await t.step("blinking", () => check('\u001b[5mBlinking\u001b[22m', ['\u001b[5m', '\u001b[22m']))
        await t.step("inverse", () => check('\u001b[6mInverse\u001b[22m', ['\u001b[6m', '\u001b[22m']))
        await t.step("hidden", () => check('\u001b[7mHidden\u001b[22m', ['\u001b[7m', '\u001b[22m']))
        await t.step("strikethrough", () => check('\u001b[8mStrikethrough\u001b[22m', ['\u001b[8m', '\u001b[22m']))
    })

})