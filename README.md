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

### Styles

### ANSI Builder

```ts
import { ansi } from 'https://.../ansi/builder.ts'
import { red } from 'https://.../ansi/colors.ts'
console.log(ansi`This is ${red} dangerous! ${inverse} Yes/No`)
```

### Cursor

### Clear

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