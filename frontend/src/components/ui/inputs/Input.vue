<script setup lang="ts">
import { IEmits, IProps } from '@/components/ui/inputs/types.ts'

defineProps<IProps>()
const emits = defineEmits<IEmits>()

const onChange = (event: Event) => {
  emits('update:modelValue', (event.target as HTMLInputElement).value)
  emits('onChange', (event.target as HTMLInputElement).value)
}

const onInput = (event: Event) => {
  emits('update:modelValue', (event.target as HTMLInputElement).value)
  emits('onInput', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <input
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :class="['input', textPosition, { outlined }]"
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
  padding: var(--space-sm);
  border-radius: var(--radius-sm);
  border: 1px solid transparent;

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

  &.outlined {
    border-color: #000;
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
