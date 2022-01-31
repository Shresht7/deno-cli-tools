export interface ISpinner {
    interval: number
    frames: string[]
}

export type spinnerType = keyof typeof spinners

export const spinners = {
    windows: {
        interval: 80,
        frames: ["/", "-", "\\", "|"],
    }
}