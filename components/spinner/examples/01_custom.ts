import Spinner from '../mod.ts'

const spinner = new Spinner({
    prefixText: 'Custom',
    spinner: {
        interval: 160,
        frames: ['/', '//', '///']
    }
})

spinner.start()
setTimeout(() => spinner.stop(), 10_000)
