/** Add padding around text */
export const pad = (n = 1) => (str: string, char = ' ') => char.repeat(n) + str + char.repeat(n)
pad.left = (n = 1) => (str: string, char = ' ') => char.repeat(n) + str
pad.right = (n = 1) => (str: string, char = ' ') => str + char.repeat(n)
