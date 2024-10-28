<script setup lang="ts">
import Modal from '@/components/ui/modal/Modal.vue'
import Button from '@/components/ui/button/Button.vue'
import { ref } from 'vue'

type MProps = {
  message: string
  successHandler: () => void
  cancelHandler: () => void
}
type MEmits = {
  (_eventName: 'onClose'): void
}
const props = defineProps<MProps>()
const emits = defineEmits<MEmits>()

const isLoading = ref(false)
const toggleLoading = () => (isLoading.value = !isLoading.value)
const onClose = () => emits('onClose')

const onSend = () => {
  Promise.resolve()
    .then(toggleLoading)
    .then(() => {
      const TIME_LOAD = 3000
      setTimeout(() => {
        props.successHandler()
        emits('onClose')
        toggleLoading()
      }, TIME_LOAD)
    })
}

const onCancel = () => {
  Promise.resolve()
    .then(props.cancelHandler)
    .then(() => emits('onClose'))
}
</script>

<template>
  <Modal @on-click-background="onClose">
    <template #window>
      <div class="window flex column gap-3">
        <p>{{ message }}</p>
        <section class="window-actions flex gap-1">
          <Button
            variant="quaternary"
            :is-loading="isLoading"
            @on-click="onSend"
            >Да
          </Button>
          <Button variant="tertiary" @on-click="onCancel">Отмена</Button>
        </section>
      </div>
    </template>
  </Modal>
</template>

<style scoped lang="scss">
.window {
  text-align: center;
  background-color: var(--secondary-color);
  border-radius: var(--radius-md);
  color: var(--fourth-color);
  padding: var(--space-xl);
}
</style>
