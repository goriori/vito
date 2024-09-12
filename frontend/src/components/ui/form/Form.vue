<script setup lang="ts">
type FProps = {
  noValidate?: boolean
}

type FEmits = {
  (eventName: 'onSubmit', fields: HTMLInputElement[]): void
}

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

<style scoped lang="scss"></style>
