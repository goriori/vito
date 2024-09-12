<script setup lang="ts">
import { useApplicationStore } from '@/stores/app.store.ts'

const applicationStore = useApplicationStore()
</script>

<template>
  <Teleport to="body">
    <section class="modals">
      <template v-for="modal in applicationStore.getModals()" :key="modal.id">
        <component
          :is="modal.getComponent()"
          v-if="modal.getStateVisibility()"
          v-bind="modal.getSettings()"
          @on-close="modal.onHide()"
        />
      </template>
    </section>
  </Teleport>
</template>

<style scoped></style>
