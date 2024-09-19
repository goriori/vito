<script setup lang="ts">
import ProjectList from '@/components/ui/list/project-list/ProjectList.vue'
import { onMounted, ref } from 'vue'
import CircleSpinner from '@/components/ui/spiners/CircleSpinner.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const projects = ref(null)
const isLoading = ref(true)

const redirectToProject = (project: object) => {
  router.push(`/project/${project.id}`)
}
onMounted(async () => {
  const TIMEOUT = 2000
  const projectsData = await fetch('/projects.json')
  projects.value = await projectsData.json()
  setTimeout(() => (isLoading.value = false), TIMEOUT)
})
</script>

<template>
  <article class="module">
    <p v-if="!isLoading" class="module-title">Проекты</p>
    <div class="module-list">
      <CircleSpinner v-if="isLoading" />
      <ProjectList
        v-else
        :projects="projects"
        @on-target-card="redirectToProject"
      />
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

  &-title {
    font-weight: bold;
    font-size: 40px;
    color: #fff;
    @media (max-width: $md4 + px) {
      font-size: var(--primary-font-size);
    }
  }

  &-list {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
