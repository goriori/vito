<script setup lang="ts">
import { useApplicationStore } from '@/stores/app.store.ts'

const applicationStore = useApplicationStore()
</script>

<template>
  <Teleport to="body">
    <section class="modals">
      <template v-for="alert in applicationStore.getAlerts()" :key="alert.id">
        <component
          :is="alert.getComponent()"
          v-if="alert.getStateVisibility()"
          v-bind="alert.getSettings()"
          @on-close="alert.onHide()"
        />
      </template>
    </section>
  </Teleport>
</template>

<style scoped></style>
