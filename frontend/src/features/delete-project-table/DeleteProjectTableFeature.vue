<script setup lang="ts">
import DeleteButton from '@/components/ui/button/delete/DeleteButton.vue'
import ProjectService from '@/services/projects/index.ts'
import { useListStore } from '@/stores/list.store.ts'
import { Project } from '@/entities/project'
import { useSessionStore } from '@/stores/session.store.ts'
import { Session } from '@/entities/session'
import { useApplicationStore } from '@/stores/app.store.ts'
import { SUCCESS_MESSAGES } from '@/utils/configs/success.config.ts'
import { ERROR_MESSAGES } from '@/utils/configs/errors.config.ts'

type BProps = {
  tableId: number
  projectId: number
}
const props = defineProps<BProps>()
const listStore = useListStore()
const sessionStore = useSessionStore()
const applicationStore = useApplicationStore()
const successHandler = () => {
  applicationStore
    .getAlert('success')
    ?.setSettings(SUCCESS_MESSAGES.DELETE_TABLE_PROJECT)
    .onShow()
}
const errorHandler = () => {
  applicationStore
    .getAlert('success')
    ?.setSettings(ERROR_MESSAGES.DELETE_TABLE_PROJECT)
    .onShow()
}
const openConfirmModal = () => {
  applicationStore
    .getModal('confirm')
    ?.setSettings({
      message: 'Вы уверены что хотите удалить таблицу из проекта?',
      successHandler: deleteTableFromProject,
      cancelHandler: () => {},
    })
    .onShow()
}
const deleteTableFromProject = () => {
  const projectId = props.projectId
  const jwtToken = (sessionStore.getSession() as Session)?.getTokenPermission(
    'jwt'
  )
  if (!jwtToken) return
  const currentProject = (listStore.getList('projects') as Project[]).find(
    (project) => project.id === props.projectId
  )
  if (!currentProject) return
  const tableProjectIds = currentProject.details.tables.map((table) => table.id)
  const newTableIds = tableProjectIds.filter((id) => id !== props.tableId)
  const payload = {
    data: {
      tables: newTableIds,
    },
  }
  ProjectService.updateProject(projectId, payload, jwtToken.value)
    .then(successHandler)
    .catch(errorHandler)
}
</script>

<template>
  <DeleteButton :is-loading="false" class="feature" @click="openConfirmModal" />
</template>

<style scoped lang="scss">
.feature {
  color: var(--error-color);
  max-width: 50px;
}
</style>
