<script setup lang="ts">
import AuthModule from '@/components/modules/auth/AuthModule.vue'
import { useSessionStore } from '@/stores/session.store.ts'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const sessionStore = useSessionStore()

onMounted(() => {
  if (sessionStore.getSession())
    router.push({ name: 'projects', query: { page: 1 } })
})
</script>

<template>
  <div class="page container">
    <section class="page-center">
      <AuthModule />
    </section>
  </div>
</template>

<style scoped lang="scss">
.page {
  &-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

.login {
  max-width: 400px;
}
</style>
