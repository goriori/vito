<script setup lang="ts">
import { ref } from 'vue'
import { useListStore } from '@/stores/list.store.ts'
import { useSessionStore } from '@/stores/session.store.ts'
import { useApplicationStore } from '@/stores/app.store.ts'
import { Project } from '@/entities/project/index.ts'
import { Session } from '@/entities/session/index.ts'
import { SUCCESS_MESSAGES } from '@/utils/configs/success.config.ts'
import { ERROR_MESSAGES } from '@/utils/configs/errors.config.ts'
import TableService from '@/services/tables/index.ts'
import Button from '@/components/ui/button/Button.vue'

type FProps = {
  projectId: number
  tableId: number
  form: { id: number; value: string; placeholder: string }[]
}
type FEmits = {
  (_eventName: 'onSuccess'): void
  (_eventName: 'onError'): void
}
const props = defineProps<FProps>()
const emits = defineEmits<FEmits>()
const listStore = useListStore()
const sessionStore = useSessionStore()
const applicationStore = useApplicationStore()
const isLoading = ref(false)

const toggleLoading = () => (isLoading.value = !isLoading.value)

const successHandler = () => {
  const TIME_LOAD = 2000
  setTimeout(() => {
    toggleLoading()
    applicationStore
      .getAlert('success')
      ?.setSettings(SUCCESS_MESSAGES.ADD_ITEM_TABLE)
      .onShow()
    emits('onSuccess')
  }, TIME_LOAD)
}
const errorHandler = () => {
  const TIME_LOAD = 2000
  setTimeout(() => {
    toggleLoading()
    applicationStore
      .getAlert('error')
      ?.setSettings(ERROR_MESSAGES.ADD_ITEM_TABLE)
      .onShow()
    emits('onError')
  }, TIME_LOAD)
}

const addItemTable = () => {
  toggleLoading()

  const projectId = props.projectId
  const tableId = props.tableId

  const jwtToken = (sessionStore.getSession() as Session)?.getTokenPermission(
    'jwt'
  )
  if (!jwtToken) return
  const currentProject = (listStore.getList('projects') as Project[]).find(
    (project) => project.id === projectId
  )
  if (!currentProject) return
  const currentTable = currentProject.details.tables.find(
    (table) => table.id === tableId
  )
  if (!currentTable) return
  const item = props.form.map((field) => field.value)
  const items = currentTable.attributes.items
  const newItems = []
  if (!items) newItems.push(item)
  else newItems.push(...items, item)
  const payload = {
    data: {
      items: newItems,
    },
  }
  TableService.updateTable(tableId, payload, jwtToken.value)
    .then(successHandler)
    .catch(errorHandler)
}
</script>

<template>
  <Button variant="tertiary" :is-loading="isLoading" @on-click="addItemTable"
    >Добавить</Button
  >
</template>

<style scoped lang="scss"></style>
