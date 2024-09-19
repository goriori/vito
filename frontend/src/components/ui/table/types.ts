export type TProps = {
    columns: string[]
    rows: Array<string[]>
}
export type TEmits = {
    (eventName: 'onTargetRow', row: string[]): void
}