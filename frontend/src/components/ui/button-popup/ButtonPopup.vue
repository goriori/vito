<script setup lang="ts">
import { BEmits } from '@/components/ui/button-popup/types.ts'
import { ref } from 'vue'

const emits = defineEmits<BEmits>()
const state = ref(false)

const onToggle = () => {
  state.value = !state.value
  emits('onToggle', state.value)
}
const onClickOutside = () => {
  state.value = false
}
</script>

<template>
  <article v-outside="onClickOutside" class="button-popup">
    <section v-show="state" class="popup">
      <slot name="popup" />
    </section>
    <section class="button" @click="onToggle">
      <slot name="button" />
    </section>
  </article>
</template>

<style scoped lang="scss">
@import '@/assets/scss/mixins';

.button-popup {
  position: relative;
  width: 100%;
  height: 100%;

  .popup {
    position: absolute;
    bottom: 50px;
    max-height: 200px;
    overflow: auto;
    @include no-scroll();
    padding: var(--space-md);
    background-color: var(--secondary-color);
    border-radius: var(--radius-md);
  }

  .button {
    width: 100%;
    height: 100%;
  }
}
</style>
