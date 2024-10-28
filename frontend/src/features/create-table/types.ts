export type FProps = {
  title: string
  fields: string
  projectId: number
}
export type FEmits = {
  (_eventName: 'onSuccess'): void
  (_eventName: 'onError'): void
}
