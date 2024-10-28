<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useApplicationStore } from '@/stores/app.store.ts'
import { useSessionStore } from '@/stores/session.store.ts'
import { Project } from '@/entities/project/index.ts'
import { ProjectAdapter } from '@/adapter/project/index.ts'
import { ERROR_MESSAGES } from '@/utils/configs/errors.config.ts'
import ProjectService from '@/services/projects/index.ts'
import SliderProject from '@/components/pages/project/slider-project/SliderProject.vue'
import ProjectInfo from '@/components/pages/project/project-info/ProjectInfo.vue'
import ProjectDetails from '@/components/pages/project/project-details/ProjectDetails.vue'
import { useListStore } from '@/stores/list.store.ts'
import ProjectLocationMapModule from '@/components/modules/maps/project-location/ProjectLocationMapModule.vue'

const router = useRouter()
const route = useRoute()
const applicationStore = useApplicationStore()
const sessionStore = useSessionStore()
const listStore = useListStore()
const projectId = +route.params.id
const project = ref<Project | null>(null)

const loadProjectInfo = async () => {
  applicationStore.toggleStateLoadingApplication()
  const findCurrentProject = (project: Project) => project.isTarget
  const currentProject = (listStore.getList('projects') as Project[]).find(
    findCurrentProject
  )
  if (!currentProject) {
    const jwtToken = sessionStore.getSession()?.getTokenPermission('jwt')
    if (!jwtToken) return false
    const projectData = await ProjectService.getProject(
      projectId,
      jwtToken.value
    )
    project.value = new ProjectAdapter(projectData).adapt()
  } else {
    project.value = currentProject
  }
}

const validHaveProjectId = async () => {
  if (!projectId) return await router.push({ name: 'projects' })
  return
}

const stopLoadAfterTimeout = () => {
  const TIMEOUT = 2000
  setTimeout(applicationStore.toggleStateLoadingApplication, TIMEOUT)
}

const handlerErrorLoadData = () => {
  applicationStore.toggleStateLoadingApplication()
  applicationStore
    .getAlert('error')
    ?.setSettings(ERROR_MESSAGES.LOAD_DATA)
    .onShow()
  router.push({ name: 'projects', query: { page: 1 } })
}

onMounted(async () => {
  Promise.all([validHaveProjectId(), loadProjectInfo()])
    .then(stopLoadAfterTimeout)
    .catch(handlerErrorLoadData)
})
onBeforeUnmount(() => {
  project.value?.toggleTarget()
})
</script>

<template>
  <div class="content">
    <div v-if="project" class="project-top">
      <SliderProject
        v-if="project?.images"
        :image-urls="project?.images"
        class="project-slider"
      />
      <ProjectInfo
        v-if="project"
        :id="project.id"
        :name="project?.name"
        :description="project?.description"
        :status="project?.status"
        :address="project?.address"
        :members="project?.members"
        :type="project?.type"
        :expenses="Number(project?.expenses)"
        class="project-info"
      />
    </div>
    <div v-if="project" class="project-center">
      <ProjectDetails
        v-if="project?.details"
        :details="project?.details"
        :project-id="project.id"
      />
    </div>
    <section class="location">
      <ProjectLocationMapModule
        v-if="project?.coordinates"
        :coordinates="project?.coordinates"
      />
    </section>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.content {
  width: 100%;
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  color: var(--secondary-color);
}

.back {
  position: sticky;
  max-width: 200px;
  top: 120px;
  z-index: 1;
}

.project {
  &-top {
    display: flex;
    justify-content: space-between;
    gap: var(--space-lg);
    align-items: center;
    @media (max-width: $md2 + px) {
      flex-direction: column;
    }
  }

  &-info {
    max-width: 1100px;
    @media (max-width: $md2 + px) {
      max-width: none;
    }
  }

  &-slider {
    max-width: 800px;
    max-height: 500px;
    border-radius: var(--radius-lg);
    padding: var(--space-md);
    background-color: var(--fourth-color);
    z-index: 0;
    @media (max-width: $md2 + px) {
      max-width: none;
    }
  }
}

.location {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--radius-lg);
  background-color: var(--fourth-color);
  padding: var(--space-xl);

  .map {
    max-height: 350px;
  }
}
</style>
