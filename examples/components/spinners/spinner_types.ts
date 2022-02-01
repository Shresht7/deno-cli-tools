import Spinner from '../../../components/spinner/mod.ts'
import { spinners } from '../../../components/spinner/spinners.ts'

const spinnerTypes = Object.keys(spinners)

/** Get a random spinner */
const randomSpinner = () => spinnerTypes[Math.floor(Math.random() * spinnerTypes.length)] as keyof typeof spinners

const first = randomSpinner()
const spinner = new Spinner({ text: first, type: first })
spinner.start()

setInterval(() => {
    const selection = randomSpinner()
    spinner.update(selection, selection)
}, 2_000)