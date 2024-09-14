<script setup lang="ts">
import AuthModule from '@/components/modules/auth/AuthModule.vue'
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
