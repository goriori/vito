<script setup lang="ts">
import Alert from '@/components/ui/alert/Alert.vue'

type AProps = {
  message: string
}
type AEmits = {
  (eventName: 'onClose'): void
}
defineProps<AProps>()
const emits = defineEmits<AEmits>()
const onClose = () => emits('onClose')
</script>

<template>
  <Alert color="default" class="alert" @on-click="onClose" @on-time-out="onClose">
    {{ message }}
  </Alert>
</template>

<style scoped lang="scss">
.alert {
  text-align: center;
}
</style>
