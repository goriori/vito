<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { ref } from 'vue'
import { useApplicationStore } from '@/stores/app.store.ts'
import { SUCCESS_MESSAGES } from '@/utils/configs/success.config.ts'
import { ERROR_MESSAGES } from '@/utils/configs/errors.config.ts'
import ProjectService from '@/services/projects/index.ts'
import { useSessionStore } from '@/stores/session.store.ts'
import { Session } from '@/entities/session/index.ts'
import { useRouter } from 'vue-router'
import { useListStore } from '@/stores/list.store.ts'

type FProps = {
  projectId: number
}
type FEmits = {
  (_eventName: 'onSuccess'): void
  (_eventError: 'onError'): void
}
const props = defineProps<FProps>()
const emits = defineEmits<FEmits>()

const router = useRouter()
const applicationStore = useApplicationStore()
const sessionStore = useSessionStore()
const listStore = useListStore()

const isLoading = ref(false)
const toggleLoading = () => (isLoading.value = !isLoading.value)
const deleteProjectFromList = () => {
  listStore.deleteItemList('projects', props.projectId)
}
const redirectProjectPage = () => {
  router.push({ name: 'projects', query: { page: 1 } })
}
const openModal = () => {
  applicationStore
    .getModal('confirm')
    ?.setSettings({
      message: 'Вы уверены что хотите удалить проект?',
      successHandler: deleteProject,
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
const deleteProject = () => {
  const jwtToken = (sessionStore.getSession() as Session).getTokenPermission(
    'jwt'
  )
  if (!jwtToken) return
  toggleLoading()
  ProjectService.deleteProject(props.projectId, jwtToken.value)
    .then(successHandler)
    .then(deleteProjectFromList)
    .then(redirectProjectPage)
    .catch(errorHandler)
}
</script>

<template>
  <Button variant="secondary" @on-click="openModal">Удалить проект</Button>
</template>

<style scoped lang="scss"></style>
