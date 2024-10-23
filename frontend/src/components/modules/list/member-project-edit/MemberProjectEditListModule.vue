<script setup lang="ts">
import MemberWithActionsList from '@/components/ui/list/member-with-actions-list/MemberWithActionsList.vue'
import DeleteIcon from '@/components/ui/icons/DeleteIcon.vue'
import { Member } from '@/entities/member/index.ts'

type LProps = {
  members: Member[]
}
defineProps<LProps>()
const actions = [
  {
    action: DeleteIcon,
    settings: {},
  },
]
</script>

<template>
  <MemberWithActionsList :members="members" :actions="actions" />
</template>

<style scoped lang="scss"></style>
