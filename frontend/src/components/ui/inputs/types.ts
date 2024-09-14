export type IProps = {
  type: 'text' | 'number' | 'phone' | 'email' | 'password' | 'search'
  textPosition?: 'left' | 'center' | 'right'
  minLength?: number
  maxLength?: number
  modelValue?: string | number
  placeholder?: string
  required?: boolean
  disabled?: boolean
  outlined?: boolean
}
export type IEmits = {
  (eventName: 'update:modelValue', value: string): void
  (eventName: 'onChange', value: string | number): void
  (eventName: 'onInput', value: string | number): void
}
