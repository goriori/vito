<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { ref } from 'vue'

type AProps = {
  login: string
  password: string
}
type AEmits = {
  (eventName: 'onSuccess'): void
  (eventName: 'onError'): void
}
const props = defineProps<AProps>()
const emits = defineEmits<AEmits>()
const isLoading = ref(false)

const authorization = () => {
  console.log(props)
  const TIMEOUT = 2000
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    emits('onSuccess')
  }, TIMEOUT)
}
</script>

<template>
  <Button variant="secondary" :is-loading="isLoading" @on-click="authorization"
    >Войти
  </Button>
</template>

<style scoped lang="scss"></style>
