<script setup lang="ts">
import Slider from '@/components/ui/slider/Slider.vue'
import Image from '@/components/ui/image/Image.vue'

const images = [
  {
    href: '/images/projects/project-1.jpg',
    rounded: true,
  },
  {
    href: '/images/projects/project-2.jpg',
    rounded: true,
  },
  {
    href: '/images/projects/project-3.jpg',
    rounded: true,
  },
]
</script>

<template>
  <Slider navigation scrollbar :slides="images" :component="Image" />
</template>

<style scoped lang="scss"></style>
