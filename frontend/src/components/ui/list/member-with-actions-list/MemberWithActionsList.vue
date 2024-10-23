<script setup lang="ts">
import { Member } from '@/entities/member/index.ts'
import MemberButtonPopup from '@/components/ui/button-popup/member/MemberButtonPopup.vue'
import MemberChip from '@/components/ui/chip/member/MemberChip.vue'
import List from '@/components/ui/list/List.vue'

type ActionObject = {
  action: object
  settings: object
}
type LProps = {
  actions: ActionObject[]
  members: Member[]
}
defineProps<LProps>()
</script>

<template>
  <List :columns="5" :column-width="150" :column-space="10">
    <MemberButtonPopup
      v-for="member in members"
      :key="member.id"
      :popup-components="actions"
      :member-component="MemberChip"
      :member="member"
    />
  </List>
</template>

<style scoped lang="scss"></style>
