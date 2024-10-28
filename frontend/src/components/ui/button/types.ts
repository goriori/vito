export type BProps = {
  outline?: boolean
  isLoading?: boolean
  variant?: 'primary' | 'secondary' | 'tertiary' | 'quaternary'
}
export type BEmits = {
  (_eventName: 'onClick', _event: Event): void
}
