<script setup lang="ts">
import { useApplicationStore } from '@/stores/app.store.ts'
import AddButton from '@/components/ui/button/add/AddButton.vue'

const applicationStore = useApplicationStore()

const openModalAddMember = () => {
  applicationStore.getModal('add-member-project')?.onShow()
}
</script>

<template>
  <AddButton :is-loading="false" class="feature" @click="openModalAddMember" />
</template>

<style scoped lang="scss">
.feature {
  max-width: 50px;
  max-height: 38px;
}
</style>
