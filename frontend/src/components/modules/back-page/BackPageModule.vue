<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const backPage = () => {
  router.back()
}
</script>

<template>
  <Button variant="quaternary" @on-click="backPage">Назад</Button>
</template>

<style scoped lang="scss"></style>
