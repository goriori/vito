<script setup lang="ts">
import CircleSpinner from '@/components/ui/spiners/CircleSpinner.vue'
import { BEmits, BProps } from '@/components/ui/button/types.ts'

defineProps<BProps>()
const emits = defineEmits<BEmits>()
const onClick = () => emits('onClick')
</script>

<template>
  <button
    type="submit"
    :class="['btn', variant, { outline }]"
    @click="onClick"
    v-ripple
  >
    <slot v-if="!isLoading" />
    <CircleSpinner v-else class="loader" />
  </button>
</template>

<style scoped>
.loader {
  max-width: 20px;
  max-height: 20px;
}

.btn {
  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  padding: 8px;
  color: transparent;
  cursor: pointer;
  background-color: transparent;
  transition: var(--animation-time) all ease-in-out;

  &:active {
    transition: var(--animation-time) all ease-in-out;
    opacity: 0.9;
  }
}

.outline {
  background: none !important;
}

.primary {
  color: var(--fourth-color);
  border-color: var(--primary-color);
  background-color: var(--primary-color);
}

.secondary {
  color: var(--fourth-color);
  border-color: var(--secondary-color);
  background-color: var(--secondary-color);
}

.tertiary {
  color: var(--fourth-color);
  border-color: var(--thrid-color);
  background-color: var(--thrid-color);
}

.quaternary {
  color: var(--primary-color);
  border-color: var(--fourth-color);
  background-color: var(--fourth-color);
}
</style>
