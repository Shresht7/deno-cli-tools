import Spinner from '../../../components/spinner/mod.ts'

const spinner = new Spinner()

spinner.start({ text: "Countdown: 10" })

let counter = 10
const interval = setInterval(() => {
    spinner.setText(`Countdown: ${counter--}`)
    if (counter > 10) {
        spinner.stop("🚀 Liftoff!")
        clearInterval(interval)
    }
}, 1_000)
