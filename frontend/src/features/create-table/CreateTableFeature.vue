<script setup lang="ts">
import { ref } from 'vue'
import { useApplicationStore } from '@/stores/app.store.ts'
import { useSessionStore } from '@/stores/session.store.ts'
import { Session } from '@/entities/session/index.ts'
import { FEmits, FProps } from '@/features/create-table/types.ts'
import { ERROR_MESSAGES } from '@/utils/configs/errors.config.ts'
import { SUCCESS_MESSAGES } from '@/utils/configs/success.config.ts'
import TableService from '@/services/tables/index.ts'
import Button from '@/components/ui/button/Button.vue'

const props = defineProps<FProps>()
const emits = defineEmits<FEmits>()
const applicationStore = useApplicationStore()
const sessionStore = useSessionStore()
const isLoading = ref(false)

const toggleLoading = () => (isLoading.value = !isLoading.value)

const successHandler = () => {
  const TIME_LOADING = 3000
  setTimeout(() => {
    toggleLoading()
    applicationStore
      .getAlert('success')
      ?.setSettings(SUCCESS_MESSAGES.CREATE_TABLE)
      .onShow()
    emits('onSuccess')
  }, TIME_LOADING)
}

const errorHandler = () => {
  applicationStore
    .getAlert('error')
    ?.setSettings(ERROR_MESSAGES.CREATE_TABLE)
    .onShow()
  emits('onError')
}

const createTable = () => {
  toggleLoading()
  const jwtToken = (sessionStore.getSession() as Session)?.getTokenPermission(
    'jwt'
  )
  if (!jwtToken) return
  const data = {
    title: props.title,
    fields: props.fields.split(',').map((field) => field.trim()),
    project: props.projectId,
  }
  TableService.createTable(data, jwtToken.value)
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
