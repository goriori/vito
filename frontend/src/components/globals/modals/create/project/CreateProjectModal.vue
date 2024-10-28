<script setup lang="ts">
import Modal from '@/components/ui/modal/Modal.vue'
import CreateProjectForm from '@/components/ui/form/project/create/CreateProjectForm.vue'
import CreateProjectFeature from '@/features/create-project/CreateProjectFeature.vue'

type MEmits = {
  (_eventName: 'onClose'): void
}
type MProps = {}
defineProps<MProps>()
const emits = defineEmits<MEmits>()
const onClose = () => emits('onClose')
</script>

<template>
  <Modal @on-click-background="onClose">
    <template #window>
      <div class="window flex column gap-2">
        <h2>Создание проекта</h2>
        <CreateProjectForm
          :actions="[CreateProjectFeature]"
          @on-success="onClose"
        />
      </div>
    </template>
  </Modal>
</template>

<style scoped lang="scss">
.window {
  background-color: var(--secondary-color);
  border-radius: var(--radius-md);
  padding: var(--space-sm);
  color: var(--fourth-color);
  text-align: center;
}
</style>
