import ProgressBar from '../mod.ts'

let count = 0

const progress = new ProgressBar()

progress.start()

const interval = setInterval(() => {
    progress.updateProgress(count++)
    if (count > progress.total) {
        clearInterval(interval)
        progress.stop()
    }
}, 500)
