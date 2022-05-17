# deno-cli-tools

---

<br />
<h2 align='center'>🚧 Work In Progress 🚧</h2>
<br />

Command-line tools and utilities for Deno 🦕 projects


## Usage

```ts
import { bold, inverse } from 'https://.../ansi/styles.ts'
console.log(bold(inverse("Hello World!")))
```

## Modules

### Colors

```ts
import { blue, red } from 'https://.../ansi/colors.ts'
console.log(blue('Whale'))
console.log(red('Skies'))
```

|     Color | Signature                                                    |
| --------: | ------------------------------------------------------------ |
|   `black` | `(s: string) => string`                                      |
|     `red` | `(s: string) => string`                                      |
|   `green` | `(s: string) => string`                                      |
|  `yellow` | `(s: string) => string`                                      |
|    `blue` | `(s: string) => string`                                      |
| `magenta` | `(s: string) => string`                                      |
|    `cyan` | `(s: string) => string`                                      |
|   `white` | `(s: string) => string`                                      |
|     `rgb` | `(s: string, [r, g, b]: [number, number, number]) => string` |

All colors have `bg`, `bright` and `bgBright` variants. e.g. to use bright yellow call `yellow.bright(text)` and to use blue background call `blue.bg(text)`

[Go to Source](ansi/colors.ts)

### Styles

```ts
import { bold, inverse } from 'https://.../ansi/styles.ts'
console.log(bold('Claims'))
console.log(inverse('Kinematics'))
```

|           Style | Signature                              |
| --------------: | -------------------------------------- |
|          `bold` | `(s: string) => string`                |
|         `faint` | `(s: string) => string`                |
|        `italic` | `(s: string) => string`                |
|     `underline` | `(s: string) => string`                |
|      `blinking` | `(s: string) => string`                |
|       `inverse` | `(s: string) => string`                |
|        `hidden` | `(s: string) => string`                |
| `strikethrough` | `(s: string) => string`                |
|           `pad` | `(s: string, n: number = 1) => string` |

[Go to Source](ansi/styles.ts)

### Composition

```ts
import { compose } from 'https://.../helpers/composition.ts'
import { bold, inverse } from 'https://.../ansi/styles.ts'
import { blue } from 'https://.../ansi/colors.ts'

const str = compose(blue, bold, inverse)('Functional')
console.log(str)
```

### ANSI Builder

```ts
import { ansi } from 'https://.../ansi/builder.ts'
import { red } from 'https://.../ansi/colors.ts'
console.log(ansi`This is ${red} dangerous! ${inverse} Yes/No`)
```

### Cursor

```ts
import cursor from 'https://.../ansi/cursor.ts'
console.log(cursor.toColumn(0))
console.log(cursor.right(10))
```

|                   Field | Description                                  |
| ----------------------: | -------------------------------------------- |
|                `toHome` | Moves the cursor to the Home position (0, 0) |
|   `toPos(r = 0, c = 0)` | Move the cursor to given row and column      |
|             `up(n = 1)` | Moves the cursor up by n lines               |
|           `down(n = 1)` | Moves the cursor down by n lines             |
|          `right(n = 1)` | Moves the cursor right by n lines            |
|           `left(n = 1)` | Moves the cursor left by n lines             |
|     `toNextLine(n = 1)` | Moves the cursor to the nth next line        |
|     `toPrevLine(n = 1)` | Moves the cursor to the nth prev line        |
|       `toColumn(n = 0)` | Moves the cursor to a given column position  |
|       `requestPosition` | Returns the current cursor position          |
|                  `show` | Makes the cursor visible                     |
|                  `hide` | Makes the cursor invisible                   |
|    `save(mode = 'DEC')` | Saves the current cursor position            |
| `restore(mode = 'DEC')` | Restores the current cursor position         |

[Go to Source](ansi/cursor.ts)

### Clear

```ts
import clear from 'https://.../ansi/clear.ts'
console.log(clear.entireLine)
```

|            Field | Description                               |
| ---------------: | ----------------------------------------- |
|         `screen` | Clears the screen                         |
| `cursorAndBelow` | Clears the cursor and everything below it |
| `cursorAndAbove` | Clears the cursor and everything above it |
|   `entireScreen` | Clear the entire screen                   |
|           `line` | Clears the line                           |
| `lineFromCursor` | Clears the line from the cursor           |
|   `lineToCursor` | Clears the line to the cursor             |
|     `entireLine` | Clears the entire line                    |

[Go to Source](ansi/clear.ts)

### Components

#### Progress-Bars

```ts
import ProgressBar from 'https://.../components/progressbar/mod.ts'
const progressbar = new ProgressBar()
```

[**Read more**](./components/progressbar/README.md)

#### Spinners

```ts
import Spinner from 'https://.../components/spinners/mod.ts'

const spinner = new Spinner()

let count = 10
spinner.start({ text: 'Preparing for Liftoff!' })
const interval = setInterval(() => {
    spinner.setText(`Liftoff in ${count}`)
    if (count > 10) {
        spinner.stop('Liftoff 🚀')
        clearInterval(interval)
    }
}, 10_000)
```

[**Read more**](./components/spinner/README.md)

> Inspired by [ora](https://github.com/sindresorhus/ora) and [cli-spinners](https://github.com/sindresorhus/cli-spinners)

---

## 📑 License

> [MIT License](LICENSE)