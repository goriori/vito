<script setup lang="ts">
import Header from '@/components/globals/header/Header.vue'
import Footer from '@/components/globals/footer/Footer.vue'
import { computed, onMounted, ref } from 'vue'
import { Project, ResponseProjects } from '@/services/projects/types.ts'
import { ProjectAdapter } from '@/adapter/project/index.ts'
import ProjectService from '@/services/projects/index.ts'
import { useSessionStore } from '@/stores/session.store.ts'
import { useListStore } from '@/stores/list.store.ts'
import { TokenPermission } from '@/entities/session/types.ts'
import { useRoute } from 'vue-router'
import { useApplicationStore } from '@/stores/app.store.ts'
import { ERROR_MESSAGES } from '@/utils/configs/errors.config.ts'

const route = useRoute()
const sessionStore = useSessionStore()
const applicationStore = useApplicationStore()
const listStore = useListStore()

const pageId = ref(route.query.page)
const jwtToken = computed(() => {
  const findJwtToken = (token: TokenPermission) => token.type === 'jwt'
  const token = sessionStore.getSession()?.tokens.find(findJwtToken)
  if (!token) return ''
  return token.value
})

const openErrorAlert = (error: { message: string }) => {
  applicationStore.getAlert('error')?.setSettings(error).onShow()
}

const loadProjects = async (page: number) => {
  if (!jwtToken.value) return openErrorAlert(ERROR_MESSAGES.JWT_TOKEN_EMPTY)
  if (listStore.getList('projects').length > 0) return
  const setProjectList = (responseProjectsData: ResponseProjects) => {
    const addProjectToList = (project: Project) => listStore.addItemToList('projects', new ProjectAdapter(project).adapt())
    responseProjectsData.projects.forEach(addProjectToList)
  }
  ProjectService.getProjects(jwtToken.value, page)
    .then(setProjectList)
    .catch(() => openErrorAlert(ERROR_MESSAGES.LOAD_PROJECTS))
}

onMounted(() => {
  if (pageId.value) {
    loadProjects(+pageId.value)
  }
})
</script>

<template>
  <div class="flex column">
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<style scoped lang="scss"></style>
