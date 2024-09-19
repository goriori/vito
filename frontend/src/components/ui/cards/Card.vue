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
  padding: var(--space-sm);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  transition: var(--animation-time) all ease-in-out;
  background-color: transparent;
  border: 1px solid transparent;

  &:hover {
    opacity: 0.8;
  }

  &.rounded {
    border-radius: var(--radius-sm);
  }

  &.outlined {
    background: none !important;
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
