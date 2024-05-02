// Library
import { construct, disableANSICodes, wrap } from './codes.ts';
import { assertEquals } from "@std/assert";

// Test for wrap function
Deno.test('wrap function should wrap the string with the provided ANSI code', () => {
    const str = 'Hello, world!';
    const code = construct(31, 39);
    const expected = '\u001b[31mHello, world!\u001b[39m';
    const result = wrap(str, code);
    assertEquals(result, expected);
});

// Test for wrap function when isEnabled is false
Deno.test('wrap function should return the string as it is when isEnabled is false', () => {
    const str = 'Hello, world!';
    const code = construct(31, 39);
    disableANSICodes();
    const expected = 'Hello, world!';
    const result = wrap(str, code);
    assertEquals(result, expected);
});
