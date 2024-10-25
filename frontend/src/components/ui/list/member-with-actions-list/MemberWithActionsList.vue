<script setup lang="ts">
import { Member } from '@/entities/member/index.ts'
import MemberButtonPopup from '@/components/ui/button-popup/member/MemberButtonPopup.vue'
import MemberChip from '@/components/ui/chip/member/MemberChip.vue'
import List from '@/components/ui/list/List.vue'
import { DeviceSize, useSizeWindow } from '@/utils/useSizeWindow.ts'

type ActionObject = {
  action: object
  settings: object
}
type LProps = {
  actions: ActionObject[]
  members: Member[]
}
defineProps<LProps>()
const { deviceSize } = useSizeWindow()
</script>

<template>
  <template v-if="deviceSize === DeviceSize.DESKTOP">
    <List :columns="5" :column-width="150" :column-space="10">
      <MemberButtonPopup
        v-for="member in members"
        :key="member.id"
        :popup-components="actions"
        :member-component="MemberChip"
        :member="member"
        class="member cursor-pointer"
      />
    </List>
  </template>
  <template v-else-if="deviceSize === DeviceSize.LAPTOP">
    <List :columns="3" :column-width="150" :column-space="10">
      <MemberButtonPopup
        v-for="member in members"
        :key="member.id"
        :popup-components="actions"
        :member-component="MemberChip"
        :member="member"
        class="member cursor-pointer"
      />
    </List>
  </template>
  <template v-else-if="deviceSize === DeviceSize.TABLET">
    <List :columns="3" :column-width="150" :column-space="10">
      <MemberButtonPopup
        v-for="member in members"
        :key="member.id"
        :popup-components="actions"
        :member-component="MemberChip"
        :member="member"
        class="member cursor-pointer"
      />
    </List>
  </template>
  <template v-else-if="deviceSize === DeviceSize.MOBILE">
    <List :columns="2" :column-width="150" :column-space="10">
      <MemberButtonPopup
        v-for="member in members"
        :key="member.id"
        :popup-components="actions"
        :member-component="MemberChip"
        :member="member"
        class="member cursor-pointer"
      />
    </List>
  </template>
</template>

<style scoped lang="scss"></style>
