<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProjectListModule from '@/components/modules/list/projects/ProjectListModule.vue'
import PaginationModule from '@/components/modules/pagination/PaginationModule.vue'
import ProjectsFilterModule from '@/components/modules/projecs-filter/ProejctsFilterModule.vue'

const route = useRoute()
const router = useRouter()

onMounted(() => {
  if (!route.query.page) {
    router.push('?page=1')
  }
})
</script>

<template>
  <div class="flex column between gap-3 p-2 container projects">
    <section class="flex column gap-2">
      <div class="flex row between gap-2 a-i-center">
        <p class="title">Проекты</p>
        <ProjectsFilterModule />
      </div>
      <ProjectListModule />
    </section>
    <PaginationModule />
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.title {
  font-weight: bold;
  font-size: 40px;
  color: #fff;
  @media (max-width: $md4 + px) {
    font-size: var(--primary-font-size);
  }
}
</style>
