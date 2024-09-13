<script setup lang="ts">
import { useRouter } from 'vue-router'
import Card from '@/components/ui/cards/Card.vue'

const router = useRouter()
const pages = router.getRoutes()
const toRoutePage = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div class="page">
    <section class="page-top"></section>
    <section class="page-center">
      <div class="info">
        <h3>Pages</h3>
        <div class="list">
          <template v-for="page in pages" :key="page.name">
            <Card
              v-if="page.name !== 'project-info'"
              variant="primary"
              rounded
              class="item"
              @click="toRoutePage(page.path)"
            >
              <template #card-center>{{ page.meta?.name }}</template>
            </Card>
          </template>
        </div>
      </div>
    </section>
    <section class="page-bottom"></section>
  </div>
</template>

<style scoped lang="scss">
.page {
  &-center {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 30px;
  }
}

.info {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.list {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 30px;
}

.item {
  flex: 1 0 200px;
}
</style>
