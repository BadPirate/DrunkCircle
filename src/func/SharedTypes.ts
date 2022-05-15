export type ProgressResult = {
    completed: number
    total: number
    phase: string
    context?: string | undefined
}