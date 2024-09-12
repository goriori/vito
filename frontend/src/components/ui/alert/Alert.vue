<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

type AProps = {
  color: 'default' | 'warning' | 'error'
}
type AEmits = {
  (eventName: 'onClick'): void
  (eventName: 'onTimeOut'): void
}

const TIME_OUT = 5000

defineProps<AProps>()
const emits = defineEmits<AEmits>()
const timeoutId = ref<number | undefined>(undefined)
const onClick = () => emits('onClick')
const createTimeout = () => {
  timeoutId.value = setTimeout(() => emits('onTimeOut'), TIME_OUT)
}
const deleteTimeout = () => {
  if (timeoutId.value) clearTimeout(timeoutId.value)
}
onMounted(() => {
  gsap.from('.alert', { scale: 0, duration: 0.3 })
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
  transform: translate(-50%, 0);
  color: black;
  padding: 10px;
  border-radius: 8px;
  background-color: transparent;
}

.default {
  background-color: var(--primary-color);
}

.warning {
  background-color: darkorange;
}

.error {
  background-color: red;
}
</style>
