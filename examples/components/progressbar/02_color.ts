import ProgressBar from '../../../components/progressbar/mod.ts'

const progress = new ProgressBar({ color: 'green' })

progress.start("Counting")

let count = 0
const interval = setInterval(() => {
    progress.updateProgress(count++, `Counting ${count}`)
    if (count > progress.total) {
        clearInterval(interval)
        progress.stop('Done')
    }
}, 500)
