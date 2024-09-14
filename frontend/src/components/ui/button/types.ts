export type BProps = {
  outline?: boolean
  isLoading?: boolean
  variant?: 'primary' | 'secondary' | 'tertiary' | 'quaternary'
}
export type BEmits = {
  (eventName: 'onClick'): void
}
