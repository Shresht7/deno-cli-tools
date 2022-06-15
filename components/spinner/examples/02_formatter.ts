import { inverse } from '../../../ansi/styles.ts'
import Spinner from '../mod.ts'

const spinner = new Spinner({
    prefixText: "Waiting",
    spinner: 'bouncingBall',
    formatter: (spinner) => inverse(spinner)
})

spinner.start()

setTimeout(() => {
    spinner.stop("Done")
}, 5_000)
