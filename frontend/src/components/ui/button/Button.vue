<script setup lang="ts">
import CircleSpinner from '@/components/ui/spiners/CircleSpinner.vue'

type BProps = {
  outline?: boolean
  isLoading?: boolean
  variant?: 'primary' | 'secondary'
}
type BEmits = {
  (eventName: 'onClick'): void
}
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
  border-radius: 5px;
  border: 1px solid transparent;
  padding: 8px;
  color: #000;
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
  border-color: var(--primary-color);
  background-color: var(--primary-color);
}

.secondary {
  border-color: var(--secondary-color);
  background-color: var(--secondary-color);
}


</style>
