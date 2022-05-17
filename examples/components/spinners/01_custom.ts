import { inverse } from '../../../ansi/styles.ts'
import Spinner from '../../../components/spinner/mod.ts'

const spinner = new Spinner({
    prefixText: "Waiting",
    type: 'bouncingBall',
    formatter: (spinner) => inverse(spinner)
})

spinner.start()

setTimeout(() => {
    spinner.stop("Done")
}, 10_000)