<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import AddIcon from '@/components/ui/icons/AddIcon.vue'

type BProps = {
  isLoading: boolean
}
defineProps<BProps>()
</script>

<template>
  <Button :is-loading="isLoading" variant="secondary" class="add">
    <AddIcon class="icon" />
  </Button>
</template>

<style scoped lang="scss">
.icon {
  width: 100%;
  height: 100%;
  max-width: 24px;
  max-height: 24px;
  color: #fff;
}

.add {
  border-radius: var(--radius-md);
}
</style>
