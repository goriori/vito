<script setup lang="ts">
import PersonChip from '@/components/ui/chip/person/PersonChip.vue'

type LProps = {
  persons: string[]
}
defineProps<LProps>()
</script>

<template>
  <PersonChip v-for="person in persons" :key="person" :person="person" />
</template>

<style scoped lang="scss"></style>
