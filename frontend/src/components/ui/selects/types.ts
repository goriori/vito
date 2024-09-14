type ListValue = string | number
export type SList = {
  id: number
  title: string
  value: ListValue
}

export type SProps = {
  modelValue?: string
  titles: string[]
}

export type IEmits = {
  (eventName: 'update:modelValue', value: ListValue): void
  (eventName: 'onChange', value: ListValue): void
}
