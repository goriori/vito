<script setup lang="ts">
import Alert from '@/components/ui/alert/Alert.vue'

type AProps = {
  message: string
}
type AEmits = {
  (_eventName: 'onClose'): void
}
defineProps<AProps>()
const emits = defineEmits<AEmits>()
const onClose = () => emits('onClose')
</script>

<template>
  <Alert color="error" @on-click="onClose" @on-time-out="onClose">
    {{ message }}
  </Alert>
</template>

<style scoped lang="scss"></style>
