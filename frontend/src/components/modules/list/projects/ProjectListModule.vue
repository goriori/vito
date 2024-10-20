<script setup lang="ts">
import ProjectList from '@/components/ui/list/project-list/ProjectList.vue'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApplicationStore } from '@/stores/app.store.ts'
import { useListStore } from '@/stores/list.store.ts'
import { Project } from '@/entities/project/index.ts'
import { ERROR_MESSAGES } from '@/utils/configs/errors.config.ts'

const router = useRouter()
const applicationStore = useApplicationStore()
const listStore = useListStore()
const projects = ref<Project[]>([])
const isLoading = computed(() => applicationStore.getStateLoadingApplication())
const redirectToProject = (project: Project) => {
  router.push(`/project/${project.id}`)
}

const openErrorAlert = (error: { message: string }) => {
  applicationStore.getAlert('error')?.setSettings(error).onShow()
}

const checkProjectList = async () => {
  const TIME_CHECK = 1000
  applicationStore.toggleStateLoadingApplication()
  setTimeout(() => {
    const list = listStore.getList('projects') as Project[]
    if (list.length === 0) openErrorAlert(ERROR_MESSAGES.LOAD_PROJECTS)
    else projects.value = list
    applicationStore.toggleStateLoadingApplication()
  }, TIME_CHECK)
}

onMounted(async () => {
  await checkProjectList()
})
</script>

<template>
  <article class="module">
    <div class="module-list">
      <ProjectList v-if="!isLoading && projects.length !== 0" :projects="projects" @on-target-card="redirectToProject" />
      <p v-else>Список проектов пуст</p>
    </div>
  </article>
</template>

<style scoped lang="scss">
@import '@/assets/scss/mixins';
@import '@/assets/scss/variables';

.module {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);

  &-list {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
