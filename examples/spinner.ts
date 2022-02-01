import Spinner from '../components/spinner/mod.ts'

const spinner = new Spinner("Countdown: 10")

spinner.start()

let counter = 10
const ref = setInterval(() => spinner.setText(`Countdown ${counter--}`), 1_000)

setTimeout(() => {
    spinner.stop("🚀 Liftoff!")
    clearInterval(ref)
}, 10_000)