<script setup lang="ts">
import { IProps } from '@/components/ui/image/types.ts'

defineProps<IProps>()
</script>

<template>
  <section class="image">
    <img :src="href" alt="" :class="[{ rounded }]" />
  </section>
</template>

<style scoped lang="scss">
.image {
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    &.rounded {
      border-radius: var(--radius-md);
    }
  }
}
</style>
