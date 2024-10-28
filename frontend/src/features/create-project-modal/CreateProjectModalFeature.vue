<script setup lang="ts">
import AddProjectCard from '@/components/ui/cards/add-project-card/AddProjectCard.vue'
import { useApplicationStore } from '@/stores/app.store.ts'

const applicationStore = useApplicationStore()
const openModal = () => {
  applicationStore.getModal('create-project')?.onShow()
}
</script>

<template>
  <AddProjectCard @click="openModal" />
</template>

<style scoped lang="scss"></style>
