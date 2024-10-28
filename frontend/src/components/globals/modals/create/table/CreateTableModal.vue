<script setup lang="ts">
import Modal from '@/components/ui/modal/Modal.vue'
import CreateTableForm from '@/components/ui/form/table/create/CreateTableForm.vue'
import CreateTableFeature from '@/features/create-table/CreateTableFeature.vue'
import { useApplicationStore } from '@/stores/app.store.ts'

type MEmits = {
  (_eventName: 'onClose'): void
}
type MProps = {
  projectId: number
}
defineProps<MProps>()
const emits = defineEmits<MEmits>()
const applicationStore = useApplicationStore()
const onClose = () => emits('onClose')

const onSuccessCreated = () => {
  applicationStore.getModal('create-table')?.onHide()
}
const onErrorCreated = () => {
  console.log('error create table')
}
</script>

<template>
  <Modal @on-click-background="onClose">
    <template #window>
      <div class="window">
        <h2>Создание таблицы</h2>
        <CreateTableForm
          :project-id="projectId"
          :actions="[CreateTableFeature]"
          @on-success="onSuccessCreated"
          @on-error="onErrorCreated"
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
