<script setup lang="ts">
import AddButton from '@/components/ui/button/add/AddButton.vue'
import { useApplicationStore } from '@/stores/app.store.ts'
import { useListStore } from '@/stores/list.store.ts'
import { Project } from '@/entities/project/index.ts'
import { ProjectTable } from '@/services/projects/types.ts'

type BProps = {
  projectId: number
  tableId: number
}
const props = defineProps<BProps>()
const applicationStore = useApplicationStore()
const listStore = useListStore()

const openModal = () => {
  const findProjectById = (project: Project) => project.id === props.projectId
  const findTableById = (table: ProjectTable) => table.id === props.tableId
  const currentTable = (listStore.getList('projects') as Project[])
    .find(findProjectById)
    ?.details.tables.find(findTableById)

  if (!currentTable) return
  applicationStore
    .getModal('add-item-table')
    ?.setSettings({
      projectId: props.projectId,
      tableId: props.tableId,
      fields: currentTable.attributes.fields,
    })
    .onShow()
}
</script>

<template>
  <AddButton :is-loading="false" @click="openModal" />
</template>

<style scoped lang="scss"></style>
