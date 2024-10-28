<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useScroll } from '@vueuse/core'
import { useApplicationStore } from '@/stores/app.store.ts'
import { computed } from 'vue'
import Pagination from '@/components/ui/pagination/Pagination.vue'
import { useListStore } from '@/stores/list.store.ts'

const router = useRouter()
const route = useRoute()
const applicationStore = useApplicationStore()
const listStore = useListStore()
const isLoading = computed(() => applicationStore.getStateLoadingApplication())
const { y } = useScroll(document.body)
const countPage = computed(
  () => listStore.getCountPageList('projects') as number
)
const changePage = (
  item: { id: number; value: number; isActive: boolean } | null
) => {
  if (item) {
    router.push(`?page=${item.value}`)
  }
}
</script>

<template>
  <Pagination
    v-if="!isLoading && countPage > 1"
    :numbers="countPage"
    :target-number="route.query.page"
    :class="['pagination', { hidden: y < 100, visible: y > 100 }]"
    @on-click="changePage"
  />
</template>

<style scoped lang="scss">
.hidden {
  bottom: -100px !important;
}

.visible {
  bottom: 10px;
}

.pagination {
  position: sticky;
  transition: 0.2s all ease-in-out;
  max-width: 420px;
}
</style>
