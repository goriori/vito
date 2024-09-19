<script setup lang="ts">
import Header from '@/components/globals/header/Header.vue'
import Footer from '@/components/globals/footer/Footer.vue'
import ProjectListModule from '@/components/modules/list/projects/ProjectListModule.vue'
</script>

<template>
  <div class="page">
    <section class="page-top">
      <Header />
    </section>
    <section class="page-center">
      <ProjectListModule />
    </section>
    <section class="page-bottom">
      <Footer />
    </section>
  </div>
</template>

<style scoped lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  background-color: var(--secondary-color);

  &-top {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  &-center {
    margin: 0 auto;
  }
}
</style>
