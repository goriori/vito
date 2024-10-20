<script setup lang="ts">
import Modal from '@/components/ui/modal/Modal.vue'
import CircleSpinner from '@/components/ui/spiners/CircleSpinner.vue'
import { onMounted, onUnmounted } from 'vue'
import { useBlockScroll } from '@/utils/useBlockScroll.ts'

const { blockScroll, unblockScroll } = useBlockScroll()

onMounted(() => {
  blockScroll()
})
onUnmounted(() => {
  unblockScroll()
})
</script>

<template>
  <Modal>
    <template #window>
      <CircleSpinner />
    </template>
  </Modal>
</template>

<style scoped lang="scss"></style>
