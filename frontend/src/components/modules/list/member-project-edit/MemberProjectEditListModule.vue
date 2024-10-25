<script setup lang="ts">
import MemberWithActionsList from '@/components/ui/list/member-with-actions-list/MemberWithActionsList.vue'
import { Member } from '@/entities/member/index.ts'
import DeleteProjectMemberFeature from '@/features/delete-project-member/DeleteProjectMemberFeature.vue'
import InfoProjectMemberModalFeature from '@/features/info-project-member-modal/InfoProjectMemberModalFeature.vue'
import { useRoute } from 'vue-router'

type LProps = {
  members: Member[]
}
defineProps<LProps>()
const projectId = +useRoute().params.id
const actions = [
  {
    action: DeleteProjectMemberFeature,
    settings: { projectId },
  },
  {
    action: InfoProjectMemberModalFeature,
    settings: { projectId },
  },
]
</script>

<template>
  <MemberWithActionsList :members="members" :actions="actions" />
</template>

<style scoped lang="scss"></style>
