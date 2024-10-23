<script setup lang="ts">
import Chip from '@/components/ui/chip/Chip.vue'

type PProps = {
  name: string
  address: string
  type: string
  status: string
}

defineProps<PProps>()
</script>

<template>
  <div class="info-top">
    <div class="info-title">
      <h1 class="title">{{ name }}</h1>
      <p class="address">{{ address }}</p>
    </div>
    <div class="info-statuses">
      <Chip rounded variant="secondary" class="status">{{ type }}</Chip>
      <Chip rounded variant="secondary" class="status">{{ status }}</Chip>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.info {
  &-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    max-height: 75px;
    @media (max-width: $md4 + px) {
      flex-direction: column;
      gap: var(--space-md);
    }
  }

  &-title {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);

    .title {
      @media (max-width: $md4 + px) {
        font-size: var(--primary-font-size);
      }
    }

    .address {
      font-size: var(--secondary-font-size);
      @media (max-width: $md4 + px) {
        font-size: var(--thrid-font-size);
      }
    }
  }

  &-statuses {
    display: flex;
    justify-content: center;
    flex: 0 1 200px;
    gap: var(--space-sm);
    @media (max-width: $md4 + px) {
      width: 100%;
      justify-content: flex-start;
    }

    .status {
      flex: 0 1 150px;
    }
  }
}
</style>
