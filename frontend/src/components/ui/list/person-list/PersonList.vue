<script setup lang="ts">
import PersonChip from '@/components/ui/chip/member/MemberChip.vue'
import { Member } from '@/entities/member/index.ts'

type LProps = {
  members: Member[]
}
defineProps<LProps>()
</script>

<template>
  <PersonChip v-for="member in members" :key="member" :member="member" />
</template>

<style scoped lang="scss"></style>
