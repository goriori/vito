<script setup lang="ts">
import Header from '@/components/globals/header/Header.vue'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import BackPageModule from '@/components/modules/back-page/BackPageModule.vue'
import SliderProject from '@/components/pages/project/slider-project/SliderProject.vue'
import ProjectInfo from '@/components/pages/project/project-info/ProjectInfo.vue'
import ProjectDetails from '@/components/pages/project/project-details/ProjectDetails.vue'

const router = useRouter()
const route = useRoute()
const projectId = route.params.id
const project = ref(null)
onMounted(async () => {
  if (!projectId) await router.push({ name: 'projects' })
  const projectsData = await fetch('/projects.json')
  const findProjectById = (project: object) => project.id == projectId
  project.value = (await projectsData.json()).find(findProjectById)
})
</script>

<template>
  <div class="page">
    <section class="page-top">
      <Header />
    </section>
    <section class="page-center container">
      <BackPageModule class="back" />
      <div class="project-top">
        <SliderProject class="project-slider" />
        <ProjectInfo
          v-if="project"
          :project-name="project?.projectName"
          :project-type="project?.projectType"
          :description="project?.description"
          :status="project?.status"
          :address="project?.address"
          :members="project?.members"
          :type="project?.projectType"
          class="project-info"
        />
      </div>
      <div class="project-center">
        <ProjectDetails :details="project?.details" />
      </div>
    </section>
    <section class="page-bottom"></section>
  </div>
</template>

<style scoped lang="scss">
.back {
  position: sticky;
  max-width: 200px;
  top: 120px;
  z-index: 1;
}

.page {
  background-color: var(--secondary-color);

  &-top {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  &-center {
    padding: var(--space-lg);
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: var(--space-lg);
    color: var(--secondary-color);
  }
}

.project {
  &-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &-info {
    width: 100%;
    height: 100%;
    max-width: 850px;
    max-height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: var(--radius-lg);
    padding: var(--space-md);
    background-color: var(--fourth-color);
  }

  &-slider {
    max-width: 800px;
    max-height: 500px;
    border-radius: var(--radius-lg);
    padding: var(--space-md);
    background-color: var(--fourth-color);
    z-index: 0;
  }
}
</style>
