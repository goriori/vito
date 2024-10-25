<script setup lang="ts">
import { BEmits } from '@/components/ui/button-popup/types.ts'
import { ref } from 'vue'

type BProps = {
  popupPosition:
    | 'left'
    | 'right'
    | 'top'
    | 'top-left'
    | 'top-right'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right'
}
defineProps<BProps>()
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
    <section
      v-show="state"
      :class="[
        'popup',
        {
          'popup-left': popupPosition === 'left',
          'popup-right': popupPosition === 'right',
          'popup-top': popupPosition === 'top',
          'popup-top-left': popupPosition === 'top-left',
          'popup-top-right': popupPosition === 'top-right',
          'popup-bottom': popupPosition === 'bottom',
          'popup-bottom-left': popupPosition === 'bottom-left',
          'popup-bottom-right': popupPosition === 'bottom-right',
        },
      ]"
      @click="onToggle"
    >
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
    z-index: 10;
    max-height: 200px;
    overflow: auto;
    @include no-scroll();
    padding: var(--space-md);
    background-color: var(--secondary-color);
    border-radius: var(--radius-md);
    animation: var(--animation-time) default-display-card;

    &-top {
      bottom: 50px;
    }

    &-top-left {
      bottom: 50px;
      right: 0;
    }

    &-top-rigth {
      bottom: 50px;
      left: 0;
    }

    &-bottom {
      top: 50px;
    }

    &-bottom-left {
      top: 50px;
      right: 0;
    }

    &-bottom-right {
      top: 50px;
      left: 0;
    }

    &-left {
      right: 50px;
    }

    &-right {
      left: 50px;
    }
  }

  .button {
    width: 100%;
    height: 100%;
  }
}
</style>
