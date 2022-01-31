export interface ISpinner {
    interval: number
    frames: string[]
}

export const spinners = {
    windows: {
        interval: 80,
        frames: ["/", "-", "\\", "|"],
    }
}

export type spinnerType = keyof typeof spinners