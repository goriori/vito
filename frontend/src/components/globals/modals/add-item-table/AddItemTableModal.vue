<script setup lang="ts">
import Modal from '@/components/ui/modal/Modal.vue'
import CreateTableItemForm from '@/components/ui/form/table-item/create/CreateTableItemForm.vue'
import AddTableItemFeature from '@/features/add-table-item/AddTableItemFeature.vue'

type MProps = {
  projectId: number
  tableId: number
  fields: string[]
}
type MEmits = {
  (_eventName: 'onClose'): void
}
defineProps<MProps>()
const emits = defineEmits<MEmits>()
const onClose = () => emits('onClose')
</script>

<template>
  <Modal @on-click-background="onClose">
    <template #window>
      <div class="window">
        <p>Добавить позицию</p>
        <CreateTableItemForm
          :project-id="projectId"
          :table-id="tableId"
          :fields="fields"
          :actions="[AddTableItemFeature]"
          @on-success="onClose"
          @on-error="onClose"
        />
      </div>
    </template>
  </Modal>
</template>

<style scoped lang="scss">
.window {
  border-radius: var(--radius-md);
  padding: var(--space-xl);
  background-color: var(--secondary-color);
  color: var(--fourth-color);
}
</style>
