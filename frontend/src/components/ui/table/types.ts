export type TProps = {
  columns: string[]
  rows: Array<string[]>
}
export type TEmits = {
  (_eventName: 'onTargetRow', _row: string[]): void
}
