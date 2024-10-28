export type FProps = {
  form: {
    name: string
    address: string
    description: string
    location: {
      x: number
      y: number
    }
  }
}
export type FEmits = {
  (_eventName: 'onSuccess'): void
  (_eventName: 'onError'): void
}
