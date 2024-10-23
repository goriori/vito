<script setup lang="ts">
import ButtonPopup from '@/components/ui/button-popup/ButtonPopup.vue'
import { Member } from '@/entities/member/index.ts'

type ActionObject = {
  action: object
  settings: object
}

type BProps = {
  popupComponents: ActionObject[]
  memberComponent: object
  member: Member
}
defineProps<BProps>()
</script>

<template>
  <ButtonPopup>
    <template #popup>
      <div class="actions flex center gap-2 text-color-fourthly">
        <component
          :is="popupComponent.action"
          v-for="popupComponent in popupComponents"
          :key="popupComponent"
          v-bind="{ memberId: member.id, ...popupComponent.settings }"
        />
      </div>
    </template>
    <template #button>
      <component :is="memberComponent" :member="member" />
    </template>
  </ButtonPopup>
</template>

<style scoped lang="scss">
::v-deep(.popup) {
  width: 100%;
  padding: var(--space-sm) !important;
}
</style>
