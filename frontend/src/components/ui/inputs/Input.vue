<script setup lang="ts">
import { ref } from 'vue'

type IProps = {
  type: 'text' | 'number' | 'phone' | 'email' | 'password' | 'search'
  textPosition?: 'left' | 'center' | 'right'
  minLength?: number
  maxLength?: number
  modelValue?: string | number
  placeholder?: string
  required?: boolean
  disabled?: boolean
}
type IEmits = {
  (eventName: 'update:modelValue', value: string): void
  (eventName: 'onChange', value: string | number): void
  (eventName: 'onInput', value: string | number): void
}
const props = defineProps<IProps>()
const emits = defineEmits<IEmits>()

const modelValue = ref(props.modelValue)

const onChange = (event: Event) => {
  modelValue.value = (event.target as HTMLInputElement).value
  emits('update:modelValue', modelValue.value)
  emits('onChange', modelValue.value)
}

const onInput = (event: Event) => {
  modelValue.value = (event.target as HTMLInputElement).value
  emits('update:modelValue', modelValue.value)
  emits('onInput', modelValue.value)
}
</script>

<template>
  <input
    v-model="modelValue"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :class="['input', textPosition]"
    :min-length="minLength"
    :max-length="maxLength"
    required
    @change="onChange"
    @input="onInput"
  />
</template>

<style scoped>
.input {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: start;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid transparent;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  &:disabled {
    background-color: #fff;
    opacity: 0.5;
  }

  &:focus {
    transition: var(--animation-time) all ease-in-out;
    border-color: var(--thrid-color);
    outline: none;
  }

  &::placeholder {
    font-size: 16px;
  }
}

.left {
  text-align: start;
}

.center {
  text-align: center;
}

.right {
  text-align: end;
}
</style>
