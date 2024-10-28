<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/ui/button/Button.vue'
import AddIcon from '@/components/ui/icons/AddIcon.vue'

const isLoading = ref(false)
const loadImage = () => {
  const inputFileElement = document.createElement('input')
  inputFileElement.setAttribute('type', 'file')
  inputFileElement.click()
}

const addImageToProject = () => {
  loadImage()
}
</script>

<template>
  <Button
    :is-loading="isLoading"
    variant="secondary"
    @on-click="addImageToProject"
  >
    <AddIcon class="icon" />
  </Button>
</template>

<style scoped lang="scss">
.icon {
  max-width: 20px;
}
</style>
