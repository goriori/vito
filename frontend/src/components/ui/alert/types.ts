export type AProps = {
  color: 'default' | 'warning' | 'error'
}
export type AEmits = {
  (eventName: 'onClick'): void
  (eventName: 'onTimeOut'): void
}
