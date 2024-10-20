<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useApplicationStore } from '@/stores/app.store.ts'
import { useSessionStore } from '@/stores/session.store.ts'
import { Project } from '@/entities/project/index.ts'
import { ProjectAdapter } from '@/adapter/project/index.ts'
import { ERROR_MESSAGES } from '@/utils/configs/errors.config.ts'
import {
  YandexMap,
  YandexMapControls,
  YandexMapDefaultSchemeLayer,
  YandexMapZoomControl,
  YandexMapDefaultMarker,
  YandexMapDefaultFeaturesLayer,
} from 'vue-yandex-maps'
import ProjectService from '@/services/projects/index.ts'
import SliderProject from '@/components/pages/project/slider-project/SliderProject.vue'
import ProjectInfo from '@/components/pages/project/project-info/ProjectInfo.vue'
import ProjectDetails from '@/components/pages/project/project-details/ProjectDetails.vue'

const router = useRouter()
const route = useRoute()
const applicationStore = useApplicationStore()
const sessionStore = useSessionStore()
const projectId = +route.params.id
const project = ref<Project | null>(null)

const loadProjectInfo = async () => {
  applicationStore.toggleStateLoadingApplication()
  const jwtToken = sessionStore
    .getSession()
    ?.tokens.find((token) => token.type === 'jwt')
  if (!jwtToken) return await router.push({ name: 'auth' })
  project.value = new ProjectAdapter(
    await ProjectService.getProject(projectId, jwtToken.value)
  ).adapt()
}

const validHaveProjectId = async () => {
  if (!projectId) return await router.push({ name: 'projects' })
  return
}

const validSession = async () => {
  const session = sessionStore.getSession()
  if (!session) return await router.push({ name: 'auth' })
  return
}

const stopLoadAfterTimeout = () => {
  const TIMEOUT = 2000
  setTimeout(applicationStore.toggleStateLoadingApplication, TIMEOUT)
}

onMounted(async () => {
  Promise.all([validHaveProjectId(), validSession(), loadProjectInfo()])
    .then(stopLoadAfterTimeout)
    .then(() => console.log(project.value))
    .catch(() => {
      applicationStore.toggleStateLoadingApplication()
      applicationStore
        .getAlert('error')
        ?.setSettings(ERROR_MESSAGES.LOAD_DATA)
        .onShow()
      router.push({ name: 'projects', query: { page: 1 } })
    })
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
      <ProjectDetails :details="project?.details" />
    </div>
    <section class="location">
      <yandex-map
        :settings="{
          location: {
            center: [53.24321, 56.943247],
            zoom: 10,
          },
          showScaleInCopyrights: true,
        }"
        height="100vh"
        class="map"
      >
        <yandex-map-default-features-layer />
        <yandex-map-default-scheme-layer :settings="{ theme: 'dark' }" />
        <yandex-map-controls :settings="{ position: 'right' }">
          <yandex-map-zoom-control />
        </yandex-map-controls>

        <yandex-map-default-marker
          :settings="{
            coordinates: project?.coordinates,
            color: 'red',
            title: 'Объект',
          }"
        />
      </yandex-map>
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
