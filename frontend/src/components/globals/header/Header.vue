<script setup lang="ts">
import AccountModule from '@/components/modules/account/AccountModule.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const redirectToProjects = () => router.push({ name: 'projects' })
</script>

<template>
  <header class="header">
    <section class="left">
      <h1 class="logo" @click="redirectToProjects">Frame Construction</h1>
    </section>
    <section class="center"></section>
    <section class="right">
      <AccountModule />
    </section>
  </header>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.header {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-xs);
  background-color: var(--secondary-color);
  border-bottom: 1px solid var(--fourth-color);
  box-shadow: 0 0 20px var(--fourth-color);
}

.logo {
  cursor: pointer;
  font-size: 40px;
  @media (max-width: $md4 + px) {
    font-size: var(--primary-font-size);
  }
}
</style>
