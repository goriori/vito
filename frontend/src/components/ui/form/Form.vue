<script setup lang="ts">
import { FEmits, FProps } from '@/components/ui/form/types.ts'

defineProps<FProps>()
const emits = defineEmits<FEmits>()
const onSubmit = (event: Event) => {
  const formElement = event.target as HTMLFormElement
  const countFormElements = formElement.length
  const fields: HTMLInputElement[] = []
  for (let i = 0; i < countFormElements; i++) {
    const element = formElement[i]
    if (element.nodeName === 'INPUT') fields.push(element as HTMLInputElement)
  }
  emits('onSubmit', fields)
}
</script>

<template>
  <form :novalidate="noValidate" @submit.prevent="onSubmit">
    <slot />
  </form>
</template>

<style scoped lang="scss">
form {
  width: 100%;
  padding: var(--space-lg);
  border-radius: var(--radius-sm);
  background-color: transparent;
}
</style>
