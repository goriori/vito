<script setup lang="ts">
import Chip from '@/components/ui/chip/Chip.vue'
import PersonIcon from '@/components/ui/icons/PersonIcon.vue'
import { Member } from '@/entities/member/index.ts'

type PProps = {
  member: Member
}
defineProps<PProps>()
</script>

<template>
  <Chip variant="secondary" rounded class="person">
    <PersonIcon class="icon" />
    <p>{{ member.name }} {{ member.surname }}</p>
  </Chip>
</template>

<style scoped lang="scss">
.icon {
  width: 100%;
  height: 100%;
  max-width: 24px;
  max-height: 24px;
  fill: #fff;
}

.person {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: var(--space-sm);
}
</style>
