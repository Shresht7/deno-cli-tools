import _spinners from './spinners.json' assert { type: 'json' }

export interface SpinnerInterface {
    interval: number
    frames: string[]
}

export type SpinnerType = keyof typeof spinners

/**
 * Spinner Variants
 * 
 * - Source: {@link https://github.com/sindresorhus/cli-spinners}
 * - License: {@link https://github.com/sindresorhus/cli-spinners/blob/00de8fbeee16fa49502fa4f687449f70f2c8ca2c/license}
 */
export const spinners = _spinners