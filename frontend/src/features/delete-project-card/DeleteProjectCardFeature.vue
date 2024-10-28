<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useApplicationStore } from '@/stores/app.store.ts'
import { useSessionStore } from '@/stores/session.store.ts'
import { useListStore } from '@/stores/list.store.ts'
import { onMounted, ref, useTemplateRef } from 'vue'
import { SUCCESS_MESSAGES } from '@/utils/configs/success.config.ts'
import { ERROR_MESSAGES } from '@/utils/configs/errors.config.ts'
import { Session } from '@/entities/session/index.ts'
import ProjectService from '@/services/projects/index.ts'
import Button from '@/components/ui/button/Button.vue'
import DeleteIcon from '@/components/ui/icons/DeleteIcon.vue'

type FEmits = {
  (_eventName: 'onSuccess'): void
  (_eventError: 'onError'): void
}
const emits = defineEmits<FEmits>()

const router = useRouter()
const applicationStore = useApplicationStore()
const sessionStore = useSessionStore()
const listStore = useListStore()

const isLoading = ref(false)
const toggleLoading = () => (isLoading.value = !isLoading.value)
const deleteProjectFromList = (projectId: number) => {
  if (!projectId) return
  listStore.deleteItemList('projects', +projectId)
}
const redirectProjectPage = () => {
  router.push({ name: 'projects', query: { page: 1 } })
}
const openModal = (event: Event) => {
  const projectId = (event.target as HTMLButtonElement).dataset.id
  if (!projectId) return
  applicationStore
    .getModal('confirm')
    ?.setSettings({
      message: 'Вы уверены что хотите удалить проект?',
      successHandler: () => deleteProject(+projectId),
      cancelHandler: () => {},
    })
    .onShow()
}
const successHandler = () => {
  const TIME_LOAD = 3000
  setTimeout(() => {
    applicationStore
      .getAlert('success')
      ?.setSettings(SUCCESS_MESSAGES.DELETE_PROJECT)
      .onShow()
    emits('onSuccess')
    toggleLoading()
  }, TIME_LOAD)
}
const errorHandler = () => {
  const TIME_LOAD = 3000
  setTimeout(() => {
    applicationStore
      .getAlert('success')
      ?.setSettings(ERROR_MESSAGES.DELETE_PROJECT)
      .onShow()
    emits('onError')
    toggleLoading()
  }, TIME_LOAD)
}

const deleteProject = (projectId: number) => {
  const jwtToken = (sessionStore.getSession() as Session).getTokenPermission(
    'jwt'
  )
  if (!jwtToken) return
  if (!projectId) return
  ProjectService.deleteProject(projectId, jwtToken.value)
    .then(successHandler)
    .then(() => deleteProjectFromList(projectId))
    .then(redirectProjectPage)
    .catch(errorHandler)
}
</script>

<template>
  <Button :is-loading="isLoading" variant="secondary" @on-click="openModal">
    <DeleteIcon class="icon" />
  </Button>
</template>

<style scoped lang="scss">
.icon {
  color: var(--error-color);
  max-width: 20px;
}
</style>
