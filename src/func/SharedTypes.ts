export type ProgressResult = {
    completed: number
    total: number
    phase: string
    context?: string | undefined
}

declare global {
  interface Array<T> {
    squish(): Array<NonNullable<T>>;
  }
}

if (!Array.prototype.squish) {
  // eslint-disable-next-line no-extend-native
  Array.prototype.squish = function squish<T>(): Array<NonNullable<T>> {
    return this.filter((item) => item !== null) as Array<NonNullable<T>>
  }
}
