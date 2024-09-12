<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

type MEmits = {
  (eventName: 'onClickBackground'): void
  (eventName: 'onClickContent'): void
  (eventName: 'onMount'): void
}

const emits = defineEmits<MEmits>()
const tl = gsap.timeline()
const onClose = () => emits('onClickBackground')
const onClickContent = () => emits('onClickContent')
const onMount = () => emits('onMount')
onMounted(() => {
  tl.from('.popup-base', { scaleX: 5, scaleY: 10 }).from('.popup-content', {
    top: 0,
    scale: 0,
  })
  onMount()
})
</script>

<template>
  <div class="popup-base">
    <div class="popup-background" @click="onClose"></div>
    <div class="popup-content" @click="onClickContent">
      <slot name="window" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.popup {
  &-base {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-background {
    position: absolute;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(5px);
  }

  &-content {
    position: absolute;
  }
}
</style>
