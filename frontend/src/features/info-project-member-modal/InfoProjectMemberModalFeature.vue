<script setup lang="ts">
import InfoButton from '@/components/ui/button/info/InfoButton.vue'
import { useApplicationStore } from '@/stores/app.store.ts'
import { useListStore } from '@/stores/list.store.ts'
import { Project } from '@/entities/project/index.ts'
import { Member } from '@/entities/member'

type BProps = {
  memberId: number
  projectId: number
}
const props = defineProps<BProps>()
const applicationStore = useApplicationStore()
const listStore = useListStore()
const getCurrentMember = () => {
  const findCurrentProject = (project: Project) => project.id === props.projectId
  const findCurrentMemberProject = (member: Member) => member.id === props.memberId
  const currentProject = (listStore.getList('projects') as Project[]).find(findCurrentProject) as Project
  const currentMember = currentProject.getMembers().find(findCurrentMemberProject)
  if (!currentMember) return null
  return currentMember
}
const openMemberInfo = () => {
  applicationStore.getModal('member-info')?.setSettings({ member: getCurrentMember() }).onShow()
}
</script>

<template>
  <InfoButton class="feature" @click="openMemberInfo" />
</template>

<style scoped lang="scss">
.feature {
  color:var(--warning-color);
  max-width: 50px;
  max-height: 38px;
}
</style>
