/**
 * ANSI Code Regular Expression
 * 
 * {@link https://github.com/chalk/ansi-regex}
*/
export const regex = new RegExp([
    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
    '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))'
].join('|'),
    'g'
)

/** Strip ANSI codes from string */
export const strip = (s: string) => s.replace(regex, '')