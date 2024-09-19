<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { AEmits, AProps } from '@/components/ui/alert/types.ts'

const TIME_OUT = 5000

defineProps<AProps>()
const emits = defineEmits<AEmits>()
const timeoutId = ref<number | undefined>(undefined)
const onClick = () => emits('onClick')
const openAnimation = (onComplete?: () => void) => {
  gsap.from('.alert', {
    scale: 0,
    duration: 0.3,
    onComplete,
  })
}
const closeAnimation = (onComplete?: () => void) => {
  gsap.to('.alert', { scale: 0, onComplete })
}
const createTimeout = () => {
  timeoutId.value = setTimeout(() => {
    closeAnimation(() => emits('onTimeOut'))
  }, TIME_OUT)
}
const deleteTimeout = () => {
  if (timeoutId.value) clearTimeout(timeoutId.value)
}
onMounted(() => {
  openAnimation()
  createTimeout()
})

onUnmounted(() => {
  deleteTimeout()
})
</script>

<template>
  <article v-ripple :class="['alert', color]" @click="onClick">
    <slot />
  </article>
</template>

<style scoped lang="scss">
.alert {
  position: fixed;
  overflow: hidden;
  top: 10px;
  left: 50%;
  z-index: 100;
  transform: translate(-50%, 0);
  color: black;
  font-weight: 600;
  padding: var(--space-sm);
  border-radius: var(--radius-sm);
  background-color: transparent;
}

.default {
  background-color: var(--success-color);
}

.warning {
  background-color: var(--warning-color);
}

.error {
  background-color: var(--error-color);
}
</style>
