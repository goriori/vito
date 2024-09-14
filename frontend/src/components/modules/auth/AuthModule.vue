<script setup lang="ts">
import LoginForm from '@/components/ui/form/login/LoginForm.vue'
import AuthFeature from '@/features/auth/AuthFeature.vue'
</script>

<template>
  <article class="module">
    <LoginForm :actions="[AuthFeature]" />
  </article>
</template>

<style scoped lang="scss"></style>
