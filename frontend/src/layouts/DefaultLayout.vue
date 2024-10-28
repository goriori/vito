<script setup lang="ts">
import { useSessionStore } from '@/stores/session.store.ts'
import { Session } from '@/entities/session/index.ts'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useApplicationStore } from '@/stores/app.store.ts'
import { TokenPermission } from '@/entities/session/types.ts'

const router = useRouter()
const sessionStore = useSessionStore()
const applicationStore = useApplicationStore()
const checkSession = () => {
  const TIME_LOAD = 1000
  const setToken = (token: TokenPermission) => session.setTokenPermission(token)
  const stopLoadingAndRedirectToProjectsPage = () => {
    applicationStore.toggleStateLoadingApplication()
    router.push({ name: 'projects', query: { page: 1 } })
  }

  const localSessionJSON = localStorage.getItem('session')
  if (!localSessionJSON) return
  applicationStore.toggleStateLoadingApplication()
  const objectSession = JSON.parse(localSessionJSON)
  const session = new Session(objectSession)
  objectSession.tokens.forEach(setToken)
  sessionStore.setSession(session)
  setTimeout(stopLoadingAndRedirectToProjectsPage, TIME_LOAD)
}

onMounted(() => {
  checkSession()
})
</script>

<template>
  <div class="page">
    <slot />
  </div>
</template>

<style scoped lang="scss"></style>
