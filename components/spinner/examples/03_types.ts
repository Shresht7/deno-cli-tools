import Spinner from '../mod.ts'
import { spinners } from '../spinners.ts'

const spinnerTypes = Object.keys(spinners)

/** Get a random spinner */
const randomSpinner = () => spinnerTypes[Math.floor(Math.random() * spinnerTypes.length)] as keyof typeof spinners

const first = randomSpinner()
const spinner = new Spinner({ prefixText: first, spinner: first })

spinner.start()

setInterval(() => {
    const selection = randomSpinner()
    spinner.setPrefixText(selection)
    spinner.setSpinner(selection)
}, 2_000)
