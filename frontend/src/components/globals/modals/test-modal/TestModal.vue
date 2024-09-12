<script setup lang="ts">
import Modal from '@/components/ui/modal/Modal.vue'

type MEmits = {
  (eventName: 'onClose'): void
}
const emits = defineEmits<MEmits>()
const onClose = () => emits('onClose')
</script>

<template>
  <Modal @on-click-background="onClose">
    <template #window>
      <article class="window">wadwadwd</article>
    </template>
  </Modal>
</template>

<style scoped lang="scss">
.window {
  width: 100%;
  height: 100%;
  max-width: 300px;
  padding: 20px;
  border: 1px solid black;
  border-radius: 20px;
}
</style>
