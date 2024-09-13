<script setup lang="ts">
type CProps = {
  rounded?: boolean
  variant?: 'primary' | 'secondary'
  outlined?: boolean
}
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
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: var(--animation-time) all ease-in-out;
  background-color: transparent;
  border: 1px solid transparent;

  &:hover {
    transform: scale(1.1);
  }

  &.rounded {
    border-radius: 10px;
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
