<script setup lang="ts">
import { CProps } from '@/components/ui/cards/types.ts'

defineProps<CProps>()
</script>

<template>
  <article :class="['card', variant, { rounded, outlined }]">
    <section class="card-top">
      <slot name="card-top" />
    </section>
    <section class="card-center">
      <slot name="card-center" />
    </section>
    <section class="card-bottom">
      <slot name="card-bottom" />
    </section>
  </article>
</template>

<style scoped>
.card {
  width: 100%;
  cursor: pointer;
  color: #000;
  max-width: 200px;
  padding: var(--space-sm);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  transition: var(--animation-time) all ease-in-out;
  background-color: transparent;
  border: 1px solid transparent;

  &:hover {
    transform: scale(1.1);
  }

  &.rounded {
    border-radius: var(--radius-sm);
  }

  &.outlined {
    background: none !important;
  }

  &.primary {
    border-color: var(--primary-color);
    background-color: var(--primary-color);
  }

  &.secondary {
    border-color: var(--secondary-color);
    background-color: var(--secondary-color);
  }
}
</style>
