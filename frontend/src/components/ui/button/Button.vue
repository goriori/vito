<script setup lang="ts">
import CircleSpinner from '@/components/ui/spiners/CircleSpinner.vue'

type BProps = {
  outline?: boolean
  isLoading?: boolean
  background?: 'primary' | 'secondary' | 'thridy' | 'none'
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
    :class="['btn', background, { outline }]"
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
  border: none;
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
  border: 1px solid;
}

.primary {
  background-color: var(--primary-color);
}

.secondary {
  background-color: var(--secondary-color);
}

.thridy {
  background-color: var(--thrid-color);
}
</style>
