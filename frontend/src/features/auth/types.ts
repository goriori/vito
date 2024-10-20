export type AProps = {
  identifier: string
  password: string
}
export type AEmits = {
  (eventName: 'onSuccess'): void
  (eventName: 'onError'): void
}
