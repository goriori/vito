<script setup lang="ts">
import { CProps } from '@/components/ui/chip/types.ts'

defineProps<CProps>()
</script>

<template>
  <article :class="['chip', variant, { rounded }]" v-ripple>
    <slot />
  </article>
</template>

<style scoped lang="scss">
.chip {
  position: relative;
  overflow: hidden;
  font-size: var(--thrid-font-size);
  font-weight: normal;
  text-align: center;
  border: 2px solid transparent;
  padding: 5px;

  &.rounded {
    border-radius: var(--radius-lg);
  }

  &.primary {
    color: var(--fourth-color);
    border-color: var(--primary-color);
    background-color: var(--primary-color);
  }

  &.secondary {
    color: var(--fourth-color);
    border-color: var(--secondary-color);
    background-color: var(--secondary-color);
  }

  &.tertiary {
    color: var(--fourth-color);
    border-color: var(--thrid-color);
    background-color: var(--thrid-color);
  }

  &.quaternary {
    color: var(--primary-color);
    border-color: var(--fourth-color);
    background-color: var(--fourth-color);
  }
}
</style>
