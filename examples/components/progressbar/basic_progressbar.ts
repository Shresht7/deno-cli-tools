import ProgressBar from '../../../components/progressbar/mod.ts'

const progress = new ProgressBar()

progress.start()

let count = 0
const ref = setInterval(() => {
    const done = progress.updateProgress(count++)
    if (done) { clearInterval(ref) }
}, 1000)