<script setup lang="ts">
import { ref } from 'vue'
import { useApplicationStore } from '@/stores/app.store.ts'
import { useSessionStore } from '@/stores/session.store.ts'
import { Session } from '@/entities/session/index.ts'
import { FEmits, FProps } from '@/features/create-project/types.ts'
import { ERROR_MESSAGES } from '@/utils/configs/errors.config.ts'
import { SUCCESS_MESSAGES } from '@/utils/configs/success.config.ts'
import ProjectService from '@/services/projects/index.ts'
import Button from '@/components/ui/button/Button.vue'
import { useListStore } from '@/stores/list.store.ts'
import { Project } from '@/entities/project'

const props = defineProps<FProps>()
const emits = defineEmits<FEmits>()

const applicationStore = useApplicationStore()
const sessionStore = useSessionStore()
const listStore = useListStore()
const isLoading = ref(false)

const toggleLoading = () => (isLoading.value = !isLoading.value)

const addProjectToList = () => {
  listStore.addItemToList('projects', new Project({ name: props.form.name }))
}

const successHandler = () => {
  const TIME_LOADING = 3000
  setTimeout(() => {
    toggleLoading()
    applicationStore
      .getAlert('success')
      ?.setSettings(SUCCESS_MESSAGES.CREATE_PROJECT)
      .onShow()
    emits('onSuccess')
  }, TIME_LOADING)
}

const errorHandler = () => {
  applicationStore
    .getAlert('error')
    ?.setSettings(ERROR_MESSAGES.CREATE_PROJECT)
    .onShow()
  emits('onError')
}

const createTable = () => {
  toggleLoading()
  const jwtToken = (sessionStore.getSession() as Session)?.getTokenPermission(
    'jwt'
  )
  if (!jwtToken) return
  const payload = {
    data: {
      name: props.form.name,
      address: props.form.address,
      description: props.form.description,
      location: [props.form.location.x, props.form.location.y],
    },
  }
  ProjectService.createProject(payload, jwtToken.value)
    .then(successHandler)
    .catch(errorHandler)
}
</script>

<template>
  <Button :is-loading="isLoading" variant="tertiary" @on-click="createTable">
    Создать
  </Button>
</template>

<style scoped lang="scss"></style>
