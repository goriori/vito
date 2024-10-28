<script setup lang="ts">
import Slider from '@/components/ui/slider/Slider.vue'
import Image from '@/components/ui/image/Image.vue'
import { ref } from 'vue'

type SProps = {
  imageUrls: string[]
}
const props = defineProps<SProps>()
const buildDataImage = () =>
  props.imageUrls.map((image) => ({
    href: window.API + image,
    rounded: true,
  }))

const images = ref(buildDataImage())
</script>

<template>
  <Slider
    v-if="images.length > 0"
    navigation
    scrollbar
    :slides="images"
    :component="Image"
  />
  <Image v-else rounded href="/images/noimage.jpg" />
</template>

<style scoped lang="scss"></style>
