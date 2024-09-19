<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { ref } from 'vue'
import { AEmits, AProps } from '@/features/auth/types.ts'
import { useApplicationStore } from '@/stores/app.store.ts'
import { useRouter } from 'vue-router'

const props = defineProps<AProps>()
const emits = defineEmits<AEmits>()

const router = useRouter()
const applicationStore = useApplicationStore()
const isLoading = ref(false)

const toggleLoading = () => (isLoading.value = !isLoading.value)
const onSuccessEmit = () => emits('onSuccess')
const openSuccessAlert = () => {
  applicationStore
    .getAlert('success')
    ?.setSettings({ message: 'Аутентификация прошла успешно' })
    .onShow()
}
const openErrorAlert = () => {
  applicationStore
    .getAlert('error')
    ?.setSettings({
      message: 'При аутентификации произошла ошибка, попробуйте еще раз',
    })
    .onShow()
}
const redirectToProjectPage = () => router.push({ name: 'projects' })
const authorization = () => {
  console.log(props)
  const TIMEOUT = 2000
  toggleLoading()
  setTimeout(() => {
    Promise.resolve()
      .then(toggleLoading)
      .then(onSuccessEmit)
      .then(openSuccessAlert)
      .then(() => setTimeout(redirectToProjectPage, TIMEOUT))
      .catch(openErrorAlert)
  }, TIMEOUT)
}
</script>

<template>
  <Button variant="secondary" :is-loading="isLoading" @on-click="authorization"
    >Войти
  </Button>
</template>

<style scoped lang="scss"></style>
