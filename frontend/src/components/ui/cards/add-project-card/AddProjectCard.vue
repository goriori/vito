<script setup lang="ts">
import Card from '@/components/ui/cards/Card.vue'
import AddIcon from '@/components/ui/icons/AddIcon.vue'
</script>

<template>
  <Card variant="tertiary" rounded class="card">
    <template #card-center>
      <AddIcon class="icon" />
    </template>
  </Card>
</template>

<style scoped lang="scss">
@import '@/assets/scss/animation';

.card {
  width: 100%;
  height: 100%;
  color: var(--fourth-color);
  animation: var(--animation-time) default-display-card linear;

  :deep(.card-top) {
    display: none;
  }

  :deep(.card-center) {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  :deep(.card-bottom) {
    display: none;
  }
}

.icon {
  max-width: 50px;
  max-height: 50px;
}
</style>
