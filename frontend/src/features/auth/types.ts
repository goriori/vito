export type AProps = {
  identifier: string
  password: string
}
export type AEmits = {
  (_eventName: 'onSuccess'): void
  (_eventName: 'onError'): void
}
