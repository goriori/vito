<script setup lang="ts">
import { register } from 'swiper/element/bundle'
import { SProps } from '@/components/ui/slider/types.ts'

register()

defineProps<SProps>()
</script>

<template>
  <swiper-container
    :slides-per-view="slideViews"
    :navigation="navigation"
    :pagination="pagination"
    :scrollbar="scrollbar"
  >
    <swiper-slide
      v-for="slide in slides"
      :key="slide"
      :lazy="lazySlides"
      class="slide"
    >
      <component :is="component" v-bind="slide" />
    </swiper-slide>
  </swiper-container>
</template>

<style scoped lang="scss">
swiper-container {
  width: 100%;
  height: 100%;
}
</style>
