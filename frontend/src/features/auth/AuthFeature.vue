<script setup lang="ts">
import { ref } from 'vue'
import { AEmits, AProps } from '@/features/auth/types.ts'
import { useApplicationStore } from '@/stores/app.store.ts'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session.store.ts'
import { Session } from '@/entities/session/index.ts'
import SessionService from '@/services/session/index.ts'
import Button from '@/components/ui/button/Button.vue'
import { ERROR_MESSAGES } from '@/utils/configs/errors.config.ts'
import { SUCCESS_MESSAGES } from '@/utils/configs/success.config.ts'
import { RESPONSE_CODES } from '@/utils/configs/responseCodes.config.ts'

const props = defineProps<AProps>()
const emits = defineEmits<AEmits>()

const router = useRouter()
const applicationStore = useApplicationStore()
const sessionStore = useSessionStore()
const isLoading = ref(false)

const toggleLoading = () => (isLoading.value = !isLoading.value)

const onAuth = async () => {
  const { jwt, user } = await SessionService.auth({ ...props })
  const session = new Session(await SessionService.getUserInfo(user.id, jwt))
  session.setTokenPermission({ type: 'jwt', value: jwt })
  session.saveSessionStorage()
  sessionStore.setSession(session)
}

const onSuccessEmit = () => emits('onSuccess')

const onErrorEmit = () => emits('onError')
const openSuccessAlert = () => {
  applicationStore
    .getAlert('success')
    ?.setSettings(SUCCESS_MESSAGES.AUTHORIZATION)
    .onShow()
}

const openErrorAlert = (e: number) => {
  const errorMessage =
    e === RESPONSE_CODES.BAD_REQUEST
      ? ERROR_MESSAGES.BAD_DATA_AUTHORIZATION
      : ERROR_MESSAGES.ERROR_SERVER
  applicationStore.getAlert('error')?.setSettings(errorMessage).onShow()
}

const redirectToProjectPage = () =>
  router.push({ name: 'projects', query: { page: 1 } })

const onError = (e: number) => {
  onErrorEmit()
  openErrorAlert(e)
}
const onSuccess = () => {
  onSuccessEmit()
  openSuccessAlert()
}

const authorization = () => {
  const TIMEOUT = 2000
  toggleLoading()
  setTimeout(() => {
    Promise.resolve()
      .then(toggleLoading)
      .then(onAuth)
      .then(onSuccess)
      .then(() => setTimeout(redirectToProjectPage, TIMEOUT))
      .catch(onError)
  }, TIMEOUT)
}
</script>

<template>
  <Button variant="secondary" :is-loading="isLoading" @on-click="authorization"
    >Войти
  </Button>
</template>

<style scoped lang="scss"></style>
