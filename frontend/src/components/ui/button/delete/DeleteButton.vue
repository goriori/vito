<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import DeleteIcon from '@/components/ui/icons/DeleteIcon.vue'

type BProps = {
  isLoading: boolean
}
defineProps<BProps>()
</script>

<template>
  <Button :is-loading="isLoading" variant="secondary">
    <DeleteIcon />
  </Button>
</template>

<style scoped lang="scss"></style>
