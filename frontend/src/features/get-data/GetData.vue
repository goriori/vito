<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import JsonPlaceholderService from '@/services/jsonplaceholder/index.ts'
import { ref } from 'vue'
import { useApplicationStore } from '@/stores/app.store.ts'

const applicationStore = useApplicationStore()
const isLoading = ref(false)
const getSome = () => {
  const MIN_TIMEOUT = 1000
  isLoading.value = true
  Promise.all([
    JsonPlaceholderService.getPosts(),
    JsonPlaceholderService.getAlbums(),
    JsonPlaceholderService.getComments(),
    JsonPlaceholderService.getPhotos(),
    JsonPlaceholderService.getTodos(),
    JsonPlaceholderService.getUsers(),
  ])
    .then((data) => console.log(data))
    .catch(() => {
      applicationStore.getAlert('error')?.onShow()
    })
    .finally(() => {
      setTimeout(() => (isLoading.value = false), MIN_TIMEOUT)
    })
}
</script>

<template>
  <Button
    background="secondary"
    :is-loading="isLoading"
    @click="getSome"
    class="btn"
    >get data
  </Button>
</template>

<style scoped lang="scss"></style>
