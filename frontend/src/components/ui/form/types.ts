export type FProps = {
  noValidate?: boolean
}

export type FEmits = {
  (_eventName: 'onSubmit', fields: HTMLInputElement[]): void
}

export type FComponents = {
  actions: object[]
}
