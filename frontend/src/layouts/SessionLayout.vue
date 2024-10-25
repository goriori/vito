<script setup lang="ts">
import Header from '@/components/globals/header/Header.vue'
import Footer from '@/components/globals/footer/Footer.vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'
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
  const token = sessionStore.getSession()?.getTokenPermission('jwt')
  if (!token) return null
  return token.value
})

const openErrorAlert = (error: { message: string }) => {
  applicationStore.getAlert('error')?.setSettings(error).onShow()
}

const loadProjects = async (page: number) => {
  if (!jwtToken.value) return openErrorAlert(ERROR_MESSAGES.JWT_TOKEN_EMPTY)
  const setProjectList = (responseProjectsData: ResponseProjects) => {
    const addProjectToList = (project: Project) => listStore.addItemToList('projects', new ProjectAdapter(project).adapt())
    responseProjectsData.projects.forEach(addProjectToList)
  }
  ProjectService.getProjects(jwtToken.value, page)
    .then(setProjectList)
    .catch(() => openErrorAlert(ERROR_MESSAGES.LOAD_PROJECTS))
}

const clearProjects = () => listStore.clearList('projects')
onMounted(() => {
  if (pageId.value) {
    loadProjects(+pageId.value)
  } else {
    loadProjects(1)
  }
})

onUnmounted(() => {
  clearProjects()
})
</script>

<template>
  <div class="page">
    <Header class="header" />
    <slot />
    <Footer />
  </div>
</template>

<style scoped lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>
